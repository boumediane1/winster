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

const EditProfileDialog = () => (
    <Dialog>
        <DialogTrigger asChild>
            <PencilSquareIcon className="size-6 cursor-pointer text-gray-900 hover:text-gray-500" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Leave the password field blank to keep the current password.
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        defaultValue="Bob Smith"
                        className="col-span-3"
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        defaultValue="bob.smith@example.com"
                        className="col-span-3"
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        className="col-span-3"
                    />
                </div>
            </div>

            <DialogFooter>
                <Button type="submit" size="xl" className="cursor-pointer">
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export default EditProfileDialog;
