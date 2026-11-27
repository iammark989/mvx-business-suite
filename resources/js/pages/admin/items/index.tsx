import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

type Item = {
    id: number;
    item_number: string;
    description: string;
    short_description: string | null;
    category: {
        id: number;
        name: string;
    };
    brand: {
        id: number;
        name: string;
    } | null;
    purchase_uom: {
        id: number;
        code: string;
        name: string;
    };
    selling_uom: {
        id: number;
        code: string;
        name: string;
    };
    purchase_conversion_qty: string;
    is_active: boolean;
    created_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    items: {
        data: Item[];
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

export default function Index({ items, filters }: PageProps) {
    const { auth } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? 'all');

    const canCreate = auth.permissions.includes('items.create');
    const canUpdate = auth.permissions.includes('items.update');
    const canManageStatus = auth.permissions.includes('items.manage-status');

    function applyFilters(
        nextSearch: string = search,
        nextStatus: string = status,
    ) {
        router.get(
            '/admin/items',
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

    function toggleStatus(item: Item) {
        const action = item.is_active ? 'deactivate' : 'activate';

        if (
            !window.confirm(
                `Are you sure you want to ${action} item "${item.item_number} - ${item.description}"?`,
            )
        ) {
            return;
        }

        router.patch(
            `/admin/items/${item.id}/status`,
            {},
            {
                preserveScroll: true,
            },
        );
    }

    function renderStatus(item: Item) {
        return (
            <span
                className={
                    item.is_active
                        ? 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'
                        : 'rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700'
                }
            >
                {item.is_active ? 'Active' : 'Inactive'}
            </span>
        );
    }

    function renderActions(item: Item) {
        return (
            <div className="flex items-center justify-end gap-3">
                {canUpdate && (
                    <Link
                        href={`/admin/items/${item.id}/edit`}
                        className="font-medium text-primary hover:underline"
                    >
                        Edit
                    </Link>
                )}

                {canManageStatus && (
                    <button
                        type="button"
                        onClick={() => toggleStatus(item)}
                        className={
                            item.is_active
                                ? 'cursor-pointer font-medium text-red-600 hover:underline'
                                : 'cursor-pointer font-medium text-green-600 hover:underline'
                        }
                    >
                        {item.is_active ? 'Deactivate' : 'Activate'}
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
            <Head title="Items" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Item Master
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage item information, units of measure, and item details.
                        </p>
                    </div>

                    {canCreate && (
                        <Link
                            href="/admin/items/create"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            + Create Item
                        </Link>
                    )}
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold">Item List</h2>
                            <p className="text-sm text-muted-foreground">
                                {items.total} items
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
                                placeholder="Search item number or description..."
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
                                    <th className="px-4 py-3 font-medium">
                                        Item Number
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Item Description
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Category
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Brand
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Purchase UOM
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Selling UOM
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {items.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-muted/30"
                                    >
                                        <td className="whitespace-nowrap px-4 py-3 font-semibold">
                                            {item.item_number}
                                        </td>

                                        <td className="min-w-56 px-4 py-3">
                                            <div className="font-medium">
                                                {item.description}
                                            </div>
                                            {item.short_description && (
                                                <div className="mt-0.5 text-xs text-muted-foreground">
                                                    {item.short_description}
                                                </div>
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {item.category?.name ?? '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {item.brand?.name ?? '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {item.purchase_uom?.code ?? '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {item.selling_uom?.code ?? '—'}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {renderStatus(item)}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-right">
                                            {renderActions(item)}
                                        </td>
                                    </tr>
                                ))}

                                {items.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No items found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Page {items.current_page} of {items.last_page}
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {items.links.map((link, index) => (
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
                                        {link.label.replace(
                                            /&laquo;|&raquo;/g,
                                            (value) =>
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
            title: 'Items',
            href: '/admin/items',
        },
    ],
};