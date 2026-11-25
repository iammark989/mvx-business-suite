import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Warehouse = {
    id: number;
    code: string;
    name: string;
    type: string;
};

type Warehouseman = {
    id: number;
    name: string;
    email: string;
};

type PageProps = {
    warehouse: Warehouse;
    warehousemen: Warehouseman[];
    assignedUserIds: number[];
};

export default function Users({
    warehouse,
    warehousemen,
    assignedUserIds,
}: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        user_ids: assignedUserIds,
    });

    function toggleUser(userId: number, checked: boolean) {
        setData(
            'user_ids',
            checked
                ? [...data.user_ids, userId]
                : data.user_ids.filter((id) => id !== userId),
        );
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        put(`/admin/warehouses/${warehouse.id}/users`, {
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Assign Warehouse Users" />

            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Assign Warehouse Users
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Assign Warehouseman accounts to this warehouse.
                    </p>
                </div>

                <div className="max-w-3xl space-y-6">
                    <div className="rounded-xl border bg-card p-6">
                        <h2 className="mb-4 font-semibold">
                            Warehouse Information
                        </h2>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Warehouse Code
                                </p>
                                <p className="mt-1 font-medium">
                                    {warehouse.code}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Warehouse Name
                                </p>
                                <p className="mt-1 font-medium">
                                    {warehouse.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Warehouse Type
                                </p>
                                <p className="mt-1 font-medium">
                                    {warehouse.type}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Assigned Warehousemen
                                </p>
                                <p className="mt-1 font-medium">
                                    {data.user_ids.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="rounded-xl border bg-card p-6">
                            <div className="mb-5">
                                <h2 className="font-semibold">
                                    Warehouseman Assignments
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Select the active Warehouseman accounts
                                    allowed to access this warehouse.
                                </p>
                            </div>

                            {warehousemen.length > 0 ? (
                                <div className="divide-y rounded-lg border">
                                    {warehousemen.map((user) => {
                                        const checked = data.user_ids.includes(
                                            user.id,
                                        );

                                        return (
                                            <label
                                                key={user.id}
                                                className="flex cursor-pointer items-center gap-3 p-4 hover:bg-muted/30"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={(event) =>
                                                        toggleUser(
                                                            user.id,
                                                            event.target.checked,
                                                        )
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                />

                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {user.email}
                                                    </p>
                                                </div>

                                                {checked && (
                                                    <span className="ml-auto rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                                                        Assigned
                                                    </span>
                                                )}
                                            </label>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed px-4 py-10 text-center">
                                    <p className="text-sm font-medium">
                                        No active Warehouseman accounts found.
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Create or activate a Warehouseman
                                        account before assigning users.
                                    </p>
                                </div>
                            )}

                            {errors.user_ids && (
                                <p className="mt-2 text-sm text-destructive">
                                    {errors.user_ids}
                                </p>
                            )}

                            {Object.entries(errors)
                                .filter(([key]) => key.startsWith('user_ids.'))
                                .map(([key, message]) => (
                                    <p
                                        key={key}
                                        className="mt-2 text-sm text-destructive"
                                    >
                                        {message}
                                    </p>
                                ))}

                            <p className="mt-4 text-xs text-muted-foreground">
                                Users who are not assigned to this warehouse
                                will not have access to it in warehouse-specific
                                operations.
                            </p>
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
                                {processing
                                    ? 'Saving...'
                                    : 'Save Assignments'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Users.layout = {
    breadcrumbs: [
        {
            title: 'Warehouses',
            href: '/admin/warehouses',
        },
        {
            title: 'Assign Users',
            href: `/admin/warehouses/${window.location.pathname.split('/')[3]}/users`,
        },
    ],
};