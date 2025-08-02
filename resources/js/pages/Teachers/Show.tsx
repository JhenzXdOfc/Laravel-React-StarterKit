import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Users, BookOpen, Award } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Teachers',
        href: '/teachers',
    },
    {
        title: 'Details',
        href: '#',
    },
];

interface Subject {
    id: number;
    name: string;
    code: string;
    description: string;
}


interface Teacher {
    id: number;
    name: string;
    email: string;
    phone?: string;
    subject?: Subject;
    classes?: Array<{
        id: number;
        name: string;
        students_count?: number;
    }>;
    grades?: Array<{
        id: number;
        grade: number;
        semester?: string;
        academic_year?: string;
        student?: {
            name: string;
            student_id?: string;
        };
    }>;
}

export default function Show({ teacher }: { teacher: Teacher | null }) {
    if (!teacher) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Teacher Not Found" />
                <div className="text-center py-8">
                    <p>Teacher not found.</p>
                    <Link href="/teachers" className="text-blue-600 hover:underline">
                        Return to Teachers
                    </Link>
                </div>
            </AppLayout>
        );
    }

    // Calculate statistics
    const averageGrade = teacher?.grades?.length
        ? teacher.grades.reduce((sum, grade) => sum + grade.grade, 0) / teacher.grades.length
        : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Teacher Details - ${teacher?.name || 'Teacher'}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/teachers">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Teachers
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">{teacher?.name || 'Teacher'}</h1>
                            <p className="text-muted-foreground">Teacher Details</p>
                        </div>
                    </div>
                    <Link href={`/teachers/${teacher?.id}/edit`}>
                        <Button>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Teacher
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Teacher Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Teacher Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                                    <p className="text-sm">{teacher?.name || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <p className="text-sm">{teacher?.email || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                    <p className="text-sm">{teacher?.phone || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Subject</p>
                                    <p className="text-sm">{teacher?.subject?.name || 'Not specified'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>                    {/* Subject Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Subject Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">
                                        {teacher.subject?.code}
                                    </Badge>
                                    <span className="text-lg">{teacher.subject?.name}</span>
                                </div>
                            </div>

                            {teacher.subject?.description && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="text-sm">{teacher.subject.description}</p>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Classes Teaching</label>
                                <p className="text-lg">{teacher.classes?.length || 0} classes</p>
                            </div>

                            {averageGrade > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Average Grade Given</label>
                                    <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4" />
                                        <Badge variant={averageGrade >= 80 ? 'default' : averageGrade >= 70 ? 'secondary' : 'destructive'}>
                                            {averageGrade.toFixed(1)}
                                        </Badge>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Classes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Classes Teaching</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {teacher.classes && teacher.classes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {teacher.classes.map((classData) => (
                                    <div
                                        key={classData.id}
                                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="font-medium">{classData.name}</div>
                                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            {classData.students_count || 0} students
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No classes assigned to this teacher yet.
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Grades */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Grades Given</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {teacher.grades && teacher.grades.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2">Student</th>
                                            <th className="text-left p-2">Student ID</th>
                                            <th className="text-left p-2">Grade</th>
                                            <th className="text-left p-2">Semester</th>
                                            <th className="text-left p-2">Academic Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teacher.grades.slice(0, 10).map((grade) => (
                                            <tr key={grade.id} className="border-b">
                                                <td className="p-2 text-sm">{grade.student?.name}</td>
                                                <td className="p-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {grade.student?.student_id}
                                                    </Badge>
                                                </td>
                                                <td className="p-2">
                                                    <Badge variant={
                                                        grade.grade >= 80 ? 'default' :
                                                            grade.grade >= 70 ? 'secondary' :
                                                                'destructive'
                                                    }>
                                                        {grade.grade}
                                                    </Badge>
                                                </td>
                                                <td className="p-2 text-sm">Semester {grade.semester || 'N/A'}</td>
                                                <td className="p-2 text-sm">{grade.academic_year || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {teacher.grades.length > 10 && (
                                    <div className="text-center py-2 text-sm text-muted-foreground">
                                        And {teacher.grades.length - 10} more grades...
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No grades given by this teacher yet.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
