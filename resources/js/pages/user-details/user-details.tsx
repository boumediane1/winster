import AppLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';
import Heading from '@/components/heading';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { columns } from '@/pages/user-details/columns';
import { DataTable } from '@/components/data-table';
import {
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { DataTablePagination } from '@/components/data-table-pagination';
import UserSummaryCard from '@/pages/user-details/user-summary-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePage } from '@inertiajs/react';
import { Withdrawal } from '../withdrawals/withdrawal-list';
import { AppUser } from '@/pages/registered-users/columns';

export interface Transaction {
    source: string;
    coin_amount: number;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adjoe',
        href: '/',
    },
];

const UserDetails = () => {
    const { withdrawals, transactions, user } = usePage<{
        withdrawals: Withdrawal[];
        transactions: Transaction[];
        user: AppUser;
    }>().props;

    const withdrawalsTable = useReactTable({
        data: withdrawals,
        columns: columns.withdrawals,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 7,
            },
        },
    });

    const transactionsTable = useReactTable({
        data: transactions,
        columns: columns.transactions,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
                        <Tabs defaultValue="withdrawals" className="gap-y-4">
                            <TabsList className="h-10 w-96">
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
                                    Activity history
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="withdrawals">
                                <DataTable table={withdrawalsTable} />

                                <div className="flex items-center justify-end space-x-2 py-4">
                                    <DataTablePagination
                                        table={withdrawalsTable}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="activity">
                                <DataTable table={transactionsTable} />

                                <div className="flex items-center justify-end space-x-2 py-4">
                                    <DataTablePagination
                                        table={transactionsTable}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="col-span-full lg:mt-[55px] xl:col-span-6 2xl:col-span-4">
                        <UserSummaryCard />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default UserDetails;
