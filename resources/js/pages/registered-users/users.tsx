import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { AppUser, columns } from './columns';
import { DataTable } from '@/components/data-table';
import { BreadcrumbItem, Page } from '@/types';
import {
    ColumnFiltersState,
    getCoreRowModel,
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

const Users = (users: Page<AppUser>) => {
    const [pagination, setPagination] = useState({
        pageIndex: users.current_page - 1,
        pageSize: users.per_page,
    });

    console.log(users);

    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') ?? '';

    const table = useReactTable({
        data: users.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: users.total,
        onColumnFiltersChange: (updater) => {
            if (typeof updater !== 'function') return;

            const newColumnFilters = updater(columnFilters);
            setColumnFilters(newColumnFilters);

            const name =
                newColumnFilters.length > 0 ? newColumnFilters[0].value : '';

            router.visit(route('users.index', { name }), {
                preserveState: true,
                preserveScroll: true,
                only: ['data'],
            });
        },
        onPaginationChange: (updater) => {
            if (typeof updater !== 'function') return;

            const newPagination = updater(pagination);
            setPagination(newPagination);

            router.get(
                route('users.index', {
                    page: newPagination.pageIndex + 1,
                    name,
                }),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['data'],
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
                                ?.getFilterValue() as string) ?? name
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
