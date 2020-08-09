
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.22.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function logMountAndDestroy(componentName) {
      onMount(() => {
        console.log(`${componentName} mounted`);
      });

      onDestroy(() => {
        console.log(`${componentName} destroyed`);
      });
    }

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max)
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe,
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity }) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    const initialSlidesState = { current: 1, previous: 1 };

    const slidesNav = writable(initialSlidesState);

    const currentSlideReadOnly = derived(slidesNav, ($x) => $x.current);

    const slideTransition = derived(slidesNav, ($state) => {
      // console.log(`in trans: curr1: ${$state.current} | prev1: ${$state.previous}`)

      if ($state.current === $state.previous + 1) return 'next'
      else if ($state.current === $state.previous - 1) return 'previous'
      else return 'jump'
    });

    /* src\slides\SlideContainer.svelte generated by Svelte v3.22.2 */
    const file = "src\\slides\\SlideContainer.svelte";

    // (28:8) Slide Container
    function fallback_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Slide Container");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(28:8) Slide Container",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div;
    	let div_intro;
    	let div_outro;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(div, "class", "slide svelte-xgm9xk");
    			add_location(div, file, 23, 0, 700);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[3], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null));
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);

    				if (!div_intro) div_intro = create_in_transition(div, fly, {
    					x: /*flyX*/ ctx[0],
    					y: /*flyY*/ ctx[1],
    					delay: duration,
    					duration
    				});

    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { duration });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const defaultFlyInX = 1000;
    const defaultFlyInY = 0;
    const jumpFlyInX = 0;
    const jumpFlyInY = 1000;
    const duration = 300;

    function calculateFlyInValues(transition) {
    	if (transition === "next") return [+defaultFlyInX, defaultFlyInY]; else if (transition === "previous") return [-defaultFlyInX, defaultFlyInY]; else if (transition === "jump") return [jumpFlyInX, jumpFlyInY];
    }

    function instance($$self, $$props, $$invalidate) {
    	let $slideTransition;
    	validate_store(slideTransition, "slideTransition");
    	component_subscribe($$self, slideTransition, $$value => $$invalidate(2, $slideTransition = $$value));
    	let [flyX, flyY] = calculateFlyInValues($slideTransition);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SlideContainer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("SlideContainer", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		fly,
    		fade,
    		slideTransition,
    		defaultFlyInX,
    		defaultFlyInY,
    		jumpFlyInX,
    		jumpFlyInY,
    		duration,
    		calculateFlyInValues,
    		flyX,
    		flyY,
    		$slideTransition
    	});

    	$$self.$inject_state = $$props => {
    		if ("flyX" in $$props) $$invalidate(0, flyX = $$props.flyX);
    		if ("flyY" in $$props) $$invalidate(1, flyY = $$props.flyY);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [flyX, flyY, $slideTransition, $$scope, $$slots];
    }

    class SlideContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SlideContainer",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src\slides\Slide1.svelte generated by Svelte v3.22.2 */
    const file$1 = "src\\slides\\Slide1.svelte";

    // (9:0) <SlideContainer>
    function create_default_slot(ctx) {
    	let h1;
    	let t1;
    	let footer;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "This is my first slide!";
    			t1 = space();
    			footer = element("footer");
    			footer.textContent = "Test";
    			attr_dev(h1, "class", "svelte-def3dr");
    			add_location(h1, file$1, 9, 2, 233);
    			add_location(footer, file$1, 11, 2, 271);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, footer, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(9:0) <SlideContainer>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let current;

    	const slidecontainer = new SlideContainer({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(slidecontainer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(slidecontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const slidecontainer_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				slidecontainer_changes.$$scope = { dirty, ctx };
    			}

    			slidecontainer.$set(slidecontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slidecontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slidecontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(slidecontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	logMountAndDestroy("Slide 1");
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Slide1> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Slide1", $$slots, []);

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		logMountAndDestroy,
    		SlideContainer
    	});

    	return [];
    }

    class Slide1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide1",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\slides\Slide2.svelte generated by Svelte v3.22.2 */
    const file$2 = "src\\slides\\Slide2.svelte";

    // (9:0) <SlideContainer>
    function create_default_slot$1(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "This is my second slide!";
    			attr_dev(h1, "class", "svelte-1gl7as9");
    			add_location(h1, file$2, 9, 2, 233);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(9:0) <SlideContainer>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let current;

    	const slidecontainer = new SlideContainer({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(slidecontainer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(slidecontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const slidecontainer_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				slidecontainer_changes.$$scope = { dirty, ctx };
    			}

    			slidecontainer.$set(slidecontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slidecontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slidecontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(slidecontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	logMountAndDestroy("Slide 2");
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Slide2> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Slide2", $$slots, []);

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		logMountAndDestroy,
    		SlideContainer
    	});

    	return [];
    }

    class Slide2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide2",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\slides\Slide3.svelte generated by Svelte v3.22.2 */
    const file$3 = "src\\slides\\Slide3.svelte";

    // (9:0) <SlideContainer>
    function create_default_slot$2(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "This is my third slide!";
    			attr_dev(h1, "class", "svelte-14arz56");
    			add_location(h1, file$3, 9, 2, 233);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(9:0) <SlideContainer>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let current;

    	const slidecontainer = new SlideContainer({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(slidecontainer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(slidecontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const slidecontainer_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				slidecontainer_changes.$$scope = { dirty, ctx };
    			}

    			slidecontainer.$set(slidecontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slidecontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slidecontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(slidecontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	logMountAndDestroy("Slide 3");
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Slide3> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Slide3", $$slots, []);

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		logMountAndDestroy,
    		SlideContainer
    	});

    	return [];
    }

    class Slide3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide3",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\slides\Slide4.svelte generated by Svelte v3.22.2 */

    function create_fragment$4(ctx) {
    	let current;
    	const slidecontainer = new SlideContainer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(slidecontainer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(slidecontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const slidecontainer_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				slidecontainer_changes.$$scope = { dirty, ctx };
    			}

    			slidecontainer.$set(slidecontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(slidecontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(slidecontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(slidecontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Slide4> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Slide4", $$slots, []);
    	$$self.$capture_state = () => ({ SlideContainer });
    	return [];
    }

    class Slide4 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slide4",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const slides = readable([
      { index: 1, description: 'Slide 1', slide: Slide1 },
      { index: 2, description: 'Slide 2', slide: Slide2 },
      { index: 3, description: 'Slide 3', slide: Slide3 },
      { index: 4, description: 'Slide 4', slide: Slide4 },
      { index: 5, description: 'Slide 1', slide: Slide1 },
      { index: 6, description: 'Slide 2', slide: Slide2 },
      { index: 7, description: 'Slide 3', slide: Slide3 },
      { index: 8, description: 'Slide 4', slide: Slide4 },
      { index: 9, description: 'Slide 1', slide: Slide1 },
      { index: 10, description: 'Slide 2', slide: Slide2 },
      { index: 11, description: 'Slide 3', slide: Slide3 },
      { index: 12, description: 'Slide 4', slide: Slide4 },
      { index: 13, description: 'Slide 1', slide: Slide1 },
      { index: 14, description: 'Slide 2', slide: Slide2 },
      { index: 15, description: 'Slide 3', slide: Slide3 },
      { index: 16, description: 'Slide 4', slide: Slide4 },
      { index: 17, description: 'Slide 1', slide: Slide1 },
      { index: 18, description: 'Slide 2', slide: Slide2 },
      { index: 19, description: 'Slide 3', slide: Slide3 },
      { index: 20, description: 'Slide 4', slide: Slide4 },
      { index: 21, description: 'Slide 1', slide: Slide1 },
      { index: 22, description: 'Slide 2', slide: Slide2 },
      { index: 23, description: 'Slide 3', slide: Slide3 },
      { index: 24, description: 'Slide 4', slide: Slide4 },
      { index: 25, description: 'Slide 1', slide: Slide1 },
    ]);

    /* src\Minislide.svelte generated by Svelte v3.22.2 */
    const file$4 = "src\\Minislide.svelte";

    function create_fragment$5(ctx) {
    	let button;
    	let div;
    	let t_value = /*slideInfo*/ ctx[0].index + "";
    	let t;
    	let button_class_value;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "tooltip");
    			add_location(div, file$4, 12, 2, 363);

    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(/*$currentSlideReadOnly*/ ctx[1] !== /*slideInfo*/ ctx[0].index
    			? "square"
    			: "square selected") + " svelte-pk4nat"));

    			add_location(button, file$4, 9, 0, 206);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div);
    			append_dev(div, t);
    			if (remount) dispose();
    			dispose = listen_dev(button, "click", /*click_handler*/ ctx[3], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*slideInfo*/ 1 && t_value !== (t_value = /*slideInfo*/ ctx[0].index + "")) set_data_dev(t, t_value);

    			if (dirty & /*$currentSlideReadOnly, slideInfo*/ 3 && button_class_value !== (button_class_value = "" + (null_to_empty(/*$currentSlideReadOnly*/ ctx[1] !== /*slideInfo*/ ctx[0].index
    			? "square"
    			: "square selected") + " svelte-pk4nat"))) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $currentSlideReadOnly;
    	validate_store(currentSlideReadOnly, "currentSlideReadOnly");
    	component_subscribe($$self, currentSlideReadOnly, $$value => $$invalidate(1, $currentSlideReadOnly = $$value));
    	let { slideInfo } = $$props;
    	const dispatch = createEventDispatcher();
    	const writable_props = ["slideInfo"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Minislide> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Minislide", $$slots, []);
    	const click_handler = () => dispatch("minislideSelected", slideInfo);

    	$$self.$set = $$props => {
    		if ("slideInfo" in $$props) $$invalidate(0, slideInfo = $$props.slideInfo);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		currentSlideReadOnly,
    		slideInfo,
    		dispatch,
    		$currentSlideReadOnly
    	});

    	$$self.$inject_state = $$props => {
    		if ("slideInfo" in $$props) $$invalidate(0, slideInfo = $$props.slideInfo);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [slideInfo, $currentSlideReadOnly, dispatch, click_handler];
    }

    class Minislide extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { slideInfo: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Minislide",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*slideInfo*/ ctx[0] === undefined && !("slideInfo" in props)) {
    			console.warn("<Minislide> was created without expected prop 'slideInfo'");
    		}
    	}

    	get slideInfo() {
    		throw new Error("<Minislide>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slideInfo(value) {
    		throw new Error("<Minislide>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Minislides.svelte generated by Svelte v3.22.2 */
    const file$5 = "src\\Minislides.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (10:2) {#each $slides as slide}
    function create_each_block(ctx) {
    	let current;

    	const minislide = new Minislide({
    			props: { slideInfo: /*slide*/ ctx[3] },
    			$$inline: true
    		});

    	minislide.$on("minislideSelected", /*minislideSelected_handler*/ ctx[2]);

    	const block = {
    		c: function create() {
    			create_component(minislide.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(minislide, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const minislide_changes = {};
    			if (dirty & /*$slides*/ 2) minislide_changes.slideInfo = /*slide*/ ctx[3];
    			minislide.$set(minislide_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(minislide.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(minislide.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(minislide, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(10:2) {#each $slides as slide}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let current;
    	let each_value = /*$slides*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "minislides svelte-1up2ubt");
    			add_location(div, file$5, 8, 0, 189);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$slides*/ 2) {
    				each_value = /*$slides*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $slides,
    		$$unsubscribe_slides = noop,
    		$$subscribe_slides = () => ($$unsubscribe_slides(), $$unsubscribe_slides = subscribe(slides, $$value => $$invalidate(1, $slides = $$value)), slides);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_slides());
    	let { slides } = $$props;
    	validate_store(slides, "slides");
    	$$subscribe_slides();
    	const writable_props = ["slides"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Minislides> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Minislides", $$slots, []);

    	function minislideSelected_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$props => {
    		if ("slides" in $$props) $$subscribe_slides($$invalidate(0, slides = $$props.slides));
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		createEventDispatcher,
    		clamp,
    		Minislide,
    		slides,
    		$slides
    	});

    	$$self.$inject_state = $$props => {
    		if ("slides" in $$props) $$subscribe_slides($$invalidate(0, slides = $$props.slides));
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [slides, $slides, minislideSelected_handler];
    }

    class Minislides extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { slides: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Minislides",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*slides*/ ctx[0] === undefined && !("slides" in props)) {
    			console.warn("<Minislides> was created without expected prop 'slides'");
    		}
    	}

    	get slides() {
    		throw new Error("<Minislides>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slides(value) {
    		throw new Error("<Minislides>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.22.2 */

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf("#/");

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: "/";

    	// Check if there's a querystring
    	const qsPosition = location.indexOf("?");

    	let querystring = "";

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener("hashchange", update, false);

    	return function stop() {
    		window.removeEventListener("hashchange", update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);

    function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != "/" && location.indexOf("#/") !== 0) {
    		throw Error("Invalid parameter location");
    	}

    	// Execute this code when the current call stack is complete
    	return tick().then(() => {
    		window.location.hash = (location.charAt(0) == "#" ? "" : "#") + location;
    	});
    }

    /* src\Navigation.svelte generated by Svelte v3.22.2 */

    const { console: console_1 } = globals;
    const file$6 = "src\\Navigation.svelte";

    function create_fragment$7(ctx) {
    	let t0;
    	let div;
    	let button0;
    	let t2;
    	let button1;
    	let t4;
    	let p;
    	let t5_value = /*$slidesNav*/ ctx[0].current + "";
    	let t5;
    	let current;
    	let dispose;
    	const minislides = new Minislides({ props: { slides }, $$inline: true });
    	minislides.$on("minislideSelected", /*handleMinislideSelected*/ ctx[2]);

    	const block = {
    		c: function create() {
    			create_component(minislides.$$.fragment);
    			t0 = space();
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "◀";
    			t2 = space();
    			button1 = element("button");
    			button1.textContent = "▶";
    			t4 = space();
    			p = element("p");
    			t5 = text(t5_value);
    			attr_dev(button0, "class", "svelte-1xo3usd");
    			toggle_class(button0, "hidden", /*$slidesNav*/ ctx[0].current <= 1);
    			add_location(button0, file$6, 81, 2, 2479);
    			attr_dev(button1, "class", "svelte-1xo3usd");
    			toggle_class(button1, "hidden", /*$slidesNav*/ ctx[0].current >= /*totalSlides*/ ctx[3]);
    			add_location(button1, file$6, 86, 2, 2598);
    			attr_dev(p, "class", "svelte-1xo3usd");
    			add_location(p, file$6, 91, 2, 2726);
    			attr_dev(div, "class", "svelte-1xo3usd");
    			add_location(div, file$6, 80, 0, 2470);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			mount_component(minislides, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(div, t2);
    			append_dev(div, button1);
    			append_dev(div, t4);
    			append_dev(div, p);
    			append_dev(p, t5);
    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(button0, "click", /*click_handler*/ ctx[10], false, false, false),
    				listen_dev(button1, "click", /*click_handler_1*/ ctx[11], false, false, false)
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$slidesNav*/ 1) {
    				toggle_class(button0, "hidden", /*$slidesNav*/ ctx[0].current <= 1);
    			}

    			if (dirty & /*$slidesNav, totalSlides*/ 9) {
    				toggle_class(button1, "hidden", /*$slidesNav*/ ctx[0].current >= /*totalSlides*/ ctx[3]);
    			}

    			if ((!current || dirty & /*$slidesNav*/ 1) && t5_value !== (t5_value = /*$slidesNav*/ ctx[0].current + "")) set_data_dev(t5, t5_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(minislides.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(minislides.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(minislides, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $slides;
    	let $slidesNav;
    	let $location;
    	validate_store(slides, "slides");
    	component_subscribe($$self, slides, $$value => $$invalidate(5, $slides = $$value));
    	validate_store(slidesNav, "slidesNav");
    	component_subscribe($$self, slidesNav, $$value => $$invalidate(0, $slidesNav = $$value));
    	validate_store(location, "location");
    	component_subscribe($$self, location, $$value => $$invalidate(6, $location = $$value));

    	function dispatchSlideChanged(newSlideNumber, refreshUrlRequired) {
    		console.log(`dispatchSlideChanged ${newSlideNumber}`);
    		let slide = $slides[newSlideNumber - 1].slide;

    		dispatch("slideChanged", {
    			slideIndex: newSlideNumber,
    			slide,
    			refreshUrlRequired
    		});
    	}

    	function sameAsCurrent(index) {
    		return $slidesNav.current === index;
    	}

    	function applySlideOffset(offset) {
    		slidesNav.set({
    			current: clamp($slidesNav.current + offset, 1, totalSlides),
    			previous: $slidesNav.current
    		});

    		dispatchSlideChanged($slidesNav.current, true);
    	}

    	function handleMinislideSelected(event) {
    		if (!sameAsCurrent(event.detail.index)) {
    			slidesNav.set({
    				current: clamp(event.detail.index, 1, totalSlides),
    				previous: $slidesNav.current
    			});

    			dispatchSlideChanged($slidesNav.current, true);
    		}
    	}

    	// logic
    	const dispatch = createEventDispatcher();

    	let totalSlides = $slides.length;
    	let unsub;

    	onMount(() => {
    		unsub = location.subscribe(x => {
    			let slideIndex = parseInt($location.split("/").slice(-1)[0]);

    			if (!sameAsCurrent(slideIndex)) {
    				// Here notice we pass 'dispatchSlideChanged(newCurrent, false)'
    				// instead of          'dispatchSlideChanged($slidesNav.current, true)'
    				// it looks like the update via slidesNav.set(...) is not immediately reflected
    				// and we can't use the new value of slidesNav.current for dispatchSlideChanged(...)
    				console.log(`slidesNav.current before: ${$slidesNav.current}`);

    				let newCurrent = clamp(slideIndex, 1, totalSlides);
    				console.log(`new current = ${newCurrent}`);

    				slidesNav.set({
    					current: newCurrent,
    					previous: $slidesNav.current
    				});

    				console.log(`slidesNav.current after: ${$slidesNav.current}`);
    				dispatchSlideChanged(newCurrent, false);
    			}
    		});

    		// load initial page
    		dispatchSlideChanged(1, true);
    	});

    	onDestroy(unsub);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Navigation> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Navigation", $$slots, []);
    	const click_handler = () => applySlideOffset(-1);
    	const click_handler_1 = () => applySlideOffset(1);

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		createEventDispatcher,
    		clamp,
    		slides,
    		slidesNav,
    		Minislides,
    		location,
    		dispatchSlideChanged,
    		sameAsCurrent,
    		applySlideOffset,
    		handleMinislideSelected,
    		dispatch,
    		totalSlides,
    		unsub,
    		$slides,
    		$slidesNav,
    		$location
    	});

    	$$self.$inject_state = $$props => {
    		if ("totalSlides" in $$props) $$invalidate(3, totalSlides = $$props.totalSlides);
    		if ("unsub" in $$props) unsub = $$props.unsub;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		$slidesNav,
    		applySlideOffset,
    		handleMinislideSelected,
    		totalSlides,
    		unsub,
    		$slides,
    		$location,
    		dispatchSlideChanged,
    		sameAsCurrent,
    		dispatch,
    		click_handler,
    		click_handler_1
    	];
    }

    class Navigation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navigation",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.22.2 */
    const file$7 = "src\\App.svelte";

    function create_fragment$8(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let current;
    	var switch_value = /*currentSlide*/ ctx[0];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	const navigation = new Navigation({ $$inline: true });
    	navigation.$on("slideChanged", /*handleSlideChanged*/ ctx[1]);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t = space();
    			div1 = element("div");
    			create_component(navigation.$$.fragment);
    			attr_dev(div0, "class", "slide svelte-3ifll5");
    			add_location(div0, file$7, 15, 2, 343);
    			attr_dev(div1, "class", "navigation svelte-3ifll5");
    			add_location(div1, file$7, 19, 2, 420);
    			attr_dev(div2, "class", "main svelte-3ifll5");
    			add_location(div2, file$7, 14, 0, 322);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);

    			if (switch_instance) {
    				mount_component(switch_instance, div0, null);
    			}

    			append_dev(div2, t);
    			append_dev(div2, div1);
    			mount_component(navigation, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (switch_value !== (switch_value = /*currentSlide*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div0, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			transition_in(navigation.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(navigation.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (switch_instance) destroy_component(switch_instance);
    			destroy_component(navigation);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let currentSlide = undefined;

    	function handleSlideChanged(event) {
    		$$invalidate(0, currentSlide = event.detail.slide);

    		if (event.detail.refreshUrlRequired) {
    			push(`/slides/${event.detail.slideIndex}`);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		Navigation,
    		push,
    		currentSlide,
    		handleSlideChanged
    	});

    	$$self.$inject_state = $$props => {
    		if ("currentSlide" in $$props) $$invalidate(0, currentSlide = $$props.currentSlide);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [currentSlide, handleSlideChanged];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {
        // name: 'world 2',
      },
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
