import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users, GraduationCap, BookOpen } from 'lucide-react';

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface Teacher {
    id: number;
    name: string;
    subject?: Subject;
}

interface ClassData {
    id: number;
    name: string;
    grade_level: string;
    teacher?: Teacher;
}

interface Grade {
    id: number;
    grade: number;
    semester: string;
    subject: Subject;
    teacher: Teacher;
    created_at: string;
}

interface Student {
    id: number;
    name: string;
    email: string;
    student_number: string;
    birth_date: string;
    class: ClassData;
    grades: Grade[];
    average_grade?: number;
    total_subjects?: number;
    latest_grade?: Grade;
}

interface Props {
    students: Student[];
    classes: ClassData[];
    filters: {
        class_id?: string;
    };
}

export default function StudentReport({ students, classes, filters }: Props) {
    const totalStudents = students.length;
    const avgGrade = students.reduce((sum, student) => sum + (student.average_grade || 0), 0) / totalStudents;

    return (
        <>
            <Head title="Student Report" />

            <div className="container mx-auto py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/reports">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Reports
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Student Report</h1>
                        <p className="text-muted-foreground">
                            Student information, performance, and class assignments
                        </p>
                    </div>
                </div>

                {/* Filter */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <select
                                className="border rounded px-3 py-2"
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
                    </CardContent>
                </Card>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{avgGrade.toFixed(1)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{students.length}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Student Details Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Student Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student Number</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Homeroom Teacher</TableHead>
                                    <TableHead>Avg Grade</TableHead>
                                    <TableHead>Subjects</TableHead>
                                    <TableHead>Latest Grade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell>
                                            <Badge variant="outline">{student.student_number}</Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div>
                                                <div>{student.name}</div>
                                                <div className="text-sm text-muted-foreground">{student.email}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {student.class.grade_level} - {student.class.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">
                                                        {student.class.teacher?.name || 'No Teacher'}
                                                    </div>
                                                    {student.class.teacher?.subject && (
                                                        <div className="text-sm text-muted-foreground">
                                                            {student.class.teacher.subject.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className={`px-2 py-1 rounded text-sm font-medium ${(student.average_grade || 0) >= 80 ? 'bg-green-100 text-green-800' :
                                                        (student.average_grade || 0) >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {student.average_grade?.toFixed(1) || 'N/A'}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {student.total_subjects || 0} subjects
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {student.latest_grade ? (
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="font-medium">{student.latest_grade.grade}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {student.latest_grade.subject.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">No grades</span>
                                            )}
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
