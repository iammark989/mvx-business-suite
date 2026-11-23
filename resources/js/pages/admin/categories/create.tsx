import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type ParentCategory = {
    id: number;
    code: string;
    name: string;
};

type PageProps = {
    parentCategories: ParentCategory[];
};

export default function Create({ parentCategories }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        parent_id: null as number | null,
        code: '',
        name: '',
        description: '',
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post('/admin/categories');
    }

    return (
        <>
            <Head title="Create Category" />

            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create Category
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Add a new main category or subcategory.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">Category Information</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Enter the category details below.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="parent_id"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Category Type
                                </label>

                                <select
                                    id="parent_id"
                                    value={data.parent_id ?? ''}
                                    onChange={(event) =>
                                        setData(
                                            'parent_id',
                                            event.target.value
                                                ? Number(event.target.value)
                                                : null,
                                        )
                                    }
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                >
                                    <option value="">Main Category</option>

                                    {parentCategories.map((parent) => (
                                        <option key={parent.id} value={parent.id}>
                                            Subcategory of {parent.code} - {parent.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.parent_id && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.parent_id}
                                    </p>
                                )}

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Choose Main Category to create a parent category,
                                    or select an existing main category to create a subcategory.
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="code"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Category Code
                                </label>

                                <input
                                    id="code"
                                    type="text"
                                    value={data.code}
                                    onChange={(event) =>
                                        setData('code', event.target.value.toUpperCase())
                                    }
                                    required
                                    maxLength={20}
                                    autoComplete="off"
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm uppercase outline-none focus:border-primary"
                                    placeholder="e.g. A, A1, B2"
                                />

                                {errors.code && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.code}
                                    </p>
                                )}

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Enter a unique category code, such as A for a main
                                    category or A1 for a subcategory.
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Category Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData('name', event.target.value)
                                    }
                                    required
                                    maxLength={100}
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                    placeholder="e.g. Beverages, Soft Drinks"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Description
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>

                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(event) =>
                                        setData('description', event.target.value)
                                    }
                                    maxLength={255}
                                    rows={3}
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                                    placeholder="Enter additional information about this category..."
                                />

                                {errors.description && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/admin/categories"
                            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Categories',
            href: '/admin/categories',
        },
        {
            title: 'Create Category',
            href: '/admin/categories/create',
        },
    ],
};