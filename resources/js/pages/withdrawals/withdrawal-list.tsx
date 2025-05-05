import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { DataTable } from '@/components/data-table';
import { BreadcrumbItem, Page } from '@/types';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';
import { DataTablePagination } from '@/components/data-table-pagination';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { AppUser } from '../registered-users/columns';
import { columns } from '@/pages/withdrawals/columns';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Withdrawals',
        href: '/',
    },
];

export interface Withdrawal {
    id: number;
    app_user: AppUser;
    payment_method: string;
    coins: string;
    status: string;
    created_at: string;
}

const WithdrawalList = () => {
    const { withdrawals } = usePage<{ withdrawals: Page<Withdrawal> }>().props;

    const [pagination, setPagination] = useState({
        pageIndex: withdrawals.current_page - 1,
        pageSize: withdrawals.per_page,
    });

    const params = new URLSearchParams(window.location.search);
    const status = params.get('status') ?? '';

    const table = useReactTable({
        data: withdrawals.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: withdrawals.total,
        onPaginationChange: (updater) => {
            if (typeof updater !== 'function') return;

            const newPagination = updater(pagination);
            setPagination(newPagination);

            router.get(
                route('withdrawals.index', {
                    page: newPagination.pageIndex + 1,
                    status,
                }),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['withdrawals'],
                },
            );
        },
        state: {
            pagination,
            columnVisibility: {
                select: status === 'pending',
            },
        },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Withdrawals" />

                <div className="mb-4">
                    <Select
                        defaultValue="pending"
                        value={
                            table.getColumn('status').getFilterValue() as string
                        }
                        onValueChange={(status) => {
                            router.visit(
                                route('withdrawals.index', { status }),
                                {
                                    preserveState: true,
                                    preserveScroll: true,
                                    only: ['withdrawals'],
                                },
                            );
                        }}
                    >
                        <SelectTrigger className="h-11 w-[180px] cursor-pointer">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem
                                className="cursor-pointer"
                                value="pending"
                            >
                                Pending
                            </SelectItem>
                            <SelectItem
                                className="cursor-pointer"
                                value="completed"
                            >
                                Completed
                            </SelectItem>
                            <SelectItem
                                className="cursor-pointer"
                                value="rejected"
                            >
                                Rejected
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <DataTable table={table} />

                <div className="flex items-center justify-end space-x-2 py-4">
                    <DataTablePagination table={table} />
                </div>
            </div>
        </AppLayout>
    );
};

export default WithdrawalList;
