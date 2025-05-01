import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';

export interface User {
    name: string;
    email: string;
    deviceId: string;
    coinAmount: number;
    banned: boolean;
    createdAt: string;
    countryCode?: string;
}

const badgeColor = {
    true: 'bg-green-50 text-green-700 ring-green-600/20',
    false: 'bg-red-50 text-red-700 ring-red-600/10',
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const code = (row.original.countryCode ?? 'US').toLowerCase();

            return (
                <div className="items-centerx flex gap-x-2">
                    <span
                        className={`fi fi-${code} fis rounded-full`}
                        style={{ width: '1.25rem', height: '1.25rem' }}
                    />

                    <span>{row.getValue('name')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'email',
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
        accessorKey: 'createdAt',
        header: 'Member since',
        cell: ({ row }) => {
            return new Date(row.getValue('createdAt')).toLocaleString(
                'default',
                { day: '2-digit', month: 'long', year: 'numeric' },
            );
        },
    },
    {
        accessorKey: 'coinAmount',
        header: () => <div className="text-right">Coin amount</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right font-medium">
                    {row.getValue('coinAmount')}
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({}) => {
            return (
                <Button variant="link" className="">
                    <Link
                        href={route('users.edit', {
                            user: '019682b4-0481-7339-94b0-635011a0876b',
                        })}
                    >
                        <Eye className="size-5" />
                    </Link>
                </Button>
            );
        },
    },
];
