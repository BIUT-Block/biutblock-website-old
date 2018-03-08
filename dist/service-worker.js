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

var precacheConfig = [["/static/css/admin.5856b7a.css","e48cf19bb322ae9d97af83e6a0cd6c01"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.d3a5a87.js","5eee993c57a5c7262c77e6efeb1b4387"],["/static/js/1.ce442a7.js","016272d302974c30565ed78a3025ddb6"],["/static/js/10.649a470.js","dfe2bc38f0b4277fdd36fba9aa2f1430"],["/static/js/11.ea8bae3.js","1cc9a1fbb5dad470ab04d28cc3599814"],["/static/js/12.420235e.js","6b1b43e9cd677dd90e6eaa2718d331d2"],["/static/js/13.d0f63df.js","564e259b1f3d37b780456fe60ae0465e"],["/static/js/14.bba4e2e.js","87f20590c03fd2ed862a923968f323c6"],["/static/js/15.4668fe2.js","7ebf5dac1ed05f45886c2073bf91d9ae"],["/static/js/16.f629f74.js","94d8b87b30104b7fa13ef9db4e6ac8f1"],["/static/js/17.1353bc2.js","7c0181dbf61b1ab6e04dfade911cf8de"],["/static/js/18.8e6757f.js","4bc78b128c2da1c90d5bd39a64614334"],["/static/js/19.aea347d.js","05dd4716bd58f0eb4090832de6031112"],["/static/js/2.9fe2896.js","159decfa44faac2f61440d8e04e0c378"],["/static/js/20.f0bfeab.js","2ede49e6fb36e39584298965e7f77e3e"],["/static/js/21.1482b31.js","e9495480bf1acacc1251d7a499f8eabe"],["/static/js/22.3619819.js","add278059f855a3fda8be065ceb46f1c"],["/static/js/23.b72d35b.js","e5f617cc3461e3f60dfda9e23e8ea71a"],["/static/js/24.961f480.js","c5d0d44ad3bc632680a086ff10922325"],["/static/js/25.ca4d48e.js","362bd2e3ff25718b55d46a7c92ec886d"],["/static/js/26.734df1d.js","840386f3bb8598e0a16047006e938f43"],["/static/js/27.a03bff6.js","156d87628670b0642658a39d529cf4de"],["/static/js/28.27b9e26.js","72439008ccc6344329a06a7e85d5d048"],["/static/js/29.5452986.js","062e8bcd369f3fa5303664f40cd4f7a8"],["/static/js/3.8e10575.js","497f70e103c6401eae47edc434a81371"],["/static/js/30.c807700.js","7bdb3574c9a4fdd001896cfeab4305d9"],["/static/js/31.7c3ff61.js","bb004cbbaf3174e6886e053673bc9502"],["/static/js/32.c1a2e99.js","77d1af8a7cd8e5990f5d6157e427ecdc"],["/static/js/33.a7c7026.js","647aade619d96264297a0c7137f4f2cc"],["/static/js/34.b8de7e5.js","45f1ba9d76e48bcba6f8553854eb4d5c"],["/static/js/35.a010e5e.js","8c0d975935605345246d0a02867850dd"],["/static/js/36.54a4b7a.js","8a8bfd98acfad6e74d51079e3f5a37a0"],["/static/js/37.a90783f.js","ef9fb0035c09fbc65a9824f3978ef7d4"],["/static/js/38.a01d00c.js","5eaf51874bd6db3a2b6fc68974d8a0a8"],["/static/js/39.ff6b24c.js","654f5e5440ea5f8cbd089854d8797c04"],["/static/js/4.d709693.js","9e0d4a1b70578982e38cbb38a626627f"],["/static/js/40.46842e3.js","d9696147a608926895f588e1a526d7e2"],["/static/js/41.434fcb2.js","169ed5cf83e336a3167606e3af0d2c13"],["/static/js/42.465dd08.js","1c4a1ff8cc1d1dc99d2381aa565fc101"],["/static/js/43.639253f.js","1f1471879ca2b9426b5205004c3a35f0"],["/static/js/44.740739e.js","f8be679c35894c9ca91a87b7b8f54d2f"],["/static/js/45.60bf102.js","c739b2a93edfc8297166c81958fc7ea2"],["/static/js/46.bae4700.js","7b38e74897dd07bba27be6dd201526a4"],["/static/js/47.111ee3e.js","0bb933e5e8faae2409cb15c8710814e7"],["/static/js/48.6671f68.js","aa64b1509550508e3d9b611360f4ec22"],["/static/js/49.017a963.js","f59f8551557f5031dd0cf253e9b4786e"],["/static/js/5.da7ab08.js","e8b6dab6d43043b5083743581719a461"],["/static/js/50.0d13bba.js","581141742012c13c9b79fab23a555405"],["/static/js/51.d273a7e.js","be146af248f5ff9ad686db93d226c338"],["/static/js/6.c7271ee.js","28e5692262aad36854bc63a1b5146d3f"],["/static/js/7.3a75bc5.js","215e3f8d0cf1eee7c45532c37e8378b8"],["/static/js/8.d9a1120.js","371270d5a762335801f47fb5db6ff85f"],["/static/js/9.fa8d0f5.js","4e86904644465de09b85aa62b849104a"],["/static/js/admin.81bb9f7.js","3b90e9777612dfca50ab4adfb3ee0412"],["/static/js/element.c21acbd.js","bc2cdb426a2c09b29fe3f8c57e5d2a00"],["/static/js/manifest.8a8cbe1.js","327203203aa6b8308ce30de2c83cae26"],["/static/js/vendor.2dad6ff.js","042e1a4c2c633a29ba3f2e4e66933fff"]];
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







