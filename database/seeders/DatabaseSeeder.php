<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
        ]);

        // Run school system seeders
        $this->call([
            SubjectSeeder::class,
            TeacherSeeder::class,
            ClassRoomSeeder::class,
            StudentSeeder::class,
            GradeSeeder::class,
        ]);
    }
}
