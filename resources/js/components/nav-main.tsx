import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if ('children' in item) {
                        const isChildActive = item.children.some(
                            (child) => child.href === page.url,
                        );

                        return (
                            <Collapsible
                                key={item.title}
                                defaultOpen={isChildActive}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            asChild
                                            className="cursor-pointer"
                                            tooltip={{ children: item.title }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {item.icon && (
                                                        <item.icon className="size-4" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </div>

                                                <ChevronRight className="size-4" />
                                            </div>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.children.map((child) => (
                                                <SidebarMenuSubItem
                                                    key={child.title}
                                                >
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={
                                                            child.href ===
                                                            page.url
                                                        }
                                                        tooltip={{
                                                            children:
                                                                child.title,
                                                        }}
                                                    >
                                                        <Link
                                                            href={child.href}
                                                            prefetch
                                                        >
                                                            {child.icon && (
                                                                <child.icon />
                                                            )}
                                                            <span>
                                                                {child.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={item.href === page.url}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
