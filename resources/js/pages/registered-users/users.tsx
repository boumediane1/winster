import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { columns, User } from './columns';
import { DataTable } from '@/components/data-table';
import { BreadcrumbItem } from '@/types';
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { DataTablePagination } from '@/components/data-table-pagination';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Registered Users',
        href: '/',
    },
];

interface Page {
    page: {
        per_page: number;
        data: User[];
        total: number;
        current_page: number;
    };
}

const Users = ({ page }: Page) => {
    const [pagination, setPagination] = useState({
        pageIndex: page.current_page - 1,
        pageSize: page.per_page,
    });

    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: page.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: page.total,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: (updater) => {
            if (typeof updater !== 'function') return;

            const newPagination = updater(pagination);
            setPagination(newPagination);

            router.get(
                route('users.index', { page: newPagination.pageIndex + 1 }),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['page'],
                },
            );
        },
        state: {
            columnFilters,
            pagination,
        },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Registered Users" />

                <div className="flex items-center pb-4">
                    <Input
                        placeholder="Filter names..."
                        value={
                            (table
                                .getColumn('name')
                                ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(event) =>
                            table
                                .getColumn('name')
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>

                <DataTable table={table} />

                <div className="flex items-center justify-end space-x-2 py-4">
                    <DataTablePagination table={table} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Users;
