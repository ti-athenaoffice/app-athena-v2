<?php

namespace Database\Seeders;

use App\Core\Enums\Setores;
use App\Modules\Auth\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Usuario::factory()->create([
            'nome' => 'Test User',
            'email' => 'test@example.com',
            'senha' => Hash::make('senha'),
            'setor' => Setores::TI,
        ]);
    }
}
