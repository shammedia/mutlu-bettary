<?php

namespace App\Http\Controllers;

use App\Conversations\FaqEntryConversation;
use BotMan\BotMan\BotMan;
use BotMan\BotMan\BotManFactory;
use BotMan\BotMan\Cache\LaravelCache;
use BotMan\BotMan\Drivers\DriverManager;
use BotMan\Drivers\Web\WebDriver;
use Illuminate\Http\Request;

class BotManController extends Controller
{
    public function handle(Request $request)
    {
        // Ensure the bot uses the same locale as the site / widget
        if ($request->has('locale')) {
            app()->setLocale($request->get('locale'));
        }

        // Load Web Driver
        DriverManager::loadDriver(WebDriver::class);

        $config = [
            'web' => [
                'matchingData' => [
                    'driver' => 'web',
                ],
            ],
        ];

        // Create BotMan instance with proper cache and current request
        $botman = BotManFactory::create($config, new LaravelCache(), $request);

        // On the first message, try to answer via FAQs; if no match, fall back to main menu.
        $botman->hears('{message}', function (BotMan $bot, string $message) {
            $bot->startConversation(new FaqEntryConversation($message));
        });


        $botman->listen();
    }

    public function widget()
    {
        return view('chatbot');
    }
}
