import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, GraduationCap, FileText, BarChart3, Users2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Reports',
        href: '/reports',
    },
];

export default function Index() {
    const reports = [
        {
            title: 'Class Report',
            description: 'View all classes, homeroom teachers, and student counts',
            icon: Users2,
            href: '/reports/classes',
            color: 'bg-blue-500'
        },
        {
            title: 'Grade Report',
            description: 'Analyze student grades by class, subject, and semester',
            icon: BarChart3,
            href: '/reports/grades',
            color: 'bg-green-500'
        },
        {
            title: 'Student Report',
            description: 'View student information, performance, and class assignments',
            icon: Users,
            href: '/reports/students',
            color: 'bg-purple-500'
        },
        {
            title: 'Teacher Report',
            description: 'View teacher information, subjects, and class assignments',
            icon: GraduationCap,
            href: '/reports/teachers',
            color: 'bg-orange-500'
        },
        {
            title: 'Subject Report',
            description: 'View subject information, teachers, and grade statistics',
            icon: BookOpen,
            href: '/reports/subjects',
            color: 'bg-red-500'
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />

            <div className="container mx-auto py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Reports</h1>
                    <p className="text-muted-foreground">
                        Generate and view various reports for school management
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${report.color}`}>
                                        <report.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-xl">{report.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {report.description}
                                </p>
                                <Link href={report.href}>
                                    <Button className="w-full">
                                        <FileText className="h-4 w-4 mr-2" />
                                        View Report
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
