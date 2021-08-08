var CACHE_STATIC_NAME = 'static-cache';

self.addEventListener('install',function(event){
    console.log("Installing Service Worker..",event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
         .then(function(cache){
            console.log('service worker precaching app shell');
           cache.addAll([
                '/index.html',
                '/static/css/2.ab062550.chunk.css',
                '/static/css/2.ab062550.chunk.css.map',
                '/static/css/main.57d72fe7.chunk.css',
                '/static/css/main.57d72fe7.chunk.css.map',
                 '/static/js/2.34c68939.chunk.js',

                 '/static/js/2.34c68939.chunk.js.map',

                 '/static/js/main.c1f3ee4a.chunk.js',
                 '/static/js/main.c1f3ee4a.chunk.js.map',
                 '/static/js/runtime-main.191ee827.js',
                 '/static/js/runtime-main.191ee827.js.map',
                 
                'https://res.cloudinary.com/dpjkblzgf/image/upload/v1625580102/baatcheet%20icons/icon-192x192_rlqcpt.png',
                'https://res.cloudinary.com/dpjkblzgf/image/upload/v1625580107/baatcheet%20icons/icon-256x256_f6sjvs.png',
                'https://res.cloudinary.com/dpjkblzgf/image/upload/v1625580108/baatcheet%20icons/icon-384x384_xtf4ro.png',
                'https://res.cloudinary.com/dpjkblzgf/image/upload/v1625580107/baatcheet%20icons/icon-512x512_fjupoi.png',
              
           ]);  
       

    })
   )

});

self.addEventListener('activate',function(event){
    console.log("Activating Service Worker..",event);
   
    event.waitUntil(
        caches.keys()
        .then((keyList)=>{
            return Promise.all(keyList.map((key)=>{
                    if(key!==CACHE_STATIC_NAME){
                        console.log('Service worker removing old cache',key);
                          return caches.delete(key);
                    }
            }
            ))
        })
    )

    return self.clients.claim();
    
});



self.addEventListener('fetch',function(event){
 event.respondWith(
     caches.match(event.request)
     .then(function(response){
         if(response) {
             return response;
          } else {
            return fetch(event.request);
             }
         }
     )
         
 )
});

