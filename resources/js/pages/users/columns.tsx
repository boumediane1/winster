import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

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
                <Button variant="link" className="text-indigo-500">
                    Edit
                </Button>
            );
        },
    },
];
