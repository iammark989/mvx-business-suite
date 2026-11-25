import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';

type Brand = {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
};

type Props = {
    brand: Brand;
};

export default function EditBrand({ brand }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: brand.name,
        description: brand.description ?? '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/brands/${brand.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Brand" />

            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link
                            href="/admin/brands"
                            className="transition hover:text-foreground"
                        >
                            Brands
                        </Link>
                        <span>/</span>
                        <span className="text-foreground">Edit Brand</span>
                    </div>

                    <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                        Edit Brand
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Update brand information.
                    </p>
                </div>

                <div className="max-w-3xl rounded-xl border bg-card p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Brand Name <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                                placeholder="Enter brand name"
                                required
                            />

                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                rows={4}
                                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                                placeholder="Enter brand description (optional)"
                            />

                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                            <Link
                                href="/admin/brands"
                                className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Update Brand'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}