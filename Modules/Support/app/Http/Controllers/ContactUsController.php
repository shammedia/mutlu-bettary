<?php

namespace Modules\Support\app\Http\Controllers;

use App\Http\Controllers\Controller;
use Cache;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Base\Models\Branch;
use Modules\Base\Models\Faq;
use Modules\Support\Models\Complaint;
use Modules\Support\Models\ContactForm;
use Modules\Support\Models\Subscriber;

class ContactUsController extends Controller {

    public function index() {

        $branches = Cache::rememberForever('branches', function () {
            return Branch::all();
        });

        $faqs = Cache::rememberForever('faqs_home', function () {
            return Faq::orderBy('rank')->get(['id', 'question', 'answer', 'rank']);
        });

        return Inertia::render('Support::Index', [
            'branches' => $branches,
            'faqs'     => $faqs,
        ]);
    }

    public function store(Request $request) {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'mobile' => 'nullable|string|max:255',
                'subject' => 'nullable|string|max:255',
                'message' => 'required|string|min:10',
            ], [
                'name.required' => __('The name field is required.'),
                'email.required' => __('The email field is required.'),
                'email.email' => __('Please enter a valid email address.'),
                'message.required' => __('The message field is required.'),
            ]);

            ContactForm::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'mobile' => $validated['mobile'] ?? null,
                'subject' => $validated['subject'] ?? null,
                'message' => $validated['message'],
                'ip_address' => $request->ip(),
                'blocked' => false,
            ]);

            session()->flushMessage(true, __('Thank you for contacting us! We will get back to you soon.'));
            return back();
        } catch (\Illuminate\Validation\ValidationException $e) {
            session()->flushMessage(false);
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            session()->flushMessage(false, __('An error occurred. Please try again later.'));
            return back()->withErrors(['message' => __('An error occurred. Please try again later.')])->withInput();
        }
    }

    public function subscribe(Request $request) {
        try {
            $validated = $request->validate([
                'email' => 'required|email|max:255|unique:subscribers,email',
            ], [
                'email.required' => __('The email field is required.'),
                'email.email' => __('Please enter a valid email address.'),
                'email.unique' => __('This email is already subscribed.'),
            ]);

            Subscriber::create([
                'email' => $validated['email'],
                'ip_address' => $request->ip(),
                'lang' => app()->getLocale(),
                'blocked' => false,
            ]);
            session()->flushMessage(true, __('Thank you for subscribing to our newsletter!'));
            return back();
        } catch (\Illuminate\Validation\ValidationException $e) {
            session()->flushMessage(false);
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            session()->flushMessage(false, __('An error occurred. Please try again later.'));
            return back()->withErrors(['email' => __('An error occurred. Please try again later.')])->withInput();
        }
    }

    public function storeComplaint(Request $request) {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'mobile' => 'required|string|max:255',
                'branch_id' => 'required|exists:branches,id',
                'description' => 'required|string',
            ], [
                'name.required' => __('The name field is required.'),
                'mobile.required' => __('The phone field is required.'),
                'branch_id.required' => __('The branch field is required.'),
                'branch_id.exists' => __('The selected branch is invalid.'),
                'description.required' => __('The description field is required.'),
            ]);

            Complaint::create([
                'name' => $validated['name'],
                'mobile' => $validated['mobile'],
                'branch_id' => $validated['branch_id'],
                'description' => $validated['description'],
                'ip_address' => $request->ip(),
                'status' => 'pending',
                'blocked' => false,
            ]);

            session()->flushMessage(true, __('Thank you for submitting your complaint! We will review it and get back to you soon.'));
            return back();
        } catch (\Illuminate\Validation\ValidationException $e) {
            session()->flushMessage(false);
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            session()->flushMessage(false, __('An error occurred. Please try again later.'));
            return back()->withErrors(['description' => __('An error occurred. Please try again later.')])->withInput();
        }
    }
}

