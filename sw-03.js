self.addEventListener('install', function() {
    caches.open('tmSw')
    .then( cache => {
        return cache.addAll([
            '/',
            'index.html',
            '/association/',
            '/association/index.html',
            '/plusjamaisca/',
            '/plusjamaisca/index.html',
            '/reseau/',
            '/reseau/index.html',
            '/bibliotheque/',
            '/bibliotheque/index.html',
            '/eduquer/',
            '/eduquer/index.html',
            '/dossiers/',
            '/dossiers/index.html',
            '/voyages/',
            '/voyages/index.html',
            '/editions/',
            '/editions/index.html',
            '/aide-memoire/',
            '/aide-memoire/index.html',
            '/actualites/',
            '/actualites/index.html',
            '/agenda/',
            '/agenda/index.html',
            '/soutiens/',
            '/soutiens/index.html'
        ])
        .then(function() {
            //console.log('cached !');
        })
        .catch(function(err) {
            //console.log('err ', err);
        })
    })
});

self.addEventListener('activate', function() {
    //console.log('activated');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                //console.log("response");
                return response;
            }
            //console.log("no response");
            return fetch(event.request);
        })
    )
});