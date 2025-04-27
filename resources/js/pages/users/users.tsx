import AppLayout from '@/layouts/app/app-sidebar-layout';
import Heading from '@/components/heading';
import { columns, User } from './columns';
import { DataTable } from '@/pages/users/data-table';

const Users = () => {
    return (
        <AppLayout>
            <div className="px-6 py-6 md:px-8">
                <Heading title="User management" />
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
        device: 'iPhone 14',
        coinAmount: 1500,
        status: 'active',
        createdAt: '2024-05-20',
        countryCode: 'US',
    },
    {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        device: 'Samsung Galaxy S23',
        coinAmount: 850,
        status: 'banned',
        createdAt: '2023-11-14',
        countryCode: 'CA',
    },
    {
        name: 'Charlie Daniels',
        email: 'charlie.daniels@example.com',
        device: 'Google Pixel 7',
        coinAmount: 120,
        status: 'active',
        createdAt: '2023-07-03',
        countryCode: 'GB',
    },
    {
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        device: 'iPhone 13',
        coinAmount: 2400,
        status: 'banned',
        createdAt: '2024-02-10',
        countryCode: 'AU',
    },
    {
        name: 'Evan Turner',
        email: 'evan.turner@example.com',
        device: 'OnePlus 11',
        coinAmount: 670,
        status: 'active',
        createdAt: '2023-08-18',
        countryCode: 'NZ',
    },
    {
        name: 'George Martin',
        email: 'george.martin@example.com',
        device: 'iPhone SE',
        coinAmount: 340,
        status: 'banned',
        createdAt: '2024-03-22',
        countryCode: 'US',
    },
    {
        name: 'Hannah Wells',
        email: 'hannah.wells@example.com',
        device: 'Huawei P40',
        coinAmount: 2100,
        status: 'active',
        createdAt: '2023-09-14',
        countryCode: 'DE',
    },
    {
        name: 'Ian Wright',
        email: 'ian.wright@example.com',
        device: 'Motorola Edge',
        coinAmount: 590,
        status: 'active',
        createdAt: '2024-04-01',
        countryCode: 'GB',
    },
    {
        name: 'Julia Roberts',
        email: 'julia.roberts@example.com',
        device: 'iPhone 15',
        coinAmount: 3150,
        status: 'banned',
        createdAt: '2023-10-29',
        countryCode: 'US',
    },
    {
        name: 'Laura Croft',
        email: 'laura.croft@example.com',
        device: 'Google Pixel 6',
        coinAmount: 150,
        status: 'active',
        createdAt: '2023-06-07',
        countryCode: 'GB',
    },
    {
        name: 'Mark Spencer',
        email: 'mark.spencer@example.com',
        device: 'Sony Xperia 5',
        coinAmount: 720,
        status: 'active',
        createdAt: '2023-05-28',
        countryCode: 'CA',
    },
    {
        name: 'Nina Dobrev',
        email: 'nina.dobrev@example.com',
        device: 'iPhone 12 Mini',
        coinAmount: 1800,
        status: 'banned',
        createdAt: '2024-02-24',
        countryCode: 'BG',
    },
    {
        name: 'Oscar Wilde',
        email: 'oscar.wilde@example.com',
        device: 'Samsung Galaxy Fold',
        coinAmount: 5000,
        status: 'active',
        createdAt: '2023-11-01',
        countryCode: 'IE',
    },
];
