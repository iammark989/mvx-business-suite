import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    LayoutGrid,
    Package,
    Ruler,
    ShieldCheck,
    Users,
} from 'lucide-react';

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
    const canViewUoms = auth.permissions.includes('uoms.view');

    const isUsersSectionActive = isCurrentOrParentUrl(users.index());
    const isUomsSectionActive = isCurrentOrParentUrl('/admin/uoms');

    const [administrationOpen, setAdministrationOpen] = useState(
        isUsersSectionActive,
    );

    const [masterDataOpen, setMasterDataOpen] = useState(
        isUomsSectionActive,
    );

    useEffect(() => {
        if (isUsersSectionActive) {
            setAdministrationOpen(true);
        }
    }, [isUsersSectionActive]);

    useEffect(() => {
        if (isUomsSectionActive) {
            setMasterDataOpen(true);
        }
    }, [isUomsSectionActive]);

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

            {canViewUoms && (
                <SidebarGroup className="px-2 py-0">
                    <Collapsible
                        open={masterDataOpen}
                        onOpenChange={setMasterDataOpen}
                        className="group/collapsible"
                    >
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip="Master Data"
                                        isActive={isUomsSectionActive}
                                    >
                                        <Package />
                                        <span>Master Data</span>
                                        <ChevronDown
                                            className={`ml-auto transition-transform duration-200 ${
                                                masterDataOpen
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
                                                isActive={isUomsSectionActive}
                                            >
                                                <Link href="/admin/uoms" prefetch>
                                                    <Ruler />
                                                    <span>Unit of Measure</span>
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