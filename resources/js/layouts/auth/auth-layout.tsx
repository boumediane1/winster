import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import AppLogoIcon from '../../components/app-logo-icon';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

const AuthSimpleLayout = ({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) => {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={route('dashboard')}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <img
                                src="/images/logo.webp"
                                alt="logo"
                                className="mb-1 size-16 rounded-md"
                            />

                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthSimpleLayout;
