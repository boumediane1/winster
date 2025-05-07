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
import { Calendar, Send, Smartphone, UserRound } from 'lucide-react';
import * as React from 'react';

const UserSummaryCard = () => {
    return (
        <div className="bg-card rounded-lg border p-5">
            <div className="flex items-start justify-between">
                <div className="flex gap-x-4">
                    <span
                        className={`fi fi-de fis rounded`}
                        style={{
                            width: '5rem',
                            height: '5rem',
                        }}
                    />

                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Bob Smith
                        </h3>
                        <div className="text-sm text-gray-500">
                            bob.smith@example.com
                        </div>
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                            Active
                        </span>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <PencilSquareIcon className="size-6 cursor-pointer text-gray-900 hover:text-gray-500" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Leave the password field blank to keep the
                                current password.
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
                                <Label
                                    htmlFor="password"
                                    className="text-right"
                                >
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
                            <Button
                                type="submit"
                                size="xl"
                                className="cursor-pointer"
                            >
                                Save changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="mt-8 space-y-1">
                <div className="flex items-center gap-x-1">
                    <Smartphone className="size-4 text-gray-500" />
                    <div className="text-sm text-gray-500">Device ID</div>
                </div>

                <div className="text-sm text-gray-900">
                    59e8d837-18b6-4af3-b971-c300d281db5f
                </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-between gap-y-8">
                <div className="space-y-1">
                    <div className="flex items-center gap-x-1">
                        <Calendar className="size-4 text-gray-500" />
                        <div className="text-sm text-gray-500">
                            Member since
                        </div>
                    </div>

                    <div className="text-sm text-gray-900">May 20, 2024</div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-x-1">
                        <Calendar className="size-4 text-gray-500" />
                        <div className="text-sm text-gray-500">Balance</div>
                    </div>

                    <div className="text-sm text-gray-900">3000</div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-x-1">
                        <UserRound className="size-4 text-gray-500" />
                        <div className="text-sm text-gray-500">Referred by</div>
                    </div>

                    <div className="text-sm text-gray-900">Hannah Wells</div>
                </div>
            </div>

            <div className="mt-8 flex gap-x-4">
                <Button variant="outline" size="xl" className="cursor-pointer">
                    <Send className="size-4" />
                    Send message
                </Button>

                <Button
                    size="xl"
                    className="cursor-pointer bg-red-500 text-red-50 hover:bg-red-400"
                >
                    Ban
                </Button>
            </div>
        </div>
    );
};

export default UserSummaryCard;
