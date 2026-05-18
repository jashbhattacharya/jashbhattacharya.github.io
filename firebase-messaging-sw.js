importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const CACHE = 'life-tracker-v1';
const URLS  = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];

// Cache on install
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Network first, cache fallback
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// Firebase messaging
firebase.initializeApp({
  apiKey: "AIzaSyCW_u0QsqhhOdC_eHfbBMDOgUPDwv-J3w8",
  authDomain: "life-tracker-2da80.firebaseapp.com",
  databaseURL: "https://-2da80-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "life-tracker-2da80",
  storageBucket: "life-tracker-2da80.firebasestorage.app",
  messagingSenderId: "1059030327669",
  appId: "1:1059030327669:web:74f193ddf2decd14acf33c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'life-tracker',
    renotify: true,
    actions: [{ action: 'open', title: 'Open Tracker' }]
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('https://jashbhattacharya.github.io/'));
});
