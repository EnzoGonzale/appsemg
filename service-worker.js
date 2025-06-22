// service-worker.js

self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');
    self.skipWaiting(); // Forzar la activación del nuevo SW
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activado');
    event.waitUntil(clients.claim()); // Tomar control de las páginas abiertas

    // Al activarse, intentamos enviar la notificación de 6 AM si es hora y no se ha enviado hoy
    scheduleAndSendNotifications();
});

// Escuchar mensajes de la página principal (si la app está abierta)
self.addEventListener('message', (event) => {
    if (event.data === 'CHECK_NOTIFICATIONS') {
        console.log('Service Worker: Mensaje recibido para verificar notificaciones.');
        scheduleAndSendNotifications();
    }
});

// Función principal para verificar y enviar notificaciones
async function scheduleAndSendNotifications() {
    const now = new Date();
    const currentHour = now.getHours();
    const todayDate = now.toDateString(); // "Mon Jun 22 2025"

    // Usaremos localStorage del Service Worker para guardar el estado
    // (¡OJO! Esto es el localStorage propio del Service Worker, no el de la página principal)
    const lastNotified6AM = await getFromSWStorage('lastNotified6AM');
    const lastNotified23PM = await getFromSWStorage('lastNotified23PM');

    // --- Notificación de las 6 AM ---
    // Si la hora actual es >= 6 AM Y < 11 PM (para no solapar con la de la noche)
    // Y no hemos enviado la notificación de 6 AM hoy
    if (currentHour >= 6 && currentHour < 23 && lastNotified6AM !== todayDate) {
        console.log('Service Worker: Intentando enviar notificación de 6 AM');
        try {
            await self.registration.showNotification('¡Hora de empezar tu día!', {
                body: 'Son las 6 AM. Dedica tiempo a tu "Hora Mágica" para crecimiento personal y planificación.',
                icon: '/icons/icon-192x192.png', // Asegúrate de tener este icono
                tag: 'mpe-6am-notification',
                renotify: false, // No renotificar si ya existe una con el mismo tag
                data: {
                    url: '/' // O una URL específica de la app
                }
            });
            await saveToSWStorage('lastNotified6AM', todayDate);
            console.log('Notificación de 6 AM enviada y registrada.');
        } catch (error) {
            console.error('Error al mostrar notificación de 6 AM:', error);
        }
    }

    // --- Notificación de las 23 PM ---
    // Si la hora actual es >= 11 PM Y no hemos enviado la notificación de 23 PM hoy
    if (currentHour >= 23 && lastNotified23PM !== todayDate) {
        console.log('Service Worker: Intentando enviar notificación de 23 PM');
        try {
            await self.registration.showNotification('¡Momento de Reflexión MPE!', {
                body: 'Son las 11 PM. Es hora de tu Diario del Día y planificación para mañana.',
                icon: '/icons/icon-192x192.png', // Asegúrate de tener este icono
                tag: 'mpe-23pm-notification',
                renotify: false,
                data: {
                    url: '/'
                }
            });
            await saveToSWStorage('lastNotified23PM', todayDate);
            console.log('Notificación de 23 PM enviada y registrada.');
        } catch (error) {
            console.error('Error al mostrar notificación de 23 PM:', error);
        }
    }
}

// --- Funciones auxiliares para almacenamiento en Service Worker ---
// Aunque se puede usar IndexedDB para mayor robustez, para este caso simple,
// podemos simularlo con localStorage dentro del Service Worker directamente.
// NOTA: El localStorage del Service Worker es diferente al de la página principal.
// Para IndexedDB, usarías la librería 'idb-keyval' o similar.

async function saveToSWStorage(key, value) {
    return new Promise(resolve => {
        // En un Service Worker, no hay localStorage directamente en 'self'.
        // Se usaría IndexedDB. Para este ejemplo simplificado, lo haremos en un mapa in-memory
        // o si es posible, a través de una API de almacenamiento específica del SW si existiera
        // (que generalmente es IndexedDB).
        // Aquí simulamos un almacenamiento persistente muy básico para el ejemplo.
        // En producción, usarías 'idb-keyval' o la API IndexedDB directamente.
        self.indexedDB.open('MPE_SW_DB', 1).onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['settings'], 'readwrite');
            const store = transaction.objectStore('settings');
            store.put(value, key);
            resolve();
        };
    });
}

async function getFromSWStorage(key) {
    return new Promise(resolve => {
        self.indexedDB.open('MPE_SW_DB', 1).onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['settings'], 'readonly');
            const store = transaction.objectStore('settings');
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve(undefined); // Si no encuentra, devuelve undefined
        };
    });
}

// Para que IndexedDB funcione, necesitamos un 'upgradeneeded' al abrir la DB
self.addEventListener('fetch', (event) => {
    // Si necesitas caché de assets, lo harías aquí.
    // Solo para asegurar que el SW está activo y escuchando.
});

// Evento que se dispara cuando el usuario hace clic en la notificación
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Click en notificación', event);
    event.notification.close(); // Cierra la notificación

    const targetUrl = event.notification.data.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes(targetUrl) && 'focus' in client) { // Usar includes para ser más flexible
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});


// Configuración de IndexedDB para el Service Worker
self.indexedDB.open('MPE_SW_DB', 1).onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings');
    }
};

// **IMPORTANTE:** Para que esto funcione realmente sin la app abierta,
// el navegador necesita tener una razón para 'despertar' el Service Worker.
// Esto puede ser:
// 1. El usuario abre la app (página web).
// 2. Eventos como 'fetch' (si el SW maneja el cacheo de assets).
// 3. El API 'Periodic Background Sync' (experimental en algunos navegadores, y no garantiza horario exacto).
// 4. UNA NOTIFICACIÓN PUSH REAL (que es lo que haría el backend).
// Sin el punto 4, no hay garantía de que el SW se active exactamente a las 6 AM o 23 PM.
// Se activaría cuando el navegador lo considere oportuno o cuando la app principal se active.