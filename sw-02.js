self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('tmSw')
        .then( cache => {
            return cache.addAll([
                '/',
                'index.html',
                '/association/',
                '/plusjamaisca/',
                '/reseau/',
                '/bibliotheque/',
                '/eduquer/',
                '/dossiers/',
                '/voyages/',
                '/editions/',
                '/aide-memoire/',
                '/actualites/',
                '/agenda/',
                '/soutiens/'
            ])
            .then(function() {
                console.log('cached !');
            })
            .catch(function(err) {
                console.log('err ', err);
            })
        })
    );
});

self.addEventListener('activate', function() {
    console.log('activated');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                console.log("response");
                return response;
            }
            console.log("no response");
            return fetch(event.request);
        })
    )
});