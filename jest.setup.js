// jest.setup.js
import '@testing-library/jest-dom';

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
