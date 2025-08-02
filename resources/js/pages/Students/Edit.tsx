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
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

interface StudentData {
    id: number;
    name: string;
    email: string;
    phone: string;
    student_number: string;
    birth_date: string;
    address: string;
    class_id: number;
    class?: ClassData;
}

interface ClassData {
    id: number;
    name: string;
    grade_level: string;
}

interface Errors {
    name?: string;
    email?: string;
    phone?: string;
    student_number?: string;
    birth_date?: string;
    address?: string;
    class_id?: string;
}

interface Props {
    student: StudentData;
    classes: ClassData[];
    errors: Errors;
}

export default function Edit({ student, classes, errors }: Props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        student_number: student.student_number || '',
        birth_date: student.birth_date || '',
        address: student.address || '',
        class_id: student.class_id?.toString() || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.put(`/students/${student.id}`, data, {
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Student - ${student.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/students">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Students
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Edit Student</h1>
                        <p className="text-muted-foreground">Update student information</p>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Student Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        placeholder="Enter student name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="student_number">Student Number</Label>
                                    <Input
                                        id="student_number"
                                        value={data.student_number}
                                        onChange={(e) => setData({ ...data, student_number: e.target.value.toUpperCase() })}
                                        placeholder="Enter student number"
                                        required
                                    />
                                    {errors.student_number && (
                                        <p className="text-sm text-red-500">{errors.student_number}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        placeholder="Enter email address"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-500">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="birth_date">Birth Date</Label>
                                    <Input
                                        id="birth_date"
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData({ ...data, birth_date: e.target.value })}
                                        required
                                    />
                                    {errors.birth_date && (
                                        <p className="text-sm text-red-500">{errors.birth_date}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData({ ...data, address: e.target.value })}
                                        placeholder="Enter student address"
                                        rows={3}
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-red-500">{errors.address}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="class_id">Class</Label>
                                <Select
                                    value={data.class_id}
                                    onValueChange={(value) => setData({ ...data, class_id: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map((classItem) => (
                                            <SelectItem key={classItem.id} value={classItem.id.toString()}>
                                                {classItem.name} - Grade {classItem.grade_level}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.class_id && (
                                    <p className="text-sm text-red-500">{errors.class_id}</p>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Student'}
                                </Button>
                                <Link href="/students">
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
