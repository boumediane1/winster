import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { useForm } from '@inertiajs/react';
import { AppUser } from '@/pages/registered-users/columns';
import InputError from '@/components/input-error';

const EditProfileDialog = ({ user }: { user: AppUser }) => {
    const { data, setData, put, errors, hasErrors } = useForm<{
        name: string;
        email: string;
        password: string;
    }>({ name: user.user.name, email: user.user.email, password: '' });
    console.log(Object.keys(errors));

    const submit = () => {
        put(route('users.update', { user: user.user.uuid }), {
            preserveState: (page) => Object.keys(page.props.errors).length > 0,
            preserveScroll: true,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <PencilSquareIcon className="size-6 cursor-pointer text-gray-900 hover:text-gray-500" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Leave the password field blank to keep the current
                        password.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="col-span-3"
                        />
                        <InputError
                            className="col-span-full col-start-2"
                            message={errors.name}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="col-span-3"
                        />
                        <InputError
                            className="col-span-full col-start-2"
                            message={errors.email}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="col-span-3"
                        />
                        <InputError
                            className="col-span-full col-start-2"
                            message={errors.password}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        size="xl"
                        className="cursor-pointer"
                        onClick={submit}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileDialog;
