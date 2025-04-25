import AppLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Offerwalls',
        href: '/',
    },
];

const Offerwalls = () => {
    return <AppLayout breadcrumbs={breadcrumbs}>Offerwalls</AppLayout>;
};

export default Offerwalls;
