import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/data-table';
import { columns, User } from '@/pages/users/banned-users/columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Banned Users',
        href: '/users/banned',
    },
];

const Users = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-6 py-6 md:px-8">
                <Heading title="Banned Users" />
                <DataTable columns={columns} data={users} />
            </div>
        </AppLayout>
    );
};

export default Users;

const users: User[] = [
    {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        bannedAt: '2025-04-01',
        reason: 'Creating multiple accounts',
        countryCode: 'US',
    },
    {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        bannedAt: '2025-03-28',
        reason: 'Suspicious reward activity',
        countryCode: 'GB',
    },
    {
        name: 'Carla Davis',
        email: 'carla.davis@example.com',
        bannedAt: '2025-04-10',
        reason: 'Abusing referral system',
        countryCode: 'CA',
    },
    {
        name: 'David Lee',
        email: 'david.lee@example.com',
        bannedAt: '2025-04-05',
        reason: 'Using emulator to spoof device',
        countryCode: 'IN',
    },
    {
        name: 'Emma Wilson',
        email: 'emma.wilson@example.com',
        bannedAt: '2025-04-12',
        reason: 'Fake app interactions',
        countryCode: 'AU',
    },
    {
        name: 'Frank Harris',
        email: 'frank.harris@example.com',
        bannedAt: '2025-04-03',
        reason: 'Automated activity detected',
        countryCode: 'DE',
    },
    {
        name: 'Grace Young',
        email: 'grace.young@example.com',
        bannedAt: '2025-04-09',
        reason: 'Self-referral abuse',
        countryCode: 'PH',
    },
    {
        name: 'Henry Martin',
        email: 'henry.martin@example.com',
        bannedAt: '2025-04-02',
        reason: 'VPN or proxy usage',
        countryCode: 'NG',
    },
    {
        name: 'Isla Thompson',
        email: 'isla.thompson@example.com',
        bannedAt: '2025-04-06',
        reason: 'Falsifying app session data',
        countryCode: 'BR',
    },
    {
        name: 'Jack Brown',
        email: 'jack.brown@example.com',
        bannedAt: '2025-04-08',
        reason: 'Reward farming behavior',
        countryCode: 'PK',
    },
];
