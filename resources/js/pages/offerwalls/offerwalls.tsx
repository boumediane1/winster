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

const Offerwalls = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Offerwalls" />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <OfferwallCard
                        title="Adjoe"
                        type="Mobile SDK"
                        logo="/images/adjoe.png"
                        classNames="bg-indigo-50"
                    />

                    <OfferwallCard
                        title="Tapjoy"
                        type="Mobile SDK"
                        logo="/images/tapjoy.png"
                        classNames="bg-red-50"
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default Offerwalls;
