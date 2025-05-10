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
import { InertiaFormProps } from '@inertiajs/react';

const BanDialog = ({
    data,
    setData,
    ban,
}: {
    data: InertiaFormProps<{ reason: string }>['data'];
    setData: InertiaFormProps<{ reason: string }>['setData'];
    ban: () => void;
}) => {
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

                <DialogFooter>
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        onClick={ban}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default BanDialog;
