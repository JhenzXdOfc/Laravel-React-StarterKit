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
        title: 'Create',
        href: '/classes/create',
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

interface Errors {
    name?: string;
    grade_level?: string;
    capacity?: string;
    teacher_id?: string;
}

interface Props {
    teachers: Teacher[];
    errors: Errors;
}

export default function Create({ teachers, errors }: Props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        grade_level: '',
        capacity: '30',
        teacher_id: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.post('/classes', data, {
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Class" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/classes">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Classes
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Create Class</h1>
                        <p className="text-muted-foreground">Add a new class to the system</p>
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="grade_level">Grade Level</Label>
                                    <Select
                                        value={data.grade_level}
                                        onValueChange={(value) => setData({ ...data, grade_level: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select grade level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="X">Grade X</SelectItem>
                                            <SelectItem value="XI">Grade XI</SelectItem>
                                            <SelectItem value="XII">Grade XII</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.grade_level && (
                                        <p className="text-sm text-red-500">{errors.grade_level}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="capacity">Class Capacity</Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={data.capacity}
                                        onChange={(e) => setData({ ...data, capacity: e.target.value })}
                                        placeholder="Enter class capacity"
                                        required
                                    />
                                    {errors.capacity && (
                                        <p className="text-sm text-red-500">{errors.capacity}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Creating...' : 'Create Class'}
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
