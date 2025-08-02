import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
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
];

interface Grade {
    id: number;
    student_id: number;
    grade: number;
    semester: string;
    academic_year: string;
    student: {
        name: string;
        student_id: string;
        class: {
            name: string;
            teacher: {
                name: string;
                subject: {
                    name: string;
                    code: string;
                };
            };
        };
    };
    created_at: string;
    updated_at: string;
}

interface Props {
    grades: Grade[];
}

export default function Index({ grades }: Props) {
    const [loading, setLoading] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this grade?')) {
            setLoading(id);
            router.delete(`/grades/${id}`, {
                onFinish: () => setLoading(null),
            });
        }
    };

    const getGradeBadgeVariant = (grade: number) => {
        if (grade >= 85) return 'default';
        if (grade >= 75) return 'secondary';
        return 'destructive';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Grades" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Grades</h1>
                        <p className="text-muted-foreground">Manage student grades</p>
                    </div>
                    <Link href="/grades/create">
                        <Button className="flex items-center gap-2">
                            <PlusCircle className="h-4 w-4" />
                            Add Grade
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Grades</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>Academic Year</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {grades.map((grade) => (
                                    <TableRow key={grade.id}>
                                        <TableCell>
                                            <Badge variant="outline">{grade.student?.student_id}</Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">{grade.student?.name}</TableCell>
                                        <TableCell>{grade.student?.class?.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {grade.student?.class?.teacher?.subject?.code} - {grade.student?.class?.teacher?.subject?.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getGradeBadgeVariant(grade.grade)}>
                                                {grade.grade}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{grade.semester}</TableCell>
                                        <TableCell>{grade.academic_year}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(grade.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/grades/${grade.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/grades/${grade.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(grade.id)}
                                                    disabled={loading === grade.id}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
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
