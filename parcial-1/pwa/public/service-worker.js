const CACHE_NAME="mediclinic-cache-v1";

const archivos=[
    "/",
    "/index.html"
];

self.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>cache.addAll(archivos))
    );
});

self.addEventListener("fetch",(event)=>{
    if(event.request.url.startsWith("chrome-extension://")){
        return;
    }

    event.respondWith(
        fetch(event.request)
        .catch(()=>{
            return caches.match(event.request);
        })
    );
});