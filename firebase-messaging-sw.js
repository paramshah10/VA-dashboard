//  importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-app.js')

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../public/firebase-messaging-sw.js')
//   .then(function(registration) {
//     console.log('FMS Registration successful, scope is:', registration.scope);
//   }).catch(function(err) {
//     console.log('Service worker registration failed, error:', err);
//   });
// }

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/init.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBd7KiM7D2q22t3AF5ZJd14dRgNtxUFynQ",
  authDomain: "chat-app-demo-88083.firebaseapp.com",
  databaseURL: "https://chat-app-demo-88083.firebaseio.com",
  projectId: "chat-app-demo-88083",
  storageBucket: "chat-app-demo-88083.appspot.com",
  messagingSenderId: "156783601000",
  appId: "1:156783601000:web:c37c752214b3949c7f62dd",
  measurementId: "G-ZYT0ZF0ZMN"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();