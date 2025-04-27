import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import { Offerwall } from '@/types/offerwall';
import { Button } from '@/components/ui/button';

const OfferwallCard = ({ title, type, logo, classNames }: Offerwall) => {
    return (
        <div className={`space-y-8 rounded-lg p-5 ${classNames}`}>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-2xl font-semibold text-gray-900">
                        {title}
                    </h3>

                    <div className="text-sm text-gray-500">{type}</div>
                </div>
                <img src={logo} className="h-12 rounded-full" alt="" />
            </div>

            <Button
                asChild
                variant="outline"
                size="xl"
                className="cursor-pointer"
            >
                <Link
                    as="button"
                    href={route('offerwall.show', { offerwall: 1 })}
                >
                    <Cog6ToothIcon className="size-6" />
                    <span className="text-sm">Manage</span>
                </Link>
            </Button>
        </div>
    );
};

export default OfferwallCard;
