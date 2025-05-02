import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Offerwall } from '@/pages/offerwalls/offerwalls';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adjoe',
        href: '/',
    },
];

export type OfferwallFrom = {
    network_name: string;
    logo?: File;
    sdk_key: string;
    placement: string;
    url_secret: string;
    reward_amount_param: string;
    user_id_param: string;
    offer_id_param: string;
};

const OfferwallItem = ({ offerwall }: { offerwall: Offerwall }) => {
    const { data, setData, post, processing, errors } = useForm<OfferwallFrom>({
        network_name: offerwall.network_name,
        logo: null,
        sdk_key: offerwall.sdk_key,
        placement: offerwall.placement,
        url_secret: offerwall.url_secret,
        reward_amount_param: offerwall.reward_amount_param,
        user_id_param: offerwall.user_id_param,
        offer_id_param: offerwall.offer_id_param,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post(route('offerwall.update', { offerwall: offerwall.id }), {
            _method: 'put',
            ...data,
        });
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

                                <div className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="network-name">
                                            Network name
                                        </Label>
                                        <Input
                                            id="network-name"
                                            value={data.network_name}
                                            onChange={(e) =>
                                                setData(
                                                    'network_name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
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
                                    </div>

                                    <div className="grid gap-2">
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
                                    </div>

                                    <div className="grid gap-2">
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
                                    </div>
                                </div>
                            </div>

                            <div className="border-b pb-12">
                                <h3 className="text-base/7 font-medium text-gray-900">
                                    Postback setup
                                </h3>

                                <div className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="url_secret">
                                            URL secret
                                        </Label>
                                        <Input
                                            id="url_secret"
                                            placeholder="payout"
                                            value={data.url_secret}
                                            onChange={(e) =>
                                                setData(
                                                    'url_secret',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
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
                                    </div>

                                    <div className="grid gap-2">
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
                                    </div>

                                    <div className="grid gap-2">
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
