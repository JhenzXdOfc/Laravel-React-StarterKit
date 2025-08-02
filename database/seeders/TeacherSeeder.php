<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Teacher;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            ['name' => 'Dr. Ahmad Hidayat', 'email' => 'ahmad.hidayat@school.com', 'phone' => '081234567890', 'nip' => '196501011990031001', 'subject_id' => 1],
            ['name' => 'Siti Nurjannah, S.Pd', 'email' => 'siti.nurjannah@school.com', 'phone' => '081234567891', 'nip' => '196801011991032001', 'subject_id' => 2],
            ['name' => 'John Smith, M.Ed', 'email' => 'john.smith@school.com', 'phone' => '081234567892', 'nip' => '197001011992033001', 'subject_id' => 3],
            ['name' => 'Dr. Maria Ulfa', 'email' => 'maria.ulfa@school.com', 'phone' => '081234567893', 'nip' => '196701011993034001', 'subject_id' => 4],
            ['name' => 'Prof. Budi Santoso', 'email' => 'budi.santoso@school.com', 'phone' => '081234567894', 'nip' => '196901011994035001', 'subject_id' => 5],
            ['name' => 'Dr. Ratna Sari', 'email' => 'ratna.sari@school.com', 'phone' => '081234567895', 'nip' => '197101011995036001', 'subject_id' => 6],
            ['name' => 'Drs. Supriyanto', 'email' => 'supriyanto@school.com', 'phone' => '081234567896', 'nip' => '196601011996037001', 'subject_id' => 7],
            ['name' => 'Dr. Indira Lestari', 'email' => 'indira.lestari@school.com', 'phone' => '081234567897', 'nip' => '196901011997038001', 'subject_id' => 8],
            ['name' => 'M. Rizki Pratama, S.E', 'email' => 'rizki.pratama@school.com', 'phone' => '081234567898', 'nip' => '197201011998039001', 'subject_id' => 9],
            ['name' => 'Dr. Fitri Handayani', 'email' => 'fitri.handayani@school.com', 'phone' => '081234567899', 'nip' => '197101011999040001', 'subject_id' => 10],
        ];

        foreach ($teachers as $teacher) {
            Teacher::create($teacher);
        }
    }
}
