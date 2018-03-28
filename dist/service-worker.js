/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/static/css/admin.7146ac7.css","e48cf19bb322ae9d97af83e6a0cd6c01"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.285e22d.js","b28ec8e5698888d7a09fa47263ae3bce"],["/static/js/1.6176d89.js","d1a83ba481b4ec5d3c5a84b8fb1e7ef0"],["/static/js/10.9a7c5d7.js","d1620d467d534faf5e1ad10cdfba6f61"],["/static/js/11.cb02026.js","df51246c10ab223cd2f92029049591d1"],["/static/js/12.259b1f6.js","407f972f49b9f619ecc8dfddd382e67b"],["/static/js/13.18feb54.js","dd1dd09b2ebc114144a42c5d649ca15e"],["/static/js/14.3127e74.js","cd5846b8d24eb711ecbaef4c77979a83"],["/static/js/15.e4647c6.js","614ec2fc36be619479a314cbf161752f"],["/static/js/16.e40419a.js","d5ac9c02b9f77856436fb3a97cee4a4c"],["/static/js/17.494f789.js","63080943afaf7738e08ff4d587783809"],["/static/js/18.e9d6478.js","c38dfbca4683b3f3acb0a06bd15254ff"],["/static/js/19.fb1c17b.js","07c026a26970a0afd238c14daf56764f"],["/static/js/2.783799e.js","8fa59bc6ff520d8c86a89e462a75dd2d"],["/static/js/20.99d316f.js","2e5eff9f207019e4a05f4fc5b8b9b672"],["/static/js/21.7cd6ba5.js","1736c98ad3cde6e1c837d0613151632d"],["/static/js/22.8b5e033.js","6e0f736e42669c082663f8ea5776145e"],["/static/js/23.34b0ade.js","fbc0d05dfedad41588b7e67d5752a9bf"],["/static/js/24.3553414.js","378a94c8958733dd025d57ec66227626"],["/static/js/25.ac53648.js","a9a077e813143a05e7aab25a1f2b7069"],["/static/js/26.d77f301.js","4aa8f0bf9252330bd0b827e54b91f28f"],["/static/js/27.1360096.js","c26a888ef5e6fa0aa1ee69e6abf99c64"],["/static/js/28.219710e.js","6598ebb3ad4b35d1b4b4fc498b11af1b"],["/static/js/29.a5f78f4.js","545ab290b63b4102d6b1d268eb5f084a"],["/static/js/3.e2d5d75.js","b6ac599e9f1b623768c25e60699d29bf"],["/static/js/30.611e648.js","a5b0a8784ccdfce55b1f589ce73fd160"],["/static/js/31.a77cae2.js","3e3b7d7163cfc7eb291caeb078396b8c"],["/static/js/32.3bc828c.js","464899819ae245d573512416184dc898"],["/static/js/33.3c69d00.js","91e77aa2d8e5477181833b32984df821"],["/static/js/34.17e2ee2.js","f5bc3e1be5d11cbd1eb0e791830b6e57"],["/static/js/35.535e0cb.js","12394217839bca338b8c09e3886d3d53"],["/static/js/36.81dcf40.js","1b198537ecce7bb25c8af0ba73d269ca"],["/static/js/37.005ed6f.js","21c81d56ebb75bd671faf840df578240"],["/static/js/38.52d3eb3.js","279dd3596f967e0c8d1d0c83de3f1a05"],["/static/js/39.5be76f3.js","c9d106c3ec0423aa60af782d483b17f9"],["/static/js/4.58d5a80.js","6c45a1178a3e465ae5d0734ed69d86b5"],["/static/js/40.3f10a08.js","96bb45fcaf863e20c4b7f73e605a1fd8"],["/static/js/41.c085c44.js","4e427dff0bc16d4cced9487d961518cc"],["/static/js/42.7d33525.js","a2b4c96125049e839a964bf8766417c9"],["/static/js/43.547e5e6.js","1c51a3ed6680b0ea7120d37e4f47bf19"],["/static/js/44.217d310.js","29f836a7f5096e499b544f4575169be6"],["/static/js/45.8527893.js","829a3779ffb4111d96651eee23e7e4d4"],["/static/js/46.34d01cd.js","4199d9a7a6b8b80e5bc60fbe760b1f39"],["/static/js/47.24b042a.js","b361890c750e656a40d6bb0f86e70b8e"],["/static/js/48.6cf833b.js","b654d8c428e7e8d1dd9cb7e33602897e"],["/static/js/49.4c51874.js","b7c7d52469765ccfeb39379eccfc6f96"],["/static/js/5.f941355.js","c3052e3dd7462cd1c6033d47a3759ac7"],["/static/js/50.356ee09.js","e1d68b9eca185e4e0421ac55580b64ce"],["/static/js/51.89cad31.js","6de7a3dc7a8a74ae114da42fc6755770"],["/static/js/6.ffc58dc.js","1c19f67a1ae5855d37622e8f8c5f4278"],["/static/js/7.7a42df9.js","55726dae64175e51d0cf4d8a0052dc73"],["/static/js/8.6ff6e40.js","fc3252df32d5ab0c2065914a53d1897a"],["/static/js/9.e32c5de.js","0035ada4c38a11065761bd65a5a575e2"],["/static/js/admin.3732930.js","c4e46ee95f3e7c27e890a61dffac7935"],["/static/js/manifest.0efacd7.js","03d132fbe904a5d7c057586580f741a7"],["/static/js/vendor.c33a582.js","93ca83ddcc4f009eb654a8fcc6241212"]];
var cacheName = 'sw-precache-v3-doracms-vue2-ssr-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /./);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







