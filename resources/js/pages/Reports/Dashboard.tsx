import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, Users, GraduationCap, BarChart3, Users2, School } from 'lucide-react';
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

interface Student {
    id: number;
    name: string;
    email: string;
    student_number: string;
    birth_date: string;
    class: {
        id: number;
        name: string;
        grade_level: string;
        teacher: Teacher;
    };
    average_grade: number;
    total_subjects: number;
}

interface Grade {
    id: number;
    grade: number;
    semester: string;
    notes: string;
    student: {
        id: number;
        name: string;
        student_number: string;
        class: ClassData;
    };
    subject: {
        id: number;
        name: string;
        code: string;
    };
    teacher: Teacher;
}

interface Subject {
    id: number;
    name: string;
    code: string;
    description: string;
    teachers_count: number;
    grades_count: number;
    average_grade: number;
    total_students: number;
}

interface Props {
    classes: ClassData[];
    students: Student[];
    grades: Grade[];
    subjects: Subject[];
    teachers: Teacher[];
    summary: {
        totalClasses: number;
        totalStudents: number;
        totalTeachers: number;
        totalSubjects: number;
        averageGrade: number;
        totalCapacity: number;
        utilizationRate: number;
    };
}

export default function Index({
    classes = [],
    students = [],
    grades = [],
    subjects = [],
    teachers = [],
    summary
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="School Reports Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">School Reports Dashboard</h1>
                    <p className="text-muted-foreground">
                        Comprehensive overview of school data and statistics
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <School className="h-4 w-4" />
                                Total Classes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary?.totalClasses || classes.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Total Students
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary?.totalStudents || students.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <GraduationCap className="h-4 w-4" />
                                Total Teachers
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary?.totalTeachers || teachers.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Average Grade
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {summary?.averageGrade?.toFixed(1) || (grades.reduce((sum, g) => sum + g.grade, 0) / grades.length || 0).toFixed(1)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Classes Overview */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users2 className="h-5 w-5" />
                            Classes Overview
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
                                {classes.slice(0, 5).map((cls) => {
                                    const utilization = cls.capacity > 0 ? (cls.students_count / cls.capacity) * 100 : 0;
                                    return (
                                        <TableRow key={cls.id}>
                                            <TableCell className="font-medium">{cls.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{cls.grade_level}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{cls.teacher.name}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {cls.teacher.subject?.code || 'N/A'} - {cls.teacher.subject?.name || 'No Subject'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{cls.students_count}</TableCell>
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

                {/* Recent Grades */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Recent Grades
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>Teacher</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {grades.slice(0, 10).map((grade) => (
                                    <TableRow key={grade.id}>
                                        <TableCell>
                                            <div className="font-medium">{grade.student.name}</div>
                                            <div className="text-sm text-muted-foreground">{grade.student.student_number}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {grade.student.class.grade_level} {grade.student.class.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {grade.subject.code}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={grade.grade >= 80 ? "default" : grade.grade >= 70 ? "secondary" : "destructive"}
                                            >
                                                {grade.grade}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{grade.semester}</TableCell>
                                        <TableCell>{grade.teacher.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Subjects Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Subjects Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Teachers</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Avg Grade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjects.map((subject) => (
                                    <TableRow key={subject.id}>
                                        <TableCell className="font-medium">{subject.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{subject.code}</Badge>
                                        </TableCell>
                                        <TableCell>{subject.teachers_count || 0}</TableCell>
                                        <TableCell>{subject.total_students || 0}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    (subject.average_grade || 0) >= 80 ? "default" :
                                                        (subject.average_grade || 0) >= 70 ? "secondary" :
                                                            "destructive"
                                                }
                                            >
                                                {(subject.average_grade || 0).toFixed(1)}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
