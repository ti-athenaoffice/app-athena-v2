<?php

use App\Core\Middlewares\AccessSystemMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        health: '/up',
        then: function () {
            $modulesApi = glob(app_path('Modules/*/Routes/api.php'));
            foreach ($modulesApi as $file) {
                Route::middleware('api')
                    ->prefix('api')
                    ->group($file);
            }
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(AccessSystemMiddleware::class);
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
        ]);
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->shouldRenderJsonWhen(fn (Request $request) => true);
    })->create();
