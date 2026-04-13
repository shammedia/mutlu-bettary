<?php

namespace Modules\User\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     */
    public function register(): void
    {
        Fortify::loginView(function () {
            return Inertia::render('User::Auth/Login');
        });

        Fortify::registerView(function () {
            return Inertia::render('User::Auth/Register');
        });

        Fortify::requestPasswordResetLinkView(function () {
            return Inertia::render('User::Auth/ForgotPassword');
        });

        Fortify::resetPasswordView(function (Request $request) {
            return Inertia::render('User::Auth/ResetPassword', [
                'token' => $request->route('token'),
                'email' => $request->email,
            ]);
        });

    }

    /**
     * Get the services provided by the provider.
     */
    public function provides(): array
    {
        return [];
    }
}
