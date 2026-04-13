<?php

namespace Modules\Base\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Log;
use Modules\Base\Models\Branch;
use Modules\Core\Http\Requests\DeleteMultiRequest;
use Closure;

class BranchController extends Controller
{
    public function __construct()
    {
        $this->setActive('settings');
        $this->setActive('branches');
    }

    public function index()
    {
        $model = Branch::latest()->paginate(config('core.page_size', 10));

        return view('base::admin.branch.index', compact('model'));
    }

    public function create()
    {
        return view('base::admin.branch.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:2000'],
            'phone' => ['nullable', 'string', 'max:255'],
            'lat' => ['nullable', 'string', 'max:50', 'regex:/^-?\d+(\.\d+)?$/', function (string $attribute, mixed $value, Closure $fail) {
                if ($value === null || $value === '') return;
                $n = (float) $value;
//                if ($n < -90 || $n > 90) $fail(__('Latitude must be between -90 and 90.'));
            }],
            'lng' => ['nullable', 'string', 'max:50', 'regex:/^-?\d+(\.\d+)?$/', function (string $attribute, mixed $value, Closure $fail) {
                if ($value === null || $value === '') return;
                $n = (float) $value;
//                if ($n < -180 || $n > 180) $fail(__('Longitude must be between -180 and 180.'));
            }],
        ]);

        $data = [
            'name' => $request->input('name'),
            'city' => $request->input('city'),
            'address' => $request->input('address'),
            'phone' => $request->input('phone'),
            'lat' => ($request->input('lat') !== null && $request->input('lat') !== '') ? $request->input('lat') : null,
            'lng' => ($request->input('lng') !== null && $request->input('lng') !== '') ? $request->input('lng') : null,
        ];
        $this->prepareTranslatable($data);
        Branch::create($data);
        cache()->forget('branches');
        session()->flushMessage(true);

        return redirect()->route('admin.branches.index');
    }

    public function edit(Branch $branch)
    {
        return view('base::admin.branch.edit', compact('branch'));
    }

    public function update(Request $request, Branch $branch): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:2000'],
            'phone' => ['nullable', 'string', 'max:255'],
            'lat' => ['nullable', 'string', 'max:50', 'regex:/^-?\d+(\.\d+)?$/', function (string $attribute, mixed $value, Closure $fail) {
                if ($value === null || $value === '') return;
                $n = (float) $value;
                if ($n < -90 || $n > 90) $fail(__('Latitude must be between -90 and 90.'));
            }],
            'lng' => ['nullable', 'string', 'max:50', 'regex:/^-?\d+(\.\d+)?$/', function (string $attribute, mixed $value, Closure $fail) {
                if ($value === null || $value === '') return;
                $n = (float) $value;
                if ($n < -180 || $n > 180) $fail(__('Longitude must be between -180 and 180.'));
            }],
        ]);

        $data = [
            'name' => $request->input('name'),
            'city' => $request->input('city'),
            'address' => $request->input('address'),
            'phone' => $request->input('phone'),
            'lat' => ($request->input('lat') !== null && $request->input('lat') !== '') ? $request->input('lat') : null,
            'lng' => ($request->input('lng') !== null && $request->input('lng') !== '') ? $request->input('lng') : null,
        ];
        $this->prepareTranslatable($data, $branch);
        $branch->update($data);
        session()->flushMessage(true);
        cache()->forget('branches');
        return redirect()->route('admin.branches.index');
    }

    public function deleteMulti(DeleteMultiRequest $request): RedirectResponse
    {
        Branch::destroy($request->input('ids', []));
        cache()->forget('branches');
        session()->flushMessage(true);

        return back();
    }

    private function prepareTranslatable(array &$data, ?Branch $branch = null): void
    {
        $fields = ['name', 'city', 'address', 'phone'];
        $locale = app()->getLocale();

        foreach ($fields as $field) {
            $val = $data[$field] ?? '';

            // For create, generate translations for all languages.
            // For update, only change the current locale and keep other locales as-is.
            if ($branch) {
                $trans = $branch->getTranslations($field);
                $trans[$locale] = $val;
            } else {
                $trans = [$locale => $val];
                foreach (otherLangs() as $lang) {
                    try {
                        $trans[$lang] = autoGoogleTranslator($lang, $val);
                    } catch (Exception $e) {
                        Log::error($e->getMessage());
                    }
                }
            }

            $data[$field] = $trans;
        }
    }
}



