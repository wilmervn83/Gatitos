// Define un nombre para la caché actual.
const CACHE_NAME = 'gatitos-pwa-cache-v1';

// Lista de archivos que se deben cachear para que la app funcione offline.
// Como tu juego está en un solo archivo, solo necesitamos cachear la página principal.
const URLS_TO_CACHE = [
  '/', // Representa la raíz del sitio, o el archivo index.html
  'index.html' // Es buena idea incluirlo explícitamente también
];

// Evento 'install': se dispara cuando el Service Worker se instala por primera vez.
self.addEventListener('install', (event) => {
  // Esperamos hasta que la promesa de 'waitUntil' se resuelva.
  event.waitUntil(
    // Abrimos la caché que definimos.
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caché abierta');
        // Agregamos todos los archivos de nuestra lista a la caché.
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la página realiza una petición de red (ej. cargar una imagen, un script, etc.).
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Buscamos si la petición ya existe en nuestra caché.
    caches.match(event.request)
      .then((response) => {
        // Si encontramos una respuesta en la caché, la devolvemos.
        if (response) {
          return response;
        }
        // Si no está en la caché, la pedimos a la red.
        return fetch(event.request);
      })
  );
});