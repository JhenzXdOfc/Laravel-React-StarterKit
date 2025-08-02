import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, BarChart3, Users, BookOpen } from 'lucide-react';

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface Teacher {
    id: number;
    name: string;
}

interface ClassData {
    id: number;
    name: string;
    grade_level: string;
}

interface Student {
    id: number;
    name: string;
    student_number: string;
    class: ClassData;
}

interface Grade {
    id: number;
    grade: number;
    semester: string;
    notes: string;
    student: Student;
    subject: Subject;
    teacher: Teacher;
    created_at: string;
}

interface Props {
    grades: Grade[];
    averageGrade: number;
    totalStudents: number;
    classes: ClassData[];
    subjects: Subject[];
    filters: {
        class_id?: string;
        subject_id?: string;
        semester?: string;
    };
}

export default function GradeReport({ grades, averageGrade, totalStudents, classes, subjects, filters }: Props) {
    return (
        <>
            <Head title="Grade Report" />

            <div className="container mx-auto py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/reports">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Reports
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Grade Report</h1>
                        <p className="text-muted-foreground">
                            Analyze student grades by class, subject, and semester
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Class</label>
                                <select
                                    className="w-full border rounded px-3 py-2"
                                    value={filters.class_id || ''}
                                    onChange={(e) => {
                                        const url = new URL(window.location.href);
                                        if (e.target.value) {
                                            url.searchParams.set('class_id', e.target.value);
                                        } else {
                                            url.searchParams.delete('class_id');
                                        }
                                        window.location.href = url.toString();
                                    }}
                                >
                                    <option value="">All Classes</option>
                                    {classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            {cls.grade_level} - {cls.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Subject</label>
                                <select
                                    className="w-full border rounded px-3 py-2"
                                    value={filters.subject_id || ''}
                                    onChange={(e) => {
                                        const url = new URL(window.location.href);
                                        if (e.target.value) {
                                            url.searchParams.set('subject_id', e.target.value);
                                        } else {
                                            url.searchParams.delete('subject_id');
                                        }
                                        window.location.href = url.toString();
                                    }}
                                >
                                    <option value="">All Subjects</option>
                                    {subjects.map((subject) => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.code} - {subject.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Semester</label>
                                <select
                                    className="w-full border rounded px-3 py-2"
                                    value={filters.semester || ''}
                                    onChange={(e) => {
                                        const url = new URL(window.location.href);
                                        if (e.target.value) {
                                            url.searchParams.set('semester', e.target.value);
                                        } else {
                                            url.searchParams.delete('semester');
                                        }
                                        window.location.href = url.toString();
                                    }}
                                >
                                    <option value="">All Semesters</option>
                                    <option value="1">Semester 1</option>
                                    <option value="2">Semester 2</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Grades</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{grades.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{averageGrade}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Unique Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStudents}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Grade Details Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Grade Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Teacher</TableHead>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Notes</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {grades.map((grade) => (
                                    <TableRow key={grade.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{grade.student.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {grade.student.student_number}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {grade.student.class.grade_level} - {grade.student.class.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{grade.subject.name}</div>
                                                    <div className="text-sm text-muted-foreground">{grade.subject.code}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                {grade.teacher.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Semester {grade.semester}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className={`px-2 py-1 rounded text-sm font-medium ${grade.grade >= 80 ? 'bg-green-100 text-green-800' :
                                                    grade.grade >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {grade.grade}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground max-w-xs truncate">
                                            {grade.notes || 'No notes'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(grade.created_at).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
