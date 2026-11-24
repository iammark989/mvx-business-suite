import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        contact_person: '',
        contact_number: '',
        email: '',
        tin_number: '',
        address: '',
        remarks: '',
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post('/admin/suppliers');
    }

    return (
        <>
            <Head title="Create Supplier" />

            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create Supplier
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Add a new supplier to your master list.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">
                                Supplier Information
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Enter the supplier details and contact information below.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="code"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Supplier Code
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
                                                .slice(0, 7),
                                        )
                                    }
                                    required
                                    minLength={6}
                                    maxLength={7}
                                    autoComplete="off"
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm uppercase outline-none focus:border-primary"
                                    placeholder="e.g. SUP001"
                                />

                                {errors.code && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.code}
                                    </p>
                                )}

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Enter a unique 6–7 character code using letters
                                    and numbers only, with at least one letter and
                                    one number.
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Supplier Name
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
                                    placeholder="Enter supplier name"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.name}
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
                                    placeholder="Enter contact person"
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
                                    placeholder="Enter contact number"
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
                                    placeholder="Enter email address"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="tin_number"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    TIN Number
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>

                                <input
                                    id="tin_number"
                                    type="text"
                                    value={data.tin_number}
                                    onChange={(event) =>
                                        setData('tin_number', event.target.value)
                                    }
                                    maxLength={30}
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                    placeholder="Enter TIN number"
                                />

                                {errors.tin_number && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.tin_number}
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
                                    placeholder="Enter complete supplier address..."
                                />

                                {errors.address && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="remarks"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Remarks
                                    <span className="ml-1 font-normal text-muted-foreground">
                                        (Optional)
                                    </span>
                                </label>

                                <textarea
                                    id="remarks"
                                    value={data.remarks}
                                    onChange={(event) =>
                                        setData('remarks', event.target.value)
                                    }
                                    rows={3}
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                                    placeholder="Enter additional notes or remarks..."
                                />

                                {errors.remarks && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.remarks}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/admin/suppliers"
                            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Supplier'}
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
            title: 'Suppliers',
            href: '/admin/suppliers',
        },
        {
            title: 'Create Supplier',
            href: '/admin/suppliers/create',
        },
    ],
};