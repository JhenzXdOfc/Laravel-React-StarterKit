import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users, GraduationCap } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Teacher {
    id: number;
    name: string;
    email: string;
    phone: string;
    nip: string;
    subject: {
        id: number;
        name: string;
        code: string;
    };
}

interface ClassData {
    id: number;
    name: string;
    grade_level: string;
    capacity: number;
    students_count: number;
    teacher: Teacher;
}

interface Props {
    classes: ClassData[];
}

export default function ClassReport({ classes }: Props) {
    const totalStudents = classes.reduce((sum, cls) => sum + cls.students_count, 0);
    const totalCapacity = classes.reduce((sum, cls) => sum + cls.capacity, 0);
    const utilizationRate = totalCapacity > 0 ? (totalStudents / totalCapacity) * 100 : 0;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Reports',
            href: '/reports',
        },
        {
            title: 'Class Report',
            href: '/reports/classes',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Class Report" />

            <div className="container mx-auto py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/reports">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Reports
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Class Report</h1>
                        <p className="text-muted-foreground">
                            Overview of all classes, homeroom teachers, and student enrollment
                        </p>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{classes.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStudents}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalCapacity}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{utilizationRate.toFixed(1)}%</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Class Details Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Class Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Grade Level</TableHead>
                                    <TableHead>Homeroom Teacher</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Capacity</TableHead>
                                    <TableHead>Utilization</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {classes.map((cls) => {
                                    const utilization = cls.capacity > 0 ? (cls.students_count / cls.capacity) * 100 : 0;
                                    return (
                                        <TableRow key={cls.id}>
                                            <TableCell className="font-medium">{cls.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{cls.grade_level}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="font-medium">{cls.teacher.name}</div>
                                                        <div className="text-sm text-muted-foreground">{cls.teacher.email}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {cls.teacher.subject ?
                                                        `${cls.teacher.subject.code} - ${cls.teacher.subject.name}` :
                                                        'No Subject Assigned'
                                                    }
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    {cls.students_count}
                                                </div>
                                            </TableCell>
                                            <TableCell>{cls.capacity}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${utilization > 90 ? 'bg-red-500' :
                                                                utilization > 80 ? 'bg-yellow-500' :
                                                                    'bg-green-500'
                                                                }`}
                                                            style={{ width: `${utilization}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm">{utilization.toFixed(1)}%</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
