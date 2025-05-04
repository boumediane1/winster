import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { Withdrawal } from '@/pages/withdrawals/withdrawal-list';

const badgeColor = {
    true: 'bg-green-50 text-green-700 ring-green-600/20',
    false: 'bg-red-50 text-red-700 ring-red-600/10',
};

export const columns: ColumnDef<Withdrawal>[] = [
    {
        accessorKey: 'name',
        accessorFn: (row) => {
            return row.app_user.user.name;
        },
        header: 'User',
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
    },
    {
        accessorKey: 'created_at',
        header: 'Member since',
    },
];
