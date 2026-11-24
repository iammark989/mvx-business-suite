import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Category = {
    id: number;
    parent_id: number | null;
    code: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
    children: Category[];
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    categories: {
        data: Category[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        search: string;
        status: string;
    };
    auth: {
        permissions: string[];
    };
};

export default function Index({ categories, filters }: PageProps) {
    const { auth } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

    const canCreate = auth.permissions.includes('categories.create');
    const canUpdate = auth.permissions.includes('categories.update');
    const canManageStatus = auth.permissions.includes('categories.manage-status');

    function applyFilters(
        nextSearch: string = search,
        nextStatus: string = status,
    ) {
        router.get(
            '/admin/categories',
            {
                search: nextSearch,
                status: nextStatus,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    function toggleExpanded(categoryId: number) {
        setExpandedCategories((current) =>
            current.includes(categoryId)
                ? current.filter((id) => id !== categoryId)
                : [...current, categoryId],
        );
    }

    function toggleStatus(category: Category) {
        const action = category.is_active ? 'deactivate' : 'activate';

        if (
            !window.confirm(
                `Are you sure you want to ${action} category ${category.code} - ${category.name}?`,
            )
        ) {
            return;
        }

        router.patch(
            `/admin/categories/${category.id}/status`,
            {
                is_active: !category.is_active,
            },
            {
                preserveScroll: true,
            },
        );
    }

    function renderStatus(category: Category) {
        return (
            <span
                className={
                    category.is_active
                        ? 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'
                        : 'rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700'
                }
            >
                {category.is_active ? 'Active' : 'Inactive'}
            </span>
        );
    }

    function renderActions(category: Category) {
        return (
            <div className="flex items-center justify-end gap-3">
                {canUpdate && (
                    <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="font-medium text-primary hover:underline"
                    >
                        Edit
                    </Link>
                )}

                {canManageStatus && (
                    <button
                        type="button"
                        onClick={() => toggleStatus(category)}
                        className="cursor-pointer font-medium text-muted-foreground hover:text-foreground"
                    >
                        {category.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                )}

                {!canUpdate && !canManageStatus && (
                    <span className="text-xs text-muted-foreground">
                        View only
                    </span>
                )}
            </div>
        );
    }

    return (
        <>
            <Head title="Categories" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Categories
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage product categories and subcategories.
                        </p>
                    </div>

                    {canCreate && (
                        <Link
                            href="/admin/categories/create"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            + Create Category
                        </Link>
                    )}
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">Category List</h2>
                            <p className="text-sm text-muted-foreground">
                                {categories.total} main categories
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setSearch(value);
                                    applyFilters(value, status);
                                }}
                                placeholder="Search code or name..."
                                className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:border-primary sm:w-64"
                            />

                            <select
                                value={status}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setStatus(value);
                                    applyFilters(search, value);
                                }}
                                className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                            >
                                <option value="all">All statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Code</th>
                                    <th className="px-4 py-3 font-medium">Category Name</th>
                                    <th className="px-4 py-3 font-medium">Description</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Created</th>
                                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {categories.data.map((category) => {
                                    const hasChildren = category.children.length > 0;
                                    const isExpanded = expandedCategories.includes(category.id);

                                    return (
                                        <>
                                            <tr
                                                key={category.id}
                                                className="bg-muted/20 hover:bg-muted/40"
                                            >
                                                <td className="whitespace-nowrap px-4 py-3 font-semibold">
                                                    <div className="flex items-center gap-2">
                                                        {hasChildren ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => toggleExpanded(category.id)}
                                                                className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted"
                                                                aria-label={
                                                                    isExpanded
                                                                        ? 'Collapse subcategories'
                                                                        : 'Expand subcategories'
                                                                }
                                                            >
                                                                <span className="text-xs">
                                                                    {isExpanded ? '▼' : '▶'}
                                                                </span>
                                                            </button>
                                                        ) : (
                                                            <span className="h-6 w-6" />
                                                        )}

                                                        {category.code}
                                                    </div>
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-3 font-medium">
                                                    {category.name}
                                                    {hasChildren && (
                                                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                                                            ({category.children.length} subcategories)
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="px-4 py-3 text-muted-foreground">
                                                    {category.description || '—'}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-3">
                                                    {renderStatus(category)}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                                    {new Date(category.created_at).toLocaleDateString()}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-3 text-right">
                                                    {renderActions(category)}
                                                </td>
                                            </tr>

                                            {isExpanded &&
                                                category.children.map((child) => (
                                                    <tr
                                                        key={child.id}
                                                        className="hover:bg-muted/30"
                                                    >
                                                        <td className="whitespace-nowrap px-4 py-3 pl-12 font-semibold text-muted-foreground">
                                                            {child.code}
                                                        </td>

                                                        <td className="whitespace-nowrap px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-muted-foreground">└</span>
                                                                {child.name}
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-3 text-muted-foreground">
                                                            {child.description || '—'}
                                                        </td>

                                                        <td className="whitespace-nowrap px-4 py-3">
                                                            {renderStatus(child)}
                                                        </td>

                                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                                            {new Date(child.created_at).toLocaleDateString()}
                                                        </td>

                                                        <td className="whitespace-nowrap px-4 py-3 text-right">
                                                            {renderActions(child)}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </>
                                    );
                                })}

                                {categories.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No categories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Page {categories.current_page} of {categories.last_page}
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {categories.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url ?? '#'}
                                    preserveScroll
                                    aria-current={link.active ? 'page' : undefined}
                                    className={`rounded-md border px-3 py-1.5 text-sm ${
                                        link.active
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                    } ${
                                        !link.url
                                            ? 'pointer-events-none opacity-40'
                                            : ''
                                    }`}
                                >
                                    <span>
                                        {link.label.replace(/&laquo;|&raquo;/g, (value) =>
                                            value === '&laquo;' ? '«' : '»',
                                        )}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Categories',
            href: '/admin/categories',
        },
    ],
};