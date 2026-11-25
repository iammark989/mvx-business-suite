import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Warehouse = {
    id: number;
    code: string;
    name: string;
    type: string;
    description: string | null;
    contact_person: string | null;
    contact_number: string | null;
    email: string | null;
    address: string | null;
    is_active: boolean;
    users_count: number;
    created_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    warehouses: {
        data: Warehouse[];
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

export default function Index({ warehouses, filters }: PageProps) {
    const { auth } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);

    const canCreate = auth.permissions.includes('warehouses.create');
    const canUpdate = auth.permissions.includes('warehouses.update');
    const canManageStatus = auth.permissions.includes('warehouses.manage-status');
    const canAssignUsers = auth.permissions.includes('warehouses.assign-users');

    function applyFilters(
        nextSearch: string = search,
        nextStatus: string = status,
    ) {
        router.get(
            '/admin/warehouses',
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

    function toggleStatus(warehouse: Warehouse) {
        const action = warehouse.is_active ? 'deactivate' : 'activate';

        if (
            !window.confirm(
                `Are you sure you want to ${action} warehouse ${warehouse.code} - ${warehouse.name}?`,
            )
        ) {
            return;
        }

        router.patch(
            `/admin/warehouses/${warehouse.id}/status`,
            {
                is_active: !warehouse.is_active,
            },
            {
                preserveScroll: true,
            },
        );
    }

    function renderStatus(warehouse: Warehouse) {
        return (
            <span
                className={
                    warehouse.is_active
                        ? 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'
                        : 'rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700'
                }
            >
                {warehouse.is_active ? 'Active' : 'Inactive'}
            </span>
        );
    }

    function renderActions(warehouse: Warehouse) {
        return (
            <div className="flex items-center justify-end gap-3">
                {canUpdate && (
                    <Link
                        href={`/admin/warehouses/${warehouse.id}/edit`}
                        className="font-medium text-primary hover:underline"
                    >
                        Edit
                    </Link>
                )}

                {canAssignUsers && (
                    <Link
                        href={`/admin/warehouses/${warehouse.id}/users`}
                        className="font-medium text-primary hover:underline"
                    >
                        Assign Users
                    </Link>
                )}

                {canManageStatus && (
                    <button
                        type="button"
                        onClick={() => toggleStatus(warehouse)}
                        className={
                                   warehouse.is_active
                                    ? 'cursor-pointer font-medium text-red-600 hover:underline'
                                    : 'cursor-pointer font-medium text-green-600 hover:underline'
                                        }
                    >
                        {warehouse.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                )}

                {!canUpdate && !canAssignUsers && !canManageStatus && (
                    <span className="text-xs text-muted-foreground">
                        View only
                    </span>
                )}
            </div>
        );
    }

    return (
        <>
            <Head title="Warehouses" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Warehouses
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage warehouse locations and assignments.
                        </p>
                    </div>

                    {canCreate && (
                        <Link
                            href="/admin/warehouses/create"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            + Create Warehouse
                        </Link>
                    )}
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">Warehouse List</h2>
                            <p className="text-sm text-muted-foreground">
                                {warehouses.total} warehouses
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
                                placeholder="Search code, name, type..."
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
                                    <th className="px-4 py-3 font-medium">Warehouse Name</th>
                                    <th className="px-4 py-3 font-medium">Type</th>
                                    <th className="px-4 py-3 font-medium">Contact Person</th>
                                    <th className="px-4 py-3 font-medium">Contact Number</th>
                                    <th className="px-4 py-3 font-medium">Assigned Users</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Created</th>
                                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {warehouses.data.map((warehouse) => (
                                    <tr
                                        key={warehouse.id}
                                        className="hover:bg-muted/30"
                                    >
                                        <td className="whitespace-nowrap px-4 py-3 font-semibold">
                                            {warehouse.code}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 font-medium">
                                            {warehouse.name}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {warehouse.type}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {warehouse.contact_person || '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {warehouse.contact_number || '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {warehouse.users_count}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {renderStatus(warehouse)}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {new Date(warehouse.created_at).toLocaleDateString()}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-right">
                                            {renderActions(warehouse)}
                                        </td>
                                    </tr>
                                ))}

                                {warehouses.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No warehouses found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Page {warehouses.current_page} of {warehouses.last_page}
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {warehouses.links.map((link, index) => (
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
            title: 'Warehouses',
            href: '/admin/warehouses',
        },
    ],
};