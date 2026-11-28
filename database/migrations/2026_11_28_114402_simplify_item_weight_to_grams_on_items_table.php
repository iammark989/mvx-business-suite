<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropConstrainedForeignId('weight_uom_id');
            $table->dropColumn('weight');
        });

        Schema::table('items', function (Blueprint $table) {
            $table->decimal('weight_grams', 12, 4)
                ->default(0)
                ->after('selling_qty');
        });
    }

    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn('weight_grams');
        });

        Schema::table('items', function (Blueprint $table) {
            $table->decimal('weight', 12, 4)
                ->nullable()
                ->after('selling_qty');

            $table->foreignId('weight_uom_id')
                ->nullable()
                ->after('weight')
                ->constrained('uoms')
                ->restrictOnDelete();
        });
    }
};