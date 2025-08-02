import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Users, GraduationCap, FileText, BarChart3, Users2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const quickLinks = [
        {
            title: 'Subjects',
            description: 'Manage school subjects',
            icon: BookOpen,
            href: '/subjects',
            color: 'bg-blue-500'
        },
        {
            title: 'Teachers',
            description: 'Manage teachers',
            icon: GraduationCap,
            href: '/teachers',
            color: 'bg-green-500'
        },
        {
            title: 'Classes',
            description: 'Manage classes',
            icon: Users2,
            href: '/classes',
            color: 'bg-purple-500'
        },
        {
            title: 'Students',
            description: 'Manage students',
            icon: Users,
            href: '/students',
            color: 'bg-orange-500'
        },
        {
            title: 'Grades',
            description: 'Manage grades',
            icon: BarChart3,
            href: '/grades',
            color: 'bg-red-500'
        },
        {
            title: 'Reports',
            description: 'View reports',
            icon: FileText,
            href: '/reports',
            color: 'bg-gray-500'
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">School Management Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome to the school management system. Quick access to all modules below.
                    </p>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {quickLinks.map((link, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${link.color}`}>
                                        <link.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-xl">{link.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {link.description}
                                </p>
                                <Link href={link.href}>
                                    <Button className="w-full">
                                        Access {link.title}
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </AppLayout>
    );
}
