<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tax_configurations', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20);
            $table->string('name', 100);
            $table->string('classification', 20);
            $table->decimal('rate', 8, 4)->default(0);
            $table->text('description')->nullable();
            $table->date('effective_from');
            $table->date('effective_until')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(
                ['code', 'effective_from'],
                'tax_configurations_code_effective_unique'
            );

            $table->index(
                ['classification', 'effective_from', 'effective_until'],
                'tax_configurations_effective_index'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tax_configurations');
    }
};