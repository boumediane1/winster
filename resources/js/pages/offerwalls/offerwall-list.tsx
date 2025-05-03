import Heading from '@/components/heading';
import AppLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';
import OfferwallCard from '@/pages/offerwalls/offerwall-card';
import { Plus } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Offerwalls',
        href: '/',
    },
];

export interface Offerwall {
    id: number;
    name: string;
    slug: string;
    logo?: string | null;
    sdk_key: string;
    placement: string;
    secret: string;
    reward_amount_param: string;
    user_id_param: string;
    offer_id_param: string;
}

const backgroundColor = {
    Adjoe: 'bg-indigo-50',
    Tapjoy: 'bg-red-50',
    default: 'bg-gray-50',
};

const OfferwallList = ({ offerwalls }: { offerwalls: Offerwall[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Offerwalls" />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {offerwalls.map((offerwall) => (
                        <OfferwallCard
                            key={offerwall.name}
                            id={offerwall.id}
                            title={offerwall.name}
                            type="Mobile SDK"
                            classNames={
                                backgroundColor[offerwall.name] ??
                                backgroundColor.default
                            }
                            {...(offerwall.logo
                                ? { logo: `/storage/${offerwall.logo}` }
                                : {})}
                        />
                    ))}

                    <div className="sm-h-auto h-[172px] space-y-8 overflow-hidden rounded-lg border border-dashed">
                        <Link
                            href={route('offerwall.create')}
                            className="flex h-full items-center justify-center"
                        >
                            <Plus className="size-8 text-gray-500" />
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default OfferwallList;
