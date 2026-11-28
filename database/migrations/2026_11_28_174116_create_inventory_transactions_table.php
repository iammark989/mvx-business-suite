<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventory_transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('item_id')
                ->constrained('items')
                ->restrictOnDelete();

            $table->foreignId('warehouse_id')
                ->constrained('warehouses')
                ->restrictOnDelete();

            $table->string('transaction_type', 30);

            $table->string('reference_number')->nullable();

            $table->decimal('quantity_in', 15, 4)->default(0);

            $table->decimal('quantity_out', 15, 4)->default(0);

            $table->decimal('balance_after', 15, 4);

            $table->dateTime('transaction_date');

            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->text('remarks')->nullable();

            $table->timestamps();

            $table->index(
                ['item_id', 'warehouse_id', 'transaction_date'],
                'inventory_transactions_item_warehouse_date_index'
            );

            $table->index('reference_number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventory_transactions');
    }
};