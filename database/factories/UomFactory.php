<?php

namespace Database\Factories;

use App\Models\Uom;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Uom>
 */
class UomFactory extends Factory
{
    public function definition(): array
    {
        return [
            'code' => strtoupper(fake()->unique()->bothify('UOM-####')),
            'name' => fake()->unique()->word(),
            'measurement_type' => 'quantity',
            'description' => fake()->sentence(),
            'is_active' => true,
        ];
    }
}