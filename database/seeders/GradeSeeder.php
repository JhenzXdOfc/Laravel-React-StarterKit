<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Grade;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grades = [
            // Student 1 grades
            ['student_id' => 1, 'subject_id' => 1, 'teacher_id' => 1, 'semester' => '1', 'grade' => 85.5, 'notes' => 'Good performance'],
            ['student_id' => 1, 'subject_id' => 2, 'teacher_id' => 2, 'semester' => '1', 'grade' => 78.0, 'notes' => 'Need improvement in writing'],
            ['student_id' => 1, 'subject_id' => 3, 'teacher_id' => 3, 'semester' => '1', 'grade' => 92.0, 'notes' => 'Excellent speaking skills'],

            // Student 2 grades
            ['student_id' => 2, 'subject_id' => 1, 'teacher_id' => 1, 'semester' => '1', 'grade' => 76.5, 'notes' => 'Average performance'],
            ['student_id' => 2, 'subject_id' => 2, 'teacher_id' => 2, 'semester' => '1', 'grade' => 88.0, 'notes' => 'Good comprehension'],
            ['student_id' => 2, 'subject_id' => 3, 'teacher_id' => 3, 'semester' => '1', 'grade' => 82.5, 'notes' => 'Good effort'],

            // Student 3 grades
            ['student_id' => 3, 'subject_id' => 1, 'teacher_id' => 1, 'semester' => '1', 'grade' => 90.0, 'notes' => 'Outstanding mathematical ability'],
            ['student_id' => 3, 'subject_id' => 2, 'teacher_id' => 2, 'semester' => '1', 'grade' => 85.5, 'notes' => 'Creative writing'],
            ['student_id' => 3, 'subject_id' => 3, 'teacher_id' => 3, 'semester' => '1', 'grade' => 87.0, 'notes' => 'Good pronunciation'],

            // Student 4 grades
            ['student_id' => 4, 'subject_id' => 1, 'teacher_id' => 1, 'semester' => '1', 'grade' => 79.5, 'notes' => 'Needs more practice'],
            ['student_id' => 4, 'subject_id' => 2, 'teacher_id' => 2, 'semester' => '1', 'grade' => 91.0, 'notes' => 'Excellent essays'],
            ['student_id' => 4, 'subject_id' => 3, 'teacher_id' => 3, 'semester' => '1', 'grade' => 84.0, 'notes' => 'Good progress'],

            // Student 5 grades
            ['student_id' => 5, 'subject_id' => 1, 'teacher_id' => 1, 'semester' => '1', 'grade' => 88.5, 'notes' => 'Consistent performance'],
            ['student_id' => 5, 'subject_id' => 2, 'teacher_id' => 2, 'semester' => '1', 'grade' => 83.0, 'notes' => 'Good analysis'],
            ['student_id' => 5, 'subject_id' => 3, 'teacher_id' => 3, 'semester' => '1', 'grade' => 89.5, 'notes' => 'Very good communication'],

            // Add some grades for other students
            ['student_id' => 6, 'subject_id' => 4, 'teacher_id' => 4, 'semester' => '1', 'grade' => 77.0, 'notes' => 'Understanding physics concepts'],
            ['student_id' => 7, 'subject_id' => 5, 'teacher_id' => 5, 'semester' => '1', 'grade' => 93.5, 'notes' => 'Excellent laboratory work'],
            ['student_id' => 8, 'subject_id' => 6, 'teacher_id' => 6, 'semester' => '1', 'grade' => 86.0, 'notes' => 'Good biological understanding'],
            ['student_id' => 9, 'subject_id' => 7, 'teacher_id' => 7, 'semester' => '1', 'grade' => 81.5, 'notes' => 'Good historical analysis'],
            ['student_id' => 10, 'subject_id' => 8, 'teacher_id' => 8, 'semester' => '1', 'grade' => 89.0, 'notes' => 'Excellent geographical knowledge'],
        ];

        foreach ($grades as $grade) {
            Grade::create($grade);
        }
    }
}
