import AppLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';
import Heading from '@/components/heading';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Calendar, Send, Smartphone, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { columns, Payout } from '@/pages/user-details/columns';
import { DataTable } from '@/components/data-table';
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { DataTablePagination } from '@/components/data-table-pagination';
import UserSummaryCard from '@/pages/user-details/user-summary-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adjoe',
        href: '/',
    },
];

const UserDetails = () => {
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: payouts,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 7,
            },
        },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="User details" />

                <div className="grid grid-cols-12 gap-4">
                    <div className="order-last col-span-full lg:order-first xl:col-span-6 2xl:col-span-8">
                        <Tabs defaultValue="withdrawals">
                            <TabsList>
                                <TabsTrigger
                                    value="withdrawals"
                                    className="cursor-pointer"
                                >
                                    Withdrawals
                                </TabsTrigger>

                                <TabsTrigger
                                    value="activity"
                                    className="cursor-pointer"
                                >
                                    Activity
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="withdrawals">
                                <DataTable table={table} />

                                <div className="flex items-center justify-end space-x-2 py-4">
                                    <DataTablePagination table={table} />
                                </div>
                            </TabsContent>

                            <TabsContent value="activity">activity</TabsContent>
                        </Tabs>
                    </div>

                    <div className="col-span-full lg:mt-[44px] xl:col-span-6 2xl:col-span-4">
                        <UserSummaryCard />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default UserDetails;

const payouts: Payout[] = [
    {
        method: 'Paypal',
        coinAmount: '2500',
        status: 'completed',
        date: '2025-04-10T09:15:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '3200',
        status: 'pending',
        date: '2025-04-20T13:42:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '4100',
        status: 'rejected',
        date: '2025-03-30T17:05:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '1000',
        status: 'completed',
        date: '2025-04-27T11:22:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '1800',
        status: 'completed',
        date: '2025-04-01T10:00:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '2900',
        status: 'pending',
        date: '2025-04-02T14:30:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '3500',
        status: 'completed',
        date: '2025-03-25T08:45:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '4000',
        status: 'rejected',
        date: '2025-03-28T16:10:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '1200',
        status: 'completed',
        date: '2025-04-15T09:55:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '2700',
        status: 'pending',
        date: '2025-04-18T12:40:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '3300',
        status: 'completed',
        date: '2025-04-19T13:00:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '1500',
        status: 'rejected',
        date: '2025-04-03T11:35:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '3700',
        status: 'completed',
        date: '2025-04-05T15:15:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '2000',
        status: 'pending',
        date: '2025-04-07T10:10:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '4500',
        status: 'rejected',
        date: '2025-03-22T09:20:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '500',
        status: 'completed',
        date: '2025-04-08T08:00:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '3100',
        status: 'pending',
        date: '2025-04-09T13:50:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '2800',
        status: 'rejected',
        date: '2025-04-11T17:25:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '3400',
        status: 'completed',
        date: '2025-04-13T14:30:00Z',
    },
    {
        method: 'Paypal',
        coinAmount: '3900',
        status: 'pending',
        date: '2025-04-26T10:20:00Z',
    },
];
