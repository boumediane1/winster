import Heading from '@/components/heading';
import { DataTable } from '@/components/data-table';
import { BreadcrumbItem, Page } from '@/types';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';
import { DataTablePagination } from '@/components/data-table-pagination';
import { FormEvent, useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import { AppUserWithLatestBan } from '../registered-users/columns';
import { columns } from '@/pages/withdrawals/columns';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import RejectDialog from '@/pages/withdrawals/reject-dialog';
import ApproveDialog from '@/pages/withdrawals/approve-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Withdrawals',
        href: '/',
    },
];

export interface Withdrawal {
    id: number;
    app_user: AppUserWithLatestBan;
    payment_method: string;
    coins: string;
    status: string;
    updated_at: string;
}

const WithdrawalList = () => {
    const { withdrawals } = usePage<{ withdrawals: Page<Withdrawal> }>().props;

    const [pagination, setPagination] = useState({
        pageIndex: withdrawals.current_page - 1,
        pageSize: withdrawals.per_page,
    });

    const params = new URLSearchParams(window.location.search);
    const status = params.get('status') ?? 'pending';

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
            );
        },
        state: {
            pagination,
            columnVisibility: {
                select: status === 'pending',
            },
        },
    });

    const form = useForm({
        reason: '',
        takeAmount: false,
    });

    const reject = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.patch(
            route('withdrawals.reject', { reject: 'reject' }),
            {
                ids: selected,
                reason: form.data.reason,
                takeAmount: form.data.takeAmount,
            },
            {
                preserveState: false,
                preserveScroll: false,
            },
        );
    };

    const approve = () => {
        router.patch(
            route('withdrawals.approve', { approve: 'approve' }),
            {
                ids: selected,
            },
            {
                preserveState: false,
                preserveScroll: false,
            },
        );
    };

    const handleStatusChange = (status: Withdrawal['status']) => {
        router.visit(route('withdrawals.index', { status }), {
            preserveState: true,
            preserveScroll: true,
            only: ['withdrawals'],
        });
    };

    const handleAction = (action: 'approve' | 'reject') => {
        router.patch(
            route('withdrawals.action', { action }),
            {
                ids: selected,
            },
            {
                preserveState: false,
                preserveScroll: false,
            },
        );
    };

    const selected = table
        .getSelectedRowModel()
        .rows.map((row) => row.original.id);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Withdrawals" />

                <div className="mb-4 flex justify-between">
                    <div className="flex gap-x-2">
                        <ApproveDialog
                            enabled={selected.length > 0}
                            approve={approve}
                        />

                        <RejectDialog
                            enabled={selected.length > 0}
                            submit={reject}
                            form={form}
                        />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <span className="text-sm text-gray-500">Status</span>

                        <Select
                            defaultValue={status}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="h-11 w-[180px] cursor-pointer">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>

                            <SelectContent>
                                {['Pending', 'Completed', 'Rejected'].map(
                                    (status) => (
                                        <SelectItem
                                            key={status}
                                            className="cursor-pointer"
                                            value={status.toLowerCase()}
                                        >
                                            {status}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    </div>
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
