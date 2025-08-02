<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Student;
use App\Models\Subject;
use App\Models\ClassRoom;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index()
    {
        // Get all data for comprehensive dashboard
        $classes = ClassRoom::with(['teacher.subject', 'students'])
            ->withCount('students')
            ->orderBy('grade_level')
            ->orderBy('name')
            ->get();

        $students = Student::with(['class.teacher'])
            ->orderBy('name')
            ->get();

        $grades = Grade::with(['student.class', 'subject', 'teacher'])
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get();

        $subjects = Subject::with(['teachers'])
            ->withCount(['teachers', 'grades'])
            ->orderBy('name')
            ->get();

        $teachers = Teacher::with(['subject'])
            ->orderBy('name')
            ->get();

        // Calculate statistics for each student
        $students->each(function ($student) {
            $studentGrades = $student->grades;
            $student->average_grade = $studentGrades->avg('grade') ?: 0;
            $student->total_subjects = $studentGrades->unique('subject_id')->count();
        });

        // Calculate statistics for each subject
        $subjects->each(function ($subject) {
            $subjectGrades = $subject->grades;
            $subject->average_grade = $subjectGrades->avg('grade') ?: 0;
            $subject->total_students = $subjectGrades->unique('student_id')->count();
        });

        // Calculate summary statistics
        $summary = [
            'totalClasses' => $classes->count(),
            'totalStudents' => $students->count(),
            'totalTeachers' => $teachers->count(),
            'totalSubjects' => $subjects->count(),
            'averageGrade' => $grades->avg('grade') ?: 0,
            'totalCapacity' => $classes->sum('capacity'),
            'utilizationRate' => $classes->sum('capacity') > 0 ?
                ($classes->sum('students_count') / $classes->sum('capacity')) * 100 : 0,
        ];

        return Inertia::render('Reports/Dashboard', [
            'classes' => $classes,
            'students' => $students,
            'grades' => $grades,
            'subjects' => $subjects,
            'teachers' => $teachers,
            'summary' => $summary
        ]);
    }

    public function classReport()
    {
        $classes = ClassRoom::with(['teacher.subject', 'students'])
            ->withCount('students')
            ->orderBy('grade_level')
            ->orderBy('name')
            ->get();

        return Inertia::render('Reports/ClassReport', [
            'classes' => $classes
        ]);
    }

    public function gradeReport(Request $request)
    {
        $query = Grade::with(['student.class', 'subject', 'teacher'])
            ->orderBy('created_at', 'desc');

        if ($request->filled('class_id')) {
            $query->whereHas('student', function ($q) use ($request) {
                $q->where('class_id', $request->class_id);
            });
        }

        if ($request->filled('subject_id')) {
            $query->where('subject_id', $request->subject_id);
        }

        if ($request->filled('semester')) {
            $query->where('semester', $request->semester);
        }

        $grades = $query->get();

        // Calculate average grades
        $averageGrade = $grades->avg('grade');
        $totalStudents = $grades->unique('student_id')->count();

        $classes = ClassRoom::orderBy('grade_level')->orderBy('name')->get();
        $subjects = Subject::orderBy('name')->get();

        return Inertia::render('Reports/GradeReport', [
            'grades' => $grades,
            'averageGrade' => round($averageGrade, 2),
            'totalStudents' => $totalStudents,
            'classes' => $classes,
            'subjects' => $subjects,
            'filters' => $request->only(['class_id', 'subject_id', 'semester'])
        ]);
    }

    public function studentReport(Request $request)
    {
        $query = Student::with(['class.teacher.subject', 'grades.subject', 'grades.teacher'])
            ->orderBy('name');

        if ($request->filled('class_id')) {
            $query->where('class_id', $request->class_id);
        }

        $students = $query->get();

        // Calculate grade statistics for each student
        $students->each(function ($student) {
            $grades = $student->grades;
            $student->average_grade = $grades->avg('grade');
            $student->total_subjects = $grades->unique('subject_id')->count();
            $student->latest_grade = $grades->sortByDesc('created_at')->first();
        });

        $classes = ClassRoom::orderBy('grade_level')->orderBy('name')->get();

        return Inertia::render('Reports/StudentReport', [
            'students' => $students,
            'classes' => $classes,
            'filters' => $request->only(['class_id'])
        ]);
    }

    public function teacherReport()
    {
        $teachers = Teacher::with(['subject', 'classes', 'grades.student'])
            ->withCount(['classes', 'grades'])
            ->orderBy('name')
            ->get();

        // Calculate grade statistics for each teacher
        $teachers->each(function ($teacher) {
            $grades = $teacher->grades;
            $teacher->average_grade = $grades->avg('grade');
            $teacher->total_students = $grades->unique('student_id')->count();
        });

        return Inertia::render('Reports/TeacherReport', [
            'teachers' => $teachers
        ]);
    }

    public function subjectReport()
    {
        $subjects = Subject::with(['teachers', 'grades.student'])
            ->withCount(['teachers', 'grades'])
            ->orderBy('name')
            ->get();

        // Calculate grade statistics for each subject
        $subjects->each(function ($subject) {
            $grades = $subject->grades;
            $subject->average_grade = $grades->avg('grade');
            $subject->total_students = $grades->unique('student_id')->count();
        });

        return Inertia::render('Reports/SubjectReport', [
            'subjects' => $subjects
        ]);
    }
}
