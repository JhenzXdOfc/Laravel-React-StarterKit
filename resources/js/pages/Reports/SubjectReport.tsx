import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, BookOpen, Users, GraduationCap } from 'lucide-react';

interface Teacher {
    id: number;
    name: string;
    nip: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
    description: string;
    teachers: Teacher[];
    teachers_count: number;
    grades_count: number;
    average_grade?: number;
    total_students?: number;
}

interface Props {
    subjects: Subject[];
}

export default function SubjectReport({ subjects }: Props) {
    const totalSubjects = subjects.length;
    const totalTeachers = subjects.reduce((sum, subject) => sum + subject.teachers_count, 0);
    const totalGrades = subjects.reduce((sum, subject) => sum + subject.grades_count, 0);
    const avgGrade = subjects.reduce((sum, subject) => sum + (subject.average_grade || 0), 0) / totalSubjects;

    return (
        <>
            <Head title="Subject Report" />

            <div className="container mx-auto py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/reports">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Reports
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Subject Report</h1>
                        <p className="text-muted-foreground">
                            Subject information, teachers, and grade statistics
                        </p>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalSubjects}</div>
                        </CardContent>
                    </Card>
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
                            <CardTitle className="text-sm font-medium">Total Grades</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalGrades}</div>
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
                </div>

                {/* Subject Details Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Subject Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Subject Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Teachers</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Grades</TableHead>
                                    <TableHead>Avg Grade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjects.map((subject) => (
                                    <TableRow key={subject.id}>
                                        <TableCell>
                                            <Badge variant="outline">{subject.code}</Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">{subject.name}</TableCell>
                                        <TableCell className="text-muted-foreground max-w-xs truncate">
                                            {subject.description || 'No description'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                {subject.teachers.map((teacher) => (
                                                    <div key={teacher.id} className="flex items-center gap-2">
                                                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                        <div>
                                                            <div className="font-medium text-sm">{teacher.name}</div>
                                                            <div className="text-xs text-muted-foreground">{teacher.nip}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {subject.teachers.length === 0 && (
                                                    <span className="text-muted-foreground text-sm">No teachers</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                {subject.total_students || 0}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {subject.grades_count} grades
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className={`px-2 py-1 rounded text-sm font-medium ${(subject.average_grade || 0) >= 80 ? 'bg-green-100 text-green-800' :
                                                    (subject.average_grade || 0) >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {subject.average_grade?.toFixed(1) || 'N/A'}
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
