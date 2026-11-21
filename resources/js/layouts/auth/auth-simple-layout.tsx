import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    {/* MVX Branding */}
                    <div className="flex flex-col items-center gap-5">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-3"
                        >
                            <div className="flex size-14 items-center justify-center rounded-xl bg-sky-600 shadow-sm">
                                <span className="text-xl font-bold tracking-tight text-white">
                                    MVX
                                </span>
                            </div>

                            <div className="space-y-1 text-center">
                                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    MVX Business Suite
                                </h2>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                                    Magna Vertex Technologies
                                </p>
                            </div>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {title}
                            </h1>

                            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Authentication Form */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        {children}
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                        Secure account access · MVX Business Suite
                    </p>
                </div>
            </div>
        </div>
    );
}