<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class WarehouseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'code' => strtoupper(fake()->unique()->bothify('WH-####')),
            'name' => fake()->company() . ' Warehouse',
            'type' => 'MAIN',
            'description' => fake()->sentence(),
            'contact_person' => fake()->name(),
            'contact_number' => fake()->phoneNumber(),
            'email' => fake()->safeEmail(),
            'address' => fake()->address(),
            'is_active' => true,
        ];
    }
}