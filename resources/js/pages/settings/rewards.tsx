import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rewards',
        href: '/settings/rewards',
    },
];

const Rewards = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Settings" />

                <div className="max-w-4xl">
                    <div className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-3">
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="registration-bonus">
                                Registration bonus
                            </Label>
                            <Input
                                id="registration-bonus"
                                type="number"
                                defaultValue={1440}
                            />
                            <InputError />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="referrer-reward">
                                Referrer reward
                            </Label>
                            <Input
                                id="referrer-reward"
                                type="number"
                                defaultValue={1440}
                            />
                            <InputError />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="new-user-reward">
                                New user reward
                            </Label>
                            <Input
                                id="new-user-reward"
                                type="number"
                                defaultValue={1440}
                            />
                            <InputError />
                        </div>
                    </div>

                    <Button size="xl" className="mt-6 cursor-pointer">
                        Save changes
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
};

export default Rewards;
