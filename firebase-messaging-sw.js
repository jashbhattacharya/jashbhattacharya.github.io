importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCW_u0QsqhhOdC_eHfbBMDOgUPDwv-J3w8",
  authDomain: "life-tracker-2da80.firebaseapp.com",
  databaseURL: "https://life-tracker-2da80-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "life-tracker-2da80",
  storageBucket: "life-tracker-2da80.firebasestorage.app",
  messagingSenderId: "1059030327669",
  appId: "1:1059030327669:web:74f193ddf2decd14acf33c"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/life-tracker/icon.png',
    badge: '/life-tracker/icon.png',
    vibrate: [200, 100, 200],
    tag: 'life-tracker-reminder',
    renotify: true,
    actions: [{ action: 'open', title: 'Open Tracker' }]
  });
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://jashbhattacharya.github.io/life-tracker')
  );
});
