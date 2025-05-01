import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import { ReactNode } from 'react';

interface Props {
    title: string;
    icon: ReactNode;
    value: number | string;
    change: string;
}

const StatCard = ({ title, icon, value, change }: Props) => {
    return (
        <div className="bg-card text-card-foreground rounded-xl border shadow">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                <div className="text-sm font-medium tracking-tight">
                    {title}
                </div>
                {icon}
            </div>
            <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-muted-foreground text-xs">{change}</p>
            </div>
        </div>
    );
};

export default StatCard;
