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

var precacheConfig = [["/static/css/admin.21f09db.css","e48cf19bb322ae9d97af83e6a0cd6c01"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.f98f7d7.js","f7397c9eff7b05137b0431f41c390308"],["/static/js/1.aa98f2f.js","ff16bfa47189fc2fc301fd0388312a81"],["/static/js/10.4d5d033.js","3227cd291b5e584118330e08fb45349c"],["/static/js/11.51f1ea3.js","0392ed415b208e59afef20dfc9d4f828"],["/static/js/12.f0bcdae.js","cd1799230deb93720090a89cde2d117e"],["/static/js/13.0496e12.js","192354099c7ee4b1692a0fe8a3fab748"],["/static/js/14.418d07a.js","8776953c69e3e4ae519c7ab5247df3db"],["/static/js/15.a3b09ab.js","4f38d56f52de5b546fff93e1b27f79d0"],["/static/js/16.5f96699.js","195e232fdf222181457b62395e8a5e9a"],["/static/js/17.8f9ab73.js","6a5b634ceded5de9e43afb7d2d356a69"],["/static/js/18.c5b05d3.js","161b2c3f6522a2180603679afe3ae99f"],["/static/js/19.1004ac2.js","87489d85e85b9de51f5a35b25a927407"],["/static/js/2.8e8de4c.js","049f8b40210ca0decfe5236cc642522e"],["/static/js/20.4830359.js","abf39b764322caa53ba0f2f121d2de77"],["/static/js/21.2439c06.js","f225e2724ac7f85d2e66b614a534c43c"],["/static/js/22.09762a6.js","292faf82eb372369fab319ccf4b11dda"],["/static/js/23.243646e.js","473d7a742afc4d08be2356231a4e9768"],["/static/js/24.96e6f0a.js","ebb645d35ff38a1f2e17d4b458a19d6d"],["/static/js/25.ad2679e.js","0390d8b4b650c2a3f18ad12500a34fa2"],["/static/js/26.814ce20.js","1b6bb365f5280624d074cbabb9fc6f98"],["/static/js/27.1360096.js","c26a888ef5e6fa0aa1ee69e6abf99c64"],["/static/js/28.d346dfe.js","71680bddcb4ca5704f717c889e55a2c7"],["/static/js/29.3657d91.js","8d6075ecbe68013ece32377fee1a7f23"],["/static/js/3.4983a88.js","6ada10e196ae2ad736fee8c72a135e93"],["/static/js/30.fcb4f54.js","b8f832a9aef9c49fd32488b4208108cb"],["/static/js/31.531723d.js","edc04510728d292ea91ef673491c8f0d"],["/static/js/32.1234f4f.js","231bd7fa51a81f947ef1228d183eb7e2"],["/static/js/33.9443d6c.js","50f9b9ffb2c453fc95fe75c94b707dcf"],["/static/js/34.85bc7ac.js","348eb10914d63c0af804c9324ba3120e"],["/static/js/35.078eaea.js","d1c36b84dfc50b3d26893dec19b0fd31"],["/static/js/36.195fffa.js","8115b0deccd63571335cdaeebe31736f"],["/static/js/37.f84abe4.js","0302254f193745e6ef45b0e5d57ba667"],["/static/js/38.9cd739c.js","e575d42b3949384c8e23ad93f5e625b7"],["/static/js/39.bdda267.js","08b14d0c0f3b9b696a9e2ffe3b92ee23"],["/static/js/4.d1e59f9.js","28875e7ff68e914ec04565e2fb7a7f73"],["/static/js/40.cc82f82.js","be44d0a4b597d33392d80122ec3b17b4"],["/static/js/41.43e93ed.js","7b111276541ce327cf3fe9f3582ee681"],["/static/js/42.602c1b3.js","fe79bc8384470cc05fb40163b378a399"],["/static/js/43.5b3d7e5.js","e6563018c84c794e2b90c36a541e2446"],["/static/js/44.ae3dced.js","33d9840e65d0ba650065c57dc69c35e1"],["/static/js/45.5da3701.js","650034bb08f4f0011b97e0fd046523a4"],["/static/js/46.9b98f4d.js","9d4014ceecfa7e61a358738a78b7476c"],["/static/js/47.9e83e66.js","993089a6f8565ab589e393fe59c792d5"],["/static/js/48.48e5359.js","1c68cd23ffe1c7039f94e90f2431f180"],["/static/js/49.0e7a956.js","b0864f4d6199661a892807effe236369"],["/static/js/5.c4c3609.js","6659e03d9f0390c4621ae2f069f06cc8"],["/static/js/50.7ccffdd.js","e1962dbc6030a0d679ba9edf8879996c"],["/static/js/51.8b5b6c8.js","e68d791e2094fb26f73b58332ffa379d"],["/static/js/6.6dbdced.js","b9b85e98ec68d7d08725516f1e5dd1a6"],["/static/js/7.0f5985b.js","be7d311287deb9447fdf4c8e0e51a373"],["/static/js/8.717a2ab.js","84d79eceb505c226e1f554a2f6bcb785"],["/static/js/9.e8fe581.js","f0c2d9fc918776c5c7f5bd80b4317810"],["/static/js/admin.18e2e34.js","805deeb9b637ab8d9106d01e9d42d322"],["/static/js/manifest.3d72d68.js","3a4c7a7d1a52c75c6fcdf4c77ff59ace"],["/static/js/vendor.25daad1.js","9f9223ac542a69573cf663d98cddfdbc"]];
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







