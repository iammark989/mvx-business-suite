import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    LayoutGrid,
    Package,
    Ruler,
    ShieldCheck,
    Tags,
    Truck,
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
    const canViewCategories = auth.permissions.includes('categories.view');
    const canViewSuppliers = auth.permissions.includes('suppliers.view');

    const isUsersSectionActive = isCurrentOrParentUrl(users.index());
    const isUomsSectionActive = isCurrentOrParentUrl('/admin/uoms');
    const isCategoriesSectionActive = isCurrentOrParentUrl('/admin/categories');
    const isSuppliersSectionActive = isCurrentOrParentUrl('/admin/suppliers');

    const isBusinessSetupSectionActive =
        isUomsSectionActive ||
        isCategoriesSectionActive ||
        isSuppliersSectionActive;

    const [administrationOpen, setAdministrationOpen] = useState(
        isUsersSectionActive,
    );

    const [businessSetupOpen, setBusinessSetupOpen] = useState(
        isBusinessSetupSectionActive,
    );

    useEffect(() => {
        if (isUsersSectionActive) {
            setAdministrationOpen(true);
        }
    }, [isUsersSectionActive]);

    useEffect(() => {
        if (isBusinessSetupSectionActive) {
            setBusinessSetupOpen(true);
        }
    }, [isBusinessSetupSectionActive]);

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

            {(canViewUoms || canViewCategories || canViewSuppliers) && (
                <SidebarGroup className="px-2 py-0">
                    <Collapsible
                        open={businessSetupOpen}
                        onOpenChange={setBusinessSetupOpen}
                        className="group/collapsible"
                    >
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip="Business Setup"
                                        isActive={isBusinessSetupSectionActive}
                                    >
                                        <Package />
                                        <span>Business Setup</span>
                                        <ChevronDown
                                            className={`ml-auto transition-transform duration-200 ${
                                                businessSetupOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {canViewUoms && (
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
                                        )}

                                        {canViewCategories && (
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={isCategoriesSectionActive}
                                                >
                                                    <Link href="/admin/categories" prefetch>
                                                        <Tags />
                                                        <span>Categories</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )}

                                        {canViewSuppliers && (
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={isSuppliersSectionActive}
                                                >
                                                    <Link href="/admin/suppliers" prefetch>
                                                        <Truck />
                                                        <span>Suppliers</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )}
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
                                                administrationOpen ? 'rotate-180' : ''
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