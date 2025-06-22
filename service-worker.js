// service-worker.js (ejemplo con rutas relativas al SW)

// Define un prefijo si tu app está en una subcarpeta
const BASE_PATH = '/appsemg'; // <<-- ¡Define esto!

const CACHE_NAME = 'mpe-cache-v1'; // Un nombre de caché más específico para tu app
const urlsToCache = [
    BASE_PATH + '/', // O '/appsemg/' si quieres la raíz de tu app
    BASE_PATH + '/index.html',
    BASE_PATH + '/styles.css',
    BASE_PATH + '/custom.js',
    BASE_PATH + '/custom2.js',
    BASE_PATH + '/index.js',
    BASE_PATH + '/indexcontemp.html',
    BASE_PATH + '/c5m.png', // Tu imagen de la captura
    BASE_PATH + '/sonido.mp3', // Tu archivo de sonido
    // Asegúrate de que este icono exista en esa ruta
    BASE_PATH + '/icons/icon-192x192.png' // Si tienes una carpeta 'icons' dentro de 'appsemg'
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cacheando archivos');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // Forzar activación del nuevo SW
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activado');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Borrando caché antigua', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => clients.claim()) // Tomar control de las páginas abiertas
    );
    // Intentar enviar la notificación de 6 AM al activar el SW
    scheduleAndSendNotifications();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Escuchar mensajes de la página principal (si la app está abierta)
self.addEventListener('message', (event) => {
    if (event.data === 'CHECK_NOTIFICATIONS') {
        console.log('Service Worker: Mensaje recibido para verificar notificaciones.');
        scheduleAndSendNotifications();
    }
});

// Funciones de notificaciones (las mismas que te di, asegúrate del icono)
// Asegúrate de que el path del icono en showNotification también sea correcto
async function scheduleAndSendNotifications() {
    const now = new Date();
    const currentHour = now.getHours();
    const todayDate = now.toDateString();

    const lastNotified6AM = await getFromSWStorage('lastNotified6AM');
    const lastNotified23PM = await getFromSWStorage('lastNotified23PM');

    const iconPath = BASE_PATH + '/icons/icon-192x192.png'; // Ruta correcta para el icono

    // ... (resto de la lógica de scheduleAndSendNotifications)
    if (currentHour >= 6 && currentHour < 23 && lastNotified6AM !== todayDate) {
        await self.registration.showNotification('¡Hora de empezar tu día!', {
            body: 'Son las 6 AM. Dedica tiempo a tu "Hora Mágica" para crecimiento personal y planificación.',
            icon: iconPath,
            tag: 'mpe-6am-notification',
            renotify: false,
            data: {
                url: BASE_PATH + '/' // La URL a abrir al hacer clic
            }
        });
        await saveToSWStorage('lastNotified6AM', todayDate);
    }

    if (currentHour >= 23 && lastNotified23PM !== todayDate) {
        await self.registration.showNotification('¡Momento de Reflexión MPE!', {
            body: 'Son las 11 PM. Es hora de tu Diario del Día y planificación para mañana.',
            icon: iconPath,
            tag: 'mpe-23pm-notification',
            renotify: false,
            data: {
                url: BASE_PATH + '/' // La URL a abrir al hacer clic
            }
        });
        await saveToSWStorage('lastNotified23PM', todayDate);
    }
}

// Funciones auxiliares para almacenamiento en Service Worker (IndexedDB)
async function saveToSWStorage(key, value) {
    return new Promise(resolve => {
        const request = self.indexedDB.open('MPE_SW_DB', 1);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['settings'], 'readwrite');
            const store = transaction.objectStore('settings');
            store.put(value, key);
            transaction.oncomplete = () => resolve();
            transaction.onerror = (e) => {
                console.error("Error saving to IndexedDB:", e);
                resolve(); // Resolve even on error to not block
            };
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings');
            }
        };
        request.onerror = (e) => {
            console.error("Error opening IndexedDB:", e);
            resolve();
        };
    });
}

async function getFromSWStorage(key) {
    return new Promise(resolve => {
        const request = self.indexedDB.open('MPE_SW_DB', 1);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['settings'], 'readonly');
            const store = transaction.objectStore('settings');
            const getRequest = store.get(key);
            getRequest.onsuccess = () => resolve(getRequest.result);
            getRequest.onerror = (e) => {
                console.error("Error getting from IndexedDB:", e);
                resolve(undefined);
            };
        };
        request.onerror = (e) => {
            console.error("Error opening IndexedDB:", e);
            resolve(undefined);
        };
    });
}

// Evento que se dispara cuando el usuario hace clic en la notificación
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Click en notificación', event);
    event.notification.close();

    const targetUrl = event.notification.data.url || BASE_PATH + '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes(targetUrl) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
