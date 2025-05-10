import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { AppUser } from '@/pages/registered-users/columns';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';

const BanDialog = ({ user }: { user: AppUser }) => {
    const { data, setData, post, errors, processing } = useForm({
        reason: '',
        user_id: user.user.uuid,
    });

    const submit = () => {
        post(route('bans.store'), {
            preserveState: (page) => Object.keys(page.props.errors).length > 0,
            preserveScroll: true,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="xl"
                    className="cursor-pointer bg-red-500 text-red-50 capitalize hover:bg-red-400"
                >
                    Ban
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reason</DialogTitle>
                    <DialogDescription>
                        Enter the reason for banning this user.
                    </DialogDescription>
                </DialogHeader>

                <Textarea
                    value={data.reason}
                    onChange={(value) => {
                        setData('reason', value.target.value);
                    }}
                />

                <InputError message={errors.reason} />

                <DialogFooter>
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        onClick={submit}
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

export default BanDialog;
