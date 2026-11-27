<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();

            $table->string('item_number', 7)->unique();
            $table->string('description', 255);
            $table->string('short_description', 100)->nullable();

            $table->foreignId('category_id')
                ->constrained('categories')
                ->restrictOnDelete();

            $table->foreignId('brand_id')
                ->nullable()
                ->constrained('brands')
                ->restrictOnDelete();

            $table->foreignId('purchase_uom_id')
                ->constrained('uoms')
                ->restrictOnDelete();

            $table->foreignId('selling_uom_id')
                ->constrained('uoms')
                ->restrictOnDelete();

            $table->decimal('purchase_conversion_qty', 12, 4)
                ->default(1);

            $table->decimal('weight', 12, 4)->nullable();

            $table->foreignId('weight_uom_id')
                ->nullable()
                ->constrained('uoms')
                ->restrictOnDelete();

            $table->string('tax_classification', 20);

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->index('description');
            $table->index('tax_classification');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};