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
import { Check } from 'lucide-react';
import { Withdrawal } from '@/pages/withdrawals/withdrawal-list';
import { router } from '@inertiajs/react';

const ApproveDialog = ({ withdrawals }: { withdrawals: Withdrawal[] }) => {
    const submit = () => {
        router.patch(
            route('withdrawals.approve', { approve: 'approve' }),
            {
                ids: withdrawals.map((withdrawal) => withdrawal.id),
            },
            {
                preserveState: false,
                preserveScroll: false,
            },
        );
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={withdrawals.length === 0}
                    size="xl"
                    variant="outline"
                    className="cursor-pointer"
                >
                    <Check />
                    <span className="hidden sm:inline">Approve selected</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone and will finalize the
                        payout to the selected user(s).
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer"
                        onClick={submit}
                    >
                        Approve
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ApproveDialog;
