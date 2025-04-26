import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Offerwall = (title: string) => {
    return (
        <AppLayout>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Tapjoy" />

                <div className="max-w-4xl">
                    <form>
                        <div className="space-y-12">
                            <div className="border-b pb-12">
                                <h3 className="text-base/7 font-medium text-gray-900">
                                    Profile
                                </h3>

                                <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">
                                            Network name
                                        </Label>
                                        <Input id="name" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="logo">
                                            Network logo
                                        </Label>
                                        <Input type="file" id="logo" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="sdk">SDK key</Label>
                                        <Input id="sdk" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="placement">
                                            Placement
                                        </Label>
                                        <Input id="placement" />
                                    </div>
                                </div>
                            </div>

                            <div className="border-b pb-12">
                                <h3 className="text-base/7 font-medium text-gray-900">
                                    Postback setup
                                </h3>

                                <div className="mt-10 grid grid-cols-3 gap-x-4 gap-y-8">
                                    <div className="grid gap-2">
                                        <Label htmlFor="reward-amount">
                                            Reward amount
                                        </Label>
                                        <Input
                                            id="reward-amount"
                                            placeholder="coin_amount"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="user-id">User id</Label>
                                        <Input
                                            id="user-id"
                                            placeholder="user_uuid"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="sdk">Offer id</Label>
                                        <Input
                                            id="sdk"
                                            placeholder="trans_uuid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button className="mt-6">Save changes</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Offerwall;
