import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

interface Settings {
    registration_bonus: number;
    referrer_reward: number;
    new_user_reward: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rewards',
        href: '/settings/rewards',
    },
];

const Rewards = () => {
    const { settings } = usePage<{
        settings: Settings;
    }>().props;

    console.log(settings);

    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            registration_bonus: settings.registration_bonus,
            referrer_reward: settings.referrer_reward,
            new_user_reward: settings.new_user_reward,
        });

    const handleSubmit = () => {
        put(route('settings.rewards.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Settings" />

                <div className="max-w-4xl space-y-6">
                    <div className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-3">
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="registration-bonus">
                                Registration bonus
                            </Label>
                            <Input
                                id="registration-bonus"
                                type="number"
                                value={data.registration_bonus}
                                onChange={(e) =>
                                    setData(
                                        'registration_bonus',
                                        Number(e.target.value),
                                    )
                                }
                            />
                            <InputError message={errors.registration_bonus} />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="referrer-reward">
                                Referrer reward
                            </Label>
                            <Input
                                id="referrer-reward"
                                type="number"
                                value={data.referrer_reward}
                                onChange={(e) =>
                                    setData(
                                        'referrer_reward',
                                        Number(e.target.value),
                                    )
                                }
                            />
                            <InputError message={errors.referrer_reward} />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="new-user-reward">
                                New user reward
                            </Label>
                            <Input
                                id="new-user-reward"
                                type="number"
                                value={data.new_user_reward}
                                onChange={(e) =>
                                    setData(
                                        'new_user_reward',
                                        Number(e.target.value),
                                    )
                                }
                            />
                            <InputError message={errors.new_user_reward} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            size="xl"
                            className="cursor-pointer"
                            disabled={processing}
                            onClick={handleSubmit}
                        >
                            Save changes
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Rewards;
