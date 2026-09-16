<?php

namespace Database\Seeders;

use App\Models\Medicine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Medicine::firstOrCreate(['brand_name' => 'Paracetamol'], ['category' => 'Analgesic', 'stock_quantity' => 100]);
    }
}
