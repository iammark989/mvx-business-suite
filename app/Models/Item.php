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
        'image',
        'short_description',
        'category_id',
        'brand_id',
        'default_supplier_id',
        'purchase_uom_id',
        'selling_uom_id',
        'purchase_qty',
        'selling_qty',
        'weight_grams',
        'tax_classification',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'purchase_qty' => 'decimal:4',
            'selling_qty' => 'decimal:4',
            'weight_grams' => 'decimal:4',
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

    public function defaultSupplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'default_supplier_id');
    }

    public function sellingUom(): BelongsTo
    {
        return $this->belongsTo(Uom::class, 'selling_uom_id');
    }

    public function prices(): HasMany
    {
        return $this->hasMany(ItemPrice::class);
    }

    public function inventoryStocks(): HasMany
    {
        return $this->hasMany(InventoryStock::class);
    }

    public function inventoryTransactions(): HasMany
    {
        return $this->hasMany(InventoryTransaction::class);
    }
}