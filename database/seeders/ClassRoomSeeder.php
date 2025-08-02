<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ClassRoom;

class ClassRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classes = [
            ['name' => 'IPA 1', 'grade_level' => 'X', 'teacher_id' => 1, 'capacity' => 30],
            ['name' => 'IPA 2', 'grade_level' => 'X', 'teacher_id' => 2, 'capacity' => 30],
            ['name' => 'IPS 1', 'grade_level' => 'X', 'teacher_id' => 3, 'capacity' => 30],
            ['name' => 'IPA 1', 'grade_level' => 'XI', 'teacher_id' => 4, 'capacity' => 25],
            ['name' => 'IPA 2', 'grade_level' => 'XI', 'teacher_id' => 5, 'capacity' => 25],
            ['name' => 'IPS 1', 'grade_level' => 'XI', 'teacher_id' => 6, 'capacity' => 25],
            ['name' => 'IPA 1', 'grade_level' => 'XII', 'teacher_id' => 7, 'capacity' => 20],
            ['name' => 'IPA 2', 'grade_level' => 'XII', 'teacher_id' => 8, 'capacity' => 20],
            ['name' => 'IPS 1', 'grade_level' => 'XII', 'teacher_id' => 9, 'capacity' => 20],
            ['name' => 'IPS 2', 'grade_level' => 'XII', 'teacher_id' => 10, 'capacity' => 20],
        ];

        foreach ($classes as $class) {
            ClassRoom::create($class);
        }
    }
}
