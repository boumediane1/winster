import { ColumnDef } from '@tanstack/react-table';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { Withdrawal } from '@/pages/withdrawals/withdrawal-list';
import { Checkbox } from '@/components/ui/checkbox';

const badgeColor = {
    pending: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    completed: 'bg-green-50 text-green-700 ring-green-600/20',
    rejected: 'bg-red-50 text-red-700 ring-red-600/10',
};

export const columns: ColumnDef<Withdrawal>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="cursor-pointer"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        accessorFn: (row) => {
            return row.app_user.user.name;
        },
        header: 'Name',
    },
    {
        accessorKey: 'payment_method',
        header: 'Payment method',
    },
    {
        accessorKey: 'coins',
        header: 'Coins',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;

            return (
                <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeColor[status]}`}
                >
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: 'updated_at',
        header: 'Date',
    },
];
