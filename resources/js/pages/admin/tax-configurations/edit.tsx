import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

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
};

type PageProps = {
    taxConfiguration: TaxConfiguration;
    classifications: Record<string, string>;
};

export default function Edit({
    taxConfiguration,
    classifications,
}: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: taxConfiguration.name,
        description: taxConfiguration.description ?? '',
    });

    function formatDate(date: string | null) {
        if (!date) return 'No end date';

        return new Date(`${date}T00:00:00`).toLocaleDateString();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        put(`/admin/tax-configurations/${taxConfiguration.id}`);
    }

    return (
        <>
            <Head title="Edit Tax Configuration" />

            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Edit Tax Configuration
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Update the tax configuration details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">
                                Tax Configuration Information
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Only the tax name and description can be
                                modified for an existing version.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="code"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Tax Code
                                </label>

                                <input
                                    id="code"
                                    type="text"
                                    value={taxConfiguration.code}
                                    readOnly
                                    className="h-10 w-full cursor-not-allowed rounded-md border bg-muted px-3 text-sm font-semibold outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="classification"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Tax Classification
                                </label>

                                <input
                                    id="classification"
                                    type="text"
                                    value={
                                        classifications[
                                            taxConfiguration.classification
                                        ] ?? taxConfiguration.classification
                                    }
                                    readOnly
                                    className="h-10 w-full cursor-not-allowed rounded-md border bg-muted px-3 text-sm outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Tax Name
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
                                    autoComplete="off"
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                    placeholder="Enter tax name..."
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="rate"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Tax Rate
                                </label>

                                <div className="relative">
                                    <input
                                        id="rate"
                                        type="text"
                                        value={`${Number(taxConfiguration.rate).toFixed(4)}%`}
                                        readOnly
                                        className="h-10 w-full cursor-not-allowed rounded-md border bg-muted px-3 pr-10 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="effective_period"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Effective Period
                                </label>

                                <div
                                    id="effective_period"
                                    className="rounded-md border bg-muted/50 px-3 py-3 text-sm"
                                >
                                    <p>
                                        <span className="font-medium">
                                            From:
                                        </span>{' '}
                                        {formatDate(
                                            taxConfiguration.effective_from,
                                        )}
                                    </p>
                                    <p className="mt-1">
                                        <span className="font-medium">
                                            Until:
                                        </span>{' '}
                                        {formatDate(
                                            taxConfiguration.effective_until,
                                        )}
                                    </p>
                                </div>
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
                                        setData(
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    rows={4}
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                                    placeholder="Enter tax configuration description..."
                                />

                                {errors.description && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="rounded-md bg-muted/50 p-3">
                                <p className="text-sm text-muted-foreground">
                                    Current status:{' '}
                                    <span className="font-medium text-foreground">
                                        {taxConfiguration.is_active
                                            ? 'Active'
                                            : 'Inactive'}
                                    </span>
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Tax rate, classification, effective dates,
                                    and status cannot be changed here. Use the
                                    Tax Configuration List to manage status.
                                    Create a new version to change a tax rate
                                    or effective period.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/admin/tax-configurations"
                            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Tax Configuration',
            href: '/admin/tax-configurations',
        },
        {
            title: 'Edit Tax Configuration',
            href: '#',
        },
    ],
};