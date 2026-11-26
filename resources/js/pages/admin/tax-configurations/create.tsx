import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type PageProps = {
    classifications: Record<string, string>;
};

export default function Create({ classifications }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        classification: 'VAT',
        name: 'VATable',
        rate: '12.0000',
        description: '',
        effective_from: '2026-01-01',
        effective_until: '',
        is_active: true,
    });

    function handleClassificationChange(value: string) {
        setData((previousData) => ({
            ...previousData,
            classification: value,
            name: classifications[value] ?? '',
        }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/admin/tax-configurations');
    }

    return (
        <>
            <Head title="Create Tax Configuration" />

            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create Tax Configuration
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Add a new tax rate configuration or effective version.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">
                                Tax Configuration Information
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Select a predefined classification and enter
                                its tax details and effective period.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="classification"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Tax Classification
                                </label>

                                <select
                                    id="classification"
                                    value={data.classification}
                                    onChange={(event) =>
                                        handleClassificationChange(
                                            event.target.value,
                                        )
                                    }
                                    required
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                >
                                    {Object.entries(classifications).map(
                                        ([code, name]) => (
                                            <option key={code} value={code}>
                                                {name}
                                            </option>
                                        ),
                                    )}
                                </select>

                                {errors.classification && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.classification}
                                    </p>
                                )}
                            </div>

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
                                    value={data.classification}
                                    readOnly
                                    className="h-10 w-full cursor-not-allowed rounded-md border bg-muted px-3 text-sm font-semibold outline-none"
                                />

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Automatically assigned based on the selected
                                    classification.
                                </p>
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
                                    Tax Rate (%)
                                </label>

                                <div className="relative">
                                    <input
                                        id="rate"
                                        type="number"
                                        value={data.rate}
                                        onChange={(event) =>
                                            setData('rate', event.target.value)
                                        }
                                        required
                                        min="0"
                                        max="100"
                                        step="0.0001"
                                        className="h-10 w-full rounded-md border bg-background px-3 pr-10 text-sm outline-none focus:border-primary"
                                        placeholder="0.0000"
                                    />
                                    <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted-foreground">
                                        %
                                    </span>
                                </div>

                                {errors.rate && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.rate}
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

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="effective_from"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Effective From
                                    </label>

                                    <input
                                        id="effective_from"
                                        type="date"
                                        value={data.effective_from}
                                        onChange={(event) =>
                                            setData(
                                                'effective_from',
                                                event.target.value,
                                            )
                                        }
                                        required
                                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                    />

                                    {errors.effective_from && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.effective_from}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="effective_until"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Effective Until
                                        <span className="ml-1 font-normal text-muted-foreground">
                                            (Optional)
                                        </span>
                                    </label>

                                    <input
                                        id="effective_until"
                                        type="date"
                                        value={data.effective_until}
                                        min={data.effective_from}
                                        onChange={(event) =>
                                            setData(
                                                'effective_until',
                                                event.target.value,
                                            )
                                        }
                                        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                    />

                                    {errors.effective_until && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.effective_until}
                                        </p>
                                    )}

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Leave blank if this version has no
                                        scheduled end date.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(event) =>
                                        setData(
                                            'is_active',
                                            event.target.checked,
                                        )
                                    }
                                    className="h-4 w-4 rounded border"
                                />

                                <label
                                    htmlFor="is_active"
                                    className="text-sm font-medium"
                                >
                                    Active
                                </label>
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
                            {processing
                                ? 'Creating...'
                                : 'Create Tax Configuration'}
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
            title: 'Tax Configuration',
            href: '/admin/tax-configurations',
        },
        {
            title: 'Create Tax Configuration',
            href: '/admin/tax-configurations/create',
        },
    ],
};