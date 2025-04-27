import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { Link } from '@inertiajs/react';
import { CircleChevronRight } from 'lucide-react';

export interface User {
    name: string;
    email: string;
    device: string;
    coinAmount: number;
    status: 'active' | 'banned' | 'blocked' | 'suspended';
    createdAt: string;
    countryCode: string;
}

const badgeColor = {
    active: 'bg-green-50 text-green-700 ring-green-600/20',
    banned: 'bg-red-50 text-red-700 ring-red-600/10',
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const code = row.original.countryCode.toLowerCase();

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
        accessorKey: 'status',
        header: 'Account status',
        cell: ({ row }) => {
            const status: string = row.getValue('status');

            return (
                <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeColor[status]}`}
                >
                    {row.getValue('status')}
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
                            user: '01967235-2aa6-70c5-993b-670150464731',
                        })}
                    >
                        <CircleChevronRight className="size-5" />
                    </Link>
                </Button>
            );
        },
    },
];
