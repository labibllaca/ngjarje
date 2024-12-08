const CACHE_NAME = 'dita-lab-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'daily-notification') {
    event.waitUntil(sendDailyNotification());
  }
});

// Handle notification scheduling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    scheduleNotification();
  }
});

async function sendDailyNotification() {
  const cached = await caches.match('/');
  if (cached) {
    const cache = await caches.open(CACHE_NAME);
    const data = await cache.match('historical-events-cache');
    if (data) {
      const events = await data.json();
      const today = new Date();
      const dateKey = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const event = events[dateKey];
      
      if (event) {
        self.registration.showNotification('Today in History', {
          body: event,
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          tag: 'daily-event'
        });
      }
    }
  }
}

function scheduleNotification() {
  const now = new Date();
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    12, // 12:00
    0,
    0
  );

  if (now > targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const delay = targetTime.getTime() - now.getTime();

  setTimeout(() => {
    sendDailyNotification();
    scheduleNotification(); // Schedule next day's notification
  }, delay);
}