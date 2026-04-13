<?php

namespace Modules\User\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Modules\Shop\Models\Product;
use Modules\Support\Models\ContactForm;
use Modules\Support\Models\Subscriber;
use Monishroy\VisitorTracking\Helpers\Visitor;
use MonishRoy\VisitorTracking\Models\VisitorTable;

class DashboardController extends Controller {
    public function index() {
        $this->setActive('dashboard');

        $visitorsStats = [
            'totalVisitorsCount' => VisitorTable::distinct('ip')->count('ip'),
            'todayVisitorsCount' => VisitorTable::whereDate('created_at', today())
                ->distinct('ip')->count('ip'),
        ];

        $topVisitedPages = Visitor::topVisitedPages();
        $stats = [
            'products' => Product::count(),
            'users' => User::where('type', 'user')->count(),
            'admins' => User::where('type', 'admin')->count(),
            'subscribers' => Subscriber::count(),
            'contacts' => ContactForm::count(),
        ];

        return view('user::admin.dashboard.index', compact('stats', 'visitorsStats' , 'topVisitedPages'));
    }
}
