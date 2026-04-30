<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CargoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            "dashboard.view",

            "fale_conosco.listar",
            "fale_conosco.criar",
            "fale_conosco.editar",

            "usuario.listar",
            "usuario.criar",
            "usuario.editar",
            "usuario.deletar",

            "chamado.listar",
            "chamado.criar",
            "chamado.editar",
            "chamado.deletar",

            "mensagem-chamado.listar",
            "mensagem-chamado.criar",

            "assinatura.listar"
        ];

        foreach($permissions as $permission){
            Permission::firstOrCreate(['name' => $permission]);
        }

        $roles = [
            "admin" => Permission::all(),
            "comercial" => [
                "chamado.listar",
                "chamado.criar",
                "chamado.editar",
                "chamado.deletar",

                "mensagem-chamado.listar",
                "mensagem-chamado.criar",

                "fale_conosco.listar",
                "fale_conosco.editar",

                "assinatura.listar"
            ],
        ];

        foreach($roles as $role => $permissions){
            $role = Role::firstOrCreate(['name' => $role]);
            $role->syncPermissions($permissions);
        }
    }
}
