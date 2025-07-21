const CACHE_NAME = 'travel-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/routes.html',
  '/feedback.html',
  '/todo.html',
  '/images/baikal.jpg',
  '/images/altai.jpg',
  '/images/kamchatka.jpg',
  '/images/elbrus.jpg',
  '/images/golden-ring.jpg',
  '/images/peterhof.jpg'
];

// Установка Service Worker и кэширование ресурсов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Перехват запросов и возврат из кэша (если есть)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});