<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventory_stocks', function (Blueprint $table) {
            $table->id();

            $table->foreignId('item_id')
                ->constrained('items')
                ->restrictOnDelete();

            $table->foreignId('warehouse_id')
                ->constrained('warehouses')
                ->restrictOnDelete();

            // Stock is always stored using the item's base selling UOM.
            $table->decimal('quantity', 15, 4)->default(0);

            $table->timestamps();

            $table->unique(
                ['item_id', 'warehouse_id'],
                'inventory_stocks_item_warehouse_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventory_stocks');
    }
};