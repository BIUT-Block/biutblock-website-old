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

var precacheConfig = [["/static/css/admin.9d8cc30.css","e48cf19bb322ae9d97af83e6a0cd6c01"],["/static/js/0.0c9a032.js","f05283e8d9d18f2d1eaa9d78ee217ce6"],["/static/js/1.ee1219e.js","0f06d3099ecda85d996144c15c047462"],["/static/js/10.d8aa993.js","747e251e828eb43e3730b7582fc1bd3c"],["/static/js/11.6520474.js","b90ee9b259d601ff33840c7965821078"],["/static/js/12.d01431c.js","e43074fa72a03e4345baf03c941290f5"],["/static/js/13.c6e5130.js","002b91fc1bdcdedfb5bf2bdd32810dd6"],["/static/js/14.2ac95bb.js","963172bb5d4c9f041782301fe4943a71"],["/static/js/15.fe90be7.js","8071c8e4d0d985293521cbfc1d7fff31"],["/static/js/16.ac37a0a.js","ae2ba6fc8837825df25961b48e73344e"],["/static/js/17.8fbc884.js","7dbfb48538cc6885d975c02269cbbfac"],["/static/js/18.68ff851.js","9f446be0b8d67e13e50ebf68536edbdc"],["/static/js/19.1ac0788.js","3e6d04042f91464c1708d4cbdafdaa52"],["/static/js/2.b7a2262.js","cdd33519f7d69a2fdc71e4b8d14280da"],["/static/js/20.97c393d.js","fcc5844d59db37ea132def55f67c6099"],["/static/js/21.cf10039.js","003c0710f245dce623582d3643e6df9c"],["/static/js/22.c4eaf3b.js","3ecf6f61d65e0b23cb1c7eb37f0f270b"],["/static/js/23.8f5f270.js","5c1cea71470c85e4c009234da5d69b9b"],["/static/js/24.fb05091.js","04ac72c2dd7b3f8e67896de29dfd491f"],["/static/js/25.a0f8772.js","337ab51c08941cc993b1a3c4f51d9334"],["/static/js/26.966d021.js","91916c7e732295769b0f2aefd443217a"],["/static/js/27.8ea9f5f.js","9b8e77c45b356ce6054d8c37c64a8dcb"],["/static/js/28.c43f1c3.js","d80632c4490ad1f088aaf80949e4092b"],["/static/js/29.dea5a07.js","68c25fd9100017339d7b99f53a0c92e0"],["/static/js/3.6f80c85.js","8c7be5653e02c6062050c11e76221b2d"],["/static/js/30.27f3e53.js","a6eecf0d64452f6e2dc963b796a529f1"],["/static/js/31.8f77387.js","b858741f05ee2f7350253c2e0d1c319b"],["/static/js/32.c6c351c.js","18041f7455eb12faa7dc27b988c2b104"],["/static/js/33.7b46a2b.js","997e9d0b4357afce5b7cc15dcde48230"],["/static/js/34.58a6d6b.js","789643da47bcedc546c0754b9fcc345e"],["/static/js/35.0ca6019.js","1ef16de499e08a8db84162e4d3a73924"],["/static/js/36.b5c8909.js","d27b76820c37c62dcbbd419c52a3aca1"],["/static/js/37.f063c73.js","f03a411666877d367a2d341d7bbc829f"],["/static/js/38.c604ffe.js","8bb098903b9536be9806327be2108ddc"],["/static/js/39.721ca90.js","6ba19c1f1644071084f722d94db21273"],["/static/js/4.715884a.js","8dcc2952a6d68f45aadf351ca1b10c3a"],["/static/js/40.2728132.js","778941a1887e4e679b1fc7a68eedbd67"],["/static/js/41.3f9327c.js","55cde1a8f7cdd99e43ba57eeb0b575b0"],["/static/js/42.c7e525a.js","7f6d9ef483a28cdc5790aa0ec7266050"],["/static/js/43.628b2f0.js","de3a3fc27ab5a394055329c3efb8a348"],["/static/js/44.6b86eec.js","f02e2fef67790c82fe2c851513f9de92"],["/static/js/45.b9fe533.js","43c86dbd2bd5242ec9d3c6b03ea3f009"],["/static/js/46.d341de3.js","b38c2d44650bf414b030852774f25df8"],["/static/js/5.0fd43d3.js","8bdbbd1c1511fd9f07a915350757bf49"],["/static/js/6.017b1b5.js","930ec782378e37976af33b0104d7637f"],["/static/js/7.996f9f5.js","f5f8306fe24c27f148cd483ebe46aeea"],["/static/js/8.7649f08.js","5fa67801be4cbc4c44e17d45ee68a030"],["/static/js/9.6ac2c66.js","75219e8f6381790330d1fc9033d867dd"],["/static/js/admin.b4040fc.js","e3b4a97718f7e5c46edfd039002abedc"],["/static/js/element.841da87.js","cae62593645dfd6f8917a25e5e781f6c"],["/static/js/manifest.6b9e954.js","143bd87a14b6c3fa50b8748430087f3f"],["/static/js/vendor.51f93e9.js","543cdb60439fe76c54ea35dcae9cc374"]];
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







