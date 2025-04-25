import AppLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
];

const Dashboard = () => {
    return <AppLayout breadcrumbs={breadcrumbs}></AppLayout>;
};

export default Dashboard;
