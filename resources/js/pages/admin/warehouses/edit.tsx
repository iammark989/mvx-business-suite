import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

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
};

type PageProps = {
    warehouse: Warehouse;
    warehouseTypes: string[];
};

export default function Edit({ warehouse, warehouseTypes }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        code: warehouse.code,
        name: warehouse.name,
        type: warehouse.type,
        description: warehouse.description ?? '',
        contact_person: warehouse.contact_person ?? '',
        contact_number: warehouse.contact_number ?? '',
        email: warehouse.email ?? '',
        address: warehouse.address ?? '',
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        put(`/admin/warehouses/${warehouse.id}`);
    }

    return (
        <>
            <Head title="Edit Warehouse" />

            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Edit Warehouse
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Update warehouse information and contact details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">
                                Warehouse Information
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Update the warehouse details below.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="code"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Warehouse Code
                                </label>

                                <input
                                    id="code"
                                    type="text"
                                    value={data.code}
                                    onChange={(event) =>
                                        setData(
                                            'code',
                                            event.target.value
                                                .toUpperCase()
                                                .replace(/[^A-Z0-9]/g, '')
                                                .slice(0, 20),
                                        )
                                    }
                                    required
                                    maxLength={20}
                                    autoComplete="off"
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm uppercase outline-none focus:border-primary"
                                />

                                {errors.code && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.code}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Warehouse Name
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
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="type"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Warehouse Type
                                </label>

                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(event) =>
                                        setData('type', event.target.value)
                                    }
                                    required
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                >
                                    <option value="">Select warehouse type</option>
                                    {warehouseTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>

                                {errors.type && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.type}
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
                                    rows={3}
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                                />

                                {errors.description && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="contact_person"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Contact Person
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>

                                <input
                                    id="contact_person"
                                    type="text"
                                    value={data.contact_person}
                                    onChange={(event) =>
                                        setData('contact_person', event.target.value)
                                    }
                                    maxLength={100}
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                />

                                {errors.contact_person && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.contact_person}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="contact_number"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Contact Number
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>

                                <input
                                    id="contact_number"
                                    type="text"
                                    value={data.contact_number}
                                    onChange={(event) =>
                                        setData('contact_number', event.target.value)
                                    }
                                    maxLength={30}
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                />

                                {errors.contact_number && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.contact_number}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Email Address
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(event) =>
                                        setData('email', event.target.value)
                                    }
                                    maxLength={150}
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="address"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Address
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>

                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(event) =>
                                        setData('address', event.target.value)
                                    }
                                    rows={3}
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                                />

                                {errors.address && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.address}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/admin/warehouses"
                            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Warehouse'}
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
            title: 'Warehouses',
            href: '/admin/warehouses',
        },
        {
            title: 'Edit Warehouse',
            href: `/admin/warehouses/${window.location.pathname.split('/')[3]}/edit`,
        },
    ],
};