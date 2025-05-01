import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface User {
    name: string;
    email: string;
    bannedAt: string;
    reason: string;
    countryCode: string;
}

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
        accessorKey: 'bannedAt',
        header: 'Date',
        cell: ({ row }) => {
            return new Date(row.getValue('bannedAt')).toLocaleString(
                'default',
                { day: '2-digit', month: 'long', year: 'numeric' },
            );
        },
    },
    {
        accessorKey: 'reason',
        header: 'Reason',
    },
    {
        id: 'actions',
        cell: ({}) => {
            return (
                <div className="space-x-2 text-right">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                            >
                                Edit
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Update reason</DialogTitle>
                                <DialogDescription>
                                    Enter the reason for banning this user.
                                </DialogDescription>
                            </DialogHeader>

                            <Textarea />

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                >
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="cursor-pointer">Unban</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you want to unban this user?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Once a user is unbanned, they will
                                    automatically be removed from this list.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction className="cursor-pointer">
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
    },
];
