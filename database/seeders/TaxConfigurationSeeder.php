<?php

namespace Database\Seeders;

use App\Models\TaxConfiguration;
use Illuminate\Database\Seeder;

class TaxConfigurationSeeder extends Seeder
{
    public function run(): void
    {
        $configurations = [
            [
                'code' => 'VAT',
                'name' => 'VATable',
                'classification' => 'VAT',
                'rate' => 12.0000,
                'description' => 'Subject to Value Added Tax.',
            ],
            [
                'code' => 'VAT-EX',
                'name' => 'VAT-Exempt',
                'classification' => 'VAT-EX',
                'rate' => 0.0000,
                'description' => 'Exempt from Value Added Tax.',
            ],
            [
                'code' => 'ZERO',
                'name' => 'Zero-Rated',
                'classification' => 'ZERO',
                'rate' => 0.0000,
                'description' => 'Subject to VAT at zero percent.',
            ],
            [
                'code' => 'NON-VAT',
                'name' => 'Not Subject to VAT',
                'classification' => 'NON-VAT',
                'rate' => 0.0000,
                'description' => 'Not subject to Value Added Tax.',
            ],
        ];

        foreach ($configurations as $configuration) {
            TaxConfiguration::firstOrCreate(
                [
                    'code' => $configuration['code'],
                    'effective_from' => '2026-01-01',
                ],
                array_merge($configuration, [
                    'effective_from' => '2026-01-01',
                    'effective_until' => null,
                    'is_active' => true,
                ])
            );
        }
    }
}