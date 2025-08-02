import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, ArrowLeft, GraduationCap } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot password" />

            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-center">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">School Management</h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">System</p>
                            </div>
                        </div>
                    </div>

                    {/* Status Alert */}
                    {status && (
                        <Alert className="mb-6 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
                            <AlertDescription>{status}</AlertDescription>
                        </Alert>
                    )}

                    {/* Forgot Password Card */}
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                        <CardHeader className="space-y-2 pb-4">
                            <CardTitle className="text-2xl font-semibold text-center">Reset Password</CardTitle>
                            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                                Enter your email address and we'll send you a link to reset your password
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-6" onSubmit={submit}>
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Enter your email address"
                                            className="pl-10 h-11 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                    {processing ? 'Sending...' : 'Send Password Reset Email'}
                                </Button>
                            </form>

                            {/* Back to Login Link */}
                            <div className="mt-6 text-center">
                                <TextLink
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to sign in
                                </TextLink>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            © 2025 School Management System. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
