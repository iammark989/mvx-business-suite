<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->decimal('purchase_qty', 12, 4)
                ->default(1)
                ->after('selling_uom_id');

            $table->decimal('selling_qty', 12, 4)
                ->default(1)
                ->after('purchase_qty');
        });

        // Preserve existing conversion values.
        // The old field represented selling units per one purchase unit.
        DB::table('items')->update([
            'selling_qty' => DB::raw('purchase_conversion_qty'),
        ]);

        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn('purchase_conversion_qty');
        });
    }

    public function down(): void
    {
        Schema::table('items', function (Blueprint $table) {
            $table->decimal('purchase_conversion_qty', 12, 4)
                ->default(1)
                ->after('selling_uom_id');
        });

        DB::table('items')->update([
            'purchase_conversion_qty' => DB::raw(
                'selling_qty / NULLIF(purchase_qty, 0)'
            ),
        ]);

        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn(['purchase_qty', 'selling_qty']);
        });
    }
};