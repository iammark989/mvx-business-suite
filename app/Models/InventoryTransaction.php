<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryTransaction extends Model
{
    protected $fillable = [
        'item_id',
        'warehouse_id',
        'transaction_type',
        'reference_number',
        'quantity_in',
        'quantity_out',
        'balance_after',
        'transaction_date',
        'created_by',
        'remarks',
    ];

    protected function casts(): array
    {
        return [
            'quantity_in' => 'decimal:4',
            'quantity_out' => 'decimal:4',
            'balance_after' => 'decimal:4',
            'transaction_date' => 'datetime',
        ];
    }

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}