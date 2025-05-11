import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/settings',
    },
];

const Security = () => {
    const { data, setData, post, processing } = useForm<{
        prevent_duplicate_accounts: boolean;
        ban_previous_account: boolean;
        require_email_verification: boolean;
    }>({
        prevent_duplicate_accounts: false,
        ban_previous_account: false,
        require_email_verification: false,
    });

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log(data);

        // You can use Inertia `post` here to send data to your backend
        // Example: post('/notification-settings')
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Security" />

                <div className="max-w-4xl">
                    <form onSubmit={onSubmit} className="w-full space-y-6">
                        <div>
                            <h3 className="mb-4 text-lg font-medium">
                                Account Restrictions
                            </h3>
                            <div className="space-y-4">
                                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <Label
                                            className="text-base"
                                            htmlFor="1"
                                        >
                                            Prevent Duplicate Accounts
                                        </Label>
                                        <p className="text-muted-foreground text-sm">
                                            Disallow more than one user account
                                            per device.
                                        </p>
                                    </div>
                                    <Switch
                                        id="1"
                                        className="cursor-pointer"
                                        checked={
                                            data.prevent_duplicate_accounts
                                        }
                                        onCheckedChange={(value) =>
                                            setData(
                                                'prevent_duplicate_accounts',
                                                value,
                                            )
                                        }
                                    />
                                </div>

                                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <Label
                                            className="text-base"
                                            htmlFor="2"
                                        >
                                            Ban Previous Account
                                        </Label>
                                        <p className="text-muted-foreground text-sm">
                                            When a new account is created on a
                                            device, automatically ban the older
                                            one.
                                        </p>
                                    </div>
                                    <Switch
                                        id="2"
                                        className="cursor-pointer"
                                        checked={data.ban_previous_account}
                                        onCheckedChange={(value) => {
                                            setData(
                                                'ban_previous_account',
                                                value,
                                            );
                                        }}
                                    />
                                </div>

                                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <Label
                                            className="text-base"
                                            htmlFor="2"
                                        >
                                            Require Email Verification
                                        </Label>
                                        <p className="text-muted-foreground text-sm">
                                            Require users to confirm their email
                                            address before completing
                                            registration.
                                        </p>
                                    </div>
                                    <Switch
                                        id="2"
                                        className="cursor-pointer"
                                        checked={
                                            data.require_email_verification
                                        }
                                        onCheckedChange={(value) => {
                                            setData(
                                                'require_email_verification',
                                                value,
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" disabled={true} size="xl">
                            Save changes
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Security;
