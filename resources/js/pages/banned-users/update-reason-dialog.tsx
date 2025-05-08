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

const UpdateReasonDialog = () => (
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

            <Textarea />

            <DialogFooter>
                <Button type="submit" className="cursor-pointer">
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export default UpdateReasonDialog;
