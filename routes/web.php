<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassRoomController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\ReportController;

Route::get('/', function () {
    return redirect()->route('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Resource routes for school management
    Route::resource('subjects', SubjectController::class);
    Route::resource('teachers', TeacherController::class);
    Route::resource('classes', ClassRoomController::class);
    Route::resource('students', StudentController::class);
    Route::resource('grades', GradeController::class);

    // Report routes
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('/', [ReportController::class, 'index'])->name('index');
        Route::get('classes', [ReportController::class, 'classReport'])->name('classes');
        Route::get('grades', [ReportController::class, 'gradeReport'])->name('grades');
        Route::get('students', [ReportController::class, 'studentReport'])->name('students');
        Route::get('teachers', [ReportController::class, 'teacherReport'])->name('teachers');
        Route::get('subjects', [ReportController::class, 'subjectReport'])->name('subjects');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
