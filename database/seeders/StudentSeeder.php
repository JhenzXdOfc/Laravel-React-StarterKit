<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample students for different classes
        $students = [
            // Class 1 students
            ['name' => 'Andi Pratama', 'email' => 'andi.pratama@student.com', 'phone' => '081234567001', 'student_number' => '2023001001', 'class_id' => 1, 'birth_date' => '2007-01-15', 'address' => 'Jl. Merdeka No. 1'],
            ['name' => 'Budi Santoso', 'email' => 'budi.santoso@student.com', 'phone' => '081234567002', 'student_number' => '2023001002', 'class_id' => 1, 'birth_date' => '2007-02-20', 'address' => 'Jl. Merdeka No. 2'],
            ['name' => 'Citra Dewi', 'email' => 'citra.dewi@student.com', 'phone' => '081234567003', 'student_number' => '2023001003', 'class_id' => 1, 'birth_date' => '2007-03-10', 'address' => 'Jl. Merdeka No. 3'],

            // Class 2 students
            ['name' => 'Dini Rahayu', 'email' => 'dini.rahayu@student.com', 'phone' => '081234567004', 'student_number' => '2023002001', 'class_id' => 2, 'birth_date' => '2007-04-12', 'address' => 'Jl. Pancasila No. 1'],
            ['name' => 'Eko Prasetyo', 'email' => 'eko.prasetyo@student.com', 'phone' => '081234567005', 'student_number' => '2023002002', 'class_id' => 2, 'birth_date' => '2007-05-18', 'address' => 'Jl. Pancasila No. 2'],
            ['name' => 'Fina Sari', 'email' => 'fina.sari@student.com', 'phone' => '081234567006', 'student_number' => '2023002003', 'class_id' => 2, 'birth_date' => '2007-06-25', 'address' => 'Jl. Pancasila No. 3'],

            // Class 3 students
            ['name' => 'Gilang Ramadhan', 'email' => 'gilang.ramadhan@student.com', 'phone' => '081234567007', 'student_number' => '2023003001', 'class_id' => 3, 'birth_date' => '2007-07-08', 'address' => 'Jl. Diponegoro No. 1'],
            ['name' => 'Hani Kartika', 'email' => 'hani.kartika@student.com', 'phone' => '081234567008', 'student_number' => '2023003002', 'class_id' => 3, 'birth_date' => '2007-08-14', 'address' => 'Jl. Diponegoro No. 2'],
            ['name' => 'Indra Mahendra', 'email' => 'indra.mahendra@student.com', 'phone' => '081234567009', 'student_number' => '2023003003', 'class_id' => 3, 'birth_date' => '2007-09-30', 'address' => 'Jl. Diponegoro No. 3'],

            // Class 4 students (XI IPA 1)
            ['name' => 'Joko Widodo', 'email' => 'joko.widodo@student.com', 'phone' => '081234567010', 'student_number' => '2022001001', 'class_id' => 4, 'birth_date' => '2006-01-20', 'address' => 'Jl. Sudirman No. 1'],
            ['name' => 'Kartika Sari', 'email' => 'kartika.sari@student.com', 'phone' => '081234567011', 'student_number' => '2022001002', 'class_id' => 4, 'birth_date' => '2006-02-15', 'address' => 'Jl. Sudirman No. 2'],
            ['name' => 'Luthfi Hakim', 'email' => 'luthfi.hakim@student.com', 'phone' => '081234567012', 'student_number' => '2022001003', 'class_id' => 4, 'birth_date' => '2006-03-22', 'address' => 'Jl. Sudirman No. 3'],
        ];

        foreach ($students as $student) {
            Student::create($student);
        }
    }
}
