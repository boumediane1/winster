import { Link } from '@inertiajs/react';

const Dashboard = () => {
    return (
        <>
            <Link method="post" href={route('logout')}>
                logout
            </Link>
        </>
    );
};

export default Dashboard;
