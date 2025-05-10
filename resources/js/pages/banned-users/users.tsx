import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/data-table';
import { columns } from '@/pages/banned-users/columns';
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { Input } from '@/components/ui/input';
import { DataTablePagination } from '@/components/data-table-pagination';
import { usePage } from '@inertiajs/react';
import { AppUser } from '../registered-users/columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Banned Users',
        href: '/users/banned',
    },
];

const Users = () => {
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const { users } = usePage<{ users: AppUser[] }>().props;

    const table = useReactTable({
        data: users,
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
                <Heading title="Banned Users" />

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
