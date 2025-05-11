import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Banknote,
    Gamepad2,
    LayoutGrid,
    Settings,
    UserCog,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutGrid,
    },
    {
        title: 'User Management',
        href: '/users',
        icon: UserCog,
        children: [
            {
                title: 'Registered Users',
                href: '/users',
            },
            {
                title: 'Banned Users',
                href: '/users/banned',
            },
        ],
    },
    {
        title: 'Withdrawals',
        href: '/withdrawals',
        icon: Banknote,
    },
    {
        title: 'Offerwalls',
        href: '/offerwalls',
        icon: Gamepad2,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
        children: [
            {
                title: 'Rewards',
                href: '/settings/rewards',
            },
            {
                title: 'Security',
                href: '/settings/security',
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
