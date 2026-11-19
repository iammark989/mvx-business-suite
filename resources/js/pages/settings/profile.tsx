import { Form, Head, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Profile() {
    const { auth } = usePage<PageProps>().props;
    const fileInput = useRef<HTMLInputElement>(null);

    const initials = auth.user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Profile"
                    description="Manage your profile photo and account information."
                />

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <Avatar className="size-24">
                        <AvatarImage
                            src={auth.user.profile_photo_url ?? undefined}
                            alt={auth.user.name}
                        />
                        <AvatarFallback className="text-xl">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                        <p className="font-medium">{auth.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {auth.user.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Your name and email address are managed by your administrator.
                        </p>
                    </div>
                </div>

                <Form
                    action="/settings/profile"
                    method="post"
                    encType="multipart/form-data"
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnSuccess
                    className="max-w-xl space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="profile_photo">
                                    Profile photo
                                </Label>

                                <input
                                    ref={fileInput}
                                    id="profile_photo"
                                    type="file"
                                    name="profile_photo"
                                    accept="image/png,image/jpeg,image/webp"
                                    required
                                    className="block w-full cursor-pointer rounded-md border border-input bg-background text-sm file:mr-4 file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium"
                                />

                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG, or WEBP. Maximum file size: 2 MB.
                                </p>

                                <InputError message={errors.profile_photo} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Uploading...' : 'Save photo'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};