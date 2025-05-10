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
import { useForm } from '@inertiajs/react';
import { LoaderCircle, X } from 'lucide-react';
import { Withdrawal } from '@/pages/withdrawals/withdrawal-list';
import InputError from '@/components/input-error';
import { useEffect } from 'react';

const RejectDialog = ({ withdrawals }: { withdrawals: Withdrawal[] }) => {
    const { data, setData, patch, errors, processing } = useForm<{
        ids: number[];
        reason: string;
        takeAmount: boolean;
    }>({
        ids: [],
        reason: '',
        takeAmount: false,
    });

    useEffect(() => {
        setData(
            'ids',
            withdrawals.map((withdrawal) => withdrawal.id),
        );
    }, [withdrawals]);

    const submit = () => {
        console.log(data);
        patch(route('withdrawals.reject', { reject: 'reject' }), {
            preserveState: (page) => Object.keys(page.props.errors).length > 0,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    disabled={withdrawals.length === 0}
                    size="xl"
                    variant="outline"
                    className="cursor-pointer"
                >
                    <X />
                    <span className="hidden sm:inline">Reject selected</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reject Withdrawal</DialogTitle>
                    <DialogDescription>
                        Coins will be returned unless 'Take amount' is selected.
                        Optionally, provide a reason below.
                    </DialogDescription>
                </DialogHeader>

                <Textarea
                    id="reason"
                    value={data.reason}
                    onChange={(e) => setData('reason', e.target.value)}
                />
                <InputError message={errors.reason} />

                <div className="flex items-center gap-x-2">
                    <Checkbox
                        id="take-amount"
                        onCheckedChange={(checked) =>
                            setData('takeAmount', checked === true)
                        }
                    />
                    <Label htmlFor="take-amount">Take amount</Label>
                </div>

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
                        Reject
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RejectDialog;
