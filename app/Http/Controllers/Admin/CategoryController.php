<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display the category hierarchy.
     */
    public function index(Request $request)
    {
        Gate::authorize('categories.view');

        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', Rule::in(['all', 'active', 'inactive'])],
        ]);

        $search = $validated['search'] ?? null;
        $status = $validated['status'] ?? 'all';

        $categories = Category::query()
            ->whereNull('parent_id')
            ->with('children')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('code', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%")
                        ->orWhereHas('children', function ($childQuery) use ($search) {
                            $childQuery->where('code', 'like', "%{$search}%")
                                ->orWhere('name', 'like', "%{$search}%");
                        });
                });
            })
            ->when($status !== 'all', function ($query) use ($status) {
                $query->where(
                    'is_active',
                    $status === 'active'
                );
            })
            ->orderBy('code')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the category creation form.
     */
    public function create()
    {
        Gate::authorize('categories.create');

        $parentCategories = Category::query()
            ->whereNull('parent_id')
            ->where('is_active', true)
            ->orderBy('code')
            ->get(['id', 'code', 'name']);

        return Inertia::render('admin/categories/create', [
            'parentCategories' => $parentCategories,
        ]);
    }

    /**
     * Store a new main category or subcategory.
     */
    public function store(Request $request)
    {
        Gate::authorize('categories.create');

        $validated = $request->validate([
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('categories', 'id')->where(function ($query) {
                    $query->whereNull('parent_id')
                        ->where('is_active', true);
                }),
            ],
            'code' => [
                'required',
                'string',
                'max:20',
                'alpha_dash:ascii',
                'uppercase',
                'unique:categories,code',
            ],
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        Category::create([
            ...$validated,
            'is_active' => true,
        ]);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Show the category editing form.
     */
    public function edit(Category $category)
    {
        Gate::authorize('categories.update');

        $parentCategories = Category::query()
            ->whereNull('parent_id')
            ->where('is_active', true)
            ->where('id', '!=', $category->id)
            ->orderBy('code')
            ->get(['id', 'code', 'name']);

        return Inertia::render('admin/categories/edit', [
            'category' => [
                'id' => $category->id,
                'parent_id' => $category->parent_id,
                'code' => $category->code,
                'name' => $category->name,
                'description' => $category->description,
                'is_active' => $category->is_active,
                'has_children' => $category->children()->exists(),
            ],
            'parentCategories' => $parentCategories,
        ]);
    }

    /**
     * Update an existing category.
     */
    public function update(Request $request, Category $category)
    {
        Gate::authorize('categories.update');

        $validated = $request->validate([
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('categories', 'id')->where(function ($query) {
                    $query->whereNull('parent_id')
                        ->where('is_active', true);
                }),
            ],
            'code' => [
                'required',
                'string',
                'max:20',
                'alpha_dash:ascii',
                'uppercase',
                Rule::unique('categories', 'code')->ignore($category->id),
            ],
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        if ($category->children()->exists() && ! empty($validated['parent_id'])) {
            return back()->withErrors([
                'parent_id' => 'A main category with subcategories cannot become a subcategory.',
            ]);
        }

        $category->update($validated);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Activate or deactivate a category.
     */
    public function updateStatus(Request $request, Category $category)
    {
        Gate::authorize('categories.manage-status');

        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        if (
            ! $validated['is_active']
            && $category->children()->where('is_active', true)->exists()
        ) {
            return back()->withErrors([
                'is_active' => 'Deactivate the active subcategories before deactivating this main category.',
            ]);
        }

        $category->update([
            'is_active' => $validated['is_active'],
        ]);

        return redirect()
            ->route('categories.index')
            ->with(
                'success',
                $category->is_active
                    ? 'Category activated successfully.'
                    : 'Category deactivated successfully.'
            );
    }
}