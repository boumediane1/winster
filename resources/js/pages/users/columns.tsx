import { ColumnDef } from '@tanstack/react-table';
import '/node_modules/flag-icons/css/flag-icons.min.css';

export interface Payout {
    method: 'Paypal';
    coinAmount: string;
    status: 'Pending' | 'Completed' | 'Rejected';
    date: string;
}

export const columns: ColumnDef<Payout>[] = [
    {
        accessorKey: 'method',
        header: 'Payment method',
    },
    {
        accessorKey: 'coinAmount',
        header: 'Coins',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'Date',
        header: 'Date',
        cell: ({ row }) => {
            return new Date(row.getValue('bannedAt')).toLocaleString(
                'default',
                { day: '2-digit', month: 'long', year: 'numeric' },
            );
        },
    },
];
