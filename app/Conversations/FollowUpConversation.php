<?php

namespace App\Conversations;

use BotMan\BotMan\Messages\Conversations\Conversation;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Outgoing\Actions\Button;
use BotMan\BotMan\Messages\Outgoing\Question;

class FollowUpConversation extends Conversation
{
    public function run(): void
    {
        $this->askAnotherQuestion();
    }

    protected function askAnotherQuestion(): void
    {
        $question = Question::create(__('chat.followup.question'))
            ->addButtons([
                Button::create(__('chat.followup.yes'))->value('yes'),
                Button::create(__('chat.followup.no'))->value('no'),
            ]);

        $this->ask($question, function (Answer $answer) {
            if (! $answer->isInteractiveMessageReply()) {
                return $this->askAnotherQuestion();
            }

            $value = $answer->getValue();

            if ($value === 'yes') {
                $this->bot->startConversation(new MainMenuConversation());
            } elseif ($value === 'no') {
                $this->say(__('chat.followup.thanks'));
            } else {
                $this->askAnotherQuestion();
            }
        });
    }
}





