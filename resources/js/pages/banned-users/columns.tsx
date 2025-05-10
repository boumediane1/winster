import { ColumnDef } from '@tanstack/react-table';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import UpdateReasonDialog from '@/pages/banned-users/update-reason-dialog';
import UnbanDialog from '@/pages/banned-users/unban-dialog';
import { AppUser } from '../registered-users/columns';

export const columns: ColumnDef<AppUser>[] = [
    {
        accessorKey: 'name',
        accessorFn: (row) => {
            return row.user.name;
        },
        header: 'Name',
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
        accessorKey: 'banned_at',
        accessorFn: (row) => row.ban.created_at,
        header: 'Date',
        cell: ({ row }) => {
            return new Date(row.original.ban.created_at).toLocaleString(
                'default',
                {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                },
            );
        },
    },
    {
        accessorKey: 'reason',
        accessorFn: (row) => row.ban.reason,
        header: 'Reason',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <div className="space-x-2 text-right">
                    <UpdateReasonDialog ban={row.original.ban} />
                    <UnbanDialog user={row.original} />
                </div>
            );
        },
    },
];
