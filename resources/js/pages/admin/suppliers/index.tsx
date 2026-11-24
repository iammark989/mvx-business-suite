import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Supplier = {
    id: number;
    code: string;
    name: string;
    contact_person: string | null;
    contact_number: string | null;
    email: string | null;
    tin_number: string | null;
    address: string | null;
    remarks: string | null;
    is_active: boolean;
    created_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    suppliers: {
        data: Supplier[];
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

export default function Index({ suppliers, filters }: PageProps) {
    const { auth } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);

    const canCreate = auth.permissions.includes('suppliers.create');
    const canUpdate = auth.permissions.includes('suppliers.update');
    const canManageStatus = auth.permissions.includes('suppliers.manage-status');

    function applyFilters(
        nextSearch: string = search,
        nextStatus: string = status,
    ) {
        router.get(
            '/admin/suppliers',
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

    function toggleStatus(supplier: Supplier) {
        const action = supplier.is_active ? 'deactivate' : 'activate';

        if (
            !window.confirm(
                `Are you sure you want to ${action} supplier ${supplier.code} - ${supplier.name}?`,
            )
        ) {
            return;
        }

        router.patch(
            `/admin/suppliers/${supplier.id}/status`,
            {
                is_active: !supplier.is_active,
            },
            {
                preserveScroll: true,
            },
        );
    }

    function renderStatus(supplier: Supplier) {
        return (
            <span
                className={
                    supplier.is_active
                        ? 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'
                        : 'rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700'
                }
            >
                {supplier.is_active ? 'Active' : 'Inactive'}
            </span>
        );
    }

    function renderActions(supplier: Supplier) {
        return (
            <div className="flex items-center justify-end gap-3">
                {canUpdate && (
                    <Link
                        href={`/admin/suppliers/${supplier.id}/edit`}
                        className="font-medium text-primary hover:underline"
                    >
                        Edit
                    </Link>
                )}

                {canManageStatus && (
                    <button
                        type="button"
                        onClick={() => toggleStatus(supplier)}
                        className="cursor-pointer font-medium text-muted-foreground hover:text-foreground"
                    >
                        {supplier.is_active ? 'Deactivate' : 'Activate'}
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
            <Head title="Suppliers" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Suppliers
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage supplier information and contact details.
                        </p>
                    </div>

                    {canCreate && (
                        <Link
                            href="/admin/suppliers/create"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            + Create Supplier
                        </Link>
                    )}
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">Supplier List</h2>
                            <p className="text-sm text-muted-foreground">
                                {suppliers.total} suppliers
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
                                placeholder="Search code, name, contact..."
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
                                    <th className="px-4 py-3 font-medium">Supplier Name</th>
                                    <th className="px-4 py-3 font-medium">Contact Person</th>
                                    <th className="px-4 py-3 font-medium">Contact Number</th>
                                    <th className="px-4 py-3 font-medium">Email</th>
                                    <th className="px-4 py-3 font-medium">TIN Number</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Created</th>
                                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {suppliers.data.map((supplier) => (
                                    <tr
                                        key={supplier.id}
                                        className="hover:bg-muted/30"
                                    >
                                        <td className="whitespace-nowrap px-4 py-3 font-semibold">
                                            {supplier.code}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 font-medium">
                                            {supplier.name}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {supplier.contact_person || '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {supplier.contact_number || '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {supplier.email || '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {supplier.tin_number || '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {renderStatus(supplier)}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {new Date(supplier.created_at).toLocaleDateString()}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-right">
                                            {renderActions(supplier)}
                                        </td>
                                    </tr>
                                ))}

                                {suppliers.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No suppliers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Page {suppliers.current_page} of {suppliers.last_page}
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {suppliers.links.map((link, index) => (
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
            title: 'Suppliers',
            href: '/admin/suppliers',
        },
    ],
};