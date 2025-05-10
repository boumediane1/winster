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
import { Button } from '@/components/ui/button';
import { AppUser } from '@/pages/registered-users/columns';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const UnbanDialog = ({ ban }: { ban: AppUser['ban'] }) => {
    const { processing, delete: destroy } = useForm<{ ban: number }>();

    const submit = () => {
        destroy(route('bans.destroy', { ban: ban.id }));
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="xl" className="cursor-pointer">
                    UnBan
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you want to unban this user?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Once a user is unbanned, they will automatically be
                        removed from this list.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer"
                        onClick={submit}
                        disabled={processing}
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default UnbanDialog;
