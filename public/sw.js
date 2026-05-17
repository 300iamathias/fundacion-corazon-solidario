/// <reference lib="webworker" />

const CACHE_NAME = 'sembrando-esperanzas-v2'
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/logo.png',
  '/images/hero.jpg',
  '/images/medicine.jpg',
  '/images/gifts.jpg',
  '/images/community.jpg',
  '/images/volunteers.jpg',
  '/images/workshop.jpg',
  '/images/clown.jpg',
  '/images/cta.jpg',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name)
            return caches.delete(name)
          })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  if (event.request.url.includes('/api/')) return

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone()
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone)
              })
            }
            return networkResponse
          })
          .catch(() => cachedResponse)

        return cachedResponse
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse
          }
          const responseClone = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
          return networkResponse
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/')
          }
          return new Response('Offline', { status: 503 })
        })
    })
  )
})
