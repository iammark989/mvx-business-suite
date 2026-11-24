import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Uom = {
    id: number;
    code: string;
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
    uoms: {
        data: Uom[];
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

export default function Index({ uoms, filters }: PageProps) {
    const { auth } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);

    const canCreate = auth.permissions.includes('uoms.create');
    const canUpdate = auth.permissions.includes('uoms.update');
    const canManageStatus = auth.permissions.includes('uoms.manage-status');

    function applyFilters(
        nextSearch: string = search,
        nextStatus: string = status,
    ) {
        router.get(
            '/admin/uoms',
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

    function toggleStatus(uom: Uom) {
        const action = uom.is_active ? 'deactivate' : 'activate';

        if (!window.confirm(`Are you sure you want to ${action} ${uom.code}?`)) {
            return;
        }

        router.patch(
            `/admin/uoms/${uom.id}/status`,
            {
                is_active: !uom.is_active,
            },
            {
                preserveScroll: true,
            },
        );
    }

    return (
        <>
            <Head title="Unit of Measure" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Unit of Measure
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage units of measure used throughout the system.
                        </p>
                    </div>

                    {canCreate && (
                        <Link
                            href="/admin/uoms/create"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            + Create UOM
                        </Link>
                    )}
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">UOM List</h2>
                            <p className="text-sm text-muted-foreground">
                                {uoms.total} total units of measure
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
                                    <th className="px-4 py-3 font-medium">Name</th>
                                    <th className="px-4 py-3 font-medium">Description</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Created</th>
                                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {uoms.data.map((uom) => (
                                    <tr key={uom.id} className="hover:bg-muted/30">
                                        <td className="whitespace-nowrap px-4 py-3 font-semibold">
                                            {uom.code}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {uom.name}
                                        </td>

                                        <td className="px-4 py-3 text-muted-foreground">
                                            {uom.description || '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            <span
                                                className={
                                                    uom.is_active
                                                        ? 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'
                                                        : 'rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700'
                                                }
                                            >
                                                {uom.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {new Date(uom.created_at).toLocaleDateString()}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                {canUpdate && (
                                                    <Link
                                                        href={`/admin/uoms/${uom.id}/edit`}
                                                        className="font-medium text-primary hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                )}

                                                {canManageStatus && (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleStatus(uom)}
                                                        className="cursor-pointer font-medium text-muted-foreground hover:text-foreground"
                                                    >
                                                        {uom.is_active ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                )}

                                                {!canUpdate && !canManageStatus && (
                                                    <span className="text-xs text-muted-foreground">
                                                        View only
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {uoms.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No units of measure found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Page {uoms.current_page} of {uoms.last_page}
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {uoms.links.map((link, index) => (
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
            title: 'Unit of Measure',
            href: '/admin/uoms',
        },
    ],
};