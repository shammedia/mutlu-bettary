import { ref, computed, useSSRContext, unref, withCtx, openBlock, createBlock, toDisplayString, createCommentVNode, createVNode, createTextVNode, mergeProps, Fragment, renderList, withModifiers, withDirectives, vModelText, onMounted, watch, vModelRadio, nextTick, vModelSelect, reactive, renderSlot, resolveComponent, vModelCheckbox, createSSRApp, h } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderSlot, ssrRenderStyle, ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain } from "vue/server-renderer";
import { usePage, Link, Head, useForm, router, createInertiaApp } from "@inertiajs/vue3";
import { defineStore, storeToRefs } from "pinia";
import L from "leaflet";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
const useCartStore = defineStore("cart", () => {
  const carts = ref(JSON.parse(localStorage.getItem("carts") || "[]"));
  const count = computed(() => {
    return carts.value.reduce((total, item) => total + 1, 0);
  });
  const emptyCart = () => {
    carts.value = [];
    localStorage.setItem("carts", JSON.stringify(carts.value));
  };
  const addToCart = (sp) => {
    const index = carts.value.findIndex((item) => item.id === sp.id);
    if (index !== -1) {
      carts.value[index].quantity += 1;
    } else {
      carts.value.push({
        ...sp,
        quantity: 1
      });
    }
    localStorage.setItem("carts", JSON.stringify(carts.value));
  };
  const removeFromCart = (cart) => {
    carts.value = carts.value.filter(
      (item) => !(item.id === cart.id && item.product_id === cart.product_id)
    );
    localStorage.setItem("carts", JSON.stringify(carts.value));
  };
  const addQuantity = (cart) => {
    const index = carts.value.findIndex(
      (item) => item.id === cart.id && item.product_id === cart.product_id
    );
    if (index !== -1) {
      carts.value[index].quantity += 1;
    }
    localStorage.setItem("carts", JSON.stringify(carts.value));
  };
  const decreaseQuantity = (cart) => {
    const item = carts.value.find(
      (item2) => item2.id === cart.id && item2.product_id === cart.product_id
    );
    if (!item) return;
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      carts.value = carts.value.filter(
        (item2) => !(item2.id === cart.id && item2.product_id === cart.product_id)
      );
    }
    localStorage.setItem("carts", JSON.stringify(carts.value));
  };
  return { carts, count, addToCart, removeFromCart, addQuantity, decreaseQuantity, emptyCart };
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$g = {
  __name: "Cart",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const cartStore = useCartStore();
    const { count } = storeToRefs(cartStore);
    const withLocalePath = (path) => {
      const loc = page.props.locale || "";
      if (!path || typeof path !== "string") return path;
      if (!path.startsWith("/")) return path;
      return loc ? `/${loc}${path}` : path;
    };
    const safeRoute = (name, params = {}, fallbackPath = "/") => {
      try {
        if (typeof route !== "undefined" && route) {
          if (typeof route === "function" && route().has && route().has(name)) {
            return route(name, params);
          }
          return route(name, params);
        }
      } catch (e) {
      }
      return withLocalePath(fallbackPath);
    };
    const cartIndexUrl = computed(() => safeRoute("cart.index", {}, "/cart"));
    const carts = ref([]);
    carts.value = JSON.parse(localStorage.getItem("carts") || "[]");
    carts.value.length;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Link), {
        href: cartIndexUrl.value,
        class: "position-relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(count)) {
              _push2(`<span class="position-absolute text-danger top-0 start-0 translate-middle badge rounded-pill bg-white" data-v-7308f442${_scopeId}>${ssrInterpolate(unref(count))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-cart4" viewBox="0 0 16 16" data-v-7308f442${_scopeId}><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" data-v-7308f442${_scopeId}></path></svg>`);
          } else {
            return [
              unref(count) ? (openBlock(), createBlock("span", {
                key: 0,
                class: "position-absolute text-danger top-0 start-0 translate-middle badge rounded-pill bg-white"
              }, toDisplayString(unref(count)), 1)) : createCommentVNode("", true),
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                fill: "white",
                class: "bi bi-cart4",
                viewBox: "0 0 16 16"
              }, [
                createVNode("path", { d: "M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(count)) {
        _push(ssrRenderComponent(unref(Link), {
          class: "cart-fab",
          href: cartIndexUrl.value,
          rel: "noopener",
          "aria-label": "Carts",
          title: trans("Carts")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(count)) {
                _push2(`<span class="position-absolute text-white top-0 start-0 translate-middle badge rounded-pill bg-danger" data-v-7308f442${_scopeId}>${ssrInterpolate(unref(count))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-cart4" viewBox="0 0 16 16" data-v-7308f442${_scopeId}><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" data-v-7308f442${_scopeId}></path></svg>`);
            } else {
              return [
                unref(count) ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "position-absolute text-white top-0 start-0 translate-middle badge rounded-pill bg-danger"
                }, toDisplayString(unref(count)), 1)) : createCommentVNode("", true),
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  fill: "red",
                  class: "bi bi-cart4",
                  viewBox: "0 0 16 16"
                }, [
                  createVNode("path", { d: "M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Cart.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const Cart = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-7308f442"]]);
const _sfc_main$f = {
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const settings = computed(() => page.props.settings);
    const storage_path = computed(() => page.props.storage_path);
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale);
    const seo = computed(() => page.props.seo);
    const auth = computed(() => page.props.auth);
    const withLocalePath = (path) => {
      const loc = page.props.locale || "";
      if (!path || typeof path !== "string") return path;
      if (!path.startsWith("/")) return path;
      return loc ? `/${loc}${path}` : path;
    };
    const safeRoute = (name, params = {}, fallbackPath = "/") => {
      try {
        if (typeof route !== "undefined" && route) {
          if (typeof route === "function" && route().has && route().has(name)) {
            return route(name, params);
          }
          return route(name, params);
        }
      } catch (e) {
      }
      return withLocalePath(fallbackPath);
    };
    const homeUrl = computed(() => safeRoute("home", {}, "/"));
    const aboutUrl = computed(() => safeRoute("about-us", {}, "/about-us"));
    const contactUrl = computed(() => safeRoute("contact-us", {}, "/contact-us"));
    const shopIndexUrl = computed(() => safeRoute("shop.index", {}, "/shop"));
    const categoryUrl = (slug) => safeRoute("shop.index", { category: slug }, `/shop?category=${encodeURIComponent(slug || "")}`);
    const shopCategories = computed(() => page.props.shopCategories || page.props.categories || []);
    const translateField = (value) => {
      if (!value) return "";
      if (typeof value === "string") return value;
      const loc = locale.value || "en";
      if (typeof value === "object" && value !== null) {
        return value[loc] || Object.values(value)[0] || "";
      }
      return "";
    };
    const normalizeUrl = (url) => {
      if (!url) return null;
      const u = String(url).trim();
      if (!u) return null;
      if (u.startsWith("http://") || u.startsWith("https://")) return u;
      return `https://${u}`;
    };
    const whatsappUrl = (value) => {
      if (!value) return null;
      const v = String(value).trim();
      if (!v) return null;
      if (v.startsWith("http://") || v.startsWith("https://")) return v;
      const digits = v.replace(/[^\d]/g, "");
      return digits ? `https://wa.me/${digits}` : null;
    };
    const socialLinks = computed(() => {
      const s = settings.value || {};
      return [
        { key: "facebook", icon: "fab fa-facebook-f", url: normalizeUrl(s.facebook) },
        { key: "instagram", icon: "fab fa-instagram", url: normalizeUrl(s.instagram) },
        { key: "youtube", icon: "fab fa-youtube", url: normalizeUrl(s.youtube) },
        { key: "whatsapp", icon: "fab fa-whatsapp", url: whatsappUrl(s.whatsapp) }
      ].filter((x) => x.url);
    });
    const whatsappFabUrl = computed(() => {
      const s = settings.value || {};
      return whatsappUrl(s.whatsapp || s.sales_whatsapp);
    });
    const logoSrc = computed(() => {
      const s = settings.value || {};
      if (s.white_logo) return `${storage_path.value}${s.white_logo}`;
      return `${asset_path.value}site/img/logo.svg`;
    });
    const currentYear = computed(() => (/* @__PURE__ */ new Date()).getFullYear());
    const isActive = (routeName) => {
      try {
        if (typeof route === "undefined" || !route) return false;
        const r = typeof route === "function" ? route() : route;
        return !!(r && typeof r.current === "function" && r.current(routeName));
      } catch (e) {
        return false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<!--[--><div class="mobile-menu-wrapper" data-v-c6d725dd><div class="mobile-menu-area" data-v-c6d725dd><div class="mobile-logo" data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), { href: homeUrl.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", asset_path.value + "images/red_logo.png")} alt="logo" data-v-c6d725dd${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: asset_path.value + "images/red_logo.png",
                alt: "logo"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="menu-toggle" data-v-c6d725dd><i class="fa fa-times" data-v-c6d725dd></i></button></div><div class="mobile-menu" data-v-c6d725dd><ul data-v-c6d725dd><li data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: homeUrl.value,
        class: { "nav-route-active": isActive("home") }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: aboutUrl.value,
        class: { "nav-route-active": isActive("about-us") }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("About Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("About Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (shopCategories.value.length) {
        _push(`<li class="menu-item-has-children" data-v-c6d725dd><a href="#" class="${ssrRenderClass({ "nav-route-active": isActive("shop.*") })}" data-v-c6d725dd>${ssrInterpolate(trans("Categories"))}</a><ul class="sub-menu" data-v-c6d725dd><li data-v-c6d725dd>`);
        _push(ssrRenderComponent(unref(Link), {
          href: shopIndexUrl.value,
          class: { "nav-route-active": isActive("shop.index") }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(trans("All Products"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(trans("All Products")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><!--[-->`);
        ssrRenderList(shopCategories.value, (category) => {
          _push(`<li data-v-c6d725dd>`);
          _push(ssrRenderComponent(unref(Link), {
            href: categoryUrl(category.slug)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(translateField(category.name))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(translateField(category.name)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: contactUrl.value,
        class: { "nav-route-active": isActive("contact-us") }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Contact Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Contact Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (((_a = auth.value) == null ? void 0 : _a.type) === "admin") {
        _push(`<li class="${ssrRenderClass({ active: isActive("admin.dashboard.index") })}" data-v-c6d725dd><a${ssrRenderAttr("href", _ctx.route("admin.dashboard.index"))} class="nav-link main-nav-link" data-v-c6d725dd>${ssrInterpolate(trans("Dashboard"))}</a></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li class="menu-item-has-children" data-v-c6d725dd><a href="#" data-v-c6d725dd>${ssrInterpolate(trans("Language"))}</a><ul class="sub-menu" data-v-c6d725dd><li data-v-c6d725dd><a href="#" class="${ssrRenderClass({ "active": locale.value === "ar" })}" data-v-c6d725dd>AR</a></li><li data-v-c6d725dd><a href="#" class="${ssrRenderClass({ "active": locale.value === "en" })}" data-v-c6d725dd>EN</a></li><li data-v-c6d725dd><a href="#" class="${ssrRenderClass({ "active": locale.value === "tr" })}" data-v-c6d725dd>TR</a></li></ul></li></ul></div></div></div><header class="nav-header header-layout2" data-v-c6d725dd><div class="sticky-wrapper" data-v-c6d725dd><div class="menu-area" data-v-c6d725dd><div class="container" data-v-c6d725dd><div class="row align-items-center justify-content-between align-center" data-v-c6d725dd><div class="col-auto header-navbar-logo d-flex gap-2" data-v-c6d725dd><div class="header-logo" data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), { href: homeUrl.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", logoSrc.value)} alt="logo" data-v-c6d725dd${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: logoSrc.value,
                alt: "logo"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="d-flex align-items-center mx-2 justify-content-center flex-grow-1" data-v-c6d725dd>`);
      _push(ssrRenderComponent(Cart, null, null, _parent));
      _push(`</div></div><div class="col-auto" data-v-c6d725dd><nav class="main-menu d-none d-lg-inline-block" data-v-c6d725dd><ul data-v-c6d725dd><li data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: homeUrl.value,
        class: { "nav-route-active": isActive("home") }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: aboutUrl.value,
        class: { "nav-route-active": isActive("about-us") }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("About Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("About Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (shopCategories.value.length) {
        _push(`<li class="menu-item-has-children" data-v-c6d725dd><a href="#" class="${ssrRenderClass({ "nav-route-active": isActive("shop.*") })}" data-v-c6d725dd>${ssrInterpolate(trans("Our Products"))}</a><ul class="sub-menu" data-v-c6d725dd><!--[-->`);
        ssrRenderList(shopCategories.value, (category) => {
          _push(`<li data-v-c6d725dd>`);
          _push(ssrRenderComponent(unref(Link), {
            href: categoryUrl(category.slug)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(translateField(category.name))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(translateField(category.name)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--><li data-v-c6d725dd>`);
        _push(ssrRenderComponent(unref(Link), {
          href: shopIndexUrl.value,
          class: { "nav-route-active": isActive("shop.index") }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<strong data-v-c6d725dd${_scopeId}>${ssrInterpolate(trans("All Products"))}</strong>`);
            } else {
              return [
                createVNode("strong", null, toDisplayString(trans("All Products")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: contactUrl.value,
        class: { "nav-route-active": isActive("contact-us") }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Contact Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Contact Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (((_b = auth.value) == null ? void 0 : _b.type) === "admin") {
        _push(`<li class="${ssrRenderClass({ active: isActive("admin.dashboard.index") })}" data-v-c6d725dd><a${ssrRenderAttr("href", _ctx.route("admin.dashboard.index"))} class="nav-link main-nav-link" data-v-c6d725dd>${ssrInterpolate(trans("Dashboard"))}</a></li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li class="menu-item-has-children" data-v-c6d725dd><a class="text-uppercase" href="#" data-v-c6d725dd>${ssrInterpolate(locale.value)}</a><ul class="sub-menu" data-v-c6d725dd><li data-v-c6d725dd><a href="#" class="${ssrRenderClass({ "active": locale.value === "ar" })}" data-v-c6d725dd>AR</a></li><li data-v-c6d725dd><a href="#" class="${ssrRenderClass({ "active": locale.value === "en" })}" data-v-c6d725dd>EN</a></li><li data-v-c6d725dd><a href="#" class="${ssrRenderClass({ "active": locale.value === "tr" })}" data-v-c6d725dd>TR</a></li></ul></li></ul></nav><div class="navbar-right d-flex d-lg-none align-items-center justify-content-between w-100" data-v-c6d725dd><button type="button" class="menu-toggle icon-btn" data-v-c6d725dd><i class="fas fa-bars" data-v-c6d725dd></i></button></div></div><div class="col-auto d-xl-block d-none" data-v-c6d725dd>`);
      if (socialLinks.value.length) {
        _push(`<div class="social-links" data-v-c6d725dd><!--[-->`);
        ssrRenderList(socialLinks.value, (item) => {
          _push(`<a${ssrRenderAttr("href", item.url)} target="_blank" rel="noopener" data-v-c6d725dd><i class="${ssrRenderClass(item.icon)}" data-v-c6d725dd></i></a>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div></header>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<footer class="footer-wrapper footer-layout2" style="${ssrRenderStyle({ backgroundImage: `url(${asset_path.value}site/img/bg/footer-bg2-1.png)` })}" data-v-c6d725dd><div class="container" data-v-c6d725dd><div class="widget-area" data-v-c6d725dd><div class="row justify-content-between" data-v-c6d725dd><div class="col-md-6 col-xl-3" data-v-c6d725dd><div class="footer-logo mb-3" data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), { href: homeUrl.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", logoSrc.value)} alt="logo" data-v-c6d725dd${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: logoSrc.value,
                alt: "logo"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="widget footer-widget widget-about" data-v-c6d725dd><p class="footer-text mb-30" data-v-c6d725dd>${ssrInterpolate(seo.value && seo.value.website_desc ? seo.value.website_desc : "")}</p>`);
      if (socialLinks.value.length) {
        _push(`<div class="social-btn style3" data-v-c6d725dd><!--[-->`);
        ssrRenderList(socialLinks.value, (item) => {
          _push(`<a${ssrRenderAttr("href", item.url)} target="_blank" rel="noopener" tabindex="-1" data-v-c6d725dd><i class="${ssrRenderClass(item.icon)}" data-v-c6d725dd></i></a>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="col-md-6 col-xl-auto" data-v-c6d725dd><div class="widget widget_nav_menu footer-widget" data-v-c6d725dd><h3 class="widget_title" data-v-c6d725dd>${ssrInterpolate(trans("Company"))}</h3><div class="menu-all-pages-container" data-v-c6d725dd><ul class="menu" data-v-c6d725dd><li data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), { href: homeUrl.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), { href: aboutUrl.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("About Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("About Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), { href: contactUrl.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Contact Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Contact Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (shopCategories.value.length) {
        _push(`<li data-v-c6d725dd>`);
        _push(ssrRenderComponent(unref(Link), { href: shopIndexUrl.value }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(trans("All Products"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(trans("All Products")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></div></div></div><div class="col-md-6 col-xl-auto" data-v-c6d725dd><div class="widget widget_nav_menu footer-widget" data-v-c6d725dd><h3 class="widget_title" data-v-c6d725dd>${ssrInterpolate(trans("Our Products"))}</h3><div class="menu-all-pages-container" data-v-c6d725dd><ul class="menu" data-v-c6d725dd><!--[-->`);
      ssrRenderList(shopCategories.value.slice(0, 8), (category) => {
        _push(`<li data-v-c6d725dd>`);
        _push(ssrRenderComponent(unref(Link), {
          href: categoryUrl(category.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(translateField(category.name))}`);
            } else {
              return [
                createTextVNode(toDisplayString(translateField(category.name)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div></div><div class="col-md-6 col-xl-auto" data-v-c6d725dd><div class="widget footer-widget" data-v-c6d725dd><h3 class="widget_title" data-v-c6d725dd>${ssrInterpolate(trans("Contact"))}</h3><div class="widget-contact2" data-v-c6d725dd><div class="widget-contact-grid" data-v-c6d725dd><div class="icon" data-v-c6d725dd><i class="fas fa-map-marker-alt" data-v-c6d725dd></i></div><div class="contact-grid-details" data-v-c6d725dd><p data-v-c6d725dd>${ssrInterpolate(trans("Address"))}</p><h6 data-v-c6d725dd>${ssrInterpolate(settings.value && settings.value.address ? settings.value.address : "")}</h6></div></div><div class="widget-contact-grid" data-v-c6d725dd><div class="icon" data-v-c6d725dd><i class="fas fa-phone-alt" data-v-c6d725dd></i></div><div class="contact-grid-details" data-v-c6d725dd><p data-v-c6d725dd>${ssrInterpolate(trans("Phone Number"))}</p><h6 data-v-c6d725dd>`);
      if (settings.value && settings.value.phone) {
        _push(`<a dir="ltr"${ssrRenderAttr("href", `tel:${settings.value.phone}`)} data-v-c6d725dd>${ssrInterpolate(settings.value.phone)}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h6></div></div><div class="widget-contact-grid" data-v-c6d725dd><div class="icon" data-v-c6d725dd><i class="fas fa-envelope" data-v-c6d725dd></i></div><div class="contact-grid-details" data-v-c6d725dd><p data-v-c6d725dd>${ssrInterpolate(trans("Email Address"))}</p><h6 data-v-c6d725dd>`);
      if (settings.value && settings.value.email) {
        _push(`<a dir="ltr"${ssrRenderAttr("href", `mailto:${settings.value.email}`)} data-v-c6d725dd>${ssrInterpolate(settings.value.email)}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h6></div></div></div></div></div></div></div></div><div class="copyright-wrap" data-v-c6d725dd><div class="container" data-v-c6d725dd><div class="row gy-3 justify-content-md-between justify-content-center" data-v-c6d725dd><div class="col-auto align-self-center" data-v-c6d725dd><p class="copyright-text text-center" data-v-c6d725dd> © <a href="#" data-v-c6d725dd>${ssrInterpolate(seo.value && seo.value.website_name ? seo.value.website_name : "")}</a> ${ssrInterpolate(currentYear.value)} | ${ssrInterpolate(trans("All Rights Reserved"))}</p></div><div class="col-auto" data-v-c6d725dd><div class="footer-links" data-v-c6d725dd>`);
      _push(ssrRenderComponent(unref(Link), { href: aboutUrl.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("About Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("About Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), { href: contactUrl.value }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(trans("Contact Us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(trans("Contact Us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></footer>`);
      if (whatsappFabUrl.value) {
        _push(`<a class="wa-fab"${ssrRenderAttr("href", whatsappFabUrl.value)} target="_blank" rel="noopener" aria-label="WhatsApp"${ssrRenderAttr("title", trans("WhatsApp"))} data-v-c6d725dd><i class="fab fa-whatsapp" aria-hidden="true" data-v-c6d725dd></i></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="scroll-top" data-v-c6d725dd><svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102" data-v-c6d725dd><path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style="${ssrRenderStyle({ "transition": "stroke-dashoffset 10ms linear 0s", "stroke-dasharray": "307.919, 307.919", "stroke-dashoffset": "307.919" })}" data-v-c6d725dd></path></svg></div><!--]-->`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/App.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const AppLayout = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-c6d725dd"]]);
const __default__$6 = {
  components: {
    AppLayout
  }
};
const _sfc_main$e = /* @__PURE__ */ Object.assign(__default__$6, {
  __name: "AboutUs",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    computed(() => page.props.seo || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const settings = computed(() => page.props.settings || {});
    const whatsappHref = computed(() => {
      const s = settings.value || {};
      const raw = s.whatsapp || s.sales_whatsapp;
      if (!raw) return null;
      const v = String(raw).trim();
      if (!v) return null;
      if (v.startsWith("http://") || v.startsWith("https://")) return v;
      const digits = v.replace(/[^\d]/g, "");
      return digits ? `https://wa.me/${digits}` : null;
    });
    const contactUsHref = computed(() => {
      try {
        return route("contact-us");
      } catch (e) {
        return "/contact-us";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(trans("About Us"))} | Mutlu</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(trans("About Us")) + " | Mutlu", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="breadcumb-wrapper"${_scopeId}><div class="container"${_scopeId}><div class="row"${_scopeId}><div class="col-lg-6"${_scopeId}><div class="breadcumb-content"${_scopeId}><h1 class="breadcumb-title"${_scopeId}>${ssrInterpolate(trans("About Us"))}</h1><ul class="breadcumb-menu"${_scopeId}><li${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("home")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Home"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Home")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li class="active"${_scopeId}>${ssrInterpolate(trans("About Us"))}</li></ul></div></div><div class="col-lg-6 d-lg-block d-none"${_scopeId}><div class="breadcumb-thumb"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "images/custom/about-us.png")} alt="img"${_scopeId}></div></div></div></div></div><div class="space-top"${_scopeId}><div class="container"${_scopeId}><div class="row"${_scopeId}><div class="col-xxl-7 col-xl-6"${_scopeId}><div class="about-thumb2 mb-40 mb-xl-0"${_scopeId}><div class="about-img-1"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "images/custom/person_checking_battery.png")} alt="img"${_scopeId}></div><div class="about-img-2"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "images/custom/battery_factory.png")} alt="img"${_scopeId}></div><div class="about-counter-wrap jump-reverse"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "site/img/icon/about_icon2-1.svg")} alt="img"${_scopeId}><h3 class="about-counter"${_scopeId}><span class="counter-number"${_scopeId}>${ssrInterpolate(settings.value.customer_count || 5)}</span>k+</h3><h4 class="about-counter-text"${_scopeId}>${ssrInterpolate(trans("Customer"))}</h4></div><div class="about-year-wrap2 movingX"${_scopeId}><div class="about-year-grid-wrap"${_scopeId}><div class="icon"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "site/img/icon/about_icon2-2.png")} alt="img"${_scopeId}></div><h3 class="about-counter"${_scopeId}><span class="counter-number"${_scopeId}>${ssrInterpolate(settings.value.y_experince || 10)}</span>+</h3></div><h4 class="about-year-text"${_scopeId}>${ssrInterpolate(trans("Years Of Experience"))}</h4></div></div></div><div class="col-xxl-5 col-xl-6"${_scopeId}><div class="about-content-wrap"${_scopeId}><div class="title-area mb-30"${_scopeId}><span class="sub-title"${_scopeId}>${ssrInterpolate(trans("About Us"))}</span><h2 class="sec-title"${_scopeId}>${ssrInterpolate(trans("The first company to import batteries in syria"))} <img class="title-bg-shape shape-center"${ssrRenderAttr("src", asset_path.value + "site/img/bg/title-bg-shape.png")} alt="img"${_scopeId}></h2><p class="sec-text"${_scopeId}>${ssrInterpolate(trans("Mutlu Company was founded in the city of Sarmada in late 2011, and is one of the first companies specializing in importing batteries in Syria."))}. <br${_scopeId}> ${ssrInterpolate(trans("We import all types of high-quality batteries for various industrial, commercial, and domestic uses."))}: <br${_scopeId}> ${ssrInterpolate(trans("car batteries, Indian batteries, lithium batteries, and more. We also carry batteries for modern cars, including start-stop batteries"))}, <br${_scopeId}> ${ssrInterpolate(trans("All types of car batteries from 35 amps to 240 amps"))} <br${_scopeId}> ${ssrInterpolate(trans("In addition to all types of solar panels, we also offer residential and agricultural inverters"))}, </p></div></div></div></div></div></div><section class="process-area-1 space shape-mockup-wrap"${_scopeId}><div class="portfolio-shape-img shape-mockup d-lg-block d-none"${_scopeId}><img class="about1-shape-img-1 spin"${ssrRenderAttr("src", asset_path.value + "site/img/normal/about_shape1-2.svg")} alt="img"${_scopeId}><img class="about1-shape-img-2 spin2"${ssrRenderAttr("src", asset_path.value + "site/img/normal/about_shape1-1.svg")} alt="img"${_scopeId}></div><div class="container"${_scopeId}><div class="row justify-content-center"${_scopeId}><div class="col-lg-6"${_scopeId}><div class="title-area text-center"${_scopeId}><span class="sub-title"${_scopeId}>${ssrInterpolate(trans("Why Us"))}</span><h2 class="sec-title"${_scopeId}>${ssrInterpolate(trans("Why Mutlu Batteries?"))}</h2></div></div></div><div class="row gy-30"${_scopeId}><div class="col-lg-4 process-card-wrap"${_scopeId}><div class="process-card"${_scopeId}><div class="process-card-icon"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "site/img/icon/process-icon-1-1.svg")} alt="img"${_scopeId}></div><h4 class="process-card-title"${_scopeId}>${ssrInterpolate(trans("Technology"))}</h4><p class="process-card-text"${_scopeId}>${ssrInterpolate(trans("High-tech solutions designed with Mutlu quality and experience for different types of vehicles and intended uses"))}</p></div></div><div class="col-lg-4 process-card-wrap"${_scopeId}><div class="process-card process-card-center"${_scopeId}><div class="process-card-icon"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "site/img/icon/process-icon-1-2.svg")} alt="img"${_scopeId}></div><h4 class="process-card-title"${_scopeId}>${ssrInterpolate(trans("M-Quality"))}</h4><p class="process-card-text"${_scopeId}>${ssrInterpolate(trans("The M Quality stamp symbolizes the superior quality of Mutlu Battery products manufactured with different production technologies at IATF 16949 certified plants that respect people and the environment"))}</p></div></div><div class="col-lg-4 process-card-wrap"${_scopeId}><div class="process-card"${_scopeId}><div class="process-card-icon"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "site/img/icon/process-icon-1-3.svg")} alt="img"${_scopeId}></div><h4 class="process-card-title"${_scopeId}>${ssrInterpolate(trans("Choice of Vehicle Manufacturers"))}</h4><p class="process-card-text"${_scopeId}>${ssrInterpolate(trans("Meeting the technical and high-performance expectations of vehicle manufacturers for long years, Mutlu Battery is preferred as the original equipment manufacturer by numerous leading automotive companies"))}</p></div></div></div></div></section><div class="cta-area-1"${_scopeId}><div class="cta1-bg-thumb"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "images/custom/cta.png")} alt="img"${_scopeId}></div><div class="container"${_scopeId}><div class="cta-wrap1"${_scopeId}><div class="row justify-content-md-between align-items-center"${_scopeId}><div class="col-lg-6 col-md-8"${_scopeId}><div class="title-area mb-md-0"${_scopeId}><span class="sub-title style2 text-white"${_scopeId}>${ssrInterpolate(trans("Let Us Call You"))}</span><h2 class="sec-title text-white mb-0"${_scopeId}>${ssrInterpolate(trans("Lets Find Your Battery"))}</h2></div></div><div class="col-md-auto"${_scopeId}><div class="title-area mb-0"${_scopeId}>`);
            if (whatsappHref.value) {
              _push2(`<a target="_blank" rel="noopener" class="btn"${ssrRenderAttr("href", whatsappHref.value)}${_scopeId}>${ssrInterpolate(trans("Contact Us"))} <i class="fas fa-arrow-right ms-2"${_scopeId}></i></a>`);
            } else {
              _push2(ssrRenderComponent(unref(Link), {
                class: "btn",
                href: contactUsHref.value
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(trans("Contact Us"))} <i class="fas fa-arrow-right ms-2"${_scopeId2}></i>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(trans("Contact Us")) + " ", 1),
                      createVNode("i", { class: "fas fa-arrow-right ms-2" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "breadcumb-wrapper" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-lg-6" }, [
                      createVNode("div", { class: "breadcumb-content" }, [
                        createVNode("h1", { class: "breadcumb-title" }, toDisplayString(trans("About Us")), 1),
                        createVNode("ul", { class: "breadcumb-menu" }, [
                          createVNode("li", null, [
                            createVNode(unref(Link), {
                              href: _ctx.route("home")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trans("Home")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          createVNode("li", { class: "active" }, toDisplayString(trans("About Us")), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-lg-6 d-lg-block d-none" }, [
                      createVNode("div", { class: "breadcumb-thumb" }, [
                        createVNode("img", {
                          src: asset_path.value + "images/custom/about-us.png",
                          alt: "img"
                        }, null, 8, ["src"])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "space-top" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-xxl-7 col-xl-6" }, [
                      createVNode("div", { class: "about-thumb2 mb-40 mb-xl-0" }, [
                        createVNode("div", { class: "about-img-1" }, [
                          createVNode("img", {
                            src: asset_path.value + "images/custom/person_checking_battery.png",
                            alt: "img"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("div", { class: "about-img-2" }, [
                          createVNode("img", {
                            src: asset_path.value + "images/custom/battery_factory.png",
                            alt: "img"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("div", { class: "about-counter-wrap jump-reverse" }, [
                          createVNode("img", {
                            src: asset_path.value + "site/img/icon/about_icon2-1.svg",
                            alt: "img"
                          }, null, 8, ["src"]),
                          createVNode("h3", { class: "about-counter" }, [
                            createVNode("span", { class: "counter-number" }, toDisplayString(settings.value.customer_count || 5), 1),
                            createTextVNode("k+")
                          ]),
                          createVNode("h4", { class: "about-counter-text" }, toDisplayString(trans("Customer")), 1)
                        ]),
                        createVNode("div", { class: "about-year-wrap2 movingX" }, [
                          createVNode("div", { class: "about-year-grid-wrap" }, [
                            createVNode("div", { class: "icon" }, [
                              createVNode("img", {
                                src: asset_path.value + "site/img/icon/about_icon2-2.png",
                                alt: "img"
                              }, null, 8, ["src"])
                            ]),
                            createVNode("h3", { class: "about-counter" }, [
                              createVNode("span", { class: "counter-number" }, toDisplayString(settings.value.y_experince || 10), 1),
                              createTextVNode("+")
                            ])
                          ]),
                          createVNode("h4", { class: "about-year-text" }, toDisplayString(trans("Years Of Experience")), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-xxl-5 col-xl-6" }, [
                      createVNode("div", { class: "about-content-wrap" }, [
                        createVNode("div", { class: "title-area mb-30" }, [
                          createVNode("span", { class: "sub-title" }, toDisplayString(trans("About Us")), 1),
                          createVNode("h2", { class: "sec-title" }, [
                            createTextVNode(toDisplayString(trans("The first company to import batteries in syria")) + " ", 1),
                            createVNode("img", {
                              class: "title-bg-shape shape-center",
                              src: asset_path.value + "site/img/bg/title-bg-shape.png",
                              alt: "img"
                            }, null, 8, ["src"])
                          ]),
                          createVNode("p", { class: "sec-text" }, [
                            createTextVNode(toDisplayString(trans("Mutlu Company was founded in the city of Sarmada in late 2011, and is one of the first companies specializing in importing batteries in Syria.")) + ". ", 1),
                            createVNode("br"),
                            createTextVNode(" " + toDisplayString(trans("We import all types of high-quality batteries for various industrial, commercial, and domestic uses.")) + ": ", 1),
                            createVNode("br"),
                            createTextVNode(" " + toDisplayString(trans("car batteries, Indian batteries, lithium batteries, and more. We also carry batteries for modern cars, including start-stop batteries")) + ", ", 1),
                            createVNode("br"),
                            createTextVNode(" " + toDisplayString(trans("All types of car batteries from 35 amps to 240 amps")) + " ", 1),
                            createVNode("br"),
                            createTextVNode(" " + toDisplayString(trans("In addition to all types of solar panels, we also offer residential and agricultural inverters")) + ", ", 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "process-area-1 space shape-mockup-wrap" }, [
                createVNode("div", { class: "portfolio-shape-img shape-mockup d-lg-block d-none" }, [
                  createVNode("img", {
                    class: "about1-shape-img-1 spin",
                    src: asset_path.value + "site/img/normal/about_shape1-2.svg",
                    alt: "img"
                  }, null, 8, ["src"]),
                  createVNode("img", {
                    class: "about1-shape-img-2 spin2",
                    src: asset_path.value + "site/img/normal/about_shape1-1.svg",
                    alt: "img"
                  }, null, 8, ["src"])
                ]),
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row justify-content-center" }, [
                    createVNode("div", { class: "col-lg-6" }, [
                      createVNode("div", { class: "title-area text-center" }, [
                        createVNode("span", { class: "sub-title" }, toDisplayString(trans("Why Us")), 1),
                        createVNode("h2", { class: "sec-title" }, toDisplayString(trans("Why Mutlu Batteries?")), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "row gy-30" }, [
                    createVNode("div", { class: "col-lg-4 process-card-wrap" }, [
                      createVNode("div", { class: "process-card" }, [
                        createVNode("div", { class: "process-card-icon" }, [
                          createVNode("img", {
                            src: asset_path.value + "site/img/icon/process-icon-1-1.svg",
                            alt: "img"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("h4", { class: "process-card-title" }, toDisplayString(trans("Technology")), 1),
                        createVNode("p", { class: "process-card-text" }, toDisplayString(trans("High-tech solutions designed with Mutlu quality and experience for different types of vehicles and intended uses")), 1)
                      ])
                    ]),
                    createVNode("div", { class: "col-lg-4 process-card-wrap" }, [
                      createVNode("div", { class: "process-card process-card-center" }, [
                        createVNode("div", { class: "process-card-icon" }, [
                          createVNode("img", {
                            src: asset_path.value + "site/img/icon/process-icon-1-2.svg",
                            alt: "img"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("h4", { class: "process-card-title" }, toDisplayString(trans("M-Quality")), 1),
                        createVNode("p", { class: "process-card-text" }, toDisplayString(trans("The M Quality stamp symbolizes the superior quality of Mutlu Battery products manufactured with different production technologies at IATF 16949 certified plants that respect people and the environment")), 1)
                      ])
                    ]),
                    createVNode("div", { class: "col-lg-4 process-card-wrap" }, [
                      createVNode("div", { class: "process-card" }, [
                        createVNode("div", { class: "process-card-icon" }, [
                          createVNode("img", {
                            src: asset_path.value + "site/img/icon/process-icon-1-3.svg",
                            alt: "img"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("h4", { class: "process-card-title" }, toDisplayString(trans("Choice of Vehicle Manufacturers")), 1),
                        createVNode("p", { class: "process-card-text" }, toDisplayString(trans("Meeting the technical and high-performance expectations of vehicle manufacturers for long years, Mutlu Battery is preferred as the original equipment manufacturer by numerous leading automotive companies")), 1)
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "cta-area-1" }, [
                createVNode("div", { class: "cta1-bg-thumb" }, [
                  createVNode("img", {
                    src: asset_path.value + "images/custom/cta.png",
                    alt: "img"
                  }, null, 8, ["src"])
                ]),
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "cta-wrap1" }, [
                    createVNode("div", { class: "row justify-content-md-between align-items-center" }, [
                      createVNode("div", { class: "col-lg-6 col-md-8" }, [
                        createVNode("div", { class: "title-area mb-md-0" }, [
                          createVNode("span", { class: "sub-title style2 text-white" }, toDisplayString(trans("Let Us Call You")), 1),
                          createVNode("h2", { class: "sec-title text-white mb-0" }, toDisplayString(trans("Lets Find Your Battery")), 1)
                        ])
                      ]),
                      createVNode("div", { class: "col-md-auto" }, [
                        createVNode("div", { class: "title-area mb-0" }, [
                          whatsappHref.value ? (openBlock(), createBlock("a", {
                            key: 0,
                            target: "_blank",
                            rel: "noopener",
                            class: "btn",
                            href: whatsappHref.value
                          }, [
                            createTextVNode(toDisplayString(trans("Contact Us")) + " ", 1),
                            createVNode("i", { class: "fas fa-arrow-right ms-2" })
                          ], 8, ["href"])) : (openBlock(), createBlock(unref(Link), {
                            key: 1,
                            class: "btn",
                            href: contactUsHref.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(trans("Contact Us")) + " ", 1),
                              createVNode("i", { class: "fas fa-arrow-right ms-2" })
                            ]),
                            _: 1
                          }, 8, ["href"]))
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Base/resources/assets/js/Pages/AboutUs.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = {
  __name: "FaqSection",
  __ssrInlineRender: true,
  props: {
    faqs: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const locale = computed(() => page.props.locale || "en");
    const asset_path = computed(() => page.props.asset_path || "");
    const faqsToShow = computed(() => props.faqs || []);
    const openFaqId = ref(null);
    const isFaqOpen = (id) => openFaqId.value === id;
    const translatedQuestion = (faq) => {
      if (!faq || !faq.question) return "";
      const loc = locale.value;
      if (typeof faq.question === "string") return faq.question;
      return faq.question[loc] || Object.values(faq.question)[0] || "";
    };
    const translatedAnswer = (faq) => {
      if (!faq || !faq.answer) return "";
      const loc = locale.value;
      if (typeof faq.answer === "string") return faq.answer;
      return faq.answer[loc] || Object.values(faq.answer)[0] || "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (faqsToShow.value.length) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "faq-area-2 space" }, _attrs))} data-v-019b9652><div class="container" data-v-019b9652><div class="row gx-60 flex-row-reverse" data-v-019b9652><div class="col-xl-6" data-v-019b9652><div class="faq-thumb2 mb-xl-0 mb-50" data-v-019b9652><div class="about-counter-grid jump" data-v-019b9652><img${ssrRenderAttr("src", asset_path.value + "site/img/icon/faq2-counter-icon-1.svg")} alt="img" data-v-019b9652></div><img${ssrRenderAttr("src", asset_path.value + "images/custom/faqs.jpg")} alt="img" data-v-019b9652></div></div><div class="col-xl-6" data-v-019b9652><div class="title-area" data-v-019b9652><span class="sub-title" data-v-019b9652>${ssrInterpolate(trans("FAQs"))}</span><h2 class="sec-title" data-v-019b9652></h2></div><div class="accordion-area accordion" id="faqAccordion" data-v-019b9652><!--[-->`);
        ssrRenderList(faqsToShow.value, (faq) => {
          _push(`<div class="${ssrRenderClass([{ active: isFaqOpen(faq.id) }, "accordion-card style2"])}" data-v-019b9652><div class="accordion-header"${ssrRenderAttr("id", `collapse-item-${faq.id}`)} data-v-019b9652><button type="button" class="${ssrRenderClass([{ collapsed: !isFaqOpen(faq.id) }, "accordion-button"])}"${ssrRenderAttr("aria-expanded", isFaqOpen(faq.id))}${ssrRenderAttr("aria-controls", `collapse-${faq.id}`)} data-v-019b9652>${ssrInterpolate(translatedQuestion(faq))}</button></div><div${ssrRenderAttr("id", `collapse-${faq.id}`)} class="${ssrRenderClass([{ show: isFaqOpen(faq.id) }, "accordion-collapse collapse"])}"${ssrRenderAttr("aria-labelledby", `collapse-item-${faq.id}`)} data-bs-parent="#faqAccordion" data-v-019b9652><div class="accordion-body" data-v-019b9652><p class="faq-text" data-v-019b9652>${translatedAnswer(faq) ?? ""}</p></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FaqSection.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const FaqSection = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-019b9652"]]);
const __default__$5 = {
  components: {
    AppLayout,
    FaqSection
  }
};
const _sfc_main$c = /* @__PURE__ */ Object.assign(__default__$5, {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const seo = computed(() => page.props.seo);
    const settings = computed(() => page.props.settings);
    const asset_path = computed(() => page.props.asset_path || "");
    const storage_path = computed(() => page.props.storage_path || "");
    const locale = computed(() => page.props.locale);
    computed(() => page.props.clients || []);
    const faqs = computed(() => page.props.faqs || []);
    const featuredProducts = computed(() => page.props.featuredProducts || []);
    const translateField = (value) => {
      if (!value) return "";
      if (typeof value === "string") return value;
      const loc = locale.value || "en";
      if (typeof value === "object" && value !== null) {
        return value[loc] || Object.values(value)[0] || "";
      }
      return "";
    };
    const contactSuccess = ref(false);
    const contactForm = useForm({
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: ""
    });
    const handleContactSubmit = () => {
      if (contactForm.processing) return false;
      let contactUrl = "/contact-us";
      try {
        if (typeof route !== "undefined" && route) {
          contactUrl = route("contact-us.store");
        } else {
          const currentLocale = page.props.locale || "";
          contactUrl = currentLocale ? `/${currentLocale}/contact-us` : "/contact-us";
        }
      } catch (e) {
        const currentLocale = page.props.locale || "";
        contactUrl = currentLocale ? `/${currentLocale}/contact-us` : "/contact-us";
      }
      contactForm.post(contactUrl, {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
          contactSuccess.value = false;
        },
        onSuccess: () => {
          contactSuccess.value = true;
          contactForm.reset();
          contactForm.clearErrors();
          setTimeout(() => {
            contactSuccess.value = false;
          }, 5e3);
        },
        onError: () => {
          contactSuccess.value = false;
        }
      });
      return false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(trans("Home"))} | Mutlu</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(trans("Home")) + " | Mutlu", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="hero-wrapper hero-2" id="hero" style="${ssrRenderStyle({
              backgroundImage: `url(${storage_path.value + settings.value.hero_img})`
            })}"${_scopeId}><div class="hero-shape2-1"${_scopeId}><span class="hero-shape2-2"${_scopeId}></span></div><div class="container"${_scopeId}><div class="row"${_scopeId}><div class="col-xxl-6 col-xl-5 col-lg-8"${_scopeId}><div class="hero-style2"${_scopeId}><span class="sub-title text-white"${_scopeId}>${ssrInterpolate(trans("Mutlu Batteries"))}</span><h1 class="hero-title text-white"${_scopeId}>${ssrInterpolate(seo.value.main_title)}</h1><p class="hero-text text-white"${_scopeId}>${ssrInterpolate(seo.value.website_desc)}</p><div class="btn-group"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("about-us"),
              class: "btn"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Learn More"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Learn More")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="call-media-wrap"${_scopeId}><div class="icon"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "site/img/icon/phone-1.svg")} alt="img"${_scopeId}></div><div class="media-body"${_scopeId}><h6 class="title text-white"${_scopeId}>${ssrInterpolate(trans("Requesting A Call"))}:</h6><h4 class="link"${_scopeId}><a dir="ltr" class="text-white"${ssrRenderAttr("href", "tel:" + settings.value.phone)}${_scopeId}>${ssrInterpolate(settings.value.phone)}</a></h4></div></div></div></div></div></div></div></div><div class="portfolio-area-1 space overflow-hidden"${_scopeId}><div class="container"${_scopeId}><div class="row justify-content-between align-items-end"${_scopeId}><div class="col-xl-5 col-lg-6"${_scopeId}><div class="title-area"${_scopeId}><span class="sub-title"${_scopeId}>${ssrInterpolate(trans("Our Featured Products"))}</span><h2 class="sec-title"${_scopeId}>${ssrInterpolate(trans("Check out the best-selling products at affordable prices"))} <img class="title-bg-shape"${ssrRenderAttr("src", asset_path.value + "site/img/bg/title-bg-shape.png")} alt="img"${_scopeId}></h2></div></div><div class="col-sm-auto"${_scopeId}><div class="title-area"${_scopeId}><div class="icon-box"${_scopeId}><button data-slick-prev=".portfolio-slider1" class="slick-arrow default"${_scopeId}><i class="fas fa-arrow-left"${_scopeId}></i></button><button data-slick-next=".portfolio-slider1" class="slick-arrow default"${_scopeId}><i class="fas fa-arrow-right"${_scopeId}></i></button></div></div></div></div></div><div class="container-fluid p-0"${_scopeId}><div class="row global-carousel gx-30 portfolio-slider1" data-slide-show="1" data-center-mode="true" data-xl-center-mode="true" data-ml-center-mode="true" data-lg-center-mode="true" data-center-padding="578px" data-xl-center-padding="350px" data-ml-center-padding="300px" data-lg-center-padding="200px"${_scopeId}>`);
            if (featuredProducts.value && featuredProducts.value.length) {
              _push2(`<!--[-->`);
              ssrRenderList(featuredProducts.value, (product) => {
                _push2(`<div class="col-lg-6"${_scopeId}><div class="portfolio-card style2"${_scopeId}><div class="portfolio-card-thumb"${_scopeId}><img${ssrRenderAttr("src", product.image_link)}${ssrRenderAttr("alt", translateField(product.title) || "Product")}${_scopeId}></div><div class="portfolio-card-details"${_scopeId}><div class="media-left"${_scopeId}><h4 class="portfolio-card-details_title"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("shop.show", product.slug)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(translateField(product.title))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(translateField(product.title)), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</h4></div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("shop.show", product.slug),
                  class: "icon-btn"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<i class="fas fa-arrow-right"${_scopeId2}></i>`);
                    } else {
                      return [
                        createVNode("i", { class: "fas fa-arrow-right" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="col-12"${_scopeId}><div class="text-center py-5"${_scopeId}><h4${_scopeId}>${ssrInterpolate(trans("No featured products yet"))}</h4></div></div>`);
            }
            _push2(`</div></div></div><div class="appointment-area-2 bg-smoke overflow-hidden" style="${ssrRenderStyle({ backgroundImage: `url(${asset_path.value}images/custom/contact_bg.png)` })}"${_scopeId}><div class="container"${_scopeId}><div class="row gx-0"${_scopeId}><div class="col-xl-7"${_scopeId}><div class="space"${_scopeId}><div class="appointment-form-wrap bg-white"${_scopeId}><div class="title-area"${_scopeId}><span class="sub-title"${_scopeId}>${ssrInterpolate(trans("Let Us Call You"))}</span><h2 class="sec-title"${_scopeId}>${ssrInterpolate(trans("Please Fill The Form Below"))}</h2></div><form class="appointment-form"${_scopeId}><div class="row"${_scopeId}><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><input${ssrRenderAttr("value", unref(contactForm).name)} type="text" class="form-control style-border" name="name" id="home_contact_name"${ssrRenderAttr("placeholder", trans("Your Name"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(contactForm).errors.name) {
              _push2(`<div class="text-danger mt-1 small"${_scopeId}>${ssrInterpolate(unref(contactForm).errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><input${ssrRenderAttr("value", unref(contactForm).email)} type="email" class="form-control style-border" name="email" id="home_contact_email"${ssrRenderAttr("placeholder", trans("Email Address"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(contactForm).errors.email) {
              _push2(`<div class="text-danger mt-1 small"${_scopeId}>${ssrInterpolate(unref(contactForm).errors.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><input${ssrRenderAttr("value", unref(contactForm).mobile)} type="text" class="form-control style-border" name="mobile" id="home_contact_mobile"${ssrRenderAttr("placeholder", trans("Phone Number"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(contactForm).errors.mobile) {
              _push2(`<div class="text-danger mt-1 small"${_scopeId}>${ssrInterpolate(unref(contactForm).errors.mobile)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="col-md-6"${_scopeId}><div class="form-group"${_scopeId}><input${ssrRenderAttr("value", unref(contactForm).subject)} type="text" class="form-control style-border" name="subject" id="home_contact_mobile"${ssrRenderAttr("placeholder", trans("Subject"))}${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(contactForm).errors.subject) {
              _push2(`<div class="text-danger mt-1 small"${_scopeId}>${ssrInterpolate(unref(contactForm).errors.subject)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="form-group col-12"${_scopeId}><textarea${ssrRenderAttr("placeholder", trans("Message here.."))} id="home_contact_message" name="message" class="form-control style-border"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(contactForm).message)}</textarea>`);
            if (unref(contactForm).errors.message) {
              _push2(`<div class="text-danger mt-1 small"${_scopeId}>${ssrInterpolate(unref(contactForm).errors.message)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-btn col-12"${_scopeId}><button class="btn style2" type="submit"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""}${_scopeId}>`);
            if (unref(contactForm).processing) {
              _push2(`<span${_scopeId}>${ssrInterpolate(trans("Sending..."))}</span>`);
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(trans("Submit"))}</span>`);
            }
            _push2(`<i class="fas fa-arrow-right ms-2"${_scopeId}></i></button></div>`);
            if (contactSuccess.value) {
              _push2(`<div class="col-12 mt-3"${_scopeId}><div class="alert alert-success"${_scopeId}>${ssrInterpolate(trans("Thank you for contacting us! We will get back to you soon."))}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form></div></div></div><div class="col-xl-5 d-xl-block d-none"${_scopeId}><div class="appointment-thumb-2"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "images/custom/shop.png")} alt="img"${_scopeId}></div></div></div></div></div>`);
            _push2(ssrRenderComponent(FaqSection, { faqs: faqs.value }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", {
                class: "hero-wrapper hero-2",
                id: "hero",
                style: {
                  backgroundImage: `url(${storage_path.value + settings.value.hero_img})`
                }
              }, [
                createVNode("div", { class: "hero-shape2-1" }, [
                  createVNode("span", { class: "hero-shape2-2" })
                ]),
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-xxl-6 col-xl-5 col-lg-8" }, [
                      createVNode("div", { class: "hero-style2" }, [
                        createVNode("span", { class: "sub-title text-white" }, toDisplayString(trans("Mutlu Batteries")), 1),
                        createVNode("h1", { class: "hero-title text-white" }, toDisplayString(seo.value.main_title), 1),
                        createVNode("p", { class: "hero-text text-white" }, toDisplayString(seo.value.website_desc), 1),
                        createVNode("div", { class: "btn-group" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("about-us"),
                            class: "btn"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(trans("Learn More")), 1)
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("div", { class: "call-media-wrap" }, [
                            createVNode("div", { class: "icon" }, [
                              createVNode("img", {
                                src: asset_path.value + "site/img/icon/phone-1.svg",
                                alt: "img"
                              }, null, 8, ["src"])
                            ]),
                            createVNode("div", { class: "media-body" }, [
                              createVNode("h6", { class: "title text-white" }, toDisplayString(trans("Requesting A Call")) + ":", 1),
                              createVNode("h4", { class: "link" }, [
                                createVNode("a", {
                                  dir: "ltr",
                                  class: "text-white",
                                  href: "tel:" + settings.value.phone
                                }, toDisplayString(settings.value.phone), 9, ["href"])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ], 4),
              createVNode("div", { class: "portfolio-area-1 space overflow-hidden" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row justify-content-between align-items-end" }, [
                    createVNode("div", { class: "col-xl-5 col-lg-6" }, [
                      createVNode("div", { class: "title-area" }, [
                        createVNode("span", { class: "sub-title" }, toDisplayString(trans("Our Featured Products")), 1),
                        createVNode("h2", { class: "sec-title" }, [
                          createTextVNode(toDisplayString(trans("Check out the best-selling products at affordable prices")) + " ", 1),
                          createVNode("img", {
                            class: "title-bg-shape",
                            src: asset_path.value + "site/img/bg/title-bg-shape.png",
                            alt: "img"
                          }, null, 8, ["src"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-sm-auto" }, [
                      createVNode("div", { class: "title-area" }, [
                        createVNode("div", { class: "icon-box" }, [
                          createVNode("button", {
                            "data-slick-prev": ".portfolio-slider1",
                            class: "slick-arrow default"
                          }, [
                            createVNode("i", { class: "fas fa-arrow-left" })
                          ]),
                          createVNode("button", {
                            "data-slick-next": ".portfolio-slider1",
                            class: "slick-arrow default"
                          }, [
                            createVNode("i", { class: "fas fa-arrow-right" })
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "container-fluid p-0" }, [
                  createVNode("div", {
                    class: "row global-carousel gx-30 portfolio-slider1",
                    "data-slide-show": "1",
                    "data-center-mode": "true",
                    "data-xl-center-mode": "true",
                    "data-ml-center-mode": "true",
                    "data-lg-center-mode": "true",
                    "data-center-padding": "578px",
                    "data-xl-center-padding": "350px",
                    "data-ml-center-padding": "300px",
                    "data-lg-center-padding": "200px"
                  }, [
                    featuredProducts.value && featuredProducts.value.length ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(featuredProducts.value, (product) => {
                      return openBlock(), createBlock("div", {
                        key: product.id,
                        class: "col-lg-6"
                      }, [
                        createVNode("div", { class: "portfolio-card style2" }, [
                          createVNode("div", { class: "portfolio-card-thumb" }, [
                            createVNode("img", {
                              src: product.image_link,
                              alt: translateField(product.title) || "Product"
                            }, null, 8, ["src", "alt"])
                          ]),
                          createVNode("div", { class: "portfolio-card-details" }, [
                            createVNode("div", { class: "media-left" }, [
                              createVNode("h4", { class: "portfolio-card-details_title" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("shop.show", product.slug)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(translateField(product.title)), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ])
                            ]),
                            createVNode(unref(Link), {
                              href: _ctx.route("shop.show", product.slug),
                              class: "icon-btn"
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "fas fa-arrow-right" })
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ])
                      ]);
                    }), 128)) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "col-12"
                    }, [
                      createVNode("div", { class: "text-center py-5" }, [
                        createVNode("h4", null, toDisplayString(trans("No featured products yet")), 1)
                      ])
                    ]))
                  ])
                ])
              ]),
              createVNode("div", {
                class: "appointment-area-2 bg-smoke overflow-hidden",
                style: { backgroundImage: `url(${asset_path.value}images/custom/contact_bg.png)` }
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row gx-0" }, [
                    createVNode("div", { class: "col-xl-7" }, [
                      createVNode("div", { class: "space" }, [
                        createVNode("div", { class: "appointment-form-wrap bg-white" }, [
                          createVNode("div", { class: "title-area" }, [
                            createVNode("span", { class: "sub-title" }, toDisplayString(trans("Let Us Call You")), 1),
                            createVNode("h2", { class: "sec-title" }, toDisplayString(trans("Please Fill The Form Below")), 1)
                          ]),
                          createVNode("form", {
                            onSubmit: withModifiers(handleContactSubmit, ["prevent"]),
                            class: "appointment-form"
                          }, [
                            createVNode("div", { class: "row" }, [
                              createVNode("div", { class: "col-md-6" }, [
                                createVNode("div", { class: "form-group" }, [
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(contactForm).name = $event,
                                    type: "text",
                                    class: "form-control style-border",
                                    name: "name",
                                    id: "home_contact_name",
                                    placeholder: trans("Your Name"),
                                    disabled: unref(contactForm).processing
                                  }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                    [vModelText, unref(contactForm).name]
                                  ]),
                                  unref(contactForm).errors.name ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-danger mt-1 small"
                                  }, toDisplayString(unref(contactForm).errors.name), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "col-md-6" }, [
                                createVNode("div", { class: "form-group" }, [
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(contactForm).email = $event,
                                    type: "email",
                                    class: "form-control style-border",
                                    name: "email",
                                    id: "home_contact_email",
                                    placeholder: trans("Email Address"),
                                    disabled: unref(contactForm).processing
                                  }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                    [vModelText, unref(contactForm).email]
                                  ]),
                                  unref(contactForm).errors.email ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-danger mt-1 small"
                                  }, toDisplayString(unref(contactForm).errors.email), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "col-md-6" }, [
                                createVNode("div", { class: "form-group" }, [
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(contactForm).mobile = $event,
                                    type: "text",
                                    class: "form-control style-border",
                                    name: "mobile",
                                    id: "home_contact_mobile",
                                    placeholder: trans("Phone Number"),
                                    disabled: unref(contactForm).processing
                                  }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                    [vModelText, unref(contactForm).mobile]
                                  ]),
                                  unref(contactForm).errors.mobile ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-danger mt-1 small"
                                  }, toDisplayString(unref(contactForm).errors.mobile), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("div", { class: "col-md-6" }, [
                                createVNode("div", { class: "form-group" }, [
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(contactForm).subject = $event,
                                    type: "text",
                                    class: "form-control style-border",
                                    name: "subject",
                                    id: "home_contact_mobile",
                                    placeholder: trans("Subject"),
                                    disabled: unref(contactForm).processing
                                  }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                    [vModelText, unref(contactForm).subject]
                                  ]),
                                  unref(contactForm).errors.subject ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-danger mt-1 small"
                                  }, toDisplayString(unref(contactForm).errors.subject), 1)) : createCommentVNode("", true)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "form-group col-12" }, [
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(contactForm).message = $event,
                                placeholder: trans("Message here.."),
                                id: "home_contact_message",
                                name: "message",
                                class: "form-control style-border",
                                disabled: unref(contactForm).processing
                              }, null, 8, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                [vModelText, unref(contactForm).message]
                              ]),
                              unref(contactForm).errors.message ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-danger mt-1 small"
                              }, toDisplayString(unref(contactForm).errors.message), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "form-btn col-12" }, [
                              createVNode("button", {
                                class: "btn style2",
                                type: "submit",
                                disabled: unref(contactForm).processing
                              }, [
                                unref(contactForm).processing ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(trans("Sending...")), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(trans("Submit")), 1)),
                                createVNode("i", { class: "fas fa-arrow-right ms-2" })
                              ], 8, ["disabled"])
                            ]),
                            contactSuccess.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "col-12 mt-3"
                            }, [
                              createVNode("div", { class: "alert alert-success" }, toDisplayString(trans("Thank you for contacting us! We will get back to you soon.")), 1)
                            ])) : createCommentVNode("", true)
                          ], 32)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-xl-5 d-xl-block d-none" }, [
                      createVNode("div", { class: "appointment-thumb-2" }, [
                        createVNode("img", {
                          src: asset_path.value + "images/custom/shop.png",
                          alt: "img"
                        }, null, 8, ["src"])
                      ])
                    ])
                  ])
                ])
              ], 4),
              createVNode(FaqSection, { faqs: faqs.value }, null, 8, ["faqs"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Base/resources/assets/js/Pages/Index.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$c
}, Symbol.toStringTag, { value: "Module" }));
const markerIcon = "/build/assets/marker-icon-hN30_KVU.png";
const markerShadow = "/build/assets/marker-shadow-f7SaPCxT.png";
const _sfc_main$b = {
  __name: "LeafletMap",
  __ssrInlineRender: true,
  props: {
    lat: Number,
    lng: Number
  },
  setup(__props) {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      shadowUrl: markerShadow
    });
    const props = __props;
    const mapEl = ref(null);
    let map = null;
    let marker = null;
    onMounted(() => {
      map = L.map(mapEl.value).setView(
        [props.lat || 24.7136, props.lng || 46.6753],
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
      }).addTo(map);
      if (props.lat && props.lng) {
        marker = L.marker([props.lat, props.lng]).addTo(map);
      }
    });
    watch(
      () => [props.lat, props.lng],
      ([lat, lng]) => {
        if (!lat || !lng || !map) return;
        map.setView([lat, lng], 15);
        if (marker) {
          map.removeLayer(marker);
        }
        marker = L.marker([lat, lng]).addTo(map);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "map",
        ref_key: "mapEl",
        ref: mapEl,
        class: "mt-2",
        style: { "height": "300px", "width": "300px", "z-index": "1" }
      }, _attrs))}></div>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Cart/resources/assets/js/Components/LeafletMap.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = {
  __name: "CartIndex",
  __ssrInlineRender: true,
  setup(__props) {
    const cartStore = useCartStore();
    const page = usePage();
    const msgErrorLocation = ref("");
    const lat = ref(0);
    const lng = ref(0);
    const createOrder = useForm({
      items: [],
      deliveryType: "home",
      shippingCost: 0,
      address: "",
      subPrice: 0,
      map: null,
      phone: "",
      name: ""
    });
    const submitSuccess = ref(false);
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            lat.value = position.coords.latitude;
            lng.value = position.coords.longitude;
            const mapUrl = `https://www.google.com/maps?q=${lat.value},${lng.value}`;
            createOrder.map = mapUrl;
            console.log("Map URL:", mapUrl);
          },
          function(error) {
            console.error("Error getting location:", error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    const submitOrder = () => {
      if ((createOrder.map === null || createOrder.map == "") && createOrder.address == "") {
        msgErrorLocation.value = trans("Please select your location");
        toastr.error(msgErrorLocation.value);
        return;
      }
      if (createOrder.phone == "") {
        msgErrorLocation.value = trans("Please insert your phone number");
        toastr.error(msgErrorLocation.value);
        return;
      }
      if (createOrder.name == "") {
        msgErrorLocation.value = trans("Please insert your Name");
        toastr.error(msgErrorLocation.value);
        return;
      }
      createOrder.items = cartStore.carts;
      createOrder.subPrice = subPrice.value;
      createOrder.shippingCost = shippingCost.value;
      let cartUrl = "/cart";
      try {
        if (typeof route !== "undefined" && route) {
          cartUrl = route("orders.store");
        } else {
          const currentLocale = page.props.locale || "";
          cartUrl = currentLocale ? `/${currentLocale}/orders` : "/orders";
        }
      } catch (e) {
        const currentLocale = page.props.locale || "";
        cartUrl = currentLocale ? `/${currentLocale}/orders` : "/orders";
      }
      createOrder.post(cartUrl, {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
          submitSuccess.value = false;
        },
        onSuccess: (page2) => {
          submitSuccess.value = true;
          createOrder.reset();
          createOrder.clearErrors();
          cartStore.emptyCart();
          setTimeout(() => {
            submitSuccess.value = false;
          }, 5e3);
          window.open(page2.props.flash.wa, "_blank");
        },
        onError: () => {
          submitSuccess.value = false;
        }
      });
    };
    const trans = (key) => page.props.translations[key] || key;
    const normalizeCapacity = (val) => {
      if (val === null || val === void 0) return "";
      return String(val).trim();
    };
    const formatCapacityLabel = (cap) => {
      const c = normalizeCapacity(cap);
      if (!c) return "";
      return /ah$/i.test(c) ? c : `${c}Ah`;
    };
    const shippingCost = computed(() => {
      const totalQty = cartStore.carts.reduce((sum, item) => {
        return sum + (item.quantity || 0);
      }, 0);
      const totalWeightKg = cartStore.carts.reduce((sum, item) => {
        return sum + (item.weight || 0) * (item.quantity || 0);
      }, 0);
      const totalWeightTon = totalWeightKg / 1e3;
      if (createOrder.deliveryType === "office") {
        if (totalQty > 20) {
          return totalWeightTon * 35;
        }
        if (totalQty >= 10) {
          return totalQty * 1;
        }
        return totalQty * 2;
      }
      if (createOrder.deliveryType === "home") {
        if (totalQty < 5) {
          return totalQty * 4;
        }
        if (totalQty <= 20) {
          return totalQty * 3;
        }
        return totalQty * 3;
      }
      return 0;
    });
    const subPrice = computed(() => {
      return cartStore.carts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("Our Products"))} | Mutlu</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(trans("Our Products")) + " | Mutlu", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="py-5 px-3 max-w-5xl mx-auto overflow-hidden" data-v-9f983db7${_scopeId}><section class="mb-4 text-center" data-v-9f983db7${_scopeId}><h2 class="display-6 fw-bold text-on-surface mb-1" data-v-9f983db7${_scopeId}>سلة المقتنيات</h2><p class="text-on-surface-variant-80 small" data-v-9f983db7${_scopeId}>يتوفر شحن حتى باب المنزل.</p></section><div class="row g-4" data-v-9f983db7${_scopeId}><div class="col-12 col-lg-8 d-flex flex-column gap-3" data-v-9f983db7${_scopeId}>`);
            if (submitSuccess.value) {
              _push2(`<div class="col-12 mt-3" data-v-9f983db7${_scopeId}><div class="alert alert-success" data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("The order has been sent for review"))}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(cartStore).carts, (cart) => {
              _push2(`<div class="bg-surface-container-lowest rounded-2xl p-3 p-sm-4 product-card-grid shadow-sm" data-v-9f983db7${_scopeId}><div class="product-image-wrap rounded-3 overflow-hidden flex-shrink-0" data-v-9f983db7${_scopeId}><img alt="بطارية" class="w-100 h-100 object-fit-cover"${ssrRenderAttr("src", cart.primary_slide)} data-v-9f983db7${_scopeId}></div><div class="d-flex flex-column justify-content-between min-w-0" data-v-9f983db7${_scopeId}><div data-v-9f983db7${_scopeId}><div class="d-flex justify-content-between align-items-start gap-2" data-v-9f983db7${_scopeId}><h3 class="fs-6 fs-sm-5 fw-bold text-on-surface lh-sm text-truncate" data-v-9f983db7${_scopeId}>بطارية 35Ah B20 (NS40)</h3><button class="btn p-0 text-primary-60 flex-shrink-0" data-v-9f983db7${_scopeId}><span class="material-symbols-outlined fs-20" data-v-9f983db7${_scopeId}>delete</span></button></div><div class="fs-11 small text-on-surface-variant-80 mt-1" data-v-9f983db7${_scopeId}><p class="mb-1" data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("Capacity (Ah)"))}${ssrInterpolate(formatCapacityLabel(cart.capacity))}</p><p class="mb-0" data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("Voltage (V)"))} ${ssrInterpolate(cart.voltage)}</p></div></div><div class="d-flex justify-content-between align-items-center mt-3" data-v-9f983db7${_scopeId}><div class="d-flex align-items-center bg-surface-container rounded-3 p-1" data-v-9f983db7${_scopeId}><button class="btn p-0 qty-btn d-flex align-items-center justify-content-center text-primary-custom active-scale-sm" data-v-9f983db7${_scopeId}><span class="material-symbols-outlined fs-18" data-v-9f983db7${_scopeId}>remove</span></button><span class="px-2 px-sm-4 fw-bold small fs-sm-6" data-v-9f983db7${_scopeId}>${ssrInterpolate(cart.quantity)}</span><button class="btn p-0 qty-btn d-flex align-items-center justify-content-center text-primary-custom active-scale-sm" data-v-9f983db7${_scopeId}><span class="material-symbols-outlined fs-18" data-v-9f983db7${_scopeId}>add</span></button></div><span class="h5 mb-0 fw-bolder text-on-surface" data-v-9f983db7${_scopeId}>${ssrInterpolate(cart.price)} $</span></div></div></div>`);
            });
            _push2(`<!--]--><div class="bg-surface-container-high rounded-2xl p-4 p-sm-5 d-flex flex-column gap-4" data-v-9f983db7${_scopeId}><div data-v-9f983db7${_scopeId}><h4 class="fw-bold h5 mb-4 d-flex align-items-center gap-2" data-v-9f983db7${_scopeId}><span class="material-symbols-outlined text-primary-custom" data-v-9f983db7${_scopeId}>local_shipping</span> طريقة الشحن </h4><div class="d-flex flex-column gap-3" data-v-9f983db7${_scopeId}><label class="${ssrRenderClass([unref(createOrder).deliveryType == "home" ? "bg-danger" : "bg-surface-container-lowest", "d-flex align-items-center gap-3 p-4 rounded-3 border border-transparent hover-border-outline-30 transition-all"])}" for="home-delivery" data-v-9f983db7${_scopeId}><input checked="" id="home-delivery" name="shipping-method" value="home" type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(createOrder).deliveryType, "home")) ? " checked" : ""} data-v-9f983db7${_scopeId}><div class="flex-grow-1 d-flex justify-content-between align-items-center" data-v-9f983db7${_scopeId}><div class="d-flex align-items-center gap-2" data-v-9f983db7${_scopeId}><span class="material-symbols-outlined text-on-surface-variant fs-20" data-v-9f983db7${_scopeId}>home</span><span class="fw-bold small" data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("Shipping to Home"))}</span></div></div></label><label class="${ssrRenderClass([unref(createOrder).deliveryType == "office" ? "bg-danger" : "bg-surface-container-lowest", "d-flex align-items-center gap-3 p-4 rounded-3 border border-transparent hover-border-outline-30 transition-all"])}" for="pickup-center" data-v-9f983db7${_scopeId}><input id="pickup-center" name="shipping-method" value="office" type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(createOrder).deliveryType, "office")) ? " checked" : ""} data-v-9f983db7${_scopeId}><div class="flex-grow-1 d-flex justify-content-between align-items-center" data-v-9f983db7${_scopeId}><div class="d-flex align-items-center gap-2" data-v-9f983db7${_scopeId}><span class="material-symbols-outlined text-on-surface-variant fs-20" data-v-9f983db7${_scopeId}>store</span><span class="fw-bold small" data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("Pickup Center"))}</span></div></div></label></div></div><div class="line-outline-30" data-v-9f983db7${_scopeId}></div>`);
            if (unref(createOrder).deliveryType === "home") {
              _push2(`<div class="d-flex flex-column gap-3" data-v-9f983db7${_scopeId}><div class="d-flex align-items-start gap-3" data-v-9f983db7${_scopeId}><div class="min-w-0 w-full" style="${ssrRenderStyle({ "overflow": "auto" })}" data-v-9f983db7${_scopeId}><div class="d-flex flex-column gap-2 flex-auto" data-v-9f983db7${_scopeId}><input type="text"${ssrRenderAttr("placeholder", trans("Name"))} class="form-control"${ssrRenderAttr("value", unref(createOrder).name)} data-v-9f983db7${_scopeId}><input type="text"${ssrRenderAttr("placeholder", trans("Address"))} class="form-control"${ssrRenderAttr("value", unref(createOrder).address)} data-v-9f983db7${_scopeId}><input type="text"${ssrRenderAttr("placeholder", trans("Phone"))} class="form-control"${ssrRenderAttr("value", unref(createOrder).phone)} data-v-9f983db7${_scopeId}></div>`);
              if (lat.value > 0 && lng.value > 0) {
                _push2(`<p class="text-on-surface-variant small text-truncate mb-0" data-v-9f983db7${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$b, {
                  lat: lat.value,
                  lng: lng.value
                }, null, _parent2, _scopeId));
                _push2(`<a${ssrRenderAttr("href", unref(createOrder).map)} target="_blank" data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("View Location"))}</a></p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><button class="btn w-100 btn-map px-4 py-3 rounded-3 fw-bold small transition-opacity active-scale d-flex align-items-center justify-content-center gap-2" data-v-9f983db7${_scopeId}><span class="material-symbols-outlined fs-18" data-v-9f983db7${_scopeId}>map</span> ${ssrInterpolate(trans("Get Location"))}</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="col-12 col-lg-4 mb-4" data-v-9f983db7${_scopeId}><div class="bg-surface-container-low rounded-3xl p-4 p-sm-5 sticky-top shadow-sm border border-outline-10" style="${ssrRenderStyle({ "top": "2rem" })}" data-v-9f983db7${_scopeId}><h3 class="h4 fw-bolder mb-4 pb-3 border-bottom border-outline-20" data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("Information Order"))}</h3><div class="d-flex flex-column gap-3 mb-4" data-v-9f983db7${_scopeId}><div class="d-flex justify-content-between text-on-surface-variant small fs-sm-6" data-v-9f983db7${_scopeId}><span data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("Subtotal"))}</span><span class="fw-semibold text-on-surface" data-v-9f983db7${_scopeId}>${ssrInterpolate(subPrice.value)} $</span></div><div class="d-flex justify-content-between text-on-surface-variant small fs-sm-6" data-v-9f983db7${_scopeId}><span data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("Shipping"))}</span><span class="fw-semibold text-on-surface" data-v-9f983db7${_scopeId}>${ssrInterpolate(shippingCost.value)} $</span></div><div class="pt-3 mt-3 border-top border-outline-30 d-flex justify-content-between align-items-baseline" data-v-9f983db7${_scopeId}><span class="h5 fw-bold text-on-surface mb-0" data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("Total"))}</span><span class="display-6 fw-bolder text-primary-custom" data-v-9f983db7${_scopeId}>${ssrInterpolate(shippingCost.value + subPrice.value)} $</span></div></div><div class="d-flex flex-column gap-3" data-v-9f983db7${_scopeId}>`);
            if (unref(cartStore).carts.length > 0) {
              _push2(`<form data-v-9f983db7${_scopeId}><button class="btn w-100 py-3 rounded-3 btn-gradient fw-bold fs-5 shadow active-scale transition-all" data-v-9f983db7${_scopeId}>${ssrInterpolate(trans("Create Order"))}</button></form>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="d-flex align-items-center justify-content-center gap-2 text-on-surface-variant-60 small py-2" data-v-9f983db7${_scopeId}><span class="material-symbols-outlined" style="${ssrRenderStyle({ "font-size": "14px" })}" data-v-9f983db7${_scopeId}>lock</span><span data-v-9f983db7${_scopeId}>يمكنك الدفع عند الاستلام أو الدفع عبر شام كاش</span></div></div></div></div></div></main>`);
          } else {
            return [
              createVNode("main", { class: "py-5 px-3 max-w-5xl mx-auto overflow-hidden" }, [
                createVNode("section", { class: "mb-4 text-center" }, [
                  createVNode("h2", { class: "display-6 fw-bold text-on-surface mb-1" }, "سلة المقتنيات"),
                  createVNode("p", { class: "text-on-surface-variant-80 small" }, "يتوفر شحن حتى باب المنزل.")
                ]),
                createVNode("div", { class: "row g-4" }, [
                  createVNode("div", { class: "col-12 col-lg-8 d-flex flex-column gap-3" }, [
                    submitSuccess.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "col-12 mt-3"
                    }, [
                      createVNode("div", { class: "alert alert-success" }, toDisplayString(trans("The order has been sent for review")), 1)
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).carts, (cart) => {
                      return openBlock(), createBlock("div", { class: "bg-surface-container-lowest rounded-2xl p-3 p-sm-4 product-card-grid shadow-sm" }, [
                        createVNode("div", { class: "product-image-wrap rounded-3 overflow-hidden flex-shrink-0" }, [
                          createVNode("img", {
                            alt: "بطارية",
                            class: "w-100 h-100 object-fit-cover",
                            src: cart.primary_slide
                          }, null, 8, ["src"])
                        ]),
                        createVNode("div", { class: "d-flex flex-column justify-content-between min-w-0" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "d-flex justify-content-between align-items-start gap-2" }, [
                              createVNode("h3", { class: "fs-6 fs-sm-5 fw-bold text-on-surface lh-sm text-truncate" }, "بطارية 35Ah B20 (NS40)"),
                              createVNode("button", {
                                onClick: ($event) => unref(cartStore).removeFromCart(cart),
                                class: "btn p-0 text-primary-60 flex-shrink-0"
                              }, [
                                createVNode("span", { class: "material-symbols-outlined fs-20" }, "delete")
                              ], 8, ["onClick"])
                            ]),
                            createVNode("div", { class: "fs-11 small text-on-surface-variant-80 mt-1" }, [
                              createVNode("p", { class: "mb-1" }, toDisplayString(trans("Capacity (Ah)")) + toDisplayString(formatCapacityLabel(cart.capacity)), 1),
                              createVNode("p", { class: "mb-0" }, toDisplayString(trans("Voltage (V)")) + " " + toDisplayString(cart.voltage), 1)
                            ])
                          ]),
                          createVNode("div", { class: "d-flex justify-content-between align-items-center mt-3" }, [
                            createVNode("div", { class: "d-flex align-items-center bg-surface-container rounded-3 p-1" }, [
                              createVNode("button", {
                                onClick: ($event) => unref(cartStore).decreaseQuantity(cart),
                                class: "btn p-0 qty-btn d-flex align-items-center justify-content-center text-primary-custom active-scale-sm"
                              }, [
                                createVNode("span", { class: "material-symbols-outlined fs-18" }, "remove")
                              ], 8, ["onClick"]),
                              createVNode("span", { class: "px-2 px-sm-4 fw-bold small fs-sm-6" }, toDisplayString(cart.quantity), 1),
                              createVNode("button", {
                                onClick: ($event) => unref(cartStore).addQuantity(cart),
                                class: "btn p-0 qty-btn d-flex align-items-center justify-content-center text-primary-custom active-scale-sm"
                              }, [
                                createVNode("span", { class: "material-symbols-outlined fs-18" }, "add")
                              ], 8, ["onClick"])
                            ]),
                            createVNode("span", { class: "h5 mb-0 fw-bolder text-on-surface" }, toDisplayString(cart.price) + " $", 1)
                          ])
                        ])
                      ]);
                    }), 256)),
                    createVNode("div", { class: "bg-surface-container-high rounded-2xl p-4 p-sm-5 d-flex flex-column gap-4" }, [
                      createVNode("div", null, [
                        createVNode("h4", { class: "fw-bold h5 mb-4 d-flex align-items-center gap-2" }, [
                          createVNode("span", { class: "material-symbols-outlined text-primary-custom" }, "local_shipping"),
                          createTextVNode(" طريقة الشحن ")
                        ]),
                        createVNode("div", { class: "d-flex flex-column gap-3" }, [
                          createVNode("label", {
                            class: [unref(createOrder).deliveryType == "home" ? "bg-danger" : "bg-surface-container-lowest", "d-flex align-items-center gap-3 p-4 rounded-3 border border-transparent hover-border-outline-30 transition-all"],
                            for: "home-delivery"
                          }, [
                            withDirectives(createVNode("input", {
                              checked: "",
                              id: "home-delivery",
                              name: "shipping-method",
                              value: "home",
                              type: "radio",
                              "onUpdate:modelValue": ($event) => unref(createOrder).deliveryType = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelRadio, unref(createOrder).deliveryType]
                            ]),
                            createVNode("div", { class: "flex-grow-1 d-flex justify-content-between align-items-center" }, [
                              createVNode("div", { class: "d-flex align-items-center gap-2" }, [
                                createVNode("span", { class: "material-symbols-outlined text-on-surface-variant fs-20" }, "home"),
                                createVNode("span", { class: "fw-bold small" }, toDisplayString(trans("Shipping to Home")), 1)
                              ])
                            ])
                          ], 2),
                          createVNode("label", {
                            class: [unref(createOrder).deliveryType == "office" ? "bg-danger" : "bg-surface-container-lowest", "d-flex align-items-center gap-3 p-4 rounded-3 border border-transparent hover-border-outline-30 transition-all"],
                            for: "pickup-center"
                          }, [
                            withDirectives(createVNode("input", {
                              id: "pickup-center",
                              name: "shipping-method",
                              value: "office",
                              type: "radio",
                              "onUpdate:modelValue": ($event) => unref(createOrder).deliveryType = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelRadio, unref(createOrder).deliveryType]
                            ]),
                            createVNode("div", { class: "flex-grow-1 d-flex justify-content-between align-items-center" }, [
                              createVNode("div", { class: "d-flex align-items-center gap-2" }, [
                                createVNode("span", { class: "material-symbols-outlined text-on-surface-variant fs-20" }, "store"),
                                createVNode("span", { class: "fw-bold small" }, toDisplayString(trans("Pickup Center")), 1)
                              ])
                            ])
                          ], 2)
                        ])
                      ]),
                      createVNode("div", { class: "line-outline-30" }),
                      unref(createOrder).deliveryType === "home" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "d-flex flex-column gap-3"
                      }, [
                        createVNode("div", { class: "d-flex align-items-start gap-3" }, [
                          createVNode("div", {
                            class: "min-w-0 w-full",
                            style: { "overflow": "auto" }
                          }, [
                            createVNode("div", { class: "d-flex flex-column gap-2 flex-auto" }, [
                              withDirectives(createVNode("input", {
                                type: "text",
                                placeholder: trans("Name"),
                                class: "form-control",
                                "onUpdate:modelValue": ($event) => unref(createOrder).name = $event
                              }, null, 8, ["placeholder", "onUpdate:modelValue"]), [
                                [vModelText, unref(createOrder).name]
                              ]),
                              withDirectives(createVNode("input", {
                                type: "text",
                                placeholder: trans("Address"),
                                class: "form-control",
                                "onUpdate:modelValue": ($event) => unref(createOrder).address = $event
                              }, null, 8, ["placeholder", "onUpdate:modelValue"]), [
                                [vModelText, unref(createOrder).address]
                              ]),
                              withDirectives(createVNode("input", {
                                type: "text",
                                placeholder: trans("Phone"),
                                class: "form-control",
                                "onUpdate:modelValue": ($event) => unref(createOrder).phone = $event
                              }, null, 8, ["placeholder", "onUpdate:modelValue"]), [
                                [vModelText, unref(createOrder).phone]
                              ])
                            ]),
                            lat.value > 0 && lng.value > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-on-surface-variant small text-truncate mb-0"
                            }, [
                              createVNode(_sfc_main$b, {
                                lat: lat.value,
                                lng: lng.value
                              }, null, 8, ["lat", "lng"]),
                              createVNode("a", {
                                href: unref(createOrder).map,
                                target: "_blank"
                              }, toDisplayString(trans("View Location")), 9, ["href"])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("button", {
                          onClick: getLocation,
                          class: "btn w-100 btn-map px-4 py-3 rounded-3 fw-bold small transition-opacity active-scale d-flex align-items-center justify-content-center gap-2"
                        }, [
                          createVNode("span", { class: "material-symbols-outlined fs-18" }, "map"),
                          createTextVNode(" " + toDisplayString(trans("Get Location")), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "col-12 col-lg-4 mb-4" }, [
                    createVNode("div", {
                      class: "bg-surface-container-low rounded-3xl p-4 p-sm-5 sticky-top shadow-sm border border-outline-10",
                      style: { "top": "2rem" }
                    }, [
                      createVNode("h3", { class: "h4 fw-bolder mb-4 pb-3 border-bottom border-outline-20" }, toDisplayString(trans("Information Order")), 1),
                      createVNode("div", { class: "d-flex flex-column gap-3 mb-4" }, [
                        createVNode("div", { class: "d-flex justify-content-between text-on-surface-variant small fs-sm-6" }, [
                          createVNode("span", null, toDisplayString(trans("Subtotal")), 1),
                          createVNode("span", { class: "fw-semibold text-on-surface" }, toDisplayString(subPrice.value) + " $", 1)
                        ]),
                        createVNode("div", { class: "d-flex justify-content-between text-on-surface-variant small fs-sm-6" }, [
                          createVNode("span", null, toDisplayString(trans("Shipping")), 1),
                          createVNode("span", { class: "fw-semibold text-on-surface" }, toDisplayString(shippingCost.value) + " $", 1)
                        ]),
                        createVNode("div", { class: "pt-3 mt-3 border-top border-outline-30 d-flex justify-content-between align-items-baseline" }, [
                          createVNode("span", { class: "h5 fw-bold text-on-surface mb-0" }, toDisplayString(trans("Total")), 1),
                          createVNode("span", { class: "display-6 fw-bolder text-primary-custom" }, toDisplayString(shippingCost.value + subPrice.value) + " $", 1)
                        ])
                      ]),
                      createVNode("div", { class: "d-flex flex-column gap-3" }, [
                        unref(cartStore).carts.length > 0 ? (openBlock(), createBlock("form", {
                          key: 0,
                          onSubmit: withModifiers(submitOrder, ["prevent"])
                        }, [
                          createVNode("button", { class: "btn w-100 py-3 rounded-3 btn-gradient fw-bold fs-5 shadow active-scale transition-all" }, toDisplayString(trans("Create Order")), 1)
                        ], 32)) : createCommentVNode("", true),
                        createVNode("div", { class: "d-flex align-items-center justify-content-center gap-2 text-on-surface-variant-60 small py-2" }, [
                          createVNode("span", {
                            class: "material-symbols-outlined",
                            style: { "font-size": "14px" }
                          }, "lock"),
                          createVNode("span", null, "يمكنك الدفع عند الاستلام أو الدفع عبر شام كاش")
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Cart/resources/assets/js/Pages/CartIndex.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const CartIndex = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-9f983db7"]]);
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CartIndex
}, Symbol.toStringTag, { value: "Module" }));
const __default__$4 = {
  components: {
    AppLayout
  }
};
const _sfc_main$9 = /* @__PURE__ */ Object.assign(__default__$4, {
  __name: "ShopIndex",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key, params = {}) => {
      let translation = page.props.translations[key] || key;
      if (params && Object.keys(params).length > 0) {
        Object.keys(params).forEach((param) => {
          translation = translation.replace(`:${param}`, params[param]);
        });
      }
      return translation;
    };
    const products = computed(() => page.props.products);
    const categories = computed(() => page.props.categories);
    const settings = computed(() => page.props.settings || {});
    const asset_path = computed(() => page.props.asset_path || "");
    const whatsappHref = computed(() => {
      const s = settings.value || {};
      const raw = s.whatsapp || s.sales_whatsapp;
      if (!raw) return null;
      const v = String(raw).trim();
      if (!v) return null;
      if (v.startsWith("http://") || v.startsWith("https://")) return v;
      const digits = v.replace(/[^\d]/g, "");
      return digits ? `https://wa.me/${digits}` : null;
    });
    const filters = computed(() => ({
      category: new URLSearchParams(window.location.search).get("category") || null,
      sort: new URLSearchParams(window.location.search).get("sort") || "default",
      search: new URLSearchParams(window.location.search).get("search") || ""
    }));
    const sortValue = ref(filters.value.sort);
    const sortSelect = ref(null);
    const searchValue = ref(filters.value.search || "");
    const currentQuery = computed(() => {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      const query = {};
      params.forEach((val, key) => {
        query[key] = val;
      });
      return query;
    });
    const currentQueryWithoutCategory = computed(() => {
      const q = { ...currentQuery.value };
      delete q.category;
      return q;
    });
    watch(() => page.url, () => {
      const params = new URLSearchParams(window.location.search);
      const newSort = params.get("sort") || "default";
      if (sortValue.value !== newSort) {
        sortValue.value = newSort;
      }
      const newSearch = params.get("search") || "";
      if (searchValue.value !== newSearch) {
        searchValue.value = newSearch;
      }
    }, { immediate: true });
    const handleSortChange = (selectedValue) => {
      const value = selectedValue || sortValue.value;
      console.log("handleSortChange called with value:", value);
      const url = new URL(window.location.href);
      const currentSort = url.searchParams.get("sort") || "default";
      console.log("Current sort in URL:", currentSort, "New value:", value);
      if (value === currentSort) {
        console.log("Sort value unchanged, skipping");
        return;
      }
      const params = new URLSearchParams(url.search);
      if (value === "default") {
        params.delete("sort");
      } else {
        params.set("sort", value);
      }
      const query = {};
      params.forEach((val, key) => {
        query[key] = val;
      });
      console.log("Navigating with query:", query);
      const routePath = url.pathname;
      try {
        router.get(routePath, query, {
          preserveState: false,
          preserveScroll: true,
          only: ["products"]
        });
        console.log("router.get called successfully");
      } catch (error) {
        console.error("Error calling router.get:", error);
      }
    };
    const applySearch = () => {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      const value = (searchValue.value || "").trim();
      if (!value) {
        params.delete("search");
      } else {
        params.set("search", value);
      }
      const query = {};
      params.forEach((val, key) => {
        query[key] = val;
      });
      router.get(url.pathname, query, {
        preserveState: false,
        preserveScroll: true,
        only: ["products"]
      });
    };
    onMounted(() => {
      nextTick(() => {
        initializeSortSelect();
      });
    });
    watch(() => products.value, () => {
      nextTick(() => {
        initializeSortSelect();
      });
    });
    const initializeSortSelect = () => {
      if (typeof window !== "undefined" && window.jQuery) {
        const $ = window.jQuery;
        const $select = $("#shop-sort-select");
        if ($select.length) {
          $select.next(".nice-select").remove();
          if (typeof $select.niceSelect === "function") {
            $select.niceSelect();
          }
          $select.off("change.sortHandler").on("change.sortHandler", function() {
            const value = $(this).val();
            sortValue.value = value;
            handleSortChange(value);
          });
          const $niceSelect = $select.next(".nice-select");
          if ($niceSelect.length) {
            $niceSelect.find(".option, .list .option").off("click.sortHandler").on("click.sortHandler", function() {
              setTimeout(() => {
                const value = $select.val();
                console.log("Nice-select option clicked, value:", value);
                if (value) {
                  sortValue.value = value;
                  console.log("About to call handleSortChange with:", value);
                  handleSortChange(value);
                }
              }, 50);
            });
          }
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(trans("Our Products"))} | Mutlu</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(trans("Our Products")) + " | Mutlu", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="breadcumb-wrapper"${_scopeId}><div class="container"${_scopeId}><div class="row"${_scopeId}><div class="col-lg-6"${_scopeId}><div class="breadcumb-content"${_scopeId}><h1 class="breadcumb-title"${_scopeId}>${ssrInterpolate(trans("Our Products"))}</h1><ul class="breadcumb-menu"${_scopeId}><li${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("home")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Home"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Home")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li class="active"${_scopeId}>${ssrInterpolate(trans("Our Products"))}</li></ul></div></div><div class="col-lg-6 d-lg-block d-none"${_scopeId}><div class="breadcumb-thumb"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "images/custom/shop.png")} alt="img"${_scopeId}></div></div></div></div></div><section class="space-top space-extra-bottom"${_scopeId}><div class="container"${_scopeId}><div class="row flex-row-reverse"${_scopeId}><div class="col-xl-9 col-lg-8"${_scopeId}><div class="shop-sort-bar"${_scopeId}><div class="row justify-content-between align-items-center"${_scopeId}><div class="col-md"${_scopeId}><p class="woocommerce-result-count"${_scopeId}>${ssrInterpolate(trans("Showing"))} ${ssrInterpolate(products.value.from || 0)}–${ssrInterpolate(products.value.to || 0)} ${ssrInterpolate(trans("of"))} ${ssrInterpolate(products.value.total || 0)} ${ssrInterpolate(trans("results"))}</p></div><div class="col-md-auto"${_scopeId}><form class="woocommerce-ordering" method="get"${_scopeId}><div class="form-group mb-0"${_scopeId}><select class="single-select orderby" aria-label="Shop order" id="shop-sort-select"${_scopeId}><option value="default"${ssrIncludeBooleanAttr(Array.isArray(sortValue.value) ? ssrLooseContain(sortValue.value, "default") : ssrLooseEqual(sortValue.value, "default")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(trans("Default Sorting"))}</option><option value="popular"${ssrIncludeBooleanAttr(Array.isArray(sortValue.value) ? ssrLooseContain(sortValue.value, "popular") : ssrLooseEqual(sortValue.value, "popular")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(trans("Sort by popularity"))}</option><option value="date"${ssrIncludeBooleanAttr(Array.isArray(sortValue.value) ? ssrLooseContain(sortValue.value, "date") : ssrLooseEqual(sortValue.value, "date")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(trans("Sort by latest"))}</option><option value="featured"${ssrIncludeBooleanAttr(Array.isArray(sortValue.value) ? ssrLooseContain(sortValue.value, "featured") : ssrLooseEqual(sortValue.value, "featured")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(trans("Featured"))}</option><option value="trending"${ssrIncludeBooleanAttr(Array.isArray(sortValue.value) ? ssrLooseContain(sortValue.value, "trending") : ssrLooseEqual(sortValue.value, "trending")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(trans("Trending"))}</option></select><i class="fas fa-angle-down"${_scopeId}></i></div></form></div></div></div><div class="row gy-4"${_scopeId}>`);
            if (products.value.data && products.value.data.length > 0) {
              _push2(`<!--[-->`);
              ssrRenderList(products.value.data, (product) => {
                _push2(`<div class="col-xl-4 col-md-6"${_scopeId}><div class="product-card style2"${_scopeId}><div class="product-img"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("shop.show", product.slug)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<img${ssrRenderAttr("src", product.image_link)}${ssrRenderAttr("alt", product.title)}${_scopeId2}>`);
                    } else {
                      return [
                        createVNode("img", {
                          src: product.image_link,
                          alt: product.title
                        }, null, 8, ["src", "alt"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="product-content"${_scopeId}><h3 class="product-title"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("shop.show", product.slug)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(product.title)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(product.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</h3><span class="star-rating"${_scopeId}></span><p class="mb-20"${_scopeId}>${ssrInterpolate((product.description || "").substring(0, 90))}</p>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("shop.show", product.slug),
                  class: "link-btn"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(trans("View details"))} <i class="fas fa-arrow-right"${_scopeId2}></i>`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(trans("View details")) + " ", 1),
                        createVNode("i", { class: "fas fa-arrow-right" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="col-12"${_scopeId}><div class="text-center py-5"${_scopeId}><h4${_scopeId}>${ssrInterpolate(trans("No products found"))}</h4><p${_scopeId}>${ssrInterpolate(trans("Try adjusting your filters or search criteria."))}</p></div></div>`);
            }
            _push2(`</div>`);
            if (products.value.links && products.value.links.length > 3) {
              _push2(`<div class="pagination justify-content-center mt-70"${_scopeId}><ul${_scopeId}><!--[-->`);
              ssrRenderList(products.value.links, (link, index) => {
                _push2(`<!--[-->`);
                if (link.url) {
                  _push2(`<li${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url,
                    class: { active: link.active }
                  }, null, _parent2, _scopeId));
                  _push2(`</li>`);
                } else {
                  _push2(`<li${_scopeId}><span${_scopeId}>${link.label ?? ""}</span></li>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-xl-3 col-lg-4 sidebar-widget-area"${_scopeId}><aside class="sidebar-sticky-area sidebar-area sidebar-shop"${_scopeId}><div class="widget widget_search"${_scopeId}><h3 class="widget_title"${_scopeId}>${ssrInterpolate(trans("Search"))}</h3><form class="search-form"${_scopeId}><input${ssrRenderAttr("value", searchValue.value)} type="text"${ssrRenderAttr("placeholder", trans("Lets Find Your Battery"))}${_scopeId}><button type="submit"${_scopeId}><i class="fas fa-search"${_scopeId}></i></button></form></div><div class="widget widget_categories"${_scopeId}><h3 class="widget_title"${_scopeId}>${ssrInterpolate(trans("Batteries Categories"))}</h3><ul${_scopeId}><li${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("shop.index", currentQueryWithoutCategory.value)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("All Categories"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("All Categories")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span${_scopeId}>(${ssrInterpolate(products.value.total || 0)})</span></li><!--[-->`);
            ssrRenderList(categories.value, (category) => {
              _push2(`<li${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("shop.index", { ...currentQuery.value, category: category.slug })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(category.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(category.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<span${_scopeId}>(${ssrInterpolate(category.products_count)})</span></li>`);
            });
            _push2(`<!--]--></ul></div></aside></div></div></div></section><div class="cta-area-1"${_scopeId}><div class="cta1-bg-thumb"${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "images/custom/cta.png")} alt="img"${_scopeId}></div><div class="container"${_scopeId}><div class="cta-wrap1"${_scopeId}><div class="row justify-content-md-between align-items-center"${_scopeId}><div class="col-lg-6 col-md-8"${_scopeId}><div class="title-area mb-md-0"${_scopeId}><span class="sub-title style2 text-white"${_scopeId}>${ssrInterpolate(trans("Let Us Call You"))}</span><h2 class="sec-title text-white mb-0"${_scopeId}>${ssrInterpolate(trans("Lets Find Your Battery"))}</h2></div></div><div class="col-md-auto"${_scopeId}><div class="title-area mb-0"${_scopeId}>`);
            if (whatsappHref.value) {
              _push2(`<a target="_blank" rel="noopener" class="btn"${ssrRenderAttr("href", whatsappHref.value)}${_scopeId}>${ssrInterpolate(trans("Contact Us"))} <i class="fas fa-arrow-right ms-2"${_scopeId}></i></a>`);
            } else {
              _push2(ssrRenderComponent(unref(Link), {
                class: "btn",
                href: _ctx.route("contact-us")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(trans("Contact Us"))} <i class="fas fa-arrow-right ms-2"${_scopeId2}></i>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(trans("Contact Us")) + " ", 1),
                      createVNode("i", { class: "fas fa-arrow-right ms-2" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "breadcumb-wrapper" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-lg-6" }, [
                      createVNode("div", { class: "breadcumb-content" }, [
                        createVNode("h1", { class: "breadcumb-title" }, toDisplayString(trans("Our Products")), 1),
                        createVNode("ul", { class: "breadcumb-menu" }, [
                          createVNode("li", null, [
                            createVNode(unref(Link), {
                              href: _ctx.route("home")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trans("Home")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          createVNode("li", { class: "active" }, toDisplayString(trans("Our Products")), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-lg-6 d-lg-block d-none" }, [
                      createVNode("div", { class: "breadcumb-thumb" }, [
                        createVNode("img", {
                          src: asset_path.value + "images/custom/shop.png",
                          alt: "img"
                        }, null, 8, ["src"])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "space-top space-extra-bottom" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row flex-row-reverse" }, [
                    createVNode("div", { class: "col-xl-9 col-lg-8" }, [
                      createVNode("div", { class: "shop-sort-bar" }, [
                        createVNode("div", { class: "row justify-content-between align-items-center" }, [
                          createVNode("div", { class: "col-md" }, [
                            createVNode("p", { class: "woocommerce-result-count" }, toDisplayString(trans("Showing")) + " " + toDisplayString(products.value.from || 0) + "–" + toDisplayString(products.value.to || 0) + " " + toDisplayString(trans("of")) + " " + toDisplayString(products.value.total || 0) + " " + toDisplayString(trans("results")), 1)
                          ]),
                          createVNode("div", { class: "col-md-auto" }, [
                            createVNode("form", {
                              class: "woocommerce-ordering",
                              method: "get",
                              onSubmit: withModifiers(() => {
                              }, ["prevent"])
                            }, [
                              createVNode("div", { class: "form-group mb-0" }, [
                                withDirectives(createVNode("select", {
                                  ref_key: "sortSelect",
                                  ref: sortSelect,
                                  "onUpdate:modelValue": ($event) => sortValue.value = $event,
                                  onChange: ($event) => handleSortChange(sortValue.value),
                                  class: "single-select orderby",
                                  "aria-label": "Shop order",
                                  id: "shop-sort-select"
                                }, [
                                  createVNode("option", { value: "default" }, toDisplayString(trans("Default Sorting")), 1),
                                  createVNode("option", { value: "popular" }, toDisplayString(trans("Sort by popularity")), 1),
                                  createVNode("option", { value: "date" }, toDisplayString(trans("Sort by latest")), 1),
                                  createVNode("option", { value: "featured" }, toDisplayString(trans("Featured")), 1),
                                  createVNode("option", { value: "trending" }, toDisplayString(trans("Trending")), 1)
                                ], 40, ["onUpdate:modelValue", "onChange"]), [
                                  [vModelSelect, sortValue.value]
                                ]),
                                createVNode("i", { class: "fas fa-angle-down" })
                              ])
                            ], 40, ["onSubmit"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "row gy-4" }, [
                        products.value.data && products.value.data.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(products.value.data, (product) => {
                          return openBlock(), createBlock("div", {
                            key: product.id,
                            class: "col-xl-4 col-md-6"
                          }, [
                            createVNode("div", { class: "product-card style2" }, [
                              createVNode("div", { class: "product-img" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("shop.show", product.slug)
                                }, {
                                  default: withCtx(() => [
                                    createVNode("img", {
                                      src: product.image_link,
                                      alt: product.title
                                    }, null, 8, ["src", "alt"])
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              createVNode("div", { class: "product-content" }, [
                                createVNode("h3", { class: "product-title" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("shop.show", product.slug)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(product.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ]),
                                createVNode("span", { class: "star-rating" }),
                                createVNode("p", { class: "mb-20" }, toDisplayString((product.description || "").substring(0, 90)), 1),
                                createVNode(unref(Link), {
                                  href: _ctx.route("shop.show", product.slug),
                                  class: "link-btn"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(trans("View details")) + " ", 1),
                                    createVNode("i", { class: "fas fa-arrow-right" })
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ])
                            ])
                          ]);
                        }), 128)) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "col-12"
                        }, [
                          createVNode("div", { class: "text-center py-5" }, [
                            createVNode("h4", null, toDisplayString(trans("No products found")), 1),
                            createVNode("p", null, toDisplayString(trans("Try adjusting your filters or search criteria.")), 1)
                          ])
                        ]))
                      ]),
                      products.value.links && products.value.links.length > 3 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "pagination justify-content-center mt-70"
                      }, [
                        createVNode("ul", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(products.value.links, (link, index) => {
                            return openBlock(), createBlock(Fragment, {
                              key: `page-${index}`
                            }, [
                              link.url ? (openBlock(), createBlock("li", { key: 0 }, [
                                createVNode(unref(Link), {
                                  href: link.url,
                                  class: { active: link.active },
                                  innerHTML: link.label
                                }, null, 8, ["href", "class", "innerHTML"])
                              ])) : (openBlock(), createBlock("li", { key: 1 }, [
                                createVNode("span", {
                                  innerHTML: link.label
                                }, null, 8, ["innerHTML"])
                              ]))
                            ], 64);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "col-xl-3 col-lg-4 sidebar-widget-area" }, [
                      createVNode("aside", { class: "sidebar-sticky-area sidebar-area sidebar-shop" }, [
                        createVNode("div", { class: "widget widget_search" }, [
                          createVNode("h3", { class: "widget_title" }, toDisplayString(trans("Search")), 1),
                          createVNode("form", {
                            class: "search-form",
                            onSubmit: withModifiers(applySearch, ["prevent"])
                          }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => searchValue.value = $event,
                              type: "text",
                              placeholder: trans("Lets Find Your Battery")
                            }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, searchValue.value]
                            ]),
                            createVNode("button", { type: "submit" }, [
                              createVNode("i", { class: "fas fa-search" })
                            ])
                          ], 32)
                        ]),
                        createVNode("div", { class: "widget widget_categories" }, [
                          createVNode("h3", { class: "widget_title" }, toDisplayString(trans("Batteries Categories")), 1),
                          createVNode("ul", null, [
                            createVNode("li", null, [
                              createVNode(unref(Link), {
                                href: _ctx.route("shop.index", currentQueryWithoutCategory.value)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(trans("All Categories")), 1)
                                ]),
                                _: 1
                              }, 8, ["href"]),
                              createVNode("span", null, "(" + toDisplayString(products.value.total || 0) + ")", 1)
                            ]),
                            (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                              return openBlock(), createBlock("li", {
                                key: `cat-${category.id}`
                              }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("shop.index", { ...currentQuery.value, category: category.slug })
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(category.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("span", null, "(" + toDisplayString(category.products_count) + ")", 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "cta-area-1" }, [
                createVNode("div", { class: "cta1-bg-thumb" }, [
                  createVNode("img", {
                    src: asset_path.value + "images/custom/cta.png",
                    alt: "img"
                  }, null, 8, ["src"])
                ]),
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "cta-wrap1" }, [
                    createVNode("div", { class: "row justify-content-md-between align-items-center" }, [
                      createVNode("div", { class: "col-lg-6 col-md-8" }, [
                        createVNode("div", { class: "title-area mb-md-0" }, [
                          createVNode("span", { class: "sub-title style2 text-white" }, toDisplayString(trans("Let Us Call You")), 1),
                          createVNode("h2", { class: "sec-title text-white mb-0" }, toDisplayString(trans("Lets Find Your Battery")), 1)
                        ])
                      ]),
                      createVNode("div", { class: "col-md-auto" }, [
                        createVNode("div", { class: "title-area mb-0" }, [
                          whatsappHref.value ? (openBlock(), createBlock("a", {
                            key: 0,
                            target: "_blank",
                            rel: "noopener",
                            class: "btn",
                            href: whatsappHref.value
                          }, [
                            createTextVNode(toDisplayString(trans("Contact Us")) + " ", 1),
                            createVNode("i", { class: "fas fa-arrow-right ms-2" })
                          ], 8, ["href"])) : (openBlock(), createBlock(unref(Link), {
                            key: 1,
                            class: "btn",
                            href: _ctx.route("contact-us")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(trans("Contact Us")) + " ", 1),
                              createVNode("i", { class: "fas fa-arrow-right ms-2" })
                            ]),
                            _: 1
                          }, 8, ["href"]))
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Shop/resources/assets/js/Pages/ShopIndex.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const __default__$3 = {
  components: {
    AppLayout
  }
};
const _sfc_main$8 = /* @__PURE__ */ Object.assign(__default__$3, {
  __name: "ShopShow",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    const cartStore = useCartStore();
    computed(() => page.props.seo);
    const settings = computed(() => page.props.settings || {});
    const product = computed(() => page.props.product);
    const relatedProducts = computed(() => page.props.relatedProducts);
    const subProducts = computed(() => page.props.subProducts || []);
    const asset_path = computed(() => page.props.asset_path || "");
    const whatsappHref = computed(() => {
      const s = settings.value || {};
      const raw = s.whatsapp || s.sales_whatsapp;
      if (!raw) return null;
      const v = String(raw).trim();
      if (!v) return null;
      if (v.startsWith("http://") || v.startsWith("https://")) return v;
      const digits = v.replace(/[^\d]/g, "");
      return digits ? `https://wa.me/${digits}` : null;
    });
    const activeCapacity = ref("all");
    const selectedSlideBySubProductId = reactive({});
    const normalizeCapacity = (val) => {
      if (val === null || val === void 0) return "";
      return String(val).trim();
    };
    const formatCapacityLabel = (cap) => {
      const c = normalizeCapacity(cap);
      if (!c) return "";
      return /ah$/i.test(c) ? c : `${c}Ah`;
    };
    const getSubProductSelectedSlide = (sp) => {
      var _a, _b;
      const id = sp == null ? void 0 : sp.id;
      if (!id) return (sp == null ? void 0 : sp.primary_slide) || ((_a = product.value) == null ? void 0 : _a.image_link);
      return selectedSlideBySubProductId[id] || (sp == null ? void 0 : sp.primary_slide) || ((_b = product.value) == null ? void 0 : _b.image_link);
    };
    const capacityTabs = computed(() => {
      const unique = /* @__PURE__ */ new Set();
      for (const sp of subProducts.value || []) {
        const cap = normalizeCapacity(sp == null ? void 0 : sp.capacity);
        if (cap) unique.add(cap);
      }
      const arr = Array.from(unique);
      arr.sort((a, b) => {
        const na = parseFloat(a);
        const nb = parseFloat(b);
        const aNum = Number.isFinite(na);
        const bNum = Number.isFinite(nb);
        if (aNum && bNum) return na - nb;
        if (aNum && !bNum) return -1;
        if (!aNum && bNum) return 1;
        return a.localeCompare(b);
      });
      return arr;
    });
    const filteredSubProducts = computed(() => {
      if (!subProducts.value || subProducts.value.length === 0) return [];
      if (activeCapacity.value === "all") return subProducts.value;
      const selected = normalizeCapacity(activeCapacity.value);
      return subProducts.value.filter((sp) => normalizeCapacity(sp == null ? void 0 : sp.capacity) === selected);
    });
    const getKeywords = (keywords) => {
      if (!keywords) return [];
      if (typeof keywords === "string") {
        return keywords.split(",").slice(0, 3);
      }
      return [];
    };
    const keywordList = computed(() => {
      var _a;
      return getKeywords((_a = product.value) == null ? void 0 : _a.keywords);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-a81a0f75${_scopeId}>${ssrInterpolate(product.value.title)} | Mutlu</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(product.value.title) + " | Mutlu", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="breadcumb-wrapper" data-v-a81a0f75${_scopeId}><div class="container" data-v-a81a0f75${_scopeId}><div class="row" data-v-a81a0f75${_scopeId}><div class="col-lg-6" data-v-a81a0f75${_scopeId}><div class="breadcumb-content" data-v-a81a0f75${_scopeId}><h1 class="breadcumb-title" data-v-a81a0f75${_scopeId}>${ssrInterpolate(product.value.title)}</h1><ul class="breadcumb-menu" data-v-a81a0f75${_scopeId}><li data-v-a81a0f75${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("home")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Home"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Home")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-a81a0f75${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("shop.index")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Our Products"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Our Products")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li class="active" data-v-a81a0f75${_scopeId}>${ssrInterpolate(product.value.title)}</li></ul></div></div><div class="col-lg-6 d-lg-block d-none" data-v-a81a0f75${_scopeId}><div class="breadcumb-thumb" data-v-a81a0f75${_scopeId}><img${ssrRenderAttr("src", product.value.image_link)}${ssrRenderAttr("alt", product.value.title)} data-v-a81a0f75${_scopeId}></div></div></div></div></div><section class="product-details my-3" data-v-a81a0f75${_scopeId}><div class="container" data-v-a81a0f75${_scopeId}><div class="row gx-80" data-v-a81a0f75${_scopeId}><div class="col-lg-12" data-v-a81a0f75${_scopeId}><h2 class="product-title" data-v-a81a0f75${_scopeId}>${ssrInterpolate(product.value.title)}</h2><div class="product_meta" data-v-a81a0f75${_scopeId}><span class="posted_in" data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Category"))}: `);
            if (product.value.category) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("shop.index", { category: product.value.category.slug }),
                rel: "tag"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(product.value.category.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(product.value.category.name), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<span data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Uncategorized"))}</span>`);
            }
            _push2(`</span></div><div class="paragraph" data-v-a81a0f75${_scopeId}>${product.value.content ?? ""}</div>`);
            if (keywordList.value.length) {
              _push2(`<div data-v-a81a0f75${_scopeId}><h4 data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Keywords"))}:</h4><!--[-->`);
              ssrRenderList(keywordList.value, (kw, index) => {
                _push2(`<!--[-->`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("shop.index", { s: kw.trim() })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(kw.trim())}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(kw.trim()), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                if (index !== keywordList.value.length - 1) {
                  _push2(`<span data-v-a81a0f75${_scopeId}>, </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (subProducts.value && subProducts.value.length) {
              _push2(`<div class="space-extra-top" data-v-a81a0f75${_scopeId}><div class="row justify-content-between align-items-end" data-v-a81a0f75${_scopeId}><div class="col-md-6" data-v-a81a0f75${_scopeId}><div class="title-area mb-20" data-v-a81a0f75${_scopeId}><h2 class="sec-title" data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Available sizes"))}</h2></div></div></div><div class="capacity-tabs mb-30" data-v-a81a0f75${_scopeId}><button type="button" class="${ssrRenderClass([{ active: activeCapacity.value === "all" }, "capacity-tab-btn"])}" data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("All"))}</button><!--[-->`);
              ssrRenderList(capacityTabs.value, (cap) => {
                _push2(`<button type="button" class="${ssrRenderClass([{ active: activeCapacity.value === cap }, "capacity-tab-btn"])}" data-v-a81a0f75${_scopeId}>${ssrInterpolate(formatCapacityLabel(cap))}</button>`);
              });
              _push2(`<!--]--></div><div class="row gy-4" data-v-a81a0f75${_scopeId}><!--[-->`);
              ssrRenderList(filteredSubProducts.value, (sp) => {
                _push2(`<div class="col-xl-4 col-lg-4 col-md-6" data-v-a81a0f75${_scopeId}><div class="sub-product-card" data-v-a81a0f75${_scopeId}><div class="sub-product-img" data-v-a81a0f75${_scopeId}><img${ssrRenderAttr("src", getSubProductSelectedSlide(sp))}${ssrRenderAttr("alt", sp.name || product.value.title)} data-v-a81a0f75${_scopeId}></div>`);
                if (sp.slides && sp.slides.length) {
                  _push2(`<div class="sub-product-thumbs" data-v-a81a0f75${_scopeId}><!--[-->`);
                  ssrRenderList(sp.slides, (img, idx) => {
                    _push2(`<button type="button" class="${ssrRenderClass([{ active: getSubProductSelectedSlide(sp) === img }, "sub-product-thumb"])}" data-v-a81a0f75${_scopeId}><img${ssrRenderAttr("src", img)}${ssrRenderAttr("alt", `${sp.name || product.value.title} - ${idx + 1}`)} data-v-a81a0f75${_scopeId}></button>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="sub-product-content" data-v-a81a0f75${_scopeId}><h3 class="sub-product-title" data-v-a81a0f75${_scopeId}>${ssrInterpolate(sp.name || `${formatCapacityLabel(sp.capacity)}`)}</h3><table class="sub-product-table" data-v-a81a0f75${_scopeId}><tbody data-v-a81a0f75${_scopeId}>`);
                if (sp.capacity) {
                  _push2(`<tr data-v-a81a0f75${_scopeId}><th data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Capacity (Ah)"))}</th><td data-v-a81a0f75${_scopeId}>${ssrInterpolate(sp.capacity)}</td></tr>`);
                } else {
                  _push2(`<!---->`);
                }
                if (sp.voltage) {
                  _push2(`<tr data-v-a81a0f75${_scopeId}><th data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Voltage (V)"))}</th><td data-v-a81a0f75${_scopeId}>${ssrInterpolate(sp.voltage)}</td></tr>`);
                } else {
                  _push2(`<!---->`);
                }
                if (sp.box) {
                  _push2(`<tr data-v-a81a0f75${_scopeId}><th data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Box"))}</th><td data-v-a81a0f75${_scopeId}>${ssrInterpolate(sp.box)}</td></tr>`);
                } else {
                  _push2(`<!---->`);
                }
                if (sp.length) {
                  _push2(`<tr data-v-a81a0f75${_scopeId}><th data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Length (mm)"))}</th><td data-v-a81a0f75${_scopeId}>${ssrInterpolate(sp.length)}</td></tr>`);
                } else {
                  _push2(`<!---->`);
                }
                if (sp.height) {
                  _push2(`<tr data-v-a81a0f75${_scopeId}><th data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Height (mm)"))}</th><td data-v-a81a0f75${_scopeId}>${ssrInterpolate(sp.height)}</td></tr>`);
                } else {
                  _push2(`<!---->`);
                }
                if (sp.weight) {
                  _push2(`<tr data-v-a81a0f75${_scopeId}><th data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Weight (kg)"))}</th><td data-v-a81a0f75${_scopeId}>${ssrInterpolate(sp.weight)}</td></tr>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<tr data-v-a81a0f75${_scopeId}><th data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Price ($)"))}</th><td data-v-a81a0f75${_scopeId}>${ssrInterpolate(sp.price)} $</td></tr><tr data-v-a81a0f75${_scopeId}><th colspan="2" data-v-a81a0f75${_scopeId}><button class="capacity-tab-btn" data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Add To Cart"))} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16" data-v-a81a0f75${_scopeId}><path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" data-v-a81a0f75${_scopeId}></path><path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" data-v-a81a0f75${_scopeId}></path></svg></button></th></tr></tbody></table></div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (relatedProducts.value && relatedProducts.value.length) {
              _push2(`<div class="space-extra-top space-bottom" data-v-a81a0f75${_scopeId}><div class="row justify-content-between" data-v-a81a0f75${_scopeId}><div class="col-md-6" data-v-a81a0f75${_scopeId}><div class="title-area" data-v-a81a0f75${_scopeId}><h2 class="sec-title" data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Related Products"))}</h2></div></div><div class="col-md-auto" data-v-a81a0f75${_scopeId}><div class="sec-btn mb-40" data-v-a81a0f75${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("shop.index"),
                class: "btn style-border2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(trans("See More"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(trans("See More")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div><div class="row global-carousel" id="productCarousel" data-slide-show="4" data-lg-slide-show="4" data-md-slide-show="3" data-sm-slide-show="2" data-xs-slide-show="1" data-v-a81a0f75${_scopeId}><!--[-->`);
              ssrRenderList(relatedProducts.value, (relatedProduct) => {
                _push2(`<div class="col-lg-3 col-md-6" data-v-a81a0f75${_scopeId}><div class="product-card style2" data-v-a81a0f75${_scopeId}><div class="product-img" data-v-a81a0f75${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("shop.show", relatedProduct.slug)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<img${ssrRenderAttr("src", relatedProduct.image_link)}${ssrRenderAttr("alt", relatedProduct.title)} data-v-a81a0f75${_scopeId2}>`);
                    } else {
                      return [
                        createVNode("img", {
                          src: relatedProduct.image_link,
                          alt: relatedProduct.title
                        }, null, 8, ["src", "alt"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div><div class="product-content" data-v-a81a0f75${_scopeId}><h3 class="product-title" data-v-a81a0f75${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("shop.show", relatedProduct.slug)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(relatedProduct.title)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(relatedProduct.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</h3><span class="star-rating" data-v-a81a0f75${_scopeId}><!--[-->`);
                ssrRenderList(5, (i) => {
                  _push2(`<i class="fas fa-star" data-v-a81a0f75${_scopeId}></i>`);
                });
                _push2(`<!--]--></span><p class="mb-20" data-v-a81a0f75${_scopeId}>${ssrInterpolate((relatedProduct.description || "").substring(0, 90))}</p>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("shop.show", relatedProduct.slug),
                  class: "link-btn"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(trans("View details"))} <i class="fas fa-arrow-right" data-v-a81a0f75${_scopeId2}></i>`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(trans("View details")) + " ", 1),
                        createVNode("i", { class: "fas fa-arrow-right" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section><div class="cta-area-1" data-v-a81a0f75${_scopeId}><div class="cta1-bg-thumb" data-v-a81a0f75${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "images/custom/cta.png")} alt="img" data-v-a81a0f75${_scopeId}></div><div class="container" data-v-a81a0f75${_scopeId}><div class="cta-wrap1" data-v-a81a0f75${_scopeId}><div class="row justify-content-md-between align-items-center" data-v-a81a0f75${_scopeId}><div class="col-lg-6 col-md-8" data-v-a81a0f75${_scopeId}><div class="title-area mb-md-0" data-v-a81a0f75${_scopeId}><span class="sub-title style2 text-white" data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Let Us Call You"))}</span><h2 class="sec-title text-white mb-0" data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Lets Find Your Battery"))}</h2></div></div><div class="col-md-auto" data-v-a81a0f75${_scopeId}><div class="title-area mb-0" data-v-a81a0f75${_scopeId}>`);
            if (whatsappHref.value) {
              _push2(`<a target="_blank" rel="noopener" class="btn"${ssrRenderAttr("href", whatsappHref.value)} data-v-a81a0f75${_scopeId}>${ssrInterpolate(trans("Contact Us"))} <i class="fas fa-arrow-right ms-2" data-v-a81a0f75${_scopeId}></i></a>`);
            } else {
              _push2(ssrRenderComponent(unref(Link), {
                class: "btn",
                href: _ctx.route("contact-us")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(trans("Contact Us"))} <i class="fas fa-arrow-right ms-2" data-v-a81a0f75${_scopeId2}></i>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(trans("Contact Us")) + " ", 1),
                      createVNode("i", { class: "fas fa-arrow-right ms-2" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "breadcumb-wrapper" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-lg-6" }, [
                      createVNode("div", { class: "breadcumb-content" }, [
                        createVNode("h1", { class: "breadcumb-title" }, toDisplayString(product.value.title), 1),
                        createVNode("ul", { class: "breadcumb-menu" }, [
                          createVNode("li", null, [
                            createVNode(unref(Link), {
                              href: _ctx.route("home")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trans("Home")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          createVNode("li", null, [
                            createVNode(unref(Link), {
                              href: _ctx.route("shop.index")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trans("Our Products")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          createVNode("li", { class: "active" }, toDisplayString(product.value.title), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-lg-6 d-lg-block d-none" }, [
                      createVNode("div", { class: "breadcumb-thumb" }, [
                        createVNode("img", {
                          src: product.value.image_link,
                          alt: product.value.title
                        }, null, 8, ["src", "alt"])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "product-details my-3" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row gx-80" }, [
                    createVNode("div", { class: "col-lg-12" }, [
                      createVNode("h2", { class: "product-title" }, toDisplayString(product.value.title), 1),
                      createVNode("div", { class: "product_meta" }, [
                        createVNode("span", { class: "posted_in" }, [
                          createTextVNode(toDisplayString(trans("Category")) + ": ", 1),
                          product.value.category ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            href: _ctx.route("shop.index", { category: product.value.category.slug }),
                            rel: "tag"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(product.value.category.name), 1)
                            ]),
                            _: 1
                          }, 8, ["href"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(trans("Uncategorized")), 1))
                        ])
                      ]),
                      createVNode("div", {
                        class: "paragraph",
                        innerHTML: product.value.content
                      }, null, 8, ["innerHTML"]),
                      keywordList.value.length ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("h4", null, toDisplayString(trans("Keywords")) + ":", 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(keywordList.value, (kw, index) => {
                          return openBlock(), createBlock(Fragment, {
                            key: `kw-cell-${index}`
                          }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("shop.index", { s: kw.trim() })
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(kw.trim()), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            index !== keywordList.value.length - 1 ? (openBlock(), createBlock("span", { key: 0 }, ", ")) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  subProducts.value && subProducts.value.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-extra-top"
                  }, [
                    createVNode("div", { class: "row justify-content-between align-items-end" }, [
                      createVNode("div", { class: "col-md-6" }, [
                        createVNode("div", { class: "title-area mb-20" }, [
                          createVNode("h2", { class: "sec-title" }, toDisplayString(trans("Available sizes")), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "capacity-tabs mb-30" }, [
                      createVNode("button", {
                        type: "button",
                        class: ["capacity-tab-btn", { active: activeCapacity.value === "all" }],
                        onClick: ($event) => activeCapacity.value = "all"
                      }, toDisplayString(trans("All")), 11, ["onClick"]),
                      (openBlock(true), createBlock(Fragment, null, renderList(capacityTabs.value, (cap) => {
                        return openBlock(), createBlock("button", {
                          key: `cap-${cap}`,
                          type: "button",
                          class: ["capacity-tab-btn", { active: activeCapacity.value === cap }],
                          onClick: ($event) => activeCapacity.value = cap
                        }, toDisplayString(formatCapacityLabel(cap)), 11, ["onClick"]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "row gy-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredSubProducts.value, (sp) => {
                        return openBlock(), createBlock("div", {
                          key: `sp-${sp.id}`,
                          class: "col-xl-4 col-lg-4 col-md-6"
                        }, [
                          createVNode("div", { class: "sub-product-card" }, [
                            createVNode("div", { class: "sub-product-img" }, [
                              createVNode("img", {
                                src: getSubProductSelectedSlide(sp),
                                alt: sp.name || product.value.title
                              }, null, 8, ["src", "alt"])
                            ]),
                            sp.slides && sp.slides.length ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "sub-product-thumbs"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(sp.slides, (img, idx) => {
                                return openBlock(), createBlock("button", {
                                  key: `sp-${sp.id}-thumb-${idx}`,
                                  type: "button",
                                  class: ["sub-product-thumb", { active: getSubProductSelectedSlide(sp) === img }],
                                  onClick: ($event) => selectedSlideBySubProductId[sp.id] = img
                                }, [
                                  createVNode("img", {
                                    src: img,
                                    alt: `${sp.name || product.value.title} - ${idx + 1}`
                                  }, null, 8, ["src", "alt"])
                                ], 10, ["onClick"]);
                              }), 128))
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "sub-product-content" }, [
                              createVNode("h3", { class: "sub-product-title" }, toDisplayString(sp.name || `${formatCapacityLabel(sp.capacity)}`), 1),
                              createVNode("table", { class: "sub-product-table" }, [
                                createVNode("tbody", null, [
                                  sp.capacity ? (openBlock(), createBlock("tr", { key: 0 }, [
                                    createVNode("th", null, toDisplayString(trans("Capacity (Ah)")), 1),
                                    createVNode("td", null, toDisplayString(sp.capacity), 1)
                                  ])) : createCommentVNode("", true),
                                  sp.voltage ? (openBlock(), createBlock("tr", { key: 1 }, [
                                    createVNode("th", null, toDisplayString(trans("Voltage (V)")), 1),
                                    createVNode("td", null, toDisplayString(sp.voltage), 1)
                                  ])) : createCommentVNode("", true),
                                  sp.box ? (openBlock(), createBlock("tr", { key: 2 }, [
                                    createVNode("th", null, toDisplayString(trans("Box")), 1),
                                    createVNode("td", null, toDisplayString(sp.box), 1)
                                  ])) : createCommentVNode("", true),
                                  sp.length ? (openBlock(), createBlock("tr", { key: 3 }, [
                                    createVNode("th", null, toDisplayString(trans("Length (mm)")), 1),
                                    createVNode("td", null, toDisplayString(sp.length), 1)
                                  ])) : createCommentVNode("", true),
                                  sp.height ? (openBlock(), createBlock("tr", { key: 4 }, [
                                    createVNode("th", null, toDisplayString(trans("Height (mm)")), 1),
                                    createVNode("td", null, toDisplayString(sp.height), 1)
                                  ])) : createCommentVNode("", true),
                                  sp.weight ? (openBlock(), createBlock("tr", { key: 5 }, [
                                    createVNode("th", null, toDisplayString(trans("Weight (kg)")), 1),
                                    createVNode("td", null, toDisplayString(sp.weight), 1)
                                  ])) : createCommentVNode("", true),
                                  createVNode("tr", null, [
                                    createVNode("th", null, toDisplayString(trans("Price ($)")), 1),
                                    createVNode("td", null, toDisplayString(sp.price) + " $", 1)
                                  ]),
                                  createVNode("tr", null, [
                                    createVNode("th", { colspan: "2" }, [
                                      createVNode("button", {
                                        class: "capacity-tab-btn",
                                        onClick: ($event) => unref(cartStore).addToCart(sp)
                                      }, [
                                        createTextVNode(toDisplayString(trans("Add To Cart")) + " ", 1),
                                        (openBlock(), createBlock("svg", {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          width: "16",
                                          height: "16",
                                          fill: "currentColor",
                                          class: "bi bi-cart-plus",
                                          viewBox: "0 0 16 16"
                                        }, [
                                          createVNode("path", { d: "M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" }),
                                          createVNode("path", { d: "M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" })
                                        ]))
                                      ], 8, ["onClick"])
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  relatedProducts.value && relatedProducts.value.length ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-extra-top space-bottom"
                  }, [
                    createVNode("div", { class: "row justify-content-between" }, [
                      createVNode("div", { class: "col-md-6" }, [
                        createVNode("div", { class: "title-area" }, [
                          createVNode("h2", { class: "sec-title" }, toDisplayString(trans("Related Products")), 1)
                        ])
                      ]),
                      createVNode("div", { class: "col-md-auto" }, [
                        createVNode("div", { class: "sec-btn mb-40" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("shop.index"),
                            class: "btn style-border2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(trans("See More")), 1)
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ]),
                    createVNode("div", {
                      class: "row global-carousel",
                      id: "productCarousel",
                      "data-slide-show": "4",
                      "data-lg-slide-show": "4",
                      "data-md-slide-show": "3",
                      "data-sm-slide-show": "2",
                      "data-xs-slide-show": "1"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(relatedProducts.value, (relatedProduct) => {
                        return openBlock(), createBlock("div", {
                          key: relatedProduct.id,
                          class: "col-lg-3 col-md-6"
                        }, [
                          createVNode("div", { class: "product-card style2" }, [
                            createVNode("div", { class: "product-img" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("shop.show", relatedProduct.slug)
                              }, {
                                default: withCtx(() => [
                                  createVNode("img", {
                                    src: relatedProduct.image_link,
                                    alt: relatedProduct.title
                                  }, null, 8, ["src", "alt"])
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            createVNode("div", { class: "product-content" }, [
                              createVNode("h3", { class: "product-title" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("shop.show", relatedProduct.slug)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(relatedProduct.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              createVNode("span", { class: "star-rating" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                  return createVNode("i", {
                                    key: `rel-star-${relatedProduct.id}-${i}`,
                                    class: "fas fa-star"
                                  });
                                }), 64))
                              ]),
                              createVNode("p", { class: "mb-20" }, toDisplayString((relatedProduct.description || "").substring(0, 90)), 1),
                              createVNode(unref(Link), {
                                href: _ctx.route("shop.show", relatedProduct.slug),
                                class: "link-btn"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(trans("View details")) + " ", 1),
                                  createVNode("i", { class: "fas fa-arrow-right" })
                                ]),
                                _: 1
                              }, 8, ["href"])
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode("div", { class: "cta-area-1" }, [
                createVNode("div", { class: "cta1-bg-thumb" }, [
                  createVNode("img", {
                    src: asset_path.value + "images/custom/cta.png",
                    alt: "img"
                  }, null, 8, ["src"])
                ]),
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "cta-wrap1" }, [
                    createVNode("div", { class: "row justify-content-md-between align-items-center" }, [
                      createVNode("div", { class: "col-lg-6 col-md-8" }, [
                        createVNode("div", { class: "title-area mb-md-0" }, [
                          createVNode("span", { class: "sub-title style2 text-white" }, toDisplayString(trans("Let Us Call You")), 1),
                          createVNode("h2", { class: "sec-title text-white mb-0" }, toDisplayString(trans("Lets Find Your Battery")), 1)
                        ])
                      ]),
                      createVNode("div", { class: "col-md-auto" }, [
                        createVNode("div", { class: "title-area mb-0" }, [
                          whatsappHref.value ? (openBlock(), createBlock("a", {
                            key: 0,
                            target: "_blank",
                            rel: "noopener",
                            class: "btn",
                            href: whatsappHref.value
                          }, [
                            createTextVNode(toDisplayString(trans("Contact Us")) + " ", 1),
                            createVNode("i", { class: "fas fa-arrow-right ms-2" })
                          ], 8, ["href"])) : (openBlock(), createBlock(unref(Link), {
                            key: 1,
                            class: "btn",
                            href: _ctx.route("contact-us")
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(trans("Contact Us")) + " ", 1),
                              createVNode("i", { class: "fas fa-arrow-right ms-2" })
                            ]),
                            _: 1
                          }, 8, ["href"]))
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Shop/resources/assets/js/Pages/ShopShow.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const ShopShow = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-a81a0f75"]]);
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ShopShow
}, Symbol.toStringTag, { value: "Module" }));
const markerIcon2x = "/build/assets/marker-icon-2x-_ZA0WGCc.png";
const __default__$2 = {
  components: {
    AppLayout
  }
};
const _sfc_main$7 = /* @__PURE__ */ Object.assign(__default__$2, {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => page.props.translations[key] || key;
    computed(() => page.props.seo);
    const asset_path = computed(() => page.props.asset_path || "");
    const locale = computed(() => page.props.locale || "en");
    const settings = computed(() => page.props.settings || {});
    const branches = computed(() => page.props.branches || []);
    const faqs = computed(() => page.props.faqs || []);
    const openBranchId = ref(null);
    const submitSuccess = ref(false);
    const splitLines = (value) => {
      if (!value) return [];
      const v = String(value).trim();
      if (!v) return [];
      return v.split(/\r?\n|,/).map((x) => String(x).trim()).filter(Boolean);
    };
    const primaryBranch = computed(() => branches.value && branches.value.length ? branches.value[0] : null);
    const contactAddressLines = computed(() => {
      const s = settings.value || {};
      const lines = splitLines(s.address);
      if (lines.length) return lines;
      const b = primaryBranch.value;
      const branchAddress = (b == null ? void 0 : b.address) ? b.address[locale.value] || b.address : "";
      const branchCity = (b == null ? void 0 : b.city) ? b.city[locale.value] || b.city : "";
      return [branchAddress, branchCity].map((x) => String(x || "").trim()).filter(Boolean);
    });
    const contactPhoneLines = computed(() => {
      const s = settings.value || {};
      const phones = splitLines(s.phone);
      if (phones.length) return phones;
      const b = primaryBranch.value;
      const phone = (b == null ? void 0 : b.phone) ? b.phone[locale.value] || b.phone : "";
      return phone ? [String(phone).trim()] : [];
    });
    const contactEmailLines = computed(() => {
      const s = settings.value || {};
      return splitLines(s.email);
    });
    computed(() => {
      const s = settings.value || {};
      return splitLines(s.opening || s.opening_hours || s.hours || s.working_hours);
    });
    const mapEl = ref(null);
    const osmMap = ref(null);
    const osmMarkers = ref(/* @__PURE__ */ new Map());
    const isMapReady = ref(false);
    const hasValidCoords = (b) => {
      const lat = Number(b == null ? void 0 : b.lat);
      const lng = Number(b == null ? void 0 : b.lng);
      return Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
    };
    const getBranchTitle = (b) => {
      const name = (b == null ? void 0 : b.name) ? b.name[locale.value] || b.name : "";
      const city = (b == null ? void 0 : b.city) ? b.city[locale.value] || b.city : "";
      return [name, city].map((x) => String(x || "").trim()).filter(Boolean).join(" — ");
    };
    const getBranchPopupHtml = (b) => {
      const name = (b == null ? void 0 : b.name) ? b.name[locale.value] || b.name : "";
      const city = (b == null ? void 0 : b.city) ? b.city[locale.value] || b.city : "";
      const address = (b == null ? void 0 : b.address) ? b.address[locale.value] || b.address : "";
      const phone = (b == null ? void 0 : b.phone) ? b.phone[locale.value] || b.phone : "";
      const safe = (x) => String(x || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[c]);
      const parts = [];
      if (name) parts.push(`<div style="font-weight:700;margin-bottom:6px;">${safe(name)}</div>`);
      if (city) parts.push(`<div style="margin-bottom:4px;"><strong>${safe(trans("City"))}:</strong> ${safe(city)}</div>`);
      if (address) parts.push(`<div style="margin-bottom:4px;"><strong>${safe(trans("Address"))}:</strong> ${safe(address)}</div>`);
      if (phone) parts.push(`<div><strong>${safe(trans("Phone"))}:</strong> <a href="tel:${safe(phone)}">${safe(phone)}</a></div>`);
      return `<div style="min-width:240px;max-width:320px;">${parts.join("")}</div>`;
    };
    const initBranchMap = async () => {
      if (!mapEl.value) return;
      if (osmMap.value) return;
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow
      });
      const defaultCenter = [34.8021, 38.9968];
      osmMap.value = L.map(mapEl.value, { zoomControl: true, attributionControl: true }).setView(defaultCenter, 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(osmMap.value);
      osmMarkers.value = /* @__PURE__ */ new Map();
      const bounds = [];
      for (const b of branches.value || []) {
        if (!hasValidCoords(b)) continue;
        const lat = Number(b.lat);
        const lng = Number(b.lng);
        const marker = L.marker([lat, lng], { title: getBranchTitle(b) }).addTo(osmMap.value);
        marker.bindPopup(getBranchPopupHtml(b), { maxWidth: 360 });
        osmMarkers.value.set(b.id, marker);
        bounds.push([lat, lng]);
      }
      if (bounds.length) {
        osmMap.value.fitBounds(bounds, { padding: [40, 40] });
      }
      isMapReady.value = true;
      setTimeout(() => {
        var _a;
        return (_a = osmMap.value) == null ? void 0 : _a.invalidateSize();
      }, 0);
    };
    const contactForm = useForm({
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: ""
    });
    const handleSubmit = () => {
      if (contactForm.processing) {
        return false;
      }
      if (!contactForm.name || !contactForm.name.trim()) {
        return false;
      }
      if (!contactForm.email || !contactForm.email.trim()) {
        return false;
      }
      if (!contactForm.message || !contactForm.message.trim()) {
        return false;
      }
      let contactUrl = "/contact-us";
      try {
        if (typeof route !== "undefined" && route) {
          contactUrl = route("contact-us.store");
        } else {
          const currentLocale = page.props.locale || "";
          contactUrl = currentLocale ? `/${currentLocale}/contact-us` : "/contact-us";
        }
      } catch (e) {
        const currentLocale = page.props.locale || "";
        contactUrl = currentLocale ? `/${currentLocale}/contact-us` : "/contact-us";
      }
      contactForm.post(contactUrl, {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
          submitSuccess.value = false;
        },
        onSuccess: () => {
          submitSuccess.value = true;
          contactForm.reset();
          contactForm.clearErrors();
          setTimeout(() => {
            submitSuccess.value = false;
          }, 5e3);
        },
        onError: () => {
          submitSuccess.value = false;
        }
      });
      return false;
    };
    ref(false);
    ref(null);
    ref(false);
    useForm({
      name: "",
      mobile: "",
      branch_id: null,
      description: ""
    });
    onMounted(() => {
      nextTick(() => {
        if (branches.value && branches.value.length > 0) {
          openBranchId.value = branches.value[0].id;
        }
      });
      initBranchMap().catch((e) => {
        console.warn("OpenStreetMap init failed:", e);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("Contact Us"))} | Mutlu</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(trans("Contact Us")) + " | Mutlu", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="breadcumb-wrapper" data-v-c5b1ff57${_scopeId}><div class="container" data-v-c5b1ff57${_scopeId}><div class="row" data-v-c5b1ff57${_scopeId}><div class="col-lg-6" data-v-c5b1ff57${_scopeId}><div class="breadcumb-content" data-v-c5b1ff57${_scopeId}><h1 class="breadcumb-title" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("Contact Us"))}</h1><ul class="breadcumb-menu" data-v-c5b1ff57${_scopeId}><li data-v-c5b1ff57${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("home")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Home"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Home")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li class="active" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("Contact Us"))}</li></ul></div></div><div class="col-lg-6 d-lg-block d-none" data-v-c5b1ff57${_scopeId}><div class="breadcumb-thumb" data-v-c5b1ff57${_scopeId}><img${ssrRenderAttr("src", asset_path.value + "images/custom/contact_us.png")} alt="img" data-v-c5b1ff57${_scopeId}></div></div></div></div></div><div class="contact-area space" data-v-c5b1ff57${_scopeId}><div class="container" data-v-c5b1ff57${_scopeId}><div class="row gy-4 justify-content-center" data-v-c5b1ff57${_scopeId}>`);
            if (contactAddressLines.value.length) {
              _push2(`<div class="col-xxl-3 col-lg-4 col-md-6" data-v-c5b1ff57${_scopeId}><div class="contact-info" data-v-c5b1ff57${_scopeId}><div class="contact-info_icon" data-v-c5b1ff57${_scopeId}><i class="fas fa-map-marker-alt" data-v-c5b1ff57${_scopeId}></i></div><h6 class="contact-info_title" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("Address"))}</h6><!--[-->`);
              ssrRenderList(contactAddressLines.value, (line, idx) => {
                _push2(`<p class="contact-info_text" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(line)}</p>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (contactPhoneLines.value.length) {
              _push2(`<div class="col-xxl-3 col-lg-4 col-md-6" data-v-c5b1ff57${_scopeId}><div class="contact-info" data-v-c5b1ff57${_scopeId}><div class="contact-info_icon" data-v-c5b1ff57${_scopeId}><i class="fas fa-phone-alt" data-v-c5b1ff57${_scopeId}></i></div><h6 class="contact-info_title" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("Phone Number"))}</h6><!--[-->`);
              ssrRenderList(contactPhoneLines.value, (phone, idx) => {
                _push2(`<p class="contact-info_text" data-v-c5b1ff57${_scopeId}><a dir="ltr"${ssrRenderAttr("href", `tel:${phone}`)} data-v-c5b1ff57${_scopeId}>${ssrInterpolate(phone)}</a></p>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (contactEmailLines.value.length) {
              _push2(`<div class="col-xxl-3 col-lg-4 col-md-6" data-v-c5b1ff57${_scopeId}><div class="contact-info" data-v-c5b1ff57${_scopeId}><div class="contact-info_icon" data-v-c5b1ff57${_scopeId}><i class="fas fa-envelope" data-v-c5b1ff57${_scopeId}></i></div><h6 class="contact-info_title" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("E-mail"))}</h6><!--[-->`);
              ssrRenderList(contactEmailLines.value, (email, idx) => {
                _push2(`<p class="contact-info_text" data-v-c5b1ff57${_scopeId}><a dir="ltr"${ssrRenderAttr("href", `mailto:${email}`)} data-v-c5b1ff57${_scopeId}>${ssrInterpolate(email)}</a></p>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><section class="contact-form-area appointment-area-2 bg-smoke overflow-hidden" style="${ssrRenderStyle({ backgroundImage: `url(${asset_path.value}images/custom/contact_bg.png)` })}" data-v-c5b1ff57${_scopeId}><div class="container" data-v-c5b1ff57${_scopeId}><div class="row gx-0 contact-us__grid" data-v-c5b1ff57${_scopeId}><div class="col-lg-6 d-flex" data-v-c5b1ff57${_scopeId}><div class="contact-form-wrap contact-us__panel mb-1" data-v-c5b1ff57${_scopeId}><div class="title-area" data-v-c5b1ff57${_scopeId}><span class="sub-title" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("Our Agents"))}</span></div><div class="contact-us__locator" data-v-c5b1ff57${_scopeId}><div class="contact-us__map-shell" data-v-c5b1ff57${_scopeId}><div class="contact-us__map" data-v-c5b1ff57${_scopeId}></div></div></div></div></div><div class="col-lg-6 d-flex" data-v-c5b1ff57${_scopeId}><div class="contact-form-wrap contact-us__panel" data-v-c5b1ff57${_scopeId}><div class="title-area" data-v-c5b1ff57${_scopeId}><span class="sub-title" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("Contact form"))}</span><h2 class="sec-title" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("Please Fill The Form Below"))}</h2></div><form class="appointment-form ajax-contact" data-v-c5b1ff57${_scopeId}><div class="row" data-v-c5b1ff57${_scopeId}><div class="col-md-6 form-group" data-v-c5b1ff57${_scopeId}><input${ssrRenderAttr("value", unref(contactForm).name)} type="text" name="name" id="name"${ssrRenderAttr("placeholder", trans("Your Name"))} class="${ssrRenderClass([{ "error": unref(contactForm).errors.name }, "form-control style-white"])}"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-c5b1ff57${_scopeId}><i class="far fa-user" data-v-c5b1ff57${_scopeId}></i>`);
            if (unref(contactForm).errors.name) {
              _push2(`<div class="text-danger mt-1 small" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(unref(contactForm).errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-md-6 form-group" data-v-c5b1ff57${_scopeId}><input${ssrRenderAttr("value", unref(contactForm).email)} type="email" name="email" id="email"${ssrRenderAttr("placeholder", trans("Email Address"))} class="${ssrRenderClass([{ "error": unref(contactForm).errors.email }, "form-control style-white"])}"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-c5b1ff57${_scopeId}><i class="far fa-envelope" data-v-c5b1ff57${_scopeId}></i>`);
            if (unref(contactForm).errors.email) {
              _push2(`<div class="text-danger mt-1 small" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(unref(contactForm).errors.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-md-6 form-group" data-v-c5b1ff57${_scopeId}><input${ssrRenderAttr("value", unref(contactForm).mobile)} type="text" name="mobile" id="mobile"${ssrRenderAttr("placeholder", trans("Phone Number"))} class="${ssrRenderClass([{ "error": unref(contactForm).errors.mobile }, "form-control style-white"])}"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} data-v-c5b1ff57${_scopeId}><i class="far fa-phone" data-v-c5b1ff57${_scopeId}></i>`);
            if (unref(contactForm).errors.mobile) {
              _push2(`<div class="text-danger mt-1 small" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(unref(contactForm).errors.mobile)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-md-6 form-group" data-v-c5b1ff57${_scopeId}><input${ssrRenderAttr("value", unref(contactForm).subject)} type="text" name="subject" id="subject"${ssrRenderAttr("placeholder", trans("Subject"))} class="${ssrRenderClass([{ "error": unref(contactForm).errors.subject }, "form-control style-white"])}"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} data-v-c5b1ff57${_scopeId}><i class="far fa-phone" data-v-c5b1ff57${_scopeId}></i>`);
            if (unref(contactForm).errors.subject) {
              _push2(`<div class="text-danger mt-1 small" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(unref(contactForm).errors.subject)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-12 form-group" data-v-c5b1ff57${_scopeId}><textarea${ssrRenderAttr("placeholder", trans("Type Your Message"))} class="${ssrRenderClass([{ "error": unref(contactForm).errors.message }, "form-control style-white"])}"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} required data-v-c5b1ff57${_scopeId}>${ssrInterpolate(unref(contactForm).message)}</textarea><i class="far fa-pencil" data-v-c5b1ff57${_scopeId}></i>`);
            if (unref(contactForm).errors.message) {
              _push2(`<div class="text-danger mt-1 small" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(unref(contactForm).errors.message)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-12 form-group mb-0" data-v-c5b1ff57${_scopeId}><button class="btn style2" type="submit"${ssrIncludeBooleanAttr(unref(contactForm).processing) ? " disabled" : ""} data-v-c5b1ff57${_scopeId}>`);
            if (unref(contactForm).processing) {
              _push2(`<span data-v-c5b1ff57${_scopeId}><i class="fa-solid fa-spinner fa-spin me-2" data-v-c5b1ff57${_scopeId}></i>${ssrInterpolate(trans("Sending..."))}</span>`);
            } else {
              _push2(`<span data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("Send Message"))}</span>`);
            }
            _push2(`</button></div>`);
            if (submitSuccess.value) {
              _push2(`<div class="col-12 mt-3" data-v-c5b1ff57${_scopeId}><div class="alert alert-success" data-v-c5b1ff57${_scopeId}>${ssrInterpolate(trans("Thank you for contacting us! We will get back to you soon."))}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></form></div></div></div></div></section>`);
            _push2(ssrRenderComponent(FaqSection, { faqs: faqs.value }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "breadcumb-wrapper" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-lg-6" }, [
                      createVNode("div", { class: "breadcumb-content" }, [
                        createVNode("h1", { class: "breadcumb-title" }, toDisplayString(trans("Contact Us")), 1),
                        createVNode("ul", { class: "breadcumb-menu" }, [
                          createVNode("li", null, [
                            createVNode(unref(Link), {
                              href: _ctx.route("home")
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trans("Home")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          createVNode("li", { class: "active" }, toDisplayString(trans("Contact Us")), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-lg-6 d-lg-block d-none" }, [
                      createVNode("div", { class: "breadcumb-thumb" }, [
                        createVNode("img", {
                          src: asset_path.value + "images/custom/contact_us.png",
                          alt: "img"
                        }, null, 8, ["src"])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "contact-area space" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row gy-4 justify-content-center" }, [
                    contactAddressLines.value.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "col-xxl-3 col-lg-4 col-md-6"
                    }, [
                      createVNode("div", { class: "contact-info" }, [
                        createVNode("div", { class: "contact-info_icon" }, [
                          createVNode("i", { class: "fas fa-map-marker-alt" })
                        ]),
                        createVNode("h6", { class: "contact-info_title" }, toDisplayString(trans("Address")), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(contactAddressLines.value, (line, idx) => {
                          return openBlock(), createBlock("p", {
                            key: `addr-${idx}`,
                            class: "contact-info_text"
                          }, toDisplayString(line), 1);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    contactPhoneLines.value.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "col-xxl-3 col-lg-4 col-md-6"
                    }, [
                      createVNode("div", { class: "contact-info" }, [
                        createVNode("div", { class: "contact-info_icon" }, [
                          createVNode("i", { class: "fas fa-phone-alt" })
                        ]),
                        createVNode("h6", { class: "contact-info_title" }, toDisplayString(trans("Phone Number")), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(contactPhoneLines.value, (phone, idx) => {
                          return openBlock(), createBlock("p", {
                            key: `phone-${idx}`,
                            class: "contact-info_text"
                          }, [
                            createVNode("a", {
                              dir: "ltr",
                              href: `tel:${phone}`
                            }, toDisplayString(phone), 9, ["href"])
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    contactEmailLines.value.length ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "col-xxl-3 col-lg-4 col-md-6"
                    }, [
                      createVNode("div", { class: "contact-info" }, [
                        createVNode("div", { class: "contact-info_icon" }, [
                          createVNode("i", { class: "fas fa-envelope" })
                        ]),
                        createVNode("h6", { class: "contact-info_title" }, toDisplayString(trans("E-mail")), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(contactEmailLines.value, (email, idx) => {
                          return openBlock(), createBlock("p", {
                            key: `email-${idx}`,
                            class: "contact-info_text"
                          }, [
                            createVNode("a", {
                              dir: "ltr",
                              href: `mailto:${email}`
                            }, toDisplayString(email), 9, ["href"])
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode("section", {
                class: "contact-form-area appointment-area-2 bg-smoke overflow-hidden",
                style: { backgroundImage: `url(${asset_path.value}images/custom/contact_bg.png)` }
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row gx-0 contact-us__grid" }, [
                    createVNode("div", { class: "col-lg-6 d-flex" }, [
                      createVNode("div", { class: "contact-form-wrap contact-us__panel mb-1" }, [
                        createVNode("div", { class: "title-area" }, [
                          createVNode("span", { class: "sub-title" }, toDisplayString(trans("Our Agents")), 1)
                        ]),
                        createVNode("div", { class: "contact-us__locator" }, [
                          createVNode("div", { class: "contact-us__map-shell" }, [
                            createVNode("div", {
                              ref_key: "mapEl",
                              ref: mapEl,
                              class: "contact-us__map"
                            }, null, 512)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-lg-6 d-flex" }, [
                      createVNode("div", { class: "contact-form-wrap contact-us__panel" }, [
                        createVNode("div", { class: "title-area" }, [
                          createVNode("span", { class: "sub-title" }, toDisplayString(trans("Contact form")), 1),
                          createVNode("h2", { class: "sec-title" }, toDisplayString(trans("Please Fill The Form Below")), 1)
                        ]),
                        createVNode("form", {
                          onSubmit: withModifiers(handleSubmit, ["prevent"]),
                          class: "appointment-form ajax-contact"
                        }, [
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-md-6 form-group" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(contactForm).name = $event,
                                type: "text",
                                name: "name",
                                id: "name",
                                placeholder: trans("Your Name"),
                                class: ["form-control style-white", { "error": unref(contactForm).errors.name }],
                                disabled: unref(contactForm).processing,
                                required: ""
                              }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                [vModelText, unref(contactForm).name]
                              ]),
                              createVNode("i", { class: "far fa-user" }),
                              unref(contactForm).errors.name ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-danger mt-1 small"
                              }, toDisplayString(unref(contactForm).errors.name), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "col-md-6 form-group" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(contactForm).email = $event,
                                type: "email",
                                name: "email",
                                id: "email",
                                placeholder: trans("Email Address"),
                                class: ["form-control style-white", { "error": unref(contactForm).errors.email }],
                                disabled: unref(contactForm).processing,
                                required: ""
                              }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                [vModelText, unref(contactForm).email]
                              ]),
                              createVNode("i", { class: "far fa-envelope" }),
                              unref(contactForm).errors.email ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-danger mt-1 small"
                              }, toDisplayString(unref(contactForm).errors.email), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "col-md-6 form-group" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(contactForm).mobile = $event,
                                type: "text",
                                name: "mobile",
                                id: "mobile",
                                placeholder: trans("Phone Number"),
                                class: ["form-control style-white", { "error": unref(contactForm).errors.mobile }],
                                disabled: unref(contactForm).processing
                              }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                [vModelText, unref(contactForm).mobile]
                              ]),
                              createVNode("i", { class: "far fa-phone" }),
                              unref(contactForm).errors.mobile ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-danger mt-1 small"
                              }, toDisplayString(unref(contactForm).errors.mobile), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "col-md-6 form-group" }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(contactForm).subject = $event,
                                type: "text",
                                name: "subject",
                                id: "subject",
                                placeholder: trans("Subject"),
                                class: ["form-control style-white", { "error": unref(contactForm).errors.subject }],
                                disabled: unref(contactForm).processing
                              }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                [vModelText, unref(contactForm).subject]
                              ]),
                              createVNode("i", { class: "far fa-phone" }),
                              unref(contactForm).errors.subject ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-danger mt-1 small"
                              }, toDisplayString(unref(contactForm).errors.subject), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "col-12 form-group" }, [
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(contactForm).message = $event,
                                placeholder: trans("Type Your Message"),
                                class: ["form-control style-white", { "error": unref(contactForm).errors.message }],
                                disabled: unref(contactForm).processing,
                                required: ""
                              }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                                [vModelText, unref(contactForm).message]
                              ]),
                              createVNode("i", { class: "far fa-pencil" }),
                              unref(contactForm).errors.message ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-danger mt-1 small"
                              }, toDisplayString(unref(contactForm).errors.message), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "col-12 form-group mb-0" }, [
                              createVNode("button", {
                                class: "btn style2",
                                type: "submit",
                                disabled: unref(contactForm).processing
                              }, [
                                unref(contactForm).processing ? (openBlock(), createBlock("span", { key: 0 }, [
                                  createVNode("i", { class: "fa-solid fa-spinner fa-spin me-2" }),
                                  createTextVNode(toDisplayString(trans("Sending...")), 1)
                                ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(trans("Send Message")), 1))
                              ], 8, ["disabled"])
                            ]),
                            submitSuccess.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "col-12 mt-3"
                            }, [
                              createVNode("div", { class: "alert alert-success" }, toDisplayString(trans("Thank you for contacting us! We will get back to you soon.")), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ], 32)
                      ])
                    ])
                  ])
                ])
              ], 4),
              createVNode(FaqSection, { faqs: faqs.value }, null, 8, ["faqs"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/Support/resources/assets/js/Pages/Index.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-c5b1ff57"]]);
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  __name: "AuthLayout",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: true },
    heading: { type: String, required: true },
    subheading: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const locale = computed(() => page.props.locale || "");
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e) {
        return key;
      }
    };
    const withLocalePath = (path) => {
      const loc = locale.value || "";
      if (!path.startsWith("/")) return path;
      return loc ? `/${loc}${path}` : path;
    };
    const homeUrl = computed(() => withLocalePath("/"));
    const { title, heading, subheading } = props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AppLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="py-5 bg-body-tertiary"${_scopeId}><div class="container"${_scopeId}><nav aria-label="breadcrumb" class="mb-4"${_scopeId}><ol class="breadcrumb mb-0"${_scopeId}><li class="breadcrumb-item"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), { href: homeUrl.value }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Home"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Home")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li class="breadcrumb-item active" aria-current="page"${_scopeId}>${ssrInterpolate(unref(title))}</li></ol></nav><div class="row justify-content-center"${_scopeId}><div class="col-12 col-md-10 col-lg-8 col-xl-6"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-body p-4 p-md-5"${_scopeId}><h1 class="h4 mb-2"${_scopeId}>${ssrInterpolate(unref(heading))}</h1>`);
            if (unref(subheading)) {
              _push2(`<p class="text-muted mb-4"${_scopeId}>${ssrInterpolate(unref(subheading))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div>`);
            if (_ctx.$slots.footer) {
              _push2(`<div class="text-center mt-3"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "py-5 bg-body-tertiary" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("nav", {
                    "aria-label": "breadcrumb",
                    class: "mb-4"
                  }, [
                    createVNode("ol", { class: "breadcrumb mb-0" }, [
                      createVNode("li", { class: "breadcrumb-item" }, [
                        createVNode(unref(Link), { href: homeUrl.value }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(trans("Home")), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("li", {
                        class: "breadcrumb-item active",
                        "aria-current": "page"
                      }, toDisplayString(unref(title)), 1)
                    ])
                  ]),
                  createVNode("div", { class: "row justify-content-center" }, [
                    createVNode("div", { class: "col-12 col-md-10 col-lg-8 col-xl-6" }, [
                      createVNode("div", { class: "card border-0 shadow-sm" }, [
                        createVNode("div", { class: "card-body p-4 p-md-5" }, [
                          createVNode("h1", { class: "h4 mb-2" }, toDisplayString(unref(heading)), 1),
                          unref(subheading) ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-muted mb-4"
                          }, toDisplayString(unref(subheading)), 1)) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "default")
                        ])
                      ]),
                      _ctx.$slots.footer ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center mt-3"
                      }, [
                        renderSlot(_ctx.$slots, "footer")
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthLayout.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  components: {
    AuthLayout: _sfc_main$6,
    Link,
    Head
  },
  props: {
    errors: Object
  },
  setup() {
    const page = usePage();
    const seo = computed(() => page.props.seo);
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e) {
        return key;
      }
    };
    const form = useForm({
      email: ""
    });
    return { form, seo, trans };
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_auth_layout = resolveComponent("auth-layout");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title${_scopeId}>${ssrInterpolate($setup.trans("Forgot Password"))} | Mutlu</title>`);
      } else {
        return [
          createVNode("title", null, toDisplayString($setup.trans("Forgot Password")) + " | Mutlu", 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_auth_layout, {
    title: $setup.trans("Forgot Password"),
    heading: $setup.trans("Reset Your Password"),
    subheading: $setup.trans(`Enter your email address and we'll send you a link to reset your password`)
  }, {
    footer: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="small text-muted"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("login"),
          class: "link-secondary fw-semibold"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($setup.trans("Back to Login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($setup.trans("Back to Login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "small text-muted" }, [
            createVNode(_component_Link, {
              href: _ctx.route("login"),
              class: "link-secondary fw-semibold"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString($setup.trans("Back to Login")), 1)
              ]),
              _: 1
            }, 8, ["href"])
          ])
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<form class="vstack gap-3"${_scopeId}><div${_scopeId}><label for="email" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Email"))} <span class="text-danger"${_scopeId}>*</span></label><input id="email"${ssrRenderAttr("value", $setup.form.email)} autofocus name="email" type="email"${ssrRenderAttr("placeholder", $setup.trans("Email"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.email }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.email) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.email)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><button type="submit" class="btn btn-secondary w-100 py-2"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""}${_scopeId}>`);
        if ($setup.form.processing) {
          _push2(`<span class="d-inline-flex align-items-center justify-content-center gap-2"${_scopeId}><span class="spinner-border spinner-border-sm" aria-hidden="true"${_scopeId}></span><span${_scopeId}>${ssrInterpolate($setup.trans("Sending..."))}</span></span>`);
        } else {
          _push2(`<span${_scopeId}>${ssrInterpolate($setup.trans("Send Password Reset Link"))}</span>`);
        }
        _push2(`</button></form>`);
      } else {
        return [
          createVNode("form", {
            onSubmit: withModifiers(($event) => $setup.form.post(_ctx.route("password.email")), ["prevent"]),
            class: "vstack gap-3"
          }, [
            createVNode("div", null, [
              createVNode("label", {
                for: "email",
                class: "form-label"
              }, [
                createTextVNode(toDisplayString($setup.trans("Email")) + " ", 1),
                createVNode("span", { class: "text-danger" }, "*")
              ]),
              withDirectives(createVNode("input", {
                id: "email",
                "onUpdate:modelValue": ($event) => $setup.form.email = $event,
                autofocus: "",
                name: "email",
                type: "email",
                placeholder: $setup.trans("Email"),
                class: ["form-control", { "is-invalid": $props.errors && $props.errors.email }],
                disabled: $setup.form.processing,
                required: ""
              }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                [vModelText, $setup.form.email]
              ]),
              $props.errors && $props.errors.email ? (openBlock(), createBlock("div", {
                key: 0,
                class: "invalid-feedback"
              }, toDisplayString($props.errors.email), 1)) : createCommentVNode("", true)
            ]),
            createVNode("button", {
              type: "submit",
              class: "btn btn-secondary w-100 py-2",
              disabled: $setup.form.processing
            }, [
              $setup.form.processing ? (openBlock(), createBlock("span", {
                key: 0,
                class: "d-inline-flex align-items-center justify-content-center gap-2"
              }, [
                createVNode("span", {
                  class: "spinner-border spinner-border-sm",
                  "aria-hidden": "true"
                }),
                createVNode("span", null, toDisplayString($setup.trans("Sending...")), 1)
              ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString($setup.trans("Send Password Reset Link")), 1))
            ], 8, ["disabled"])
          ], 40, ["onSubmit"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ForgotPassword = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$3]]);
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  components: {
    AuthLayout: _sfc_main$6,
    Link,
    Head
  },
  props: {
    errors: Object
  },
  setup() {
    const page = usePage();
    const seo = computed(() => page.props.seo);
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e) {
        return key;
      }
    };
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    return { form, seo, trans };
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_auth_layout = resolveComponent("auth-layout");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title${_scopeId}>${ssrInterpolate($setup.trans("Login"))} | Mutlu</title>`);
      } else {
        return [
          createVNode("title", null, toDisplayString($setup.trans("Login")) + " | Mutlu", 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_auth_layout, {
    title: $setup.trans("Login"),
    heading: $setup.trans("Sign In to Your Account"),
    subheading: $setup.trans("Enter your credentials to access your account")
  }, {
    footer: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="small text-muted"${_scopeId}>${ssrInterpolate($setup.trans("I Don't Have Account!"))} `);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("register"),
          class: "link-secondary fw-semibold ms-1"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($setup.trans("Register"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($setup.trans("Register")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "small text-muted" }, [
            createTextVNode(toDisplayString($setup.trans("I Don't Have Account!")) + " ", 1),
            createVNode(_component_Link, {
              href: _ctx.route("register"),
              class: "link-secondary fw-semibold ms-1"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString($setup.trans("Register")), 1)
              ]),
              _: 1
            }, 8, ["href"])
          ])
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<form class="vstack gap-3"${_scopeId}><div${_scopeId}><label for="email" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Email"))} <span class="text-danger"${_scopeId}>*</span></label><input id="email"${ssrRenderAttr("value", $setup.form.email)} autofocus name="email" type="email"${ssrRenderAttr("placeholder", $setup.trans("Email"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.email }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.email) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.email)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div${_scopeId}><label for="password" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Password"))} <span class="text-danger"${_scopeId}>*</span></label><input id="password"${ssrRenderAttr("value", $setup.form.password)} name="password" type="password"${ssrRenderAttr("placeholder", $setup.trans("Password"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.password }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.password) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.password)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="d-flex justify-content-between align-items-center flex-wrap gap-2"${_scopeId}><div class="form-check"${_scopeId}><input id="remember"${ssrIncludeBooleanAttr(Array.isArray($setup.form.remember) ? ssrLooseContain($setup.form.remember, null) : $setup.form.remember) ? " checked" : ""} class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""}${_scopeId}><label class="form-check-label" for="remember"${_scopeId}>${ssrInterpolate($setup.trans("Remember Me"))}</label></div>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("password.request"),
          class: "link-secondary small"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($setup.trans("Forgot Password"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($setup.trans("Forgot Password")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div><button type="submit" class="btn btn-secondary w-100 py-2"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""}${_scopeId}>`);
        if ($setup.form.processing) {
          _push2(`<span class="d-inline-flex align-items-center justify-content-center gap-2"${_scopeId}><span class="spinner-border spinner-border-sm" aria-hidden="true"${_scopeId}></span><span${_scopeId}>${ssrInterpolate($setup.trans("Signing In..."))}</span></span>`);
        } else {
          _push2(`<span${_scopeId}>${ssrInterpolate($setup.trans("Sign In"))}</span>`);
        }
        _push2(`</button></form>`);
      } else {
        return [
          createVNode("form", {
            onSubmit: withModifiers(($event) => $setup.form.post(_ctx.route("login")), ["prevent"]),
            class: "vstack gap-3"
          }, [
            createVNode("div", null, [
              createVNode("label", {
                for: "email",
                class: "form-label"
              }, [
                createTextVNode(toDisplayString($setup.trans("Email")) + " ", 1),
                createVNode("span", { class: "text-danger" }, "*")
              ]),
              withDirectives(createVNode("input", {
                id: "email",
                "onUpdate:modelValue": ($event) => $setup.form.email = $event,
                autofocus: "",
                name: "email",
                type: "email",
                placeholder: $setup.trans("Email"),
                class: ["form-control", { "is-invalid": $props.errors && $props.errors.email }],
                disabled: $setup.form.processing,
                required: ""
              }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                [vModelText, $setup.form.email]
              ]),
              $props.errors && $props.errors.email ? (openBlock(), createBlock("div", {
                key: 0,
                class: "invalid-feedback"
              }, toDisplayString($props.errors.email), 1)) : createCommentVNode("", true)
            ]),
            createVNode("div", null, [
              createVNode("label", {
                for: "password",
                class: "form-label"
              }, [
                createTextVNode(toDisplayString($setup.trans("Password")) + " ", 1),
                createVNode("span", { class: "text-danger" }, "*")
              ]),
              withDirectives(createVNode("input", {
                id: "password",
                "onUpdate:modelValue": ($event) => $setup.form.password = $event,
                name: "password",
                type: "password",
                placeholder: $setup.trans("Password"),
                class: ["form-control", { "is-invalid": $props.errors && $props.errors.password }],
                disabled: $setup.form.processing,
                required: ""
              }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                [vModelText, $setup.form.password]
              ]),
              $props.errors && $props.errors.password ? (openBlock(), createBlock("div", {
                key: 0,
                class: "invalid-feedback"
              }, toDisplayString($props.errors.password), 1)) : createCommentVNode("", true)
            ]),
            createVNode("div", { class: "d-flex justify-content-between align-items-center flex-wrap gap-2" }, [
              createVNode("div", { class: "form-check" }, [
                withDirectives(createVNode("input", {
                  id: "remember",
                  "onUpdate:modelValue": ($event) => $setup.form.remember = $event,
                  class: "form-check-input",
                  type: "checkbox",
                  disabled: $setup.form.processing
                }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                  [vModelCheckbox, $setup.form.remember]
                ]),
                createVNode("label", {
                  class: "form-check-label",
                  for: "remember"
                }, toDisplayString($setup.trans("Remember Me")), 1)
              ]),
              createVNode(_component_Link, {
                href: _ctx.route("password.request"),
                class: "link-secondary small"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($setup.trans("Forgot Password")), 1)
                ]),
                _: 1
              }, 8, ["href"])
            ]),
            createVNode("button", {
              type: "submit",
              class: "btn btn-secondary w-100 py-2",
              disabled: $setup.form.processing
            }, [
              $setup.form.processing ? (openBlock(), createBlock("span", {
                key: 0,
                class: "d-inline-flex align-items-center justify-content-center gap-2"
              }, [
                createVNode("span", {
                  class: "spinner-border spinner-border-sm",
                  "aria-hidden": "true"
                }),
                createVNode("span", null, toDisplayString($setup.trans("Signing In...")), 1)
              ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString($setup.trans("Sign In")), 1))
            ], 8, ["disabled"])
          ], 40, ["onSubmit"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Auth/Login.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2]]);
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  components: {
    AuthLayout: _sfc_main$6,
    Link,
    Head
  },
  props: {
    errors: Object
  },
  setup() {
    const page = usePage();
    const seo = computed(() => page.props.seo);
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e) {
        return key;
      }
    };
    const form = useForm({
      name: "",
      email: "",
      mobile: "",
      password: "",
      password_confirmation: ""
    });
    return { form, seo, trans };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_auth_layout = resolveComponent("auth-layout");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title${_scopeId}>${ssrInterpolate($setup.trans("Register"))} | Mutlu</title>`);
      } else {
        return [
          createVNode("title", null, toDisplayString($setup.trans("Register")) + " | Mutlu", 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_auth_layout, {
    title: $setup.trans("Register"),
    heading: $setup.trans("Create A New Account"),
    subheading: $setup.trans("Fill out the form below to create your account")
  }, {
    footer: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="small text-muted"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("login"),
          class: "link-secondary fw-semibold"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($setup.trans("Already Have An Account?"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($setup.trans("Already Have An Account?")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "small text-muted" }, [
            createVNode(_component_Link, {
              href: _ctx.route("login"),
              class: "link-secondary fw-semibold"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString($setup.trans("Already Have An Account?")), 1)
              ]),
              _: 1
            }, 8, ["href"])
          ])
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<form class="vstack gap-3"${_scopeId}><div class="row g-3"${_scopeId}><div class="col-12 col-sm-6"${_scopeId}><label for="name" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Name"))} <span class="text-danger"${_scopeId}>*</span></label><input id="name"${ssrRenderAttr("value", $setup.form.name)} autofocus name="name" type="text"${ssrRenderAttr("placeholder", $setup.trans("Name"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.name }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.name) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.name)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="col-12 col-sm-6"${_scopeId}><label for="email" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Email"))} <span class="text-danger"${_scopeId}>*</span></label><input id="email"${ssrRenderAttr("value", $setup.form.email)} name="email" type="email"${ssrRenderAttr("placeholder", $setup.trans("Email"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.email }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.email) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.email)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="col-12 col-sm-6"${_scopeId}><label for="mobile" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Mobile"))} <span class="text-danger"${_scopeId}>*</span></label><input id="mobile"${ssrRenderAttr("value", $setup.form.mobile)} name="mobile" type="text"${ssrRenderAttr("placeholder", $setup.trans("Mobile"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.mobile }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.mobile) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.mobile)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="col-12 col-sm-6"${_scopeId}><label for="password" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Password"))} <span class="text-danger"${_scopeId}>*</span></label><input id="password"${ssrRenderAttr("value", $setup.form.password)} name="password" type="password"${ssrRenderAttr("placeholder", $setup.trans("Password"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.password }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.password) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.password)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="col-12 col-sm-6"${_scopeId}><label for="password_confirmation" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Confirm Password"))} <span class="text-danger"${_scopeId}>*</span></label><input id="password_confirmation"${ssrRenderAttr("value", $setup.form.password_confirmation)} name="password_confirmation" type="password"${ssrRenderAttr("placeholder", $setup.trans("Confirm Password"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.password_confirmation }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.password_confirmation) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.password_confirmation)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div><button type="submit" class="btn btn-secondary w-100 py-2"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""}${_scopeId}>`);
        if ($setup.form.processing) {
          _push2(`<span class="d-inline-flex align-items-center justify-content-center gap-2"${_scopeId}><span class="spinner-border spinner-border-sm" aria-hidden="true"${_scopeId}></span><span${_scopeId}>${ssrInterpolate($setup.trans("Registering..."))}</span></span>`);
        } else {
          _push2(`<span${_scopeId}>${ssrInterpolate($setup.trans("Register"))}</span>`);
        }
        _push2(`</button></form>`);
      } else {
        return [
          createVNode("form", {
            onSubmit: withModifiers(($event) => $setup.form.post(_ctx.route("register")), ["prevent"]),
            class: "vstack gap-3"
          }, [
            createVNode("div", { class: "row g-3" }, [
              createVNode("div", { class: "col-12 col-sm-6" }, [
                createVNode("label", {
                  for: "name",
                  class: "form-label"
                }, [
                  createTextVNode(toDisplayString($setup.trans("Name")) + " ", 1),
                  createVNode("span", { class: "text-danger" }, "*")
                ]),
                withDirectives(createVNode("input", {
                  id: "name",
                  "onUpdate:modelValue": ($event) => $setup.form.name = $event,
                  autofocus: "",
                  name: "name",
                  type: "text",
                  placeholder: $setup.trans("Name"),
                  class: ["form-control", { "is-invalid": $props.errors && $props.errors.name }],
                  disabled: $setup.form.processing,
                  required: ""
                }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                  [vModelText, $setup.form.name]
                ]),
                $props.errors && $props.errors.name ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "invalid-feedback"
                }, toDisplayString($props.errors.name), 1)) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "col-12 col-sm-6" }, [
                createVNode("label", {
                  for: "email",
                  class: "form-label"
                }, [
                  createTextVNode(toDisplayString($setup.trans("Email")) + " ", 1),
                  createVNode("span", { class: "text-danger" }, "*")
                ]),
                withDirectives(createVNode("input", {
                  id: "email",
                  "onUpdate:modelValue": ($event) => $setup.form.email = $event,
                  name: "email",
                  type: "email",
                  placeholder: $setup.trans("Email"),
                  class: ["form-control", { "is-invalid": $props.errors && $props.errors.email }],
                  disabled: $setup.form.processing,
                  required: ""
                }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                  [vModelText, $setup.form.email]
                ]),
                $props.errors && $props.errors.email ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "invalid-feedback"
                }, toDisplayString($props.errors.email), 1)) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "col-12 col-sm-6" }, [
                createVNode("label", {
                  for: "mobile",
                  class: "form-label"
                }, [
                  createTextVNode(toDisplayString($setup.trans("Mobile")) + " ", 1),
                  createVNode("span", { class: "text-danger" }, "*")
                ]),
                withDirectives(createVNode("input", {
                  id: "mobile",
                  "onUpdate:modelValue": ($event) => $setup.form.mobile = $event,
                  name: "mobile",
                  type: "text",
                  placeholder: $setup.trans("Mobile"),
                  class: ["form-control", { "is-invalid": $props.errors && $props.errors.mobile }],
                  disabled: $setup.form.processing,
                  required: ""
                }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                  [vModelText, $setup.form.mobile]
                ]),
                $props.errors && $props.errors.mobile ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "invalid-feedback"
                }, toDisplayString($props.errors.mobile), 1)) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "col-12 col-sm-6" }, [
                createVNode("label", {
                  for: "password",
                  class: "form-label"
                }, [
                  createTextVNode(toDisplayString($setup.trans("Password")) + " ", 1),
                  createVNode("span", { class: "text-danger" }, "*")
                ]),
                withDirectives(createVNode("input", {
                  id: "password",
                  "onUpdate:modelValue": ($event) => $setup.form.password = $event,
                  name: "password",
                  type: "password",
                  placeholder: $setup.trans("Password"),
                  class: ["form-control", { "is-invalid": $props.errors && $props.errors.password }],
                  disabled: $setup.form.processing,
                  required: ""
                }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                  [vModelText, $setup.form.password]
                ]),
                $props.errors && $props.errors.password ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "invalid-feedback"
                }, toDisplayString($props.errors.password), 1)) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "col-12 col-sm-6" }, [
                createVNode("label", {
                  for: "password_confirmation",
                  class: "form-label"
                }, [
                  createTextVNode(toDisplayString($setup.trans("Confirm Password")) + " ", 1),
                  createVNode("span", { class: "text-danger" }, "*")
                ]),
                withDirectives(createVNode("input", {
                  id: "password_confirmation",
                  "onUpdate:modelValue": ($event) => $setup.form.password_confirmation = $event,
                  name: "password_confirmation",
                  type: "password",
                  placeholder: $setup.trans("Confirm Password"),
                  class: ["form-control", { "is-invalid": $props.errors && $props.errors.password_confirmation }],
                  disabled: $setup.form.processing,
                  required: ""
                }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                  [vModelText, $setup.form.password_confirmation]
                ]),
                $props.errors && $props.errors.password_confirmation ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "invalid-feedback"
                }, toDisplayString($props.errors.password_confirmation), 1)) : createCommentVNode("", true)
              ])
            ]),
            createVNode("button", {
              type: "submit",
              class: "btn btn-secondary w-100 py-2",
              disabled: $setup.form.processing
            }, [
              $setup.form.processing ? (openBlock(), createBlock("span", {
                key: 0,
                class: "d-inline-flex align-items-center justify-content-center gap-2"
              }, [
                createVNode("span", {
                  class: "spinner-border spinner-border-sm",
                  "aria-hidden": "true"
                }),
                createVNode("span", null, toDisplayString($setup.trans("Registering...")), 1)
              ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString($setup.trans("Register")), 1))
            ], 8, ["disabled"])
          ], 40, ["onSubmit"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Auth/Register.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Register = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  components: {
    AuthLayout: _sfc_main$6,
    Link,
    Head
  },
  props: {
    errors: Object,
    token: String,
    email: String
  },
  setup(props) {
    const page = usePage();
    const seo = computed(() => page.props.seo);
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e) {
        return key;
      }
    };
    const form = useForm({
      email: props.email || "",
      password: "",
      password_confirmation: "",
      token: props.token || ""
    });
    return { form, seo, trans };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_auth_layout = resolveComponent("auth-layout");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<title${_scopeId}>${ssrInterpolate($setup.trans("Reset Password"))} | Mutlu</title>`);
      } else {
        return [
          createVNode("title", null, toDisplayString($setup.trans("Reset Password")) + " | Mutlu", 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_auth_layout, {
    title: $setup.trans("Reset Password"),
    heading: $setup.trans("Set New Password"),
    subheading: $setup.trans("Enter your email and new password to reset your account")
  }, {
    footer: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="small text-muted"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_Link, {
          href: _ctx.route("login"),
          class: "link-secondary fw-semibold"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($setup.trans("Back to Login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString($setup.trans("Back to Login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "small text-muted" }, [
            createVNode(_component_Link, {
              href: _ctx.route("login"),
              class: "link-secondary fw-semibold"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString($setup.trans("Back to Login")), 1)
              ]),
              _: 1
            }, 8, ["href"])
          ])
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<form class="vstack gap-3"${_scopeId}><input${ssrRenderAttr("value", $setup.form.token)} name="token" type="hidden"${_scopeId}><div${_scopeId}><label for="email" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Email"))} <span class="text-danger"${_scopeId}>*</span></label><input id="email"${ssrRenderAttr("value", $setup.form.email)} autofocus name="email" type="email"${ssrRenderAttr("placeholder", $setup.trans("Email"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.email }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.email) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.email)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="row g-3"${_scopeId}><div class="col-12 col-sm-6"${_scopeId}><label for="password" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Password"))} <span class="text-danger"${_scopeId}>*</span></label><input id="password"${ssrRenderAttr("value", $setup.form.password)} name="password" type="password"${ssrRenderAttr("placeholder", $setup.trans("Password"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.password }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.password) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.password)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="col-12 col-sm-6"${_scopeId}><label for="password_confirmation" class="form-label"${_scopeId}>${ssrInterpolate($setup.trans("Confirm Password"))} <span class="text-danger"${_scopeId}>*</span></label><input id="password_confirmation"${ssrRenderAttr("value", $setup.form.password_confirmation)} name="password_confirmation" type="password"${ssrRenderAttr("placeholder", $setup.trans("Confirm Password"))} class="${ssrRenderClass([{ "is-invalid": $props.errors && $props.errors.password_confirmation }, "form-control"])}"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""} required${_scopeId}>`);
        if ($props.errors && $props.errors.password_confirmation) {
          _push2(`<div class="invalid-feedback"${_scopeId}>${ssrInterpolate($props.errors.password_confirmation)}</div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div><button type="submit" class="btn btn-secondary w-100 py-2"${ssrIncludeBooleanAttr($setup.form.processing) ? " disabled" : ""}${_scopeId}>`);
        if ($setup.form.processing) {
          _push2(`<span class="d-inline-flex align-items-center justify-content-center gap-2"${_scopeId}><span class="spinner-border spinner-border-sm" aria-hidden="true"${_scopeId}></span><span${_scopeId}>${ssrInterpolate($setup.trans("Resetting..."))}</span></span>`);
        } else {
          _push2(`<span${_scopeId}>${ssrInterpolate($setup.trans("Reset Password"))}</span>`);
        }
        _push2(`</button></form>`);
      } else {
        return [
          createVNode("form", {
            onSubmit: withModifiers(($event) => $setup.form.post(_ctx.route("password.update")), ["prevent"]),
            class: "vstack gap-3"
          }, [
            createVNode("input", {
              value: $setup.form.token,
              name: "token",
              type: "hidden"
            }, null, 8, ["value"]),
            createVNode("div", null, [
              createVNode("label", {
                for: "email",
                class: "form-label"
              }, [
                createTextVNode(toDisplayString($setup.trans("Email")) + " ", 1),
                createVNode("span", { class: "text-danger" }, "*")
              ]),
              withDirectives(createVNode("input", {
                id: "email",
                "onUpdate:modelValue": ($event) => $setup.form.email = $event,
                autofocus: "",
                name: "email",
                type: "email",
                placeholder: $setup.trans("Email"),
                class: ["form-control", { "is-invalid": $props.errors && $props.errors.email }],
                disabled: $setup.form.processing,
                required: ""
              }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                [vModelText, $setup.form.email]
              ]),
              $props.errors && $props.errors.email ? (openBlock(), createBlock("div", {
                key: 0,
                class: "invalid-feedback"
              }, toDisplayString($props.errors.email), 1)) : createCommentVNode("", true)
            ]),
            createVNode("div", { class: "row g-3" }, [
              createVNode("div", { class: "col-12 col-sm-6" }, [
                createVNode("label", {
                  for: "password",
                  class: "form-label"
                }, [
                  createTextVNode(toDisplayString($setup.trans("Password")) + " ", 1),
                  createVNode("span", { class: "text-danger" }, "*")
                ]),
                withDirectives(createVNode("input", {
                  id: "password",
                  "onUpdate:modelValue": ($event) => $setup.form.password = $event,
                  name: "password",
                  type: "password",
                  placeholder: $setup.trans("Password"),
                  class: ["form-control", { "is-invalid": $props.errors && $props.errors.password }],
                  disabled: $setup.form.processing,
                  required: ""
                }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                  [vModelText, $setup.form.password]
                ]),
                $props.errors && $props.errors.password ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "invalid-feedback"
                }, toDisplayString($props.errors.password), 1)) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "col-12 col-sm-6" }, [
                createVNode("label", {
                  for: "password_confirmation",
                  class: "form-label"
                }, [
                  createTextVNode(toDisplayString($setup.trans("Confirm Password")) + " ", 1),
                  createVNode("span", { class: "text-danger" }, "*")
                ]),
                withDirectives(createVNode("input", {
                  id: "password_confirmation",
                  "onUpdate:modelValue": ($event) => $setup.form.password_confirmation = $event,
                  name: "password_confirmation",
                  type: "password",
                  placeholder: $setup.trans("Confirm Password"),
                  class: ["form-control", { "is-invalid": $props.errors && $props.errors.password_confirmation }],
                  disabled: $setup.form.processing,
                  required: ""
                }, null, 10, ["onUpdate:modelValue", "placeholder", "disabled"]), [
                  [vModelText, $setup.form.password_confirmation]
                ]),
                $props.errors && $props.errors.password_confirmation ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "invalid-feedback"
                }, toDisplayString($props.errors.password_confirmation), 1)) : createCommentVNode("", true)
              ])
            ]),
            createVNode("button", {
              type: "submit",
              class: "btn btn-secondary w-100 py-2",
              disabled: $setup.form.processing
            }, [
              $setup.form.processing ? (openBlock(), createBlock("span", {
                key: 0,
                class: "d-inline-flex align-items-center justify-content-center gap-2"
              }, [
                createVNode("span", {
                  class: "spinner-border spinner-border-sm",
                  "aria-hidden": "true"
                }),
                createVNode("span", null, toDisplayString($setup.trans("Resetting...")), 1)
              ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString($setup.trans("Reset Password")), 1))
            ], 8, ["disabled"])
          ], 40, ["onSubmit"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("Modules/User/resources/assets/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ResetPassword = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
const __default__$1 = {
  components: {
    AppLayout
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign(__default__$1, {
  __name: "Error404",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e) {
        return key;
      }
    };
    computed(() => page.props.seo || { website_name: "Sham Vision" });
    const asset_path = computed(() => page.props.asset_path || "/");
    const getHomeUrl = () => {
      try {
        return route("home");
      } catch (e) {
        return "/";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-2f449284${_scopeId}>${ssrInterpolate(trans("404 Error"))} | | Mutlu</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(trans("404 Error")) + " | | Mutlu", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="breadcrumb__area breadcrumb-space overflow-hidden banner-home-bg" data-v-2f449284${_scopeId}><div class="banner-home__middel-shape inner-top-shape" data-v-2f449284${_scopeId}></div><div class="container" data-v-2f449284${_scopeId}><div class="banner-all-shape-wrapper" data-v-2f449284${_scopeId}><div class="banner-home__banner-shape-1 first-shape" data-v-2f449284${_scopeId}><img class="upDown-top"${ssrRenderAttr("src", asset_path.value + "site/imgs/banner-1/banner-shape-1.svg")} alt="img not found" data-v-2f449284${_scopeId}></div><div class="banner-home__banner-shape-2 second-shape" data-v-2f449284${_scopeId}><img class="upDown-bottom"${ssrRenderAttr("src", asset_path.value + "site/imgs/banner-1/banner-shape-2.svg")} alt="img not found" data-v-2f449284${_scopeId}></div><div class="right-shape" data-v-2f449284${_scopeId}><img class="zooming"${ssrRenderAttr("src", asset_path.value + "site/imgs/inner-img/inner-right-shape.svg")} alt="img not found" data-v-2f449284${_scopeId}></div></div><div class="row align-items-center justify-content-between" data-v-2f449284${_scopeId}><div class="col-12" data-v-2f449284${_scopeId}><div class="breadcrumb__content text-center" data-v-2f449284${_scopeId}><div class="breadcrumb__title-wrapper mb-15 mb-sm-10 mb-xs-5" data-v-2f449284${_scopeId}><h1 class="breadcrumb__title color-white wow fadeIn animated" data-wow-delay=".1s" data-v-2f449284${_scopeId}>${ssrInterpolate(trans("404 Error"))}</h1></div><div class="breadcrumb__menu wow fadeIn animated" data-wow-delay=".5s" data-v-2f449284${_scopeId}><nav data-v-2f449284${_scopeId}><ul data-v-2f449284${_scopeId}><li data-v-2f449284${_scopeId}><span data-v-2f449284${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: getHomeUrl()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Home"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Home")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span></li><li class="active" data-v-2f449284${_scopeId}><span data-v-2f449284${_scopeId}>${ssrInterpolate(trans("404 Error"))}</span></li></ul></nav></div></div></div></div></div></div><section class="error section-space" data-v-2f449284${_scopeId}><div class="container" data-v-2f449284${_scopeId}><div class="row" data-v-2f449284${_scopeId}><div class="col-12" data-v-2f449284${_scopeId}><div class="error__content" data-v-2f449284${_scopeId}><div class="error__content-media mb-40 mb-sm-35 mb-xs-30" data-v-2f449284${_scopeId}><img class="upDown-bottom"${ssrRenderAttr("src", asset_path.value + "images/404.png")} alt="404 error" data-v-2f449284${_scopeId}></div><div class="section__title-wrapper text-center" data-v-2f449284${_scopeId}><h3 class="section__title mb-15 mb-xs-10 wow fadeIn animated" data-wow-delay=".3s" data-v-2f449284${_scopeId}>${ssrInterpolate(trans("Sorry.... This Page Not Found"))}</h3><p class="mb-40 mb-sm-25 mb-xs-20 wow fadeIn animated" data-wow-delay=".5s" data-v-2f449284${_scopeId}>${ssrInterpolate(trans("The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."))}</p><div class="error-btn-wrap" data-v-2f449284${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: getHomeUrl(),
              class: "error-btn wow fadeIn animated",
              "data-wow-delay": ".7s"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Back To Home Page"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Back To Home Page")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></div></div></section>`);
          } else {
            return [
              createVNode("div", { class: "breadcrumb__area breadcrumb-space overflow-hidden banner-home-bg" }, [
                createVNode("div", { class: "banner-home__middel-shape inner-top-shape" }),
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "banner-all-shape-wrapper" }, [
                    createVNode("div", { class: "banner-home__banner-shape-1 first-shape" }, [
                      createVNode("img", {
                        class: "upDown-top",
                        src: asset_path.value + "site/imgs/banner-1/banner-shape-1.svg",
                        alt: "img not found"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "banner-home__banner-shape-2 second-shape" }, [
                      createVNode("img", {
                        class: "upDown-bottom",
                        src: asset_path.value + "site/imgs/banner-1/banner-shape-2.svg",
                        alt: "img not found"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "right-shape" }, [
                      createVNode("img", {
                        class: "zooming",
                        src: asset_path.value + "site/imgs/inner-img/inner-right-shape.svg",
                        alt: "img not found"
                      }, null, 8, ["src"])
                    ])
                  ]),
                  createVNode("div", { class: "row align-items-center justify-content-between" }, [
                    createVNode("div", { class: "col-12" }, [
                      createVNode("div", { class: "breadcrumb__content text-center" }, [
                        createVNode("div", { class: "breadcrumb__title-wrapper mb-15 mb-sm-10 mb-xs-5" }, [
                          createVNode("h1", {
                            class: "breadcrumb__title color-white wow fadeIn animated",
                            "data-wow-delay": ".1s"
                          }, toDisplayString(trans("404 Error")), 1)
                        ]),
                        createVNode("div", {
                          class: "breadcrumb__menu wow fadeIn animated",
                          "data-wow-delay": ".5s"
                        }, [
                          createVNode("nav", null, [
                            createVNode("ul", null, [
                              createVNode("li", null, [
                                createVNode("span", null, [
                                  createVNode(unref(Link), {
                                    href: getHomeUrl()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(trans("Home")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
                                ])
                              ]),
                              createVNode("li", { class: "active" }, [
                                createVNode("span", null, toDisplayString(trans("404 Error")), 1)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "error section-space" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-12" }, [
                      createVNode("div", { class: "error__content" }, [
                        createVNode("div", { class: "error__content-media mb-40 mb-sm-35 mb-xs-30" }, [
                          createVNode("img", {
                            class: "upDown-bottom",
                            src: asset_path.value + "images/404.png",
                            alt: "404 error"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("div", { class: "section__title-wrapper text-center" }, [
                          createVNode("h3", {
                            class: "section__title mb-15 mb-xs-10 wow fadeIn animated",
                            "data-wow-delay": ".3s"
                          }, toDisplayString(trans("Sorry.... This Page Not Found")), 1),
                          createVNode("p", {
                            class: "mb-40 mb-sm-25 mb-xs-20 wow fadeIn animated",
                            "data-wow-delay": ".5s"
                          }, toDisplayString(trans("The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.")), 1),
                          createVNode("div", { class: "error-btn-wrap" }, [
                            createVNode(unref(Link), {
                              href: getHomeUrl(),
                              class: "error-btn wow fadeIn animated",
                              "data-wow-delay": ".7s"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trans("Back To Home Page")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error404.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Error404 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2f449284"]]);
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Error404
}, Symbol.toStringTag, { value: "Module" }));
const __default__ = {
  components: {
    AppLayout
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Error500",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const trans = (key) => {
      var _a;
      try {
        return ((_a = page.props.translations) == null ? void 0 : _a[key]) || key;
      } catch (e) {
        return key;
      }
    };
    computed(() => page.props.seo || { website_name: "Sham Vision" });
    const asset_path = computed(() => page.props.asset_path || "/");
    const appEnv = computed(() => page.props.app_env || "production");
    const isNonProduction = computed(() => appEnv.value !== "production");
    const getHomeUrl = () => {
      try {
        return route("home");
      } catch (e) {
        return "/";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-85422890${_scopeId}>${ssrInterpolate(trans("500 Error"))} | | Mutlu</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(trans("500 Error")) + " | | Mutlu", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
          if (_push2) {
            _push2(`<div class="breadcrumb__area breadcrumb-space overflow-hidden banner-home-bg" data-v-85422890${_scopeId}><div class="banner-home__middel-shape inner-top-shape" data-v-85422890${_scopeId}></div><div class="container" data-v-85422890${_scopeId}><div class="banner-all-shape-wrapper" data-v-85422890${_scopeId}><div class="banner-home__banner-shape-1 first-shape" data-v-85422890${_scopeId}><img class="upDown-top"${ssrRenderAttr("src", asset_path.value + "site/imgs/banner-1/banner-shape-1.svg")} alt="img not found" data-v-85422890${_scopeId}></div><div class="banner-home__banner-shape-2 second-shape" data-v-85422890${_scopeId}><img class="upDown-bottom"${ssrRenderAttr("src", asset_path.value + "site/imgs/banner-1/banner-shape-2.svg")} alt="img not found" data-v-85422890${_scopeId}></div><div class="right-shape" data-v-85422890${_scopeId}><img class="zooming"${ssrRenderAttr("src", asset_path.value + "site/imgs/inner-img/inner-right-shape.svg")} alt="img not found" data-v-85422890${_scopeId}></div></div><div class="row align-items-center justify-content-between" data-v-85422890${_scopeId}><div class="col-12" data-v-85422890${_scopeId}><div class="breadcrumb__content text-center" data-v-85422890${_scopeId}><div class="breadcrumb__title-wrapper mb-15 mb-sm-10 mb-xs-5" data-v-85422890${_scopeId}><h1 class="breadcrumb__title color-white wow fadeIn animated" data-wow-delay=".1s" data-v-85422890${_scopeId}>${ssrInterpolate(trans("500 Error"))}</h1></div><div class="breadcrumb__menu wow fadeIn animated" data-wow-delay=".5s" data-v-85422890${_scopeId}><nav data-v-85422890${_scopeId}><ul data-v-85422890${_scopeId}><li data-v-85422890${_scopeId}><span data-v-85422890${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: getHomeUrl()
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Home"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Home")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span></li><li class="active" data-v-85422890${_scopeId}><span data-v-85422890${_scopeId}>${ssrInterpolate(trans("500 Error"))}</span></li></ul></nav></div></div></div></div></div></div><section class="error section-space" data-v-85422890${_scopeId}><div class="container" data-v-85422890${_scopeId}><div class="row" data-v-85422890${_scopeId}><div class="col-12" data-v-85422890${_scopeId}><div class="error__content" data-v-85422890${_scopeId}><div class="section__title-wrapper text-center" data-v-85422890${_scopeId}><h3 class="section__title mb-15 mb-xs-10 wow fadeIn animated" data-wow-delay=".3s" data-v-85422890${_scopeId}>${ssrInterpolate(trans("Internal Server Error"))}</h3><p class="mb-40 mb-sm-25 mb-xs-20 wow fadeIn animated" data-wow-delay=".5s" data-v-85422890${_scopeId}>${ssrInterpolate(trans("We're sorry, but something went wrong on our end. Please try again later or contact support if the problem persists."))}</p>`);
            if (isNonProduction.value && (((_b = (_a = unref(page)) == null ? void 0 : _a.props) == null ? void 0 : _b.error) || ((_d = (_c = unref(page)) == null ? void 0 : _c.props) == null ? void 0 : _d.trace))) {
              _push2(`<div class="alert alert-danger text-start mb-40" style="${ssrRenderStyle({ "white-space": "pre-wrap", "word-break": "break-word" })}" data-v-85422890${_scopeId}><strong data-v-85422890${_scopeId}>Debug Error:</strong>`);
              if ((_f = (_e = unref(page)) == null ? void 0 : _e.props) == null ? void 0 : _f.error) {
                _push2(`<div data-v-85422890${_scopeId}>${ssrInterpolate(unref(page).props.error)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if ((_h = (_g = unref(page)) == null ? void 0 : _g.props) == null ? void 0 : _h.trace) {
                _push2(`<details class="mt-3" data-v-85422890${_scopeId}><summary data-v-85422890${_scopeId}>Stack trace</summary><pre class="mt-2" data-v-85422890${_scopeId}>${ssrInterpolate(unref(page).props.trace)}</pre></details>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="error-btn-wrap" data-v-85422890${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: getHomeUrl(),
              class: "error-btn wow fadeIn animated",
              "data-wow-delay": ".7s"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(trans("Back To Home Page"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(trans("Back To Home Page")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></div></div></section>`);
          } else {
            return [
              createVNode("div", { class: "breadcrumb__area breadcrumb-space overflow-hidden banner-home-bg" }, [
                createVNode("div", { class: "banner-home__middel-shape inner-top-shape" }),
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "banner-all-shape-wrapper" }, [
                    createVNode("div", { class: "banner-home__banner-shape-1 first-shape" }, [
                      createVNode("img", {
                        class: "upDown-top",
                        src: asset_path.value + "site/imgs/banner-1/banner-shape-1.svg",
                        alt: "img not found"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "banner-home__banner-shape-2 second-shape" }, [
                      createVNode("img", {
                        class: "upDown-bottom",
                        src: asset_path.value + "site/imgs/banner-1/banner-shape-2.svg",
                        alt: "img not found"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "right-shape" }, [
                      createVNode("img", {
                        class: "zooming",
                        src: asset_path.value + "site/imgs/inner-img/inner-right-shape.svg",
                        alt: "img not found"
                      }, null, 8, ["src"])
                    ])
                  ]),
                  createVNode("div", { class: "row align-items-center justify-content-between" }, [
                    createVNode("div", { class: "col-12" }, [
                      createVNode("div", { class: "breadcrumb__content text-center" }, [
                        createVNode("div", { class: "breadcrumb__title-wrapper mb-15 mb-sm-10 mb-xs-5" }, [
                          createVNode("h1", {
                            class: "breadcrumb__title color-white wow fadeIn animated",
                            "data-wow-delay": ".1s"
                          }, toDisplayString(trans("500 Error")), 1)
                        ]),
                        createVNode("div", {
                          class: "breadcrumb__menu wow fadeIn animated",
                          "data-wow-delay": ".5s"
                        }, [
                          createVNode("nav", null, [
                            createVNode("ul", null, [
                              createVNode("li", null, [
                                createVNode("span", null, [
                                  createVNode(unref(Link), {
                                    href: getHomeUrl()
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(trans("Home")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
                                ])
                              ]),
                              createVNode("li", { class: "active" }, [
                                createVNode("span", null, toDisplayString(trans("500 Error")), 1)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "error section-space" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row" }, [
                    createVNode("div", { class: "col-12" }, [
                      createVNode("div", { class: "error__content" }, [
                        createVNode("div", { class: "section__title-wrapper text-center" }, [
                          createVNode("h3", {
                            class: "section__title mb-15 mb-xs-10 wow fadeIn animated",
                            "data-wow-delay": ".3s"
                          }, toDisplayString(trans("Internal Server Error")), 1),
                          createVNode("p", {
                            class: "mb-40 mb-sm-25 mb-xs-20 wow fadeIn animated",
                            "data-wow-delay": ".5s"
                          }, toDisplayString(trans("We're sorry, but something went wrong on our end. Please try again later or contact support if the problem persists.")), 1),
                          isNonProduction.value && (((_j = (_i = unref(page)) == null ? void 0 : _i.props) == null ? void 0 : _j.error) || ((_l = (_k = unref(page)) == null ? void 0 : _k.props) == null ? void 0 : _l.trace)) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "alert alert-danger text-start mb-40",
                            style: { "white-space": "pre-wrap", "word-break": "break-word" }
                          }, [
                            createVNode("strong", null, "Debug Error:"),
                            ((_n = (_m = unref(page)) == null ? void 0 : _m.props) == null ? void 0 : _n.error) ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(unref(page).props.error), 1)) : createCommentVNode("", true),
                            ((_p = (_o = unref(page)) == null ? void 0 : _o.props) == null ? void 0 : _p.trace) ? (openBlock(), createBlock("details", {
                              key: 1,
                              class: "mt-3"
                            }, [
                              createVNode("summary", null, "Stack trace"),
                              createVNode("pre", { class: "mt-2" }, toDisplayString(unref(page).props.trace), 1)
                            ])) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "error-btn-wrap" }, [
                            createVNode(unref(Link), {
                              href: getHomeUrl(),
                              class: "error-btn wow fadeIn animated",
                              "data-wow-delay": ".7s"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trans("Back To Home Page")), 1)
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Error500.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Error500 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85422890"]]);
const __vite_glob_1_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Error500
}, Symbol.toStringTag, { value: "Module" }));
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const modules = name.split("::");
      if (modules.length > 1) {
        return resolvePageComponent(
          `../../Modules/${modules[0]}/resources/assets/js/Pages/${modules[1]}.vue`,
          /* @__PURE__ */ Object.assign({
            "../../Modules/Base/resources/assets/js/Pages/AboutUs.vue": __vite_glob_0_0,
            "../../Modules/Base/resources/assets/js/Pages/Index.vue": __vite_glob_0_1,
            "../../Modules/Cart/resources/assets/js/Pages/CartIndex.vue": __vite_glob_0_2,
            "../../Modules/Shop/resources/assets/js/Pages/ShopIndex.vue": __vite_glob_0_3,
            "../../Modules/Shop/resources/assets/js/Pages/ShopShow.vue": __vite_glob_0_4,
            "../../Modules/Support/resources/assets/js/Pages/Index.vue": __vite_glob_0_5,
            "../../Modules/User/resources/assets/js/Pages/Auth/ForgotPassword.vue": __vite_glob_0_6,
            "../../Modules/User/resources/assets/js/Pages/Auth/Login.vue": __vite_glob_0_7,
            "../../Modules/User/resources/assets/js/Pages/Auth/Register.vue": __vite_glob_0_8,
            "../../Modules/User/resources/assets/js/Pages/Auth/ResetPassword.vue": __vite_glob_0_9
          })
        );
      }
      return resolvePageComponent(
        `./Pages/${name}.vue`,
        /* @__PURE__ */ Object.assign({ "./Pages/Error404.vue": __vite_glob_1_0, "./Pages/Error500.vue": __vite_glob_1_1 })
      );
    },
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => h(App, props)
      }).use(plugin);
    }
  })
);
