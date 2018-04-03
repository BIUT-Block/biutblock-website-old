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

var precacheConfig = [["/static/css/admin.9eae42d.css","36cd481df54993d0fd4eec3fecbb75a5"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.259e541.js","805fc42e59bb20d2ca25476f44c2a9b5"],["/static/js/1.35d40e1.js","ef34a036bd7f027801b6bad52f0eb697"],["/static/js/10.0613164.js","7c72adfe584f59c1c25c217137cec6a2"],["/static/js/11.0adc681.js","dadf5b4edfe1ffc5a29c7f16173447e5"],["/static/js/12.55dc023.js","9dbc95ac16e3711fd02423338e30d471"],["/static/js/13.6201b64.js","c81b51fbc7f6cbf95d0ca3e5fece7aa3"],["/static/js/14.87523ee.js","3377814fd7cf26a42614d692d56af1a5"],["/static/js/15.474ff8e.js","c544370a671459b3d1804565bcf2f978"],["/static/js/16.e52e147.js","7b74793b82de61846b451f5195be1d2b"],["/static/js/17.68386b4.js","4d2af03afbb537f36868a38eafb5f6b7"],["/static/js/18.33219eb.js","f0a7ab4bf25ad57fe65f6bcaf4ece1d2"],["/static/js/19.aacf1ee.js","9e02ad4a60b504d57457642362bc5f7d"],["/static/js/2.59ceb94.js","108f0777f3c2106caacbac7f385f3eed"],["/static/js/20.f70cfcf.js","108d5cf96de4fd7923a4bd3f94b596a4"],["/static/js/21.d062c52.js","e0d3bd807c705f763023d61a7e4e9e45"],["/static/js/22.8dce58e.js","3f25bd1db513a1d676a849fca13c7374"],["/static/js/23.2d942e8.js","67769e50bf2a75546b81ccf9c17f9809"],["/static/js/24.49c6db2.js","dfb77b54a1c7c1f89e9b669b754be4af"],["/static/js/25.ad9afb6.js","9b221a83ede9dab4f0c0b1678d9d6afe"],["/static/js/26.d77f301.js","4aa8f0bf9252330bd0b827e54b91f28f"],["/static/js/27.08e882f.js","51accdb3454332d857cecede6df8e75c"],["/static/js/28.babe1d5.js","745df21f1343a20fe6cb4646ffd27d06"],["/static/js/29.a5f78f4.js","545ab290b63b4102d6b1d268eb5f084a"],["/static/js/3.43aa5f2.js","3b6b27dd9dfe7e31a90725ba53ec64fa"],["/static/js/30.5c7ddc0.js","40da61dc8fe2c39e68b4915d11364730"],["/static/js/31.aa7797e.js","64c9f540ba5e2d68390deee0a2071691"],["/static/js/32.0003d95.js","a48bfd2f65a1596b29ce3af27e8041bc"],["/static/js/33.3c69d00.js","91e77aa2d8e5477181833b32984df821"],["/static/js/34.835f579.js","8869b879a0ded32ec89cc9b42bdfa9ce"],["/static/js/35.c391773.js","7a109b3646a6b19c7488db24c240fa28"],["/static/js/36.4d16951.js","b404073bd16a1f3159d74098fcd14e29"],["/static/js/37.9662faf.js","acaa71ad3ef5f069c6552b13c68db974"],["/static/js/38.1222e6e.js","388022e02efd06e42d8c9fca25ea4c6e"],["/static/js/39.de76d30.js","02314667f6b28f1360c4c094db8054c9"],["/static/js/4.dafbf7e.js","bb61161eafac10c4fec1d3e259c32fee"],["/static/js/40.f0533a0.js","f297a29c0ca70ac38e10b275e3943c7d"],["/static/js/41.fa9af04.js","3c36a8cd7660a170a164cde58ac7856e"],["/static/js/42.d9c099a.js","2722a38ef80111f96ac68d47d471d1b5"],["/static/js/43.cec28ec.js","dba4cf28ebfa28dcd4f50d37d46f98da"],["/static/js/44.79966d8.js","062caf22b4ad6010f5698241e84fc8b0"],["/static/js/45.8b74474.js","e38a433ef29769d153097412431d87de"],["/static/js/46.2fd0c56.js","88a30e6449641efb889f53ee9d749e6d"],["/static/js/47.3e7647b.js","60868552271226f1a6744c080bf31458"],["/static/js/48.63ac41e.js","024cb2cafaaf244b8ceae34a1628af63"],["/static/js/49.ed48d96.js","57c92bde58a0c537839b66404d6e10c6"],["/static/js/5.2d39438.js","9129c4da172022478c53b7f6d3c72d91"],["/static/js/50.306e744.js","0d70ea4fdee2ad9c8c0f2efe6e8830f2"],["/static/js/51.88f7a63.js","9f5eb975965f6941dfa7d4ab59283f65"],["/static/js/6.4a65fbd.js","3304df51424444cbf37a3581a7c18815"],["/static/js/7.408c035.js","9e8e89e0b4ceff76ff3ce533af3f3b7c"],["/static/js/8.c2a788d.js","a1678ad27edc08a00eb17410fe07a151"],["/static/js/9.d456c51.js","013275902924ab174f9c1439d6e06359"],["/static/js/admin.ea1d1ac.js","8ad43d0d96ef65d515a1e51a091fe7a9"],["/static/js/manifest.626673f.js","d7211f7167e0b8a46c64fa120c8ed2d4"],["/static/js/vendor.71904c5.js","1d793eb89d99d44b7d6caf1ff15e9856"]];
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







