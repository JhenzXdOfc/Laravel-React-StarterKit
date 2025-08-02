import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, User, BookOpen, Award } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Grades',
        href: '/grades',
    },
    {
        title: 'Details',
        href: '#',
    },
];

interface Student {
    id: number;
    name: string;
    student_id: string;
    email: string;
    class: {
        name: string;
    };
}

interface Teacher {
    id: number;
    name: string;
    email: string;
    subject: {
        name: string;
        code: string;
    };
}

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface GradeData {
    id: number;
    grade: string;
    semester: string;
    academic_year: string;
    created_at: string;
    student: Student;
    teacher: Teacher;
    subject: Subject;
}

interface Props {
    grade: GradeData;
}

export default function Show({ grade }: Props) {
    const getGradeColor = (gradeValue: string) => {
        const numericGrade = parseFloat(gradeValue);
        if (numericGrade >= 80) return 'default';
        if (numericGrade >= 70) return 'secondary';
        return 'destructive';
    };

    const getGradeLabel = (gradeValue: string) => {
        const numericGrade = parseFloat(gradeValue);
        if (numericGrade >= 90) return 'Excellent';
        if (numericGrade >= 80) return 'Good';
        if (numericGrade >= 70) return 'Satisfactory';
        if (numericGrade >= 60) return 'Needs Improvement';
        return 'Poor';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Grade Details - ${grade.student?.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/grades">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Grades
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Grade Details</h1>
                            <p className="text-muted-foreground">
                                {grade.student?.name} - {grade.subject?.name}
                            </p>
                        </div>
                    </div>
                    <Link href={`/grades/${grade.id}/edit`}>
                        <Button>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Grade
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Grade Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Grade Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Grade</label>
                                <div className="flex items-center gap-2">
                                    <Badge variant={getGradeColor(grade.grade)} className="text-lg px-3 py-1">
                                        {grade.grade}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        ({getGradeLabel(grade.grade)})
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Semester</label>
                                <p className="text-lg">Semester {grade.semester}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Academic Year</label>
                                <p className="text-lg">{grade.academic_year}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Date Recorded</label>
                                <p className="text-sm">
                                    {new Date(grade.created_at).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

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
                                <label className="text-sm font-medium text-muted-foreground">Student Name</label>
                                <p className="text-lg">{grade.student?.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                                <Badge variant="outline" className="text-sm">
                                    {grade.student?.student_id}
                                </Badge>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <p className="text-sm">{grade.student?.email}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Class</label>
                                <p className="text-sm">{grade.student?.class?.name}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subject & Teacher Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Subject & Teacher
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">
                                        {grade.subject?.code}
                                    </Badge>
                                    <span className="text-sm">{grade.subject?.name}</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Teacher</label>
                                <p className="text-lg">{grade.teacher?.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Teacher Subject</label>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                        {grade.teacher?.subject?.code}
                                    </Badge>
                                    <span className="text-sm">{grade.teacher?.subject?.name}</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Teacher Email</label>
                                <p className="text-sm">{grade.teacher?.email}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Grade Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Grade Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold">{grade.grade}</div>
                                <div className="text-sm text-muted-foreground">Score</div>
                            </div>

                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold">
                                    {parseFloat(grade.grade) >= 60 ? '✓' : '✗'}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {parseFloat(grade.grade) >= 60 ? 'Passed' : 'Failed'}
                                </div>
                            </div>

                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold">
                                    {Math.round((parseFloat(grade.grade) / 100) * 4 * 10) / 10}
                                </div>
                                <div className="text-sm text-muted-foreground">GPA Scale</div>
                            </div>

                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                                <div className="text-2xl font-bold">
                                    {parseFloat(grade.grade) >= 90 ? 'A' :
                                        parseFloat(grade.grade) >= 80 ? 'B' :
                                            parseFloat(grade.grade) >= 70 ? 'C' :
                                                parseFloat(grade.grade) >= 60 ? 'D' : 'F'}
                                </div>
                                <div className="text-sm text-muted-foreground">Letter Grade</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
