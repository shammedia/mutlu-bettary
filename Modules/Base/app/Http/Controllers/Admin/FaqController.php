<?php

namespace Modules\Base\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Log;
use Modules\Base\Models\Faq;
use Modules\Core\Http\Requests\DeleteMultiRequest;

class FaqController extends Controller
{
    public function __construct()
    {
        $this->setActive('settings');
        $this->setActive('faqs');
    }

    public function index()
    {
        $model = Faq::orderBy('rank')->latest()->paginate(config('core.page_size', 10));

        return view('base::admin.faq.index', compact('model'));
    }

    public function create()
    {
        return view('base::admin.faq.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'rank'     => ['nullable', 'integer', 'min:0'],
            'question' => ['required', 'string', 'min:3'],
            'answer'   => ['required', 'string', 'min:3'],
        ]);

        $data = [
            'rank'     => $validated['rank'] ?? 0,
            'question' => $validated['question'],
            'answer'   => $validated['answer'],
        ];

        $this->prepareTranslatable($data);

        Faq::create($data);
        cache()->forget('faqs_home');

        session()->flushMessage(true);

        return redirect()->route('admin.faqs.index');
    }

    public function edit(Faq $faq)
    {
        return view('base::admin.faq.edit', compact('faq'));
    }

    public function update(Request $request, Faq $faq): RedirectResponse
    {
        $validated = $request->validate([
            'rank'     => ['nullable', 'integer', 'min:0'],
            'question' => ['required', 'string', 'min:3'],
            'answer'   => ['required', 'string', 'min:3'],
        ]);

        $data = [
            'rank'     => $validated['rank'] ?? $faq->rank,
            'question' => $validated['question'],
            'answer'   => $validated['answer'],
        ];

        $this->prepareTranslatable($data, $faq);

        $faq->update($data);

        cache()->forget('faqs_home');
        session()->flushMessage(true);

        return redirect()->route('admin.faqs.index');
    }

    public function deleteMulti(DeleteMultiRequest $request): RedirectResponse
    {
        Faq::destroy($request->input('ids', []));
        session()->flushMessage(true);
        cache()->forget('faqs_home');
        return back();
    }

    /**
     * Build translatable payload for question and answer fields.
     */
    private function prepareTranslatable(array &$data, ?Faq $faq = null): void
    {
        $fields = ['question', 'answer'];
        $locale = app()->getLocale();

        foreach ($fields as $field) {
            $value = $data[$field] ?? '';

            if ($faq) {
                $translations = $faq->getTranslations($field);
                $translations[$locale] = $value;
            } else {
                $translations = [$locale => $value];

                foreach (otherLangs() as $lang) {
                    try {
                        $translations[$lang] = autoGoogleTranslator($lang, $value);
                    } catch (Exception $e) {
                        Log::error($e->getMessage());
                    }
                }
            }

            $data[$field] = $translations;
        }
    }
}




