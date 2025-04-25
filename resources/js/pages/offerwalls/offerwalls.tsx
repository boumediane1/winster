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
                        name="Adjoe"
                        type="Android SDK"
                        logo="/images/adjoe.png"
                    />

                    <OfferwallCard
                        name="Tapjoy"
                        type="Android SDK"
                        logo="/images/tapjoy.png"
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default Offerwalls;
