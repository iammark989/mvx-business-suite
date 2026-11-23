<?php

namespace Database\Seeders;

use App\Models\Uom;
use Illuminate\Database\Seeder;

class UomSeeder extends Seeder
{
    public function run(): void
    {
        $uoms = [
            ['code' => 'PCS', 'name' => 'Pieces'],
            ['code' => 'CASE', 'name' => 'Case'],
            ['code' => 'BOX', 'name' => 'Box'],
            ['code' => 'PACK', 'name' => 'Pack'],
            ['code' => 'BTL', 'name' => 'Bottle'],
            ['code' => 'SET', 'name' => 'Set'],
            ['code' => 'DOZ', 'name' => 'Dozen'],
            ['code' => 'KG', 'name' => 'Kilogram'],
            ['code' => 'G', 'name' => 'Gram'],
            ['code' => 'LTR', 'name' => 'Liter'],
            ['code' => 'ML', 'name' => 'Milliliter'],
            ['code' => 'M', 'name' => 'Meter'],
            ['code' => 'CM', 'name' => 'Centimeter'],
        ];

        foreach ($uoms as $uom) {
            Uom::firstOrCreate(
                ['code' => $uom['code']],
                [
                    'name' => $uom['name'],
                    'is_active' => true,
                ]
            );
        }
    }
}