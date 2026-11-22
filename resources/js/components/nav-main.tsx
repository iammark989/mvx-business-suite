import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, LayoutGrid, ShieldCheck, Users } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { useCurrentUrl } from '@/hooks/use-current-url';
import { dashboard } from '@/routes';
import users from '@/routes/users';

export function NavMain() {
    const { auth } = usePage().props;
    const { isCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();

    const canViewDashboard = auth.permissions.includes('dashboard.view');
    const canViewUsers = auth.permissions.includes('users.view');

    const isUsersSectionActive = isCurrentOrParentUrl(users.index());

    const [administrationOpen, setAdministrationOpen] = useState(
        isUsersSectionActive,
    );

    useEffect(() => {
        if (isUsersSectionActive) {
            setAdministrationOpen(true);
        }
    }, [isUsersSectionActive]);

    return (
        <>
            {canViewDashboard && (
                <SidebarGroup className="px-2 py-0">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(dashboard())}
                                tooltip="Dashboard"
                            >
                                <Link href={dashboard()} prefetch>
                                    <LayoutGrid />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            )}

            {canViewUsers && (
                <SidebarGroup className="px-2 py-0">
                    <Collapsible
                        open={administrationOpen}
                        onOpenChange={setAdministrationOpen}
                        className="group/collapsible"
                    >
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip="Administration"
                                        isActive={isUsersSectionActive}
                                    >
                                        <ShieldCheck />
                                        <span>Administration</span>
                                        <ChevronDown
                                            className={`ml-auto transition-transform duration-200 ${
                                                administrationOpen
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={isUsersSectionActive}
                                            >
                                                <Link href={users.index()} prefetch>
                                                    <Users />
                                                    <span>User Management</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </Collapsible>
                </SidebarGroup>
            )}
        </>
    );
}