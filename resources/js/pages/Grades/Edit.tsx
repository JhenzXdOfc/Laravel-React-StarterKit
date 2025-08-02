import { FormEvent, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
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
        title: 'Edit',
        href: '#',
    },
];

interface Student {
    id: number;
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
}

interface GradeData {
    id: number;
    student_id: number;
    subject_id: number;
    teacher_id: number;
    semester: string;
    grade: string;
    notes?: string;
    student?: Student;
    subject?: {
        id: number;
        name: string;
        code: string;
    };
    teacher?: {
        id: number;
        name: string;
    };
}

interface Errors {
    student_id?: string;
    subject_id?: string;
    teacher_id?: string;
    grade?: string;
    semester?: string;
    notes?: string;
}

interface Props {
    grade: GradeData;
    students: Student[];
    subjects: { id: number; name: string; code: string; }[];
    teachers: { id: number; name: string; }[];
    errors: Errors;
}

export default function Edit({ grade, students, subjects, teachers, errors }: Props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        student_id: grade.student_id?.toString() || '',
        subject_id: grade.subject_id?.toString() || '',
        teacher_id: grade.teacher_id?.toString() || '',
        grade: grade.grade || '',
        semester: grade.semester || '',
        notes: grade.notes || '',
    });

    const semesters = ['1', '2'];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.put(`/grades/${grade.id}`, data, {
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Grade - ${grade.student?.name || 'Student'}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/grades">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Grades
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Edit Grade</h1>
                        <p className="text-muted-foreground">Update grade information</p>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Grade Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="student_id">Student</Label>
                                <Select
                                    value={data.student_id}
                                    onValueChange={(value) => setData({ ...data, student_id: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a student" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {students.map((student) => (
                                            <SelectItem key={student.id} value={student.id.toString()}>
                                                {student.student_id} - {student.name} ({student.class?.name})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.student_id && (
                                    <p className="text-sm text-red-500">{errors.student_id}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="subject_id">Subject</Label>
                                    <Select
                                        value={data.subject_id}
                                        onValueChange={(value) => setData({ ...data, subject_id: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects.map((subject) => (
                                                <SelectItem key={subject.id} value={subject.id.toString()}>
                                                    {subject.code} - {subject.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.subject_id && (
                                        <p className="text-sm text-red-500">{errors.subject_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="teacher_id">Teacher</Label>
                                    <Select
                                        value={data.teacher_id}
                                        onValueChange={(value) => setData({ ...data, teacher_id: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select teacher" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {teachers.map((teacher) => (
                                                <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                                    {teacher.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.teacher_id && (
                                        <p className="text-sm text-red-500">{errors.teacher_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="grade">Grade</Label>
                                    <Input
                                        id="grade"
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={data.grade}
                                        onChange={(e) => setData({ ...data, grade: e.target.value })}
                                        placeholder="Enter grade (0-100)"
                                        required
                                    />
                                    {errors.grade && (
                                        <p className="text-sm text-red-500">{errors.grade}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="semester">Semester</Label>
                                    <Select
                                        value={data.semester}
                                        onValueChange={(value) => setData({ ...data, semester: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select semester" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {semesters.map((semester) => (
                                                <SelectItem key={semester} value={semester}>
                                                    Semester {semester}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.semester && (
                                        <p className="text-sm text-red-500">{errors.semester}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData({ ...data, notes: e.target.value })}
                                    placeholder="Enter any additional notes"
                                    rows={3}
                                />
                                {errors.notes && (
                                    <p className="text-sm text-red-500">{errors.notes}</p>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Grade'}
                                </Button>
                                <Link href="/grades">
                                    <Button variant="outline">Cancel</Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
