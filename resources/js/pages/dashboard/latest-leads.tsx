import '/node_modules/flag-icons/css/flag-icons.min.css';

const LatestLeads = () => {
    return (
        <div className="bg-card text-card-foreground col-span-3 rounded-xl border shadow">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="leading-none font-semibold tracking-tight">
                    Recent Leads
                </div>
                <div className="text-muted-foreground text-sm">
                    Latest leads from all networks
                </div>
            </div>
            <div className="p-6 pt-0">
                <div className="space-y-8">
                    {users.slice(0, 6).map((user) => (
                        <div key={user.email} className="flex items-center">
                            <span
                                className={`fi fi-${user.countryCode.toLowerCase()} fis rounded`}
                                style={{
                                    width: '2rem',
                                    height: '2rem',
                                }}
                            ></span>

                            <div className="ml-4 space-y-1">
                                <p className="text-sm leading-none font-medium">
                                    {user.name}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    May 20, 2024
                                </p>
                            </div>
                            <div className="ml-auto font-medium">+$0.014</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestLeads;

const users = [
    {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        countryCode: 'US',
    },
    {
        name: 'Carlos Martínez',
        email: 'carlos@example.com',
        countryCode: 'ES',
    },
    {
        name: 'Fatima Noor',
        email: 'fatima@example.com',
        countryCode: 'MA',
    },
    {
        name: "Liam O'Sullivan",
        email: 'liam@example.com',
        countryCode: 'IE',
    },
    {
        name: 'Chen Wei',
        email: 'chen@example.com',
        countryCode: 'CN',
    },
    {
        name: 'Ava Müller',
        email: 'ava@example.com',
        countryCode: 'DE',
    },
];
