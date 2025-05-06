import { ColumnDef } from '@tanstack/react-table';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { Withdrawal } from '@/pages/withdrawals/withdrawal-list';
import { Transaction } from '@/pages/user-details/user-details';

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

export const columns: {
    withdrawals: ColumnDef<Withdrawal>[];
    transactions: ColumnDef<Transaction>[];
} = {
    withdrawals: [
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
    ],
    transactions: [
        {
            accessorKey: 'source',
            header: 'Source',
        },
        {
            accessorKey: 'coin_amount',
            header: 'Coins',
        },
        {
            accessorKey: 'created_at',
            header: 'Date',
        },
    ],
};
