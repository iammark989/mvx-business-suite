<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('item_prices', function (Blueprint $table) {
            $table->id();

            $table->foreignId('item_id')
                ->constrained('items')
                ->cascadeOnDelete();

            $table->foreignId('price_type_id')
                ->constrained('price_types')
                ->restrictOnDelete();

            $table->decimal('price', 15, 4);

            $table->timestamps();

            $table->unique(
                ['item_id', 'price_type_id'],
                'item_prices_item_price_type_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('item_prices');
    }
};