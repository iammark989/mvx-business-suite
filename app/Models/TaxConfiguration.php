<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaxConfiguration extends Model
{
    protected $fillable = [
        'code',
        'name',
        'classification',
        'rate',
        'description',
        'effective_from',
        'effective_until',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'rate' => 'decimal:4',
            'effective_from' => 'date',
            'effective_until' => 'date',
            'is_active' => 'boolean',
        ];
    }
}