import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, GraduationCap, Users2, BookOpenCheck, BarChart3, FileText } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Master Data',
        icon: Folder,
        items: [
            {
                title: 'Subjects',
                href: '/subjects',
                icon: BookOpen,
            },
            {
                title: 'Teachers',
                href: '/teachers',
                icon: GraduationCap,
            },
            {
                title: 'Classes',
                href: '/classes',
                icon: Users2,
            },
            {
                title: 'Students',
                href: '/students',
                icon: Users,
            },
        ],
    },
    {
        title: 'Academic',
        icon: BookOpenCheck,
        items: [
            {
                title: 'Grades',
                href: '/grades',
                icon: BarChart3,
            },
        ],
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: FileText,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
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
