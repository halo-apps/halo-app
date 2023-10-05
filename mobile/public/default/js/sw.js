const CACHE_NAME = 'mobile';
const urlsToCache = ['/'];

//安装事件
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

//激活事件
self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
});