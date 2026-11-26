<?php

namespace Database\Seeders;

use App\Models\PriceType;
use Illuminate\Database\Seeder;

class PriceTypeSeeder extends Seeder
{
    public function run(): void
    {
        $priceTypes = [
            [
                'code' => 'PUR',
                'name' => 'Purchase Price',
                'description' => 'Price paid when purchasing items from suppliers.',
                'is_active' => true,
            ],
            [
                'code' => 'RET',
                'name' => 'Retail Price',
                'description' => 'Standard selling price for retail or individual-piece sales.',
                'is_active' => true,
            ],
        ];

        foreach ($priceTypes as $priceType) {
            PriceType::updateOrCreate(
                ['code' => $priceType['code']],
                $priceType
            );
        }
    }
}