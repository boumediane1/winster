import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormEvent } from 'react';
import { InertiaFormProps } from '@inertiajs/react';
import { X } from 'lucide-react';

interface Props {
    form: InertiaFormProps<{ reason: string; takeAmount: boolean }>;
    enabled: boolean;
    submit: (e: FormEvent<HTMLFormElement>) => void;
}

const RejectDialog = ({ form, enabled, submit }: Props) => {
    const { setData } = form;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    disabled={enabled === false}
                    size="xl"
                    variant="outline"
                    className="cursor-pointer"
                >
                    <X />
                    <span className="hidden sm:inline">Reject selected</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={submit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Reject Withdrawal</DialogTitle>
                        <DialogDescription>
                            Coins will be returned unless 'Take amount' is
                            selected. Optionally, provide a reason below.
                        </DialogDescription>
                    </DialogHeader>

                    <Textarea
                        onChange={(e) => setData('reason', e.target.value)}
                    />

                    <div className="flex items-center gap-x-2">
                        <Checkbox
                            id="take-amount"
                            onCheckedChange={(checked) =>
                                setData('takeAmount', Boolean(checked))
                            }
                        />
                        <Label htmlFor="take-amount">Take amount</Label>
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="cursor-pointer">
                            Reject
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RejectDialog;
