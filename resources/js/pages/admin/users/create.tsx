import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type Role = {
    id: number;
    name: string;
};

type PageProps = {
    roles: Role[];
};

export default function Create({ roles }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_active: true,
        role: '',
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post('/admin/users');
    }

    return (
        <>
            <Head title="Create User" />

            <div className="space-y-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create User
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Create a new user account and assign the appropriate role.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">Account Information</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Enter the user's basic account details.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(event) =>
                                        setData('name', event.target.value)
                                    }
                                    required
                                    autoComplete="name"
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                    placeholder="Enter full name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(event) =>
                                        setData('email', event.target.value)
                                    }
                                    required
                                    autoComplete="email"
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                    placeholder="Enter email address"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">Password</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Set the initial password for this account.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(event) =>
                                        setData('password', event.target.value)
                                    }
                                    required
                                    autoComplete="new-password"
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                    placeholder="Enter password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(event) =>
                                        setData(
                                            'password_confirmation',
                                            event.target.value,
                                        )
                                    }
                                    required
                                    autoComplete="new-password"
                                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                                    placeholder="Confirm password"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-6">
                            <h2 className="font-semibold">Role Assignment</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Select one role for this user account.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="role"
                                className="mb-2 block text-sm font-medium"
                            >
                                User Role
                            </label>

                            <select
                                id="role"
                                value={data.role}
                                onChange={(event) => setData('role', event.target.value)}
                                required
                                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                            >
                                <option value="">Select a role</option>

                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>

                            {errors.role && (
                                <p className="mt-1 text-sm text-destructive">
                                    {errors.role}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-6">
                        <h2 className="font-semibold">Account Status</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Choose whether the account can log in after creation.
                        </p>

                        <label className="mt-4 flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(event) =>
                                    setData('is_active', event.target.checked)
                                }
                                className="size-4 rounded border-input accent-primary"
                            />
                            <span className="text-sm font-medium">
                                Active account
                            </span>
                        </label>
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/admin/users"
                            className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create User'}
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
            title: 'User Management',
            href: '/admin/users',
        },
        {
            title: 'Create User',
            href: '/admin/users/create',
        },
    ],
};