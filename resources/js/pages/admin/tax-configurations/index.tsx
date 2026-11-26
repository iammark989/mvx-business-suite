import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

type TaxConfiguration = {
    id: number;
    code: string;
    name: string;
    classification: string;
    rate: string;
    description: string | null;
    effective_from: string;
    effective_until: string | null;
    is_active: boolean;
    created_at: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    taxConfigurations: {
        data: TaxConfiguration[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        search: string;
        classification: string;
        status: string;
    };
    classifications: Record<string, string>;
    auth: {
        permissions: string[];
    };
};

export default function Index({
    taxConfigurations,
    filters,
    classifications,
}: PageProps) {
    const { auth } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters.search ?? '');
    const [classification, setClassification] = useState(
        filters.classification ?? 'all',
    );
    const [status, setStatus] = useState(filters.status ?? 'all');

    const canCreate = auth.permissions.includes('tax-configurations.create');
    const canUpdate = auth.permissions.includes('tax-configurations.update');
    const canManageStatus = auth.permissions.includes(
        'tax-configurations.manage-status',
    );

    function applyFilters(
        nextSearch: string = search,
        nextClassification: string = classification,
        nextStatus: string = status,
    ) {
        router.get(
            '/admin/tax-configurations',
            {
                search: nextSearch,
                classification:
                    nextClassification === 'all' ? '' : nextClassification,
                status: nextStatus,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    function toggleStatus(configuration: TaxConfiguration) {
        const action = configuration.is_active ? 'deactivate' : 'activate';

        if (
            !window.confirm(
                `Are you sure you want to ${action} tax configuration "${configuration.name}"?`,
            )
        ) {
            return;
        }

        router.patch(
            `/admin/tax-configurations/${configuration.id}/status`,
            {
                is_active: !configuration.is_active,
            },
            {
                preserveScroll: true,
            },
        );
    }

    function formatDate(date: string | null) {
        if (!date) return 'No end date';

        return new Date(`${date}T00:00:00`).toLocaleDateString();
    }

    function renderStatus(configuration: TaxConfiguration) {
        return (
            <span
                className={
                    configuration.is_active
                        ? 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'
                        : 'rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700'
                }
            >
                {configuration.is_active ? 'Active' : 'Inactive'}
            </span>
        );
    }

    function renderActions(configuration: TaxConfiguration) {
        return (
            <div className="flex items-center justify-end gap-3">
                {canUpdate && (
                    <Link
                        href={`/admin/tax-configurations/${configuration.id}/edit`}
                        className="font-medium text-primary hover:underline"
                    >
                        Edit
                    </Link>
                )}

                {canManageStatus && (
                    <button
                        type="button"
                        onClick={() => toggleStatus(configuration)}
                        className={
                            configuration.is_active
                                ? 'cursor-pointer font-medium text-red-600 hover:underline'
                                : 'cursor-pointer font-medium text-green-600 hover:underline'
                        }
                    >
                        {configuration.is_active ? 'Deactivate' : 'Activate'}
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
            <Head title="Tax Configurations" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Tax Configuration
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage tax classifications, rates, and effective
                            periods.
                        </p>
                    </div>

                    {canCreate && (
                        <Link
                            href="/admin/tax-configurations/create"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            + Create Tax Configuration
                        </Link>
                    )}
                </div>

                <div className="rounded-xl border bg-card">
                    <div className="flex flex-col gap-4 border-b p-4">
                        <div>
                            <h2 className="font-semibold">
                                Tax Configuration List
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {taxConfigurations.total} tax configurations
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setSearch(value);
                                    applyFilters(
                                        value,
                                        classification,
                                        status,
                                    );
                                }}
                                placeholder="Search code, name or description..."
                                className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:border-primary sm:w-72"
                            />

                            <select
                                value={classification}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setClassification(value);
                                    applyFilters(search, value, status);
                                }}
                                className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                            >
                                <option value="all">
                                    All classifications
                                </option>
                                {Object.entries(classifications).map(
                                    ([code, name]) => (
                                        <option key={code} value={code}>
                                            {name}
                                        </option>
                                    ),
                                )}
                            </select>

                            <select
                                value={status}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setStatus(value);
                                    applyFilters(
                                        search,
                                        classification,
                                        value,
                                    );
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
                                        Code
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Tax Name
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Classification
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Rate
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Effective Period
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
                                {taxConfigurations.data.map((configuration) => (
                                    <tr
                                        key={configuration.id}
                                        className="hover:bg-muted/30"
                                    >
                                        <td className="whitespace-nowrap px-4 py-3 font-semibold">
                                            {configuration.code}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 font-medium">
                                            {configuration.name}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {classifications[
                                                configuration.classification
                                            ] ?? configuration.classification}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {Number(configuration.rate).toFixed(
                                                2,
                                            )}
                                            %
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                                            {formatDate(
                                                configuration.effective_from,
                                            )}
                                            {' – '}
                                            {formatDate(
                                                configuration.effective_until,
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3">
                                            {renderStatus(configuration)}
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-right">
                                            {renderActions(configuration)}
                                        </td>
                                    </tr>
                                ))}

                                {taxConfigurations.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No tax configurations found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Page {taxConfigurations.current_page} of{' '}
                            {taxConfigurations.last_page}
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {taxConfigurations.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url ?? '#'}
                                    preserveScroll
                                    aria-current={
                                        link.active ? 'page' : undefined
                                    }
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
            title: 'Tax Configuration',
            href: '/admin/tax-configurations',
        },
    ],
};