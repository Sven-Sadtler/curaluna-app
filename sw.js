const CACHE='curaluna-v13-navigation-corrected-20261019';
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key!==CACHE)await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith((async()=>{try{const response=await fetch(event.request);const url=new URL(event.request.url);if(url.origin===location.origin&&response.ok){const cache=await caches.open(CACHE);cache.put(event.request,response.clone());}return response;}catch{const cache=await caches.open(CACHE);return await cache.match(event.request)||Response.error();}})());});
