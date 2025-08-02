import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, GraduationCap, User } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Details',
        href: '#',
    },
];

interface ClassData {
    id: number;
    name: string;
    teacher: {
        name: string;
        subject: {
            name: string;
            code: string;
        };
    };
}

interface Grade {
    id: number;
    grade: string;
    semester: string;
    academic_year: string;
    subject: {
        name: string;
        code: string;
    };
    teacher: {
        name: string;
    };
}

interface StudentData {
    id: number;
    name: string;
    email: string;
    student_id: string;
    phone: string;
    class: ClassData;
    grades: Grade[];
}

interface Props {
    student: StudentData;
}

export default function Show({ student }: Props) {
    const averageGrade = student?.grades && student.grades.length > 0
        ? student.grades.reduce((sum, grade) => sum + parseFloat(grade?.grade || '0'), 0) / student.grades.length
        : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Student Details - ${student?.name || 'Student'}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/students">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Students
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">{student?.name || 'Student'}</h1>
                            <p className="text-muted-foreground">Student Details</p>
                        </div>
                    </div>
                    <Link href={`/students/${student?.id}/edit`}>
                        <Button>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Student
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Student Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Student Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                <p className="text-lg">{student?.name || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">{student?.student_id || 'N/A'}</Badge>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <p className="text-sm">{student?.email || 'No email'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                <p className="text-sm">{student?.phone || 'Not provided'}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Class Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Class Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Class</label>
                                <p className="text-lg">{student.class?.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Class Teacher</label>
                                <p className="text-sm">{student.class?.teacher?.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">
                                        {student.class?.teacher?.subject?.code}
                                    </Badge>
                                    <span className="text-sm">{student.class?.teacher?.subject?.name}</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Average Grade</label>
                                <div className="flex items-center gap-2">
                                    <Badge variant={averageGrade >= 80 ? 'default' : averageGrade >= 70 ? 'secondary' : 'destructive'}>
                                        {averageGrade.toFixed(1)}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Grades */}
                <Card>
                    <CardHeader>
                        <CardTitle>Academic Grades</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {student?.grades && student.grades.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2">Subject</th>
                                            <th className="text-left p-2">Teacher</th>
                                            <th className="text-left p-2">Grade</th>
                                            <th className="text-left p-2">Semester</th>
                                            <th className="text-left p-2">Academic Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student.grades.map((grade) => (
                                            <tr key={grade.id} className="border-b">
                                                <td className="p-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {grade.subject?.code}
                                                        </Badge>
                                                        <span className="text-sm">{grade.subject?.name}</span>
                                                    </div>
                                                </td>
                                                <td className="p-2 text-sm">{grade.teacher?.name}</td>
                                                <td className="p-2">
                                                    <Badge variant={
                                                        parseFloat(grade.grade) >= 80 ? 'default' :
                                                            parseFloat(grade.grade) >= 70 ? 'secondary' :
                                                                'destructive'
                                                    }>
                                                        {grade.grade}
                                                    </Badge>
                                                </td>
                                                <td className="p-2 text-sm">Semester {grade.semester}</td>
                                                <td className="p-2 text-sm">{grade.academic_year}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No grades recorded for this student yet.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
