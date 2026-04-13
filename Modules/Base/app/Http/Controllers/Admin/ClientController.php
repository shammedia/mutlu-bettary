<?php

namespace Modules\Base\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Log;
use Modules\Base\Models\Client;
use Modules\Core\Http\Requests\DeleteMultiRequest;
use Modules\Core\Traits\FileTrait;

class ClientController extends Controller
{
    use FileTrait;

    private string $uploadPath = 'clients';

    public function __construct()
    {
        $this->setActive('settings');
        $this->setActive('clients');
    }

    public function index()
    {
        $model = Client::latest()->paginate(config('core.page_size', 10));

        return view('base::admin.client.index', compact('model'));
    }

    public function create()
    {
        return view('base::admin.client.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'   => ['required', 'string', 'min:2'],
            'link'   => ['nullable', 'url'],
            'image'  => ['required', 'image'],
        ]);

        $data = [
            'name'  => $validated['name'],
            'link'  => $validated['link'] ?? null,
            'image' => $request->file('image'),
        ];

        $this->prepareTranslatable($data);
        $data['image'] = $this->handleImageUpload($data);

        Client::create($data);

        cache()->forget('clients_home');
        session()->flushMessage(true);

        return redirect()->route('admin.clients.index');
    }

    public function edit(Client $client)
    {
        return view('base::admin.client.edit', compact('client'));
    }

    public function update(Request $request, Client $client): RedirectResponse
    {
        $validated = $request->validate([
            'name'   => ['required', 'string', 'min:2'],
            'link'   => ['nullable', 'url'],
            'image'  => ['nullable', 'image'],
        ]);

        $data = [
            'name'  => $validated['name'],
            'link'  => $validated['link'] ?? null,
            'image' => $request->file('image'),
        ];

        $this->prepareTranslatable($data, $client);
        $data['image'] = $this->handleImageUpload($data, $client->image);

        $client->update($data);

        cache()->forget('clients_home');
        session()->flushMessage(true);

        return redirect()->route('admin.clients.index');
    }

    public function deleteMulti(DeleteMultiRequest $request): RedirectResponse
    {
        $ids = $request->input('ids', []);

        $images = Client::whereIn('id', $ids)->pluck('image')->filter()->toArray();

        Client::destroy($ids);

        foreach ($images as $image) {
            $this->deleteFile($image);
        }

        cache()->forget('clients_home');
        session()->flushMessage(true);

        return back();
    }

    /**
     * Build translatable payload for name field.
     */
    private function prepareTranslatable(array &$data, ?Client $client = null): void
    {
        $field = 'name';
        $locale = app()->getLocale();
        $value = $data[$field] ?? '';

        if ($client) {
            $translations = $client->getTranslations($field);
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

    private function handleImageUpload(array $data, ?string $existingImage = null): ?string
    {
        return $data['image']
            ? $this->upload($data['image'], $this->uploadPath, null, $existingImage)
            : $existingImage;
    }
}




