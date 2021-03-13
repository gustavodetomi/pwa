const detomiApp = "calc-calender-v1"
const assets = [
    "/",
    "/index.html",
    "/scripts.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(detomiApp).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            console.log(res)
            return res || fetch(fetchEvent.request)
        })
    )
})