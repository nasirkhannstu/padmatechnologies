<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        DB::table('users')->insert([
            'name' => 'Nasir Khan',
            'email' => 'nasir@gmail.com',
            'password' => Hash::make('123123123'),
            'role' => 'admin',
        ]);
    }
}
