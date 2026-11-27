<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    protected $fillable = [
        'item_number',
        'description',
        'short_description',
        'category_id',
        'brand_id',
        'purchase_uom_id',
        'selling_uom_id',
        'purchase_conversion_qty',
        'weight',
        'weight_uom_id',
        'tax_classification',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'purchase_conversion_qty' => 'decimal:4',
            'weight' => 'decimal:4',
            'is_active' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function purchaseUom(): BelongsTo
    {
        return $this->belongsTo(Uom::class, 'purchase_uom_id');
    }

    public function sellingUom(): BelongsTo
    {
        return $this->belongsTo(Uom::class, 'selling_uom_id');
    }

    public function weightUom(): BelongsTo
    {
        return $this->belongsTo(Uom::class, 'weight_uom_id');
    }

    public function prices(): HasMany
    {
        return $this->hasMany(ItemPrice::class);
    }
}