import { Cog6ToothIcon } from '@heroicons/react/24/outline';

interface Offerwall {
    name: string;
    type: string;
    logo: string;
}

const OfferwallCard = ({ name, type, logo }: Offerwall) => {
    return (
        <div className="border- space-y-8 rounded-lg border bg-white p-5">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-2xl font-semibold text-gray-900">
                        {name}
                    </h3>

                    <div className="text-sm text-gray-500">{type}</div>
                </div>
                <img src={logo} className="h-12 rounded-full" alt="" />
            </div>

            <button className="flex items-center justify-between gap-x-1 rounded-lg border px-2 py-2">
                <Cog6ToothIcon className="size-6" />
                <span className="text-sm text-gray-900">Manage</span>
            </button>
        </div>
    );
};

export default OfferwallCard;
