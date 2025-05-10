import { Button } from '@/components/ui/button';
import { Calendar, Send, Smartphone, UserRound } from 'lucide-react';
import * as React from 'react';
import EditProfileDialog from '@/pages/user-details/edit-profile-dialog';
import { formatDate } from '@/lib/utils';
import BanDialog from '@/pages/user-details/ban-dialog';
import { useForm } from '@inertiajs/react';
import { AppUser } from '@/pages/registered-users/columns';
import UnbanDialog from '@/pages/user-details/unban-dialog';

const UserSummaryCard = ({ user }: { user: AppUser }) => {
    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm({
        reason: '',
        user_id: user.user.uuid,
    });

    const ban = () => {
        post(route('bans.store'), {
            preserveState: false,
            preserveScroll: true,
        });
        return;
    };

    const unban = () => {
        destroy(route('bans.destroy', { ban: user.ban.id }), {
            preserveState: false,
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-card rounded-lg border p-5">
            <div className="flex items-start justify-between">
                <div className="flex gap-x-4">
                    <span
                        className={`fi fi-${user.country_code.toLowerCase()} fis rounded`}
                        style={{
                            width: '5rem',
                            height: '5rem',
                        }}
                    />

                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {user.user.name}
                        </h3>
                        <div className="text-sm text-gray-500">
                            {user.user.email}
                        </div>

                        <Badge
                            text={accountStatus(user.ban)}
                            className={badgeColors[accountStatus(user.ban)]}
                        />
                    </div>
                </div>

                <EditProfileDialog />
            </div>

            <div className="mt-8 space-y-1">
                <div className="flex items-center gap-x-1">
                    <Smartphone className="size-4 text-gray-500" />
                    <div className="text-sm text-gray-500">Device ID</div>
                </div>

                <div className="text-sm text-gray-900">{user.device_id}</div>
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
                        {formatDate(new Date(user.created_at))}
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-x-1">
                        <Calendar className="size-4 text-gray-500" />
                        <div className="text-sm text-gray-500">Balance</div>
                    </div>

                    <div className="text-sm text-gray-900">
                        {user.coin_amount}
                    </div>
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

                {user.ban === null ? (
                    <BanDialog data={data} setData={setData} ban={ban} />
                ) : (
                    <UnbanDialog unban={unban} />
                )}
            </div>
        </div>
    );
};

export default UserSummaryCard;

export const Badge = ({
    text,
    className,
}: {
    text: string;
    className: string;
}) => (
    <span
        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-inset ${className}`}
    >
        {text}
    </span>
);

export const accountStatus = (ban: AppUser['ban']) => {
    return ban === null ? 'active' : 'banned';
};

export const badgeColors = {
    active: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    banned: 'bg-red-50 text-red-700 ring-1 ring-red-600/10 ',
};
