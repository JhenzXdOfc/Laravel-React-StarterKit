import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Users } from 'lucide-react';
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
        title: 'Details',
        href: '#',
    },
];

interface Teacher {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: {
        name: string;
        code: string;
    };
}

interface Student {
    id: number;
    name: string;
    student_id: string;
    email: string;
}

interface ClassData {
    id: number;
    name: string;
    description: string;
    teacher: Teacher;
    students: Student[];
}

interface Props {
    class: ClassData;
}

export default function Show({ class: classRoom }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Class Details - ${classRoom?.name || 'Class'}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/classes">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Classes
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">{classRoom?.name || 'Class'}</h1>
                            <p className="text-muted-foreground">Class Details</p>
                        </div>
                    </div>
                    <Link href={`/classes/${classRoom?.id}/edit`}>
                        <Button>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Class
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Class Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Class Name</label>
                                <p className="text-lg">{classRoom?.name || 'N/A'}</p>
                            </div>

                            {classRoom?.description && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="text-sm">{classRoom.description}</p>
                                </div>
                            )}                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Total Students</label>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span className="text-lg">{classRoom.students?.length || 0} students</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Teacher Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Teacher</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Teacher Name</label>
                                <p className="text-lg">{classRoom?.teacher?.name || 'No teacher assigned'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">
                                        {classRoom?.teacher?.subject?.code || 'N/A'}
                                    </Badge>
                                    <span>{classRoom?.teacher?.subject?.name || 'No subject'}</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Contact</label>
                                <div className="space-y-1">
                                    <p className="text-sm">{classRoom?.teacher?.email || 'No email'}</p>
                                    <p className="text-sm">{classRoom?.teacher?.phone || 'No phone'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Students List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Students in this Class</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {classRoom?.students && classRoom.students.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {classRoom.students.map((student) => (
                                    <div
                                        key={student?.id}
                                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="font-medium">{student?.name || 'Unknown'}</div>
                                        <div className="text-sm text-muted-foreground">
                                            ID: {student?.student_id || 'N/A'}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {student?.email || 'No email'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No students enrolled in this class yet.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
