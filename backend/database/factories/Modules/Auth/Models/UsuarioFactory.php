<?php

namespace Database\Factories\Modules\Auth\Models;

use App\Core\Enums\Setores;
use App\Modules\Auth\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UsuarioFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $senha;

    protected $model = Usuario::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => $this->fake()->name(),
            'email' => $this->fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'setor' => Setores::TI,
            'senha' => static::$senha ??= Hash::make('senha'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
