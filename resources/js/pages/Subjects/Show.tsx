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
        title: 'Subjects',
        href: '/subjects',
    },
    {
        title: 'Details',
        href: '#',
    },
];

interface Teacher {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface Grade {
    id: number;
    grade: string;
    semester: string;
    academic_year: string;
    student: {
        name: string;
        student_id: string;
    };
    teacher: {
        name: string;
    };
}

interface SubjectData {
    id: number;
    name: string;
    code: string;
    description: string;
    teachers: Teacher[];
    grades: Grade[];
}

interface Props {
    subject: SubjectData;
}

export default function Show({ subject }: Props) {
    const averageGrade = subject.grades && subject.grades.length > 0
        ? subject.grades.reduce((sum, grade) => sum + parseFloat(grade.grade), 0) / subject.grades.length
        : 0;

    const totalStudents = subject.grades?.length || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Subject Details - ${subject.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/subjects">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Subjects
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">{subject.name}</h1>
                            <p className="text-muted-foreground">Subject Details</p>
                        </div>
                    </div>
                    <Link href={`/subjects/${subject.id}/edit`}>
                        <Button>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Subject
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Subject Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Subject Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Subject Name</label>
                                <p className="text-lg">{subject.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Subject Code</label>
                                <Badge variant="secondary" className="text-sm">
                                    {subject.code}
                                </Badge>
                            </div>

                            {subject.description && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="text-sm">{subject.description}</p>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Teachers</label>
                                <p className="text-lg">{subject.teachers?.length || 0} teachers</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Total Students</label>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span className="text-lg">{totalStudents} students</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Total Grades</label>
                                <p className="text-lg">{subject.grades?.length || 0} grades recorded</p>
                            </div>

                            {averageGrade > 0 && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Average Grade</label>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={averageGrade >= 80 ? 'default' : averageGrade >= 70 ? 'secondary' : 'destructive'}>
                                            {averageGrade.toFixed(1)}
                                        </Badge>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Teachers */}
                <Card>
                    <CardHeader>
                        <CardTitle>Teachers for this Subject</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {subject.teachers && subject.teachers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {subject.teachers.map((teacher) => (
                                    <div
                                        key={teacher.id}
                                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="font-medium">{teacher.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {teacher.email}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {teacher.phone || 'No phone provided'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No teachers assigned to this subject yet.
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Grades */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Grades for this Subject</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {subject.grades && subject.grades.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2">Student</th>
                                            <th className="text-left p-2">Student ID</th>
                                            <th className="text-left p-2">Teacher</th>
                                            <th className="text-left p-2">Grade</th>
                                            <th className="text-left p-2">Semester</th>
                                            <th className="text-left p-2">Academic Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subject.grades.slice(0, 10).map((grade) => (
                                            <tr key={grade.id} className="border-b">
                                                <td className="p-2 text-sm">{grade.student?.name}</td>
                                                <td className="p-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {grade.student?.student_id}
                                                    </Badge>
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
                                {subject.grades.length > 10 && (
                                    <div className="text-center py-2 text-sm text-muted-foreground">
                                        And {subject.grades.length - 10} more grades...
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No grades recorded for this subject yet.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
