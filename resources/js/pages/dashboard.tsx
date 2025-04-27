import AppLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';
import { UserIcon, UsersIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
];

const Dashboard = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <div className="grid grid-cols-4">
                    <div className="bg-card text-card-foreground rounded-xl border shadow">
                        <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                            <div className="text-sm font-medium tracking-tight">
                                New users
                            </div>
                            <UsersIcon className="size-6" />
                        </div>
                        <div className="p-6 pt-0">
                            <div className="text-2xl font-bold">+130</div>
                            <p className="text-muted-foreground text-xs">
                                +20.1% from last month
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
