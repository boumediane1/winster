import { ColumnDef } from '@tanstack/react-table';
import '/node_modules/flag-icons/css/flag-icons.min.css';

export interface Payout {
    method: 'Paypal';
    coinAmount: string;
    status: 'pending' | 'completed' | 'rejected';
    date: string;
}

const badgeColor = {
    pending: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    completed: 'bg-green-50 text-green-700 ring-green-600/20',
    rejected: 'bg-red-50 text-red-700 ring-red-600/10',
};

export const columns: ColumnDef<Payout>[] = [
    {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => {
            return new Date(row.getValue('date')).toLocaleString('default', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
        },
    },
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
        cell: ({ row }) => {
            const status: string = row.getValue('status');

            return (
                <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeColor[status]}`}
                >
                    {status}
                </span>
            );
        },
    },
];
