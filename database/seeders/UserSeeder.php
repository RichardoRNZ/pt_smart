<?php

namespace Database\Seeders;

use DB;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'username' => 'admin',
            'password' => Hash::make('12345'),
            'roles' => 'admin'
        ]);
        DB::table('users')->insert([
            'username' => 'manager',
            'password' => Hash::make('12345'),
            'roles' => 'manager'
        ]);
    }
}
