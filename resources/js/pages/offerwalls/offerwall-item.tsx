import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { Offerwall } from '@/pages/offerwalls/offerwalls';
import { FormEvent } from 'react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adjoe',
        href: '/',
    },
];

export type OfferwallFrom = {
    name: string;
    slug: string;
    logo?: File;
    sdk_key: string;
    placement: string;
    secret: string;
    reward_amount_param: string;
    user_id_param: string;
    offer_id_param: string;
};

const OfferwallItem = () => {
    const { props } = usePage<{ offerwall: Offerwall }>();
    const { offerwall, errors } = props;
    console.log(offerwall);
    console.log(errors);

    const { data, setData } = useForm<OfferwallFrom>({
        name: offerwall.name,
        slug: offerwall.slug,
        logo: null,
        sdk_key: offerwall.sdk_key,
        placement: offerwall.placement,
        secret: offerwall.secret,
        reward_amount_param: offerwall.reward_amount_param,
        user_id_param: offerwall.user_id_param,
        offer_id_param: offerwall.offer_id_param,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post(
            route('offerwall.update', { offerwall: offerwall.id }),
            {
                _method: 'put',
                ...data,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Adjoe" />

                <div className="max-w-4xl">
                    <form onSubmit={submit}>
                        <div className="space-y-12">
                            <div className="border-b pb-12">
                                <h3 className="text-base/7 font-medium text-gray-900">
                                    Offerwall
                                </h3>

                                <div className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-3">
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="network-name">
                                            Name
                                        </Label>
                                        <Input
                                            id="network-name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) =>
                                                setData('slug', e.target.value)
                                            }
                                        />
                                        <InputError message={errors.slug} />
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="logo">Logo</Label>
                                        <Input
                                            type="file"
                                            id="logo"
                                            onChange={(e) =>
                                                setData(
                                                    'logo',
                                                    e.target.files[0],
                                                )
                                            }
                                        />
                                        <InputError message={errors.logo} />
                                    </div>
                                </div>

                                <div className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-2">
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="sdk">SDK key</Label>
                                        <Input
                                            id="sdk"
                                            value={data.sdk_key}
                                            onChange={(e) =>
                                                setData(
                                                    'sdk_key',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError message={errors.sdk_key} />
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="placement">
                                            Placement
                                        </Label>
                                        <Input
                                            id="placement"
                                            value={data.placement}
                                            onChange={(e) =>
                                                setData(
                                                    'placement',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.placement}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-b pb-12">
                                <h3 className="text-base/7 font-medium text-gray-900">
                                    Postback setup
                                </h3>

                                <div className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-3">
                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="secret">
                                            URL secret
                                        </Label>
                                        <Input
                                            id="secret"
                                            placeholder="payout"
                                            value={data.secret}
                                            onChange={(e) =>
                                                setData(
                                                    'secret',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError message={errors.secret} />
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="reward-amount">
                                            Reward amount
                                        </Label>
                                        <Input
                                            id="reward-amount"
                                            placeholder="coin_amount"
                                            value={data.reward_amount_param}
                                            onChange={(e) =>
                                                setData(
                                                    'reward_amount_param',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.reward_amount_param}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="user-id">User ID</Label>
                                        <Input
                                            id="user-id"
                                            placeholder="user_uuid"
                                            value={data.user_id_param}
                                            onChange={(e) =>
                                                setData(
                                                    'user_id_param',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.user_id_param}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <Label htmlFor="offer-id">
                                            Offer ID
                                        </Label>
                                        <Input
                                            id="offer-id"
                                            placeholder="trans_uuid"
                                            value={data.offer_id_param}
                                            onChange={(e) =>
                                                setData(
                                                    'offer_id_param',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.offer_id_param}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button size="xl" className="mt-6 cursor-pointer">
                            Save changes
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default OfferwallItem;
