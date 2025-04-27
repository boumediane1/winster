import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export interface User {
    name: string;
    email: string;
    device: string;
    coinAmount: number;
    status: 'active' | 'banned' | 'blocked' | 'suspended';
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'status',
        header: 'Account status',
        cell: ({ row }) => {
            return Math.random() < 0.5 ? (
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                    Active
                </span>
            ) : (
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                    Banned
                </span>
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
                    <PencilSquareIcon className="size-5" />
                </Button>
            );
        },
    },
];
