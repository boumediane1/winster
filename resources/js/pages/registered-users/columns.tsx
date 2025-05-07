import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { Link } from '@inertiajs/react';
import { User } from '@/types';

export interface AppUser {
    device_id: string;
    coin_amount: number;
    banned: boolean;
    country_code?: string;
    created_at: string;
    user: User;
}

const badgeColor = {
    true: 'bg-green-50 text-green-700 ring-green-600/20',
    false: 'bg-red-50 text-red-700 ring-red-600/10',
};

export const columns: ColumnDef<AppUser>[] = [
    {
        accessorKey: 'name',
        accessorFn: (row) => row.user.name,
        header: 'Name',
        enableHiding: false,
        cell: ({ row }) => {
            const code = (row.original.country_code ?? 'US').toLowerCase();

            return (
                <div className="items-centerx flex gap-x-2">
                    <span
                        className={`fi fi-${code} fis rounded-full`}
                        style={{ width: '1.25rem', height: '1.25rem' }}
                    />

                    <span>{row.original.user.name}</span>
                </div>
            );
        },
    },
    {
        accessorFn: (row) => row.user.email,
        header: 'Email',
    },
    {
        accessorKey: 'banned',
        header: 'Account status',
        cell: ({ row }) => {
            const banned: string = row.getValue('banned');

            return (
                <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeColor[banned]}`}
                >
                    {banned ? 'banned' : 'active'}
                </span>
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Member since',
        cell: ({ row }) => {
            return new Date(row.original.created_at).toLocaleString('default', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
        },
    },
    {
        accessorKey: 'coin_amount',
        header: () => <div className="text-right">Coin amount</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right font-medium">
                    {row.getValue('coin_amount')}
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <Button variant="outline">
                    <Link
                        href={route('users.show', {
                            user: row.original.user.uuid,
                        })}
                    >
                        View
                    </Link>
                </Button>
            );
        },
    },
];
