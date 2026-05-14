const CACHE_NAME = "travelnest-cache-v1";

const filesToCache = [
  "index.html",
  "explorer.html",
  "budget.html",
  "generator.html",
  "mood.html",
  "feedback.html",
  "css/style.css",
  "js/main.js",
  "js/data.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});