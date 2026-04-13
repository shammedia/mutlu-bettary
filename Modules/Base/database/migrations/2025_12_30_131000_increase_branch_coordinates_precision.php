<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('branches')) {
            return;
        }

        $driver = DB::getDriverName();

        // We want to support values like: 33.51075165957761 (14 decimal places).
        // Use DECIMAL(18,14): allows up to 4 integer digits and 14 decimal digits (works for lng up to 180.xxx).
        if (in_array($driver, ['mysql', 'mariadb'], true)) {
            DB::statement('ALTER TABLE branches MODIFY lat DECIMAL(18,14) NULL');
            DB::statement('ALTER TABLE branches MODIFY lng DECIMAL(18,14) NULL');
        } elseif ($driver === 'pgsql') {
            DB::statement('ALTER TABLE branches ALTER COLUMN lat TYPE NUMERIC(18,14)');
            DB::statement('ALTER TABLE branches ALTER COLUMN lng TYPE NUMERIC(18,14)');
        } else {
            // sqlite and others: typically do not enforce DECIMAL precision strictly; keep as-is.
        }
    }

    public function down(): void
    {
        if (!Schema::hasTable('branches')) {
            return;
        }

        $driver = DB::getDriverName();

        // Revert to original precision.
        if (in_array($driver, ['mysql', 'mariadb'], true)) {
            DB::statement('ALTER TABLE branches MODIFY lat DECIMAL(10,7) NULL');
            DB::statement('ALTER TABLE branches MODIFY lng DECIMAL(10,7) NULL');
        } elseif ($driver === 'pgsql') {
            DB::statement('ALTER TABLE branches ALTER COLUMN lat TYPE NUMERIC(10,7)');
            DB::statement('ALTER TABLE branches ALTER COLUMN lng TYPE NUMERIC(10,7)');
        } else {
            // no-op
        }
    }
};




