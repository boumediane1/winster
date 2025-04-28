import AppLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';
import StatCard from '@/pages/users/stat-card';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import Heading from '@/components/heading';
import LatestLeads from '@/pages/dashboard/latest-leads';
import { Chart } from 'react-google-charts';
import {
    BanknoteIcon,
    ChartColumnIcon,
    CheckCheckIcon,
    CircleDollarSignIcon,
} from 'lucide-react';

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
                <Heading title="Overview" />

                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <StatCard
                            title="New users"
                            icon={<UsersIcon className="size-6" />}
                            value="+130"
                            change="Last 30 days"
                        />

                        <StatCard
                            title="Leads"
                            icon={<CheckCheckIcon className="size-6" />}
                            value={0}
                            change="Last 30 days"
                        />

                        <StatCard
                            title="Earnings"
                            icon={<CircleDollarSignIcon className="size-6" />}
                            value="$123"
                            change="Last 30 days"
                        />

                        <StatCard
                            title="Withdrawn"
                            icon={<BanknoteIcon className="size-6" />}
                            value="$50"
                            change="Last 30 days"
                        />
                    </div>

                    <div className="mt-8 grid grid-cols-12 gap-8">
                        <div className="col-span-full xl:col-span-7">
                            <LatestLeads />
                        </div>

                        <div className="col-span-full xl:col-span-5">
                            <div className="overflow-hidden rounded-xl border shadow">
                                <div className="flex flex-col space-y-1.5 p-6">
                                    <div className="leading-none font-semibold tracking-tight">
                                        Top Countries
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                        User distribution by country
                                    </div>
                                </div>

                                <div className="p-6 pt-0">
                                    <Chart
                                        chartVersion={51}
                                        chartType="GeoChart"
                                        data={data}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;

export const data = [
    ['Country', 'Popularity'],
    ['Germany', 200],
    ['United States', 300],
    ['Brazil', 400],
    ['Canada', 500],
    ['France', 600],
    ['RU', 700],
];
