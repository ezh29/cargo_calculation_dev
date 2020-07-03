//// Register service worker to control making site work offline
//if('serviceWorker' in navigator) {
//  navigator.serviceWorker
//           .register('sw.js')
//           .then(function() { console.log('Service Worker Registered'); });
//}
//// Code to handle install prompt on desktop
//let deferredPrompt;
//window.addEventListener('beforeinstallprompt', (e) => {
//  // Prevent Chrome 67 and earlier from automatically showing the prompt
//  //e.preventDefault();
//  // Stash the event so it can be triggered later.
//  //deferredPrompt = e;
//});

/* PWA settings */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

let newWorker;
// The click event on the notification ( 업데이트 주석처리)
//document.getElementById('reload').addEventListener('click', function () {
//    newWorker.postMessage({ action: 'skipWaiting' });
//});

if ('serviceWorker' in navigator) { //서비스 워커 버전 업데이트시 버튼 visible (주석처리)
    // Register the service worker
    navigator.serviceWorker.register('sw.js').then(function(reg){
        reg.addEventListener('updatefound', function() {

            // An updated service worker has appeared in reg.installing!
            newWorker = reg.installing;

            newWorker.addEventListener('statechange', function() {

                // Has service worker state changed?
                switch (newWorker.state) {
                    case 'installed':

                        // There is a new service worker available, show the notification 
                        if (navigator.serviceWorker.controller) {
                            //let notification = document.getElementById('notification');
                            ////document.getElementById('notification ');
                            ////notification.className = 'show';
                            //notification.style.display = "block";
                        }

                        break;
                }
            });
        });
    });

}

let refreshing;
// The event listener that is fired when the service worker updates
// Here we reload the page
navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
});