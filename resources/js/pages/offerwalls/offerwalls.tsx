import Heading from '@/components/heading';
import AppLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';
import OfferwallCard from '@/pages/offerwalls/offerwall-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Offerwalls',
        href: '/',
    },
];

export interface Offerwall {
    id: number;
    name: string;
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
};

const Offerwalls = ({ offerwalls }: { offerwalls: Offerwall[] }) => {
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
                            logo={`/storage/${offerwall.logo}`}
                            classNames={backgroundColor[offerwall.name]}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Offerwalls;
