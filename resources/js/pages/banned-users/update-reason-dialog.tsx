import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
    DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AppUser } from '@/pages/registered-users/columns';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';

const UpdateReasonDialog = ({ ban }: { ban: AppUser['ban'] }) => {
    const { data, setData, patch, errors, processing } = useForm<{
        reason: string;
    }>({
        reason: ban.reason,
    });

    const update = () => {
        patch(route('bans.update', { ban: ban.id }), {
            preserveState: (page) => Object.keys(page.props.errors).length > 0,
            preserveScroll: true,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
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

                <Textarea
                    value={data.reason}
                    onChange={(e) => setData('reason', e.target.value)}
                />

                <InputError message={errors.reason} />

                <DialogFooter>
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        onClick={update}
                        disabled={processing}
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateReasonDialog;
