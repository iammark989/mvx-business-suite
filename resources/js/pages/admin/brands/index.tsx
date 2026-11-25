import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Brand = {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    brands: {
        data: Brand[];
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

export default function Index({ brands, filters }: PageProps) {
    const { auth } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? 'all');

    const canCreate = auth.permissions.includes('brands.create');
    const canUpdate = auth.permissions.includes('brands.update');
    const canManageStatus = auth.permissions.includes('brands.manage-status');

    function applyFilters(
        nextSearch: string = search,
        nextStatus: string = status,
    ) {
        router.get(
            '/admin/brands',
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

    function toggleStatus(brand: Brand) {
        const action = brand.is_active ? 'deactivate' : 'activate';

        if (
            !window.confirm(
                `Are you sure you want to ${action} brand "${brand.name}"?`,
            )
        ) {
            return;
        }

        router.patch(
            `/admin/brands/${brand.id}/status`,
            {
                is_active: !brand.is_active,
            },
            {
                preserveScroll: true,
            },
        );
    }

    function renderStatus(brand: Brand) {
        return (
            <span
                className={
                    brand.is_active
                        ? 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'
                        : 'rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700'
                }
            >
                {brand.is_active ? 'Active' : 'Inactive'}
            </span>
        );
    }

    function renderActions(brand: Brand) {
        return (
            <div className="flex items-center justify-end gap-3">
                {canUpdate && (
                    <Link
                        href={`/admin/brands/${brand.id}/edit`}
                        className="font-medium text-primary hover:underline"
                    >
                        Edit
                    </Link>
                )}

                {canManageStatus && (
                    <button
                        type="button"
                        onClick={() => toggleStatus(brand)}
                        className={
                            brand.is_active
                                  ? 'cursor-pointer font-medium text-red-600 hover:underline'
                                  : 'cursor-pointer font-medium text-green-600 hover:underline'
                                   }
                    >
                        {brand.is_active ? 'Deactivate' : 'Activate'}
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
            <Head title="Brands" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Brands
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage product brands and brand information.
                        </p>
                    </div>

                    {canCreate && (
                        <Link
                            href="/admin/brands/create"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            + Create Brand
                        </Link>
                    )}
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">Brand List</h2>
                            <p className="text-sm text-muted-foreground">
                                {brands.total} brands
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
                                placeholder="Search brand name or description..."
                                className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:border-primary sm:w-72"
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
                                    <th className="px-4 py-3 font-medium">Brand Name</th>
                                    <th className="px-4 py-3 font-medium">Description</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Created</th>
                                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {brands.data.map((brand) => (
                                    <tr
                                        key={brand.id}
                                        className="hover:bg-muted/30"
                                    >
                                        <td className="whitespace-nowrap px-4 py-3 font-semibold">
                                            {brand.name}
                                        </td>

                                        <td className="max-w-md px-4 py-3 text-muted-foreground">
                                            <span className="line-clamp-2">
                                                {brand.description || '—'}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {renderStatus(brand)}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {new Date(brand.created_at).toLocaleDateString()}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-right">
                                            {renderActions(brand)}
                                        </td>
                                    </tr>
                                ))}

                                {brands.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No brands found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Page {brands.current_page} of {brands.last_page}
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {brands.links.map((link, index) => (
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
            title: 'Brands',
            href: '/admin/brands',
        },
    ],
};