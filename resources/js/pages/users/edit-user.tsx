import AppLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';
import Heading from '@/components/heading';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    DevicePhoneMobileIcon,
    PaperAirplaneIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';
import {
    Calendar,
    Phone,
    Send,
    Smartphone,
    User,
    UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adjoe',
        href: '/',
    },
];

const EditUser = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="User details" />
                <div className="grid grid-cols-12 gap-x-4">
                    <div className="order-1 col-span-full h-96 rounded-lg border border-dashed p-4 lg:order-0 lg:col-span-6 xl:col-span-8"></div>

                    <div className="col-span-full lg:col-span-6 xl:col-span-4">
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

                                <button className="cursor-pointer">
                                    <PencilSquareIcon className="size-6 text-gray-900 hover:text-gray-500" />
                                </button>
                            </div>

                            <div className="mt-8 space-y-1">
                                <div className="flex items-center gap-x-1">
                                    <Smartphone className="size-4 text-gray-500" />
                                    <div className="text-sm text-gray-500">
                                        Device ID
                                    </div>
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

                                    <div className="text-sm text-gray-900">
                                        May 20, 2024
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-x-1">
                                        <Calendar className="size-4 text-gray-500" />
                                        <div className="text-sm text-gray-500">
                                            Balance
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-900">
                                        3000
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-x-1">
                                        <UserRound className="size-4 text-gray-500" />
                                        <div className="text-sm text-gray-500">
                                            Referred by
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-900">
                                        Hannah Wells
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-x-4">
                                <Button
                                    variant="outline"
                                    size="xl"
                                    className="cursor-pointer"
                                >
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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditUser;
