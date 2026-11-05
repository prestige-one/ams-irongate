import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/components/entrance-motion.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

function setup({ reduced = false, height = 900 } = {}) {
  let callback, options, cleanup, observer;
  const mediaListeners = new Map();
  const documentListeners = new Map();
  const preference = { matches: reduced, addEventListener: (name, fn) => mediaListeners.set(name, fn), removeEventListener: name => mediaListeners.delete(name) };
  class Element {
    dataset = { amsReveal: 'up', amsDelay: '140' };
    calls = [];
    contains(node) { return node === this; }
    animate(frames, timing) {
      const animation = { cancelled: false, cancel() { this.cancelled = true; this.oncancel?.(); } };
      this.calls.push({ frames, timing, animation });
      return animation;
    }
  }
  const target = new Element();
  class Observer {
    observed = new Set();
    constructor(fn, config) { callback = fn; options = config; observer = this; }
    observe(element) { this.observed.add(element); }
    unobserve(element) { this.observed.delete(element); }
    disconnect() { this.observed.clear(); }
  }
  const context = {
    exports: {},
    require: () => ({ useEffect: effect => { cleanup = effect(); } }),
    Element, Node: Element, IntersectionObserver: Observer,
    window: { innerHeight: height, IntersectionObserver: Observer, matchMedia: query => query.includes('reduced') ? preference : { matches: height < 700 } },
    document: { querySelectorAll: () => [target], addEventListener: (name, fn) => documentListeners.set(name, fn), removeEventListener: name => documentListeners.delete(name) },
  };
  vm.runInNewContext(compiled, context);
  context.exports.EntranceMotion();
  return {
    target, options, observer, cleanup, preference,
    enter(ratio, elementHeight = 400) {
      callback([{ target, isIntersecting: ratio > 0, intersectionRatio: ratio, boundingClientRect: { height: elementHeight }, rootBounds: { height: height * .8 } }]);
    },
    reduce() { preference.matches = true; mediaListeners.get('change')?.(); },
    focus() { documentListeners.get('focusin')?.({ target }); },
  };
}

test('a sliver entering the viewport does not start or consume the reveal', () => {
  const page = setup();
  page.enter(.12);
  assert.equal(page.target.calls.length, 0);
  assert.equal(page.target.dataset.amsRevealed, 'pending');
  assert.ok(page.observer.observed.has(page.target));
  assert.equal(page.options.rootMargin, '0px 0px -180px 0px');
  page.enter(.45);
  assert.equal(page.target.calls.length, 1);
  assert.equal(page.target.calls[0].timing.duration, 1300);
  assert.ok(page.target.calls[0].timing.delay >= 160);
  page.enter(.8);
  assert.equal(page.target.calls.length, 1, 'scrolling back must not replay');
  page.cleanup();
});

test('tall cards can reveal on a short mobile viewport', () => {
  const page = setup({ height: 400 });
  page.enter(.12, 1000);
  assert.equal(page.target.calls.length, 0);
  page.enter(.15, 1000);
  assert.equal(page.target.calls.length, 1);
  page.cleanup();
});

test('reduced motion and keyboard focus expose pending content immediately', () => {
  const reduced = setup({ reduced: true });
  assert.equal(reduced.target.dataset.amsRevealed, undefined);
  assert.equal(reduced.target.calls.length, 0);
  const keyboard = setup();
  keyboard.focus();
  assert.equal(keyboard.target.dataset.amsRevealed, 'true');
  assert.equal(keyboard.observer.observed.size, 0);
  keyboard.cleanup();
  const toggled = setup();
  toggled.reduce();
  assert.equal(toggled.target.dataset.amsRevealed, 'true');
  assert.equal(toggled.observer.observed.size, 0);
  toggled.cleanup();
});

test('cleanup cancels running motion and releases observed elements', () => {
  const page = setup();
  page.enter(.5);
  page.cleanup();
  assert.equal(page.target.calls[0].animation.cancelled, true);
  assert.equal(page.observer.observed.size, 0);
});
