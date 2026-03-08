// jest.setup.js
import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'node:util';

global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;

function createMemoryStorage() {
  const store = new Map();

  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    key(index) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key) {
      store.delete(key);
    },
    setItem(key, value) {
      store.set(String(key), String(value));
    },
  };
}

if (typeof window === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    writable: true,
    value: createMemoryStorage(),
  });

  Object.defineProperty(globalThis, 'sessionStorage', {
    configurable: true,
    writable: true,
    value: createMemoryStorage(),
  });
}

// Polyfill for Next.js server globals
global.Request = class Request {
  constructor(input, init) {
    this.url = typeof input === 'string' ? input : input.url;
    this.method = (init && init.method) || 'GET';
    this.headers = new Headers(init && init.headers);
    this.body = (init && init.body) || null;
  }
  async json() { return JSON.parse(this.body); }
  async text() { return String(this.body); }
};

global.Response = class Response {
  constructor(body, init) {
    this.body = body || null;
    this.status = (init && init.status) || 200;
    this.statusText = (init && init.statusText) || '';
    this.headers = new Headers(init && init.headers);
  }
  async json() { return JSON.parse(this.body); }
  async text() { return String(this.body); }
  static json(data, init) {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init && init.headers) },
    });
  }
};

global.Headers = global.Headers || class Headers {
  constructor(init) {
    this.headers = new Map();
    if (init) {
      if (Array.isArray(init)) {
        init.forEach(([key, value]) => this.headers.set(key, value));
      } else if (typeof init === 'object') {
        Object.entries(init).forEach(([key, value]) => this.headers.set(key, value));
      }
    }
  }
  get(name) { return this.headers.get(name) || null; }
  set(name, value) { this.headers.set(name, value); }
  has(name) { return this.headers.has(name); }
  delete(name) { this.headers.delete(name); }
  forEach(callback) {
    this.headers.forEach((value, key) => callback(value, key));
  }
  entries() { return this.headers.entries(); }
  keys() { return this.headers.keys(); }
  values() { return this.headers.values(); }
  [Symbol.iterator]() { return this.headers.entries(); }
};
