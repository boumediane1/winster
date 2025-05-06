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
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

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
    updated_at: string;
}

const WithdrawalList = () => {
    const { withdrawals } = usePage<{ withdrawals: Page<Withdrawal> }>().props;
    console.log(withdrawals.data);

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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    disabled={selected.length === 0}
                                    size="xl"
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    <Check />
                                    <span className="hidden sm:inline">
                                        Approve selected
                                    </span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone and will
                                        finalize the payout to the selected
                                        user(s).
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="cursor-pointer">
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="cursor-pointer"
                                        onClick={() => handleAction('approve')}
                                    >
                                        Approve
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    disabled={selected.length === 0}
                                    size="xl"
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    <X />
                                    <span className="hidden sm:inline">
                                        Reject selected
                                    </span>
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Reject Withdrawal</DialogTitle>
                                    <DialogDescription>
                                        Provide a reason for rejecting this
                                        request.
                                    </DialogDescription>
                                </DialogHeader>

                                <Textarea />

                                <DialogFooter>
                                    <Button
                                        onClick={() => handleAction('reject')}
                                        type="submit"
                                        className="cursor-pointer"
                                    >
                                        Reject
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
