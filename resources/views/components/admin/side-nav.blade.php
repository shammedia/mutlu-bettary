<div class="menu-item">
    <a class="menu-link {{ isset($active['dashboard']) ? 'active' : '' }}"
       href="{{ route('admin.dashboard.index') }}">
        <span class="menu-icon">
            <i class="bi bi-speedometer2"></i>
        </span>
        <span class="menu-title">{{ __('Dashboard') }}</span>
    </a>
</div>

@can('Settings Management')
    <div data-kt-menu-trigger="click"
         class="menu-item menu-accordion {{ isset($active['settings']) ? 'here show' : '' }}">
        <span class="menu-link">
            <span class="menu-icon"><i class="bi bi-gear"></i></span>
            <span class="menu-title">{{ __('Settings') }}</span>
            <span class="menu-arrow"></span>
        </span>

        <div
            class="menu-sub menu-sub-accordion {{ isset($active['websiteConfigurations']) || isset($active['seo']) || isset($active['branches']) || isset($active['clients']) || isset($active['faqs']) ? 'show' : '' }}">
            <div class="menu-item">
                <a class="menu-link {{ isset($active['websiteConfigurations']) ? 'active' : '' }}"
                   href="{{ route('admin.settings.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Website Configurations') }}</span>
                </a>
            </div>
            <div class="menu-item">
                <a class="menu-link {{ isset($active['seo']) ? 'active' : '' }}"
                   href="{{ route('admin.seo.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Seo Configurations') }}</span>
                </a>
            </div>
            <div class="menu-item">
                <a class="menu-link {{ isset($active['branches']) ? 'active' : '' }}"
                   href="{{ route('admin.branches.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Branches') }}</span>
                </a>
            </div>
{{--            <div class="menu-item">--}}
{{--                <a class="menu-link {{ isset($active['clients']) ? 'active' : '' }}"--}}
{{--                   href="{{ route('admin.clients.index') }}">--}}
{{--                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>--}}
{{--                    <span class="menu-title">{{ __('Clients') }}</span>--}}
{{--                </a>--}}
{{--            </div>--}}
            <div class="menu-item">
                <a class="menu-link {{ isset($active['faqs']) ? 'active' : '' }}"
                   href="{{ route('admin.faqs.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('FAQs') }}</span>
                </a>
            </div>
        </div>
    </div>
@endcan

@can('Media Management')
    <div class="menu-item">
        <a class="menu-link {{ isset($active['filemanager']) ? 'active' : '' }}"
           href="{{ route('admin.filemanager.index') }}">
            <span class="menu-icon"><i class="bi bi-collection-play"></i></span>
            <span class="menu-title">{{ __('File Manager') }}</span>
        </a>
    </div>
@endcan


@can('Shop Management')
    <div data-kt-menu-trigger="click"
         class="menu-item menu-accordion {{ isset($active['shop']) ? 'here show' : '' }}">
        <span class="menu-link">
            <span class="menu-icon"><i class="bi bi-bag"></i></span>
            <span class="menu-title">{{ __('Shop') }}</span>
            <span class="menu-arrow"></span>
        </span>

        <div
            class="menu-sub menu-sub-accordion {{ isset($active['shop_categories']) || isset($active['products']) ? 'show' : '' }}">
            <div class="menu-item">
                <a class="menu-link {{ isset($active['shop_categories']) ? 'active' : '' }}"
                   href="{{ route('admin.shop_categories.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Shop Categories') }}</span>
                </a>
            </div>
            <div class="menu-item">
                <a class="menu-link {{ isset($active['products']) ? 'active' : '' }}"
                   href="{{ route('admin.products.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Products') }}</span>
                </a>
            </div>
        </div>
    </div>
@endcan

@can('Hr Management')
    <div data-kt-menu-trigger="click"
         class="menu-item menu-accordion {{ isset($active['hr']) ? 'here show' : '' }}">
        <span class="menu-link">
            <span class="menu-icon"><i class="bi bi-journal-text"></i></span>
            <span class="menu-title">{{ __('HR') }}</span>
            <span class="menu-arrow"></span>
        </span>

        <div
            class="menu-sub menu-sub-accordion {{ isset($active['roles']) || isset($active['staffs']) || isset($active['users']) ? 'show' : '' }}">
            <div class="menu-item">
                <a class="menu-link {{ isset($active['roles']) ? 'active' : '' }}"
                   href="{{ route('admin.roles.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Roles') }}</span>
                </a>
            </div>
            <div class="menu-item">
                <a class="menu-link {{ isset($active['staffs']) ? 'active' : '' }}"
                   href="{{ route('admin.staffs.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Staffs') }}</span>
                </a>
            </div>
            <div class="menu-item">
                <a class="menu-link {{ isset($active['users']) ? 'active' : '' }}"
                   href="{{ route('admin.users.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Users') }}</span>
                </a>
            </div>
        </div>
    </div>
@endcan

@can('Support Management')
    <div data-kt-menu-trigger="click"
         class="menu-item menu-accordion {{ isset($active['support']) ? 'here show' : '' }}">
        <span class="menu-link">
            <span class="menu-icon"><i class="bi bi-headset"></i></span>
            <span class="menu-title">{{ __('Support Hub') }}</span>
            <span class="menu-arrow"></span>
        </span>

        <div
            class="menu-sub menu-sub-accordion {{ isset($active['contact_forms']) || isset($active['subscribers']) || isset($active['blocked_ips']) || isset($active['firewall_logs']) || isset($active['search_keywords']) || isset($active['complaints']) ? 'show' : '' }}">
            <div class="menu-item">
                <a class="menu-link {{ isset($active['contact_forms']) ? 'active' : '' }}"
                   href="{{ route('admin.contact_forms.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Contacts') }}</span>
                </a>
            </div>
            <div class="menu-item">
                <a class="menu-link {{ isset($active['subscribers']) ? 'active' : '' }}"
                   href="{{ route('admin.subscribers.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Newsletter Subscribers') }}</span>
                </a>
            </div>
            <div class="menu-item">
                <a class="menu-link {{ isset($active['blocked_ips']) ? 'active' : '' }}"
                   href="{{ route('admin.blocked_ips.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Blocked IPs') }}</span>
                </a>
            </div>
            <div class="menu-item">
                <a class="menu-link {{ isset($active['firewall_logs']) ? 'active' : '' }}"
                   href="{{ route('admin.firewall_logs.index') }}">
                    <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                    <span class="menu-title">{{ __('Firewall Logs') }}</span>
                </a>
            </div>
        </div>
    </div>
@endcan

@can('Logs Management')
    <div class="menu-item">
        <a class="menu-link {{ isset($active['logs']) ? 'active' : '' }}"
           href="{{ route('admin.logs.index') }}">
            <span class="menu-icon"><i class="bi bi-window-stack"></i></span>
            <span class="menu-title">{{ __('Logs & Bugs') }}</span>
        </a>
    </div>
@endcan
