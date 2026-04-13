<?php

namespace App\Conversations;

use BotMan\BotMan\Messages\Conversations\Conversation;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Outgoing\Actions\Button;
use BotMan\BotMan\Messages\Outgoing\Question;
use Modules\Base\Models\Faq;

class FaqEntryConversation extends Conversation {
    protected string $query;

    public function __construct(string $query) {
        $this->query = trim($query);
    }

    public function run(): void {
        if ($this->query === '') {
            $this->bot->startConversation(new MainMenuConversation());

            return;
        }

        $this->searchFaqs();
    }

    protected function searchFaqs(): void {
        $locale = app()->getLocale();

        $search = mb_strtolower(trim($this->query), 'UTF-8');

        // Get supported locales from config
        $locales = array_keys(config('laravellocalization.supportedLocales', ['en' => [], 'ar' => []]));

        // Build query to search for the term in different fields across multiple locales
        $faq = Faq::where(function ($q) use ($search, $locales) {
            $firstLocale = true;

            foreach ($locales as $loc) {
                if ($firstLocale) {
                    // For the first locale, use 'whereRaw' for matching fields
                    $q->whereRaw("LOWER(JSON_UNQUOTE(JSON_EXTRACT(question, '$.{$loc}'))) LIKE ?", ["%{$search}%"]);
                    $firstLocale = false;
                } else {
                    // For other locales, add 'orWhereRaw' to match fields in any of the locales
                    $q->orWhereRaw("LOWER(JSON_UNQUOTE(JSON_EXTRACT(question, '$.{$loc}'))) LIKE ?", ["%{$search}%"]);
                }
            }
        })
            ->orderByDesc('rank')
            ->first();

        if (!$faq) {
            $this->bot->startConversation(new MainMenuConversation());

            return;
        }

        $questionText = $faq->getTranslation('question', $locale);
        $answerText = $faq->getTranslation('answer', $locale);

        $question = Question::create(__('chat.faq.did_you_mean', ['question' => $questionText]))
            ->addButtons([
                Button::create(__('chat.followup.yes'))->value('yes'),
                Button::create(__('chat.followup.no'))->value('no'),
            ]);

        $this->ask($question, function (Answer $answer) use ($answerText) {
            if (!$answer->isInteractiveMessageReply()) {
                return $this->searchFaqs();
            }

            $value = $answer->getValue();

            if ($value === 'yes') {
                $this->say($answerText);
                $this->bot->startConversation(new FollowUpConversation());
            } elseif ($value === 'no') {
                $this->askNewQuestion();
            } else {
                $this->searchFaqs();
            }
        });
    }

    protected function askNewQuestion(): void {
        $this->ask(__('chat.faq.ask_new_question'), function (Answer $answer) {
            $this->query = trim($answer->getText());

            if ($this->query === '') {
                $this->bot->startConversation(new MainMenuConversation());

                return;
            }

            $this->searchFaqs();
        });
    }
}


