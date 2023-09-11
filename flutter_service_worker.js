'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "789bdc6a401a277f3868c924911795b3",
"assets/AssetManifest.json": "fb239a3421586ee22793b5ef99a20327",
"assets/assets/icons/airplane.json": "42dcd6e042cd0a03df8d7cfe41874a43",
"assets/assets/icons/behance.svg": "640d32b3886f5b1699c1e6e0b66d09f1",
"assets/assets/icons/behance_d.svg": "2345799208a8ced34cf3efb18b8b6e58",
"assets/assets/icons/csharp_w.svg": "62f7694d5c2840d38c5e7672f50b5704",
"assets/assets/icons/dart_w.svg": "81bb7819d63b650df57ab2464fd39112",
"assets/assets/icons/dribbble.svg": "5571fce5fac932eca3b695a09077fa89",
"assets/assets/icons/dribbble_d.svg": "1a262077ab3c6858c2c2e157d053d9f0",
"assets/assets/icons/facebook.svg": "fbe5951f311776a1ba4bbc0147211c1c",
"assets/assets/icons/facebook_d.svg": "eb22ec51af6b4c1213998a1518b4090e",
"assets/assets/icons/figma_w.svg": "2f2a796c269d9662fdfcabc0b1758d0d",
"assets/assets/icons/firebase_w.svg": "0cb226f6b85eb6bfef8dc79b287a1d67",
"assets/assets/icons/flutter_w.svg": "9b0d798864565516177b7e4b742026db",
"assets/assets/icons/github.svg": "eb25d852192358fedc2097f8d43fefd3",
"assets/assets/icons/github_d.svg": "8d14967a1557c208f5dec43bc5d20f06",
"assets/assets/icons/git_w.svg": "9121441e56f251cae3d4f8428f97eb0d",
"assets/assets/icons/instagram.svg": "052ddeeb4d2ad0c8490dfa19e41766e5",
"assets/assets/icons/instagram_d.svg": "5f1ec04af52ed55d2b44de525e4b6922",
"assets/assets/icons/linkedIn.svg": "3da09212869013bfd9420ec9cb6ba5c1",
"assets/assets/icons/linkedIn_d.svg": "9c239dc8f5a6de0da298398d6bbd065d",
"assets/assets/icons/menu.svg": "38a6c22dbabe0860448409b2b34161b8",
"assets/assets/icons/python_w.svg": "e4831b5af20e08e35766caac93f3e4ab",
"assets/assets/images/deco1.png": "fc14c85697c7be8aa883a016a78484a1",
"assets/assets/images/deco2.png": "d8f8cea86546d65d399cbd2db6c736e4",
"assets/assets/images/deco3.png": "0d8df5f651f4954a4b333ef234e4f925",
"assets/assets/images/deco4.png": "07a42ad780a1faf8160fe25a808dd8b7",
"assets/assets/images/deco5.png": "30cf616daeea66cb2c6fdb280c4141d1",
"assets/assets/images/me.png": "f7f05a51fc25f4a73048e4d4dc72f4da",
"assets/assets/logo/logo.svg": "d57c8c0532a13a82bace13982a1051e7",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "32fce58e2acb9c420eab0fe7b828b761",
"assets/NOTICES": "caf7258f4278060a107b554022ba759c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "3bd93dfe6f74ec4261f82b4d4c2c63dc",
"canvaskit/canvaskit.wasm": "6ffce9c3ddf777b94b3440833f068792",
"canvaskit/chromium/canvaskit.js": "2829bb10a7eb9912e12b452dfd671141",
"canvaskit/chromium/canvaskit.wasm": "c6822f58a32aa7bd158f63ae21b94847",
"canvaskit/skwasm.js": "5256dd3e40ec9fe1fc9faa51a116bcfd",
"canvaskit/skwasm.wasm": "d0a733306cddba8fca65dd165628283c",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a96e4cac3d2da39d86bf871613180e7b",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "58cb961c11224c3ba28408b4da240673",
"/": "58cb961c11224c3ba28408b4da240673",
"main.dart.js": "ebf07e4e2cfed8e90f4002f4c109db82",
"manifest.json": "3234dd2b450140746ef6da8c00df4985",
"version.json": "7df3c1b366aaeeb76d6cb458d5aa1e98"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
