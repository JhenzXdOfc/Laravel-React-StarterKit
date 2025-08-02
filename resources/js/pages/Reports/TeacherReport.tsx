import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users, GraduationCap } from 'lucide-react';

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface ClassData {
    id: number;
    name: string;
    grade_level: string;
}

interface Teacher {
    id: number;
    name: string;
    email: string;
    phone: string;
    nip: string;
    subject: Subject;
    classes: ClassData[];
    classes_count: number;
    grades_count: number;
    average_grade?: number;
    total_students?: number;
}

interface Props {
    teachers: Teacher[];
}

export default function TeacherReport({ teachers }: Props) {
    const totalTeachers = teachers.length;
    const totalClasses = teachers.reduce((sum, teacher) => sum + teacher.classes_count, 0);
    const avgGrade = teachers.reduce((sum, teacher) => sum + (teacher.average_grade || 0), 0) / totalTeachers;

    return (
        <>
            <Head title="Teacher Report" />

            <div className="container mx-auto py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/reports">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Reports
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Teacher Report</h1>
                        <p className="text-muted-foreground">
                            Teacher information, subjects, and class assignments
                        </p>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalTeachers}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalClasses}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Average Grade Given</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{avgGrade.toFixed(1)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Grades</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {teachers.reduce((sum, teacher) => sum + teacher.grades_count, 0)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Teacher Details Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Teacher Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>NIP</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Classes</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Grades Given</TableHead>
                                    <TableHead>Avg Grade</TableHead>
                                    <TableHead>Contact</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teachers.map((teacher) => (
                                    <TableRow key={teacher.id}>
                                        <TableCell>
                                            <Badge variant="outline">{teacher.nip}</Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">{teacher.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">
                                                {teacher.subject ?
                                                    `${teacher.subject.code} - ${teacher.subject.name}` :
                                                    'No Subject'
                                                }
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                {teacher.classes.map((cls) => (
                                                    <Badge key={cls.id} variant="outline" className="mr-1 mb-1">
                                                        {cls.grade_level} - {cls.name}
                                                    </Badge>
                                                ))}
                                                {teacher.classes.length === 0 && (
                                                    <span className="text-muted-foreground text-sm">No classes</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                {teacher.total_students || 0}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {teacher.grades_count} grades
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className={`px-2 py-1 rounded text-sm font-medium ${(teacher.average_grade || 0) >= 80 ? 'bg-green-100 text-green-800' :
                                                    (teacher.average_grade || 0) >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {teacher.average_grade?.toFixed(1) || 'N/A'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="text-sm">{teacher.email}</div>
                                                <div className="text-sm text-muted-foreground">{teacher.phone}</div>
                                            </div>
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
