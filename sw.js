// Tatoosh Marine — Service Worker
// Strategy: cache the app shell so it opens offline, network-first for data
// so when online you always see fresh buoy/tide/forecast data.

const CACHE = 'tatoosh-shell-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL).catch(()=>{}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Live data endpoints — network first, fall back to cached copy
  const isLiveData =
    url.hostname.includes('ndbc.noaa.gov') ||
    url.hostname.includes('api.weather.gov') ||
    url.hostname.includes('tidesandcurrents.noaa.gov') ||
    url.hostname.includes('corsproxy.io');

  if (isLiveData) {
    e.respondWith(
      fetch(e.request).then((r) => {
        const copy = r.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(()=>{});
        return r;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  // Shell — cache first
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
