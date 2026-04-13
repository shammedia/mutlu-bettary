/**
 * Bridge between Inertia/Vue page navigation and the legacy jQuery theme scripts.
 *
 * Your theme initializes UI behaviors in `public/site/js/main.js` on full page load
 * (mobile menu, sticky header, slick carousels, scroll-to-top, ...).
 * With Inertia (SPA navigation), that initialization doesn't re-run after page changes.
 *
 * This file exposes `window.siteThemeInit()` which is safe to call multiple times.
 */

if (typeof window !== 'undefined') {
  window.siteThemeInit = function siteThemeInit() {
    try {
      const $ = window.jQuery || window.$;
      if (!$) return; // jQuery not loaded yet

      /**
       * 1) Mobile menu (theme: $(".mobile-menu-wrapper").mobilemenu())
       * Re-implements the theme's plugin behavior in an idempotent way (namespaced events + cleanup)
       * so it can be safely re-run after Inertia navigations.
       */
      try {
        const $menu = $('.mobile-menu-wrapper');
        if ($menu.length) {
          const opt = {
            menuToggleBtn: '.menu-toggle',
            bodyToggleClass: 'body-visible',
            subMenuClass: 'submenu-class',
            subMenuParent: 'submenu-item-has-children',
            subMenuParentToggle: 'active-class',
            meanExpandClass: 'mean-expand-class',
            appendElement: '<span class="mean-expand-class"></span>',
            subMenuToggleClass: 'menu-open',
            toggleSpeed: 400,
          };

          // Cleanup from previous initializations (avoid duplicated expand buttons / classes)
          $menu.find('.' + opt.meanExpandClass).remove();
          $menu.find('ul.' + opt.subMenuClass).removeClass(opt.subMenuClass).removeAttr('style');
          $menu.find('li.' + opt.subMenuParent).removeClass(opt.subMenuParent + ' ' + opt.subMenuParentToggle);

          // Setup submenu markup/classes (close all by default)
          $menu.find('li').each(function () {
            const $li = $(this);
            const $submenu = $li.children('ul');
            if (!$submenu.length) return;

            $submenu.addClass(opt.subMenuClass);
            $submenu.css('display', 'none');
            $li.addClass(opt.subMenuParent);

            const $a = $li.children('a');
            if ($a.length && $a.children('.' + opt.meanExpandClass).length === 0) {
              $a.append(opt.appendElement);
            }
          });

          const closeAllSubmenus = () => {
            $menu.find('ul.' + opt.subMenuClass)
              .removeClass(opt.subMenuToggleClass)
              .css('display', 'none')
              .parent()
              .removeClass(opt.subMenuParentToggle);
          };

          const toggleMenu = () => {
            $menu.toggleClass(opt.bodyToggleClass);
            closeAllSubmenus();
          };

          const toggleDropDown = ($element) => {
            const $nextUl = $element.next('ul');
            if ($nextUl.length) {
              $element.parent().toggleClass(opt.subMenuParentToggle);
              $nextUl.slideToggle(opt.toggleSpeed);
              $nextUl.toggleClass(opt.subMenuToggleClass);
              return;
            }
            const $prevUl = $element.prev('ul');
            if ($prevUl.length) {
              $element.parent().toggleClass(opt.subMenuParentToggle);
              $prevUl.slideToggle(opt.toggleSpeed);
              $prevUl.toggleClass(opt.subMenuToggleClass);
            }
          };

          // Submenu expand click (DIRECT binding, not delegated).
          // Important: theme stops propagation on inner <div> containers, so delegated handlers on $menu won't fire.
          const bindSubmenuHandlers = () => {
            // Expand icon tap
            $menu
              .find('.' + opt.meanExpandClass)
              .off('click.themeBridgeSubmenu')
              .on('click.themeBridgeSubmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();
                toggleDropDown($(this).parent());
              });

            // Also toggle submenu when tapping the parent label (e.g. "Language")
            $menu
              .find('li.' + opt.subMenuParent + ' > a')
              .off('click.themeBridgeSubmenu')
              .on('click.themeBridgeSubmenu', function (e) {
                // If user tapped the expand icon, let the expand handler do the toggle (avoid double-toggle).
                const $target = $(e.target);
                if ($target.hasClass(opt.meanExpandClass) || $target.closest('.' + opt.meanExpandClass).length) return;

                const $a = $(this);
                const href = ($a.attr('href') || '').trim();
                // Only hijack non-navigation parent items (theme uses href="#" for dropdown parents).
                const isNonNav =
                  !href ||
                  href === '#' ||
                  href.toLowerCase() === 'javascript:void(0)' ||
                  href.toLowerCase() === 'javascript:void(0);';
                if (!isNonNav) return;

                e.preventDefault();
                e.stopPropagation();
                toggleDropDown($a);
              });
          };

          bindSubmenuHandlers();

          // Toggle button (namespaced)
          $(opt.menuToggleBtn).off('click.themeBridge').on('click.themeBridge', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
          });

          // Theme behavior: click overlay area to close (menu container click toggles)
          $menu.off('click.themeBridge').on('click.themeBridge', function (e) {
            e.stopPropagation();
            toggleMenu();
          });
          // Stop closing when clicking inside menu content
          $menu.find('div').off('click.themeBridge').on('click.themeBridge', function (e) {
            e.stopPropagation();
          });
        }
      } catch (e) { /* swallow */ }

      /**
       * 2) Sticky header (theme: adds `.sticky` to `.sticky-wrapper` after scrollTop > 500)
       */
      try {
        $(window)
          .off('scroll.themeBridgeSticky')
          .on('scroll.themeBridgeSticky', function () {
            const topPos = $(this).scrollTop();
            if (topPos > 500) $('.sticky-wrapper').addClass('sticky');
            else $('.sticky-wrapper').removeClass('sticky');
          })
          .triggerHandler('scroll');
      } catch (e) { /* swallow */ }

      /**
       * 3) Scroll to top progress button (theme uses `.scroll-top`)
       */
      try {
        const scrollTopBtn = document.querySelector('.scroll-top');
        const progressPath = document.querySelector('.scroll-top path');
        if (scrollTopBtn && progressPath && progressPath.getTotalLength) {
          const pathLength = progressPath.getTotalLength();
          progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
          progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
          progressPath.style.strokeDashoffset = pathLength;
          progressPath.getBoundingClientRect();
          progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

          const updateProgress = function () {
            const scroll = $(window).scrollTop();
            const height = $(document).height() - $(window).height();
            const progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
          };

          $(window).off('scroll.themeBridgeScrollTopProgress').on('scroll.themeBridgeScrollTopProgress', updateProgress);
          updateProgress();

          const offset = 50;
          $(window).off('scroll.themeBridgeScrollTopToggle').on('scroll.themeBridgeScrollTopToggle', function () {
            if ($(this).scrollTop() > offset) $(scrollTopBtn).addClass('show');
            else $(scrollTopBtn).removeClass('show');
          });

          $(scrollTopBtn).off('click.themeBridgeScrollTop').on('click.themeBridgeScrollTop', function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 1);
            return false;
          });
        }
      } catch (e) { /* swallow */ }

      /**
       * 4) Slick global carousel (theme: `.global-carousel`)
       * Ensure idempotency by unslicking before initializing.
       */
      try {
        const initGlobalCarousel = () => {
          $('.global-carousel').each(function () {
            const $carousel = $(this);

            // If this carousel is already initialized, destroy it before re-init (avoids duplicate slides/handlers)
            if ($carousel.hasClass('slick-initialized') && typeof $carousel.slick === 'function') {
              try { $carousel.slick('unslick'); } catch (e) { /* swallow */ }
            }

            const d = (key) => $carousel.data(key);

            const prevButton = '<button type="button" class="slick-prev"><i class="' + d('prev-arrow') + '"></i></button>';
            const nextButton = '<button type="button" class="slick-next"><i class="' + d('next-arrow') + '"></i></button>';

            // Ensure arrow wrapper matches theme behavior
            if (d('arrows') === true) {
              if (!$carousel.closest('.arrow-wrap').length) {
                $carousel.closest('.container').parent().addClass('arrow-wrap');
              }
            }

            if (typeof $carousel.slick === 'function') {
              $carousel.slick({
                dots: !!d('dots'),
                fade: !!d('fade'),
                arrows: !!d('arrows'),
                speed: d('speed') ? d('speed') : 1000,
                sliderNavfor: d('slidernavfor') ? d('slidernavfor') : false,
                autoplay: d('autoplay') === false ? false : true,
                infinite: d('infinite') === false ? false : true,
                slidesToShow: d('slide-show') ? d('slide-show') : 1,
                adaptiveHeight: !!d('adaptive-height'),
                centerMode: !!d('center-mode'),
                autoplaySpeed: d('autoplay-speed') ? d('autoplay-speed') : 8000,
                centerPadding: d('center-padding') ? d('center-padding') : '0',
                focusOnSelect: d('focuson-select') === false ? false : true,
                pauseOnFocus: !!d('pauseon-focus'),
                pauseOnHover: !!d('pauseon-hover'),
                variableWidth: !!d('variable-width'),
                vertical: !!d('vertical'),
                verticalSwiping: !!d('vertical'),
                prevArrow: d('prev-arrow') ? prevButton : '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
                nextArrow: d('next-arrow') ? nextButton : '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
                rtl: $('html').attr('dir') === 'rtl',
                // Match theme responsive behavior from `public/site/js/main.js`
                responsive: [
                  {
                    breakpoint: 1600,
                    settings: {
                      arrows: !!d('xl-arrows'),
                      dots: !!d('xl-dots'),
                      slidesToShow: d('xl-slide-show') ? d('xl-slide-show') : d('slide-show'),
                      centerMode: !!d('xl-center-mode'),
                      centerPadding: d('xl-center-padding') ? d('xl-center-padding') : '0',
                    },
                  },
                  {
                    breakpoint: 1400,
                    settings: {
                      arrows: !!d('ml-arrows'),
                      dots: !!d('ml-dots'),
                      slidesToShow: d('ml-slide-show') ? d('ml-slide-show') : d('slide-show'),
                      centerMode: !!d('ml-center-mode'),
                      centerPadding: d('ml-center-padding') ? d('ml-center-padding') : '0',
                    },
                  },
                  {
                    breakpoint: 1200,
                    settings: {
                      arrows: !!d('lg-arrows'),
                      dots: !!d('lg-dots'),
                      slidesToShow: d('lg-slide-show') ? d('lg-slide-show') : d('slide-show'),
                      centerMode: d('lg-center-mode') ? d('lg-center-mode') : false,
                      centerPadding: d('lg-center-padding') ? d('lg-center-padding') : '0',
                    },
                  },
                  {
                    breakpoint: 992,
                    settings: {
                      arrows: !!d('md-arrows'),
                      dots: !!d('md-dots'),
                      slidesToShow: d('md-slide-show') ? d('md-slide-show') : 1,
                      centerMode: d('md-center-mode') ? d('md-center-mode') : false,
                      centerPadding: 0,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      arrows: !!d('sm-arrows'),
                      dots: !!d('sm-dots'),
                      slidesToShow: d('sm-slide-show') ? d('sm-slide-show') : 1,
                      centerMode: d('sm-center-mode') ? d('sm-center-mode') : false,
                      centerPadding: 0,
                    },
                  },
                  {
                    breakpoint: 576,
                    settings: {
                      arrows: !!d('xs-arrows'),
                      dots: !!d('xs-dots'),
                      slidesToShow: d('xs-slide-show') ? d('xs-slide-show') : 1,
                      centerMode: d('xs-center-mode') ? d('xs-center-mode') : false,
                      centerPadding: 0,
                    },
                  },
                ],
              });
            }
          });
        };

        // External next/prev buttons (namespaced, delegated)
        $(document)
          .off('click.themeBridge', '[data-slick-next]')
          .on('click.themeBridge', '[data-slick-next]', function (e) {
            e.preventDefault();
            const sel = $(this).data('slick-next');
            if (!sel) return;
            const $target = $(sel);
            if ($target.length && typeof $target.slick === 'function') $target.slick('slickNext');
          });

        $(document)
          .off('click.themeBridge', '[data-slick-prev]')
          .on('click.themeBridge', '[data-slick-prev]', function (e) {
            e.preventDefault();
            const sel = $(this).data('slick-prev');
            if (!sel) return;
            const $target = $(sel);
            if ($target.length && typeof $target.slick === 'function') $target.slick('slickPrev');
          });

        initGlobalCarousel();
      } catch (e) { /* swallow */ }
    } catch (err) {
      // keep silent in production
    }
  };
}
