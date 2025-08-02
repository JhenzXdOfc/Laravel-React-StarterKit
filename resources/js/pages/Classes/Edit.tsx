import { FormEvent, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        title: 'Classes',
        href: '/classes',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

interface Teacher {
    id: number;
    name: string;
    subject: {
        name: string;
        code: string;
    };
}

interface ClassData {
    id: number;
    name: string;
    grade_level: string;
    capacity: number;
    teacher_id: number;
    teacher?: Teacher;
}

interface Errors {
    name?: string;
    grade_level?: string;
    capacity?: string;
    teacher_id?: string;
}

interface Props {
    class: ClassData;
    teachers: Teacher[];
    errors: Errors;
}

export default function Edit({ class: classRoom, teachers, errors }: Props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: classRoom.name || '',
        grade_level: classRoom.grade_level || '',
        capacity: classRoom.capacity?.toString() || '30',
        teacher_id: classRoom.teacher_id?.toString() || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.put(`/classes/${classRoom.id}`, data, {
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Class - ${classRoom.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/classes">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Classes
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Edit Class</h1>
                        <p className="text-muted-foreground">Update class information</p>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Class Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Class Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    placeholder="Enter class name"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="teacher_id">Teacher</Label>
                                <Select
                                    value={data.teacher_id}
                                    onValueChange={(value) => setData({ ...data, teacher_id: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a teacher" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teachers.map((teacher) => (
                                            <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                                {teacher.name} ({teacher.subject?.code} - {teacher.subject?.name})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.teacher_id && (
                                    <p className="text-sm text-red-500">{errors.teacher_id}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="grade_level">Tingkat Kelas</Label>
                                <Input
                                    id="grade_level"
                                    type="text"
                                    placeholder="Masukkan tingkat kelas (mis: 10, 11, 12)"
                                    value={data.grade_level}
                                    onChange={(e) => setData({ ...data, grade_level: e.target.value })}
                                    className={errors.grade_level ? "border-red-500" : ""}
                                />
                                {errors.grade_level && (
                                    <p className="text-sm text-red-500">{errors.grade_level}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="capacity">Kapasitas</Label>
                                <Input
                                    id="capacity"
                                    type="number"
                                    placeholder="Masukkan kapasitas kelas"
                                    value={data.capacity}
                                    onChange={(e) => setData({ ...data, capacity: e.target.value })}
                                    className={errors.capacity ? "border-red-500" : ""}
                                    min="1"
                                    max="50"
                                />
                                {errors.capacity && (
                                    <p className="text-sm text-red-500">{errors.capacity}</p>
                                )}
                            </div>                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Class'}
                                </Button>
                                <Link href="/classes">
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
