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

var precacheConfig = [["/static/css/admin.77952f4.css","36cd481df54993d0fd4eec3fecbb75a5"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.59478d9.js","e05aef3a34d261350ce5e033815858f9"],["/static/js/1.74e40d3.js","06dd820bedc6c6c2d496b2106a879fe6"],["/static/js/10.6ed9679.js","83aae6edd6b8f69f90570d30cd477967"],["/static/js/11.45ad9ef.js","29e831aeb42a48df95b475efcb6b6238"],["/static/js/12.e57e226.js","9e569e1170a4902798cf246576811f7c"],["/static/js/13.9f0c213.js","7baf1da8f66585800cfd6bd12cd627b6"],["/static/js/14.09e647c.js","7cab9155773048d8299481fdebdbca47"],["/static/js/15.e3f632b.js","86e9f75ccdf6d63d0b337b7f598a8548"],["/static/js/16.873f916.js","6e75ed9da0ac9267380ba74d676cca89"],["/static/js/17.e8a1c22.js","aea480f3cb7fbb0369281bd785f1f033"],["/static/js/18.1f46281.js","dd1bb87c12d558c51d898c4970fcaf48"],["/static/js/19.6658288.js","26c3261b0dd7ab7a8d8ab20d84198356"],["/static/js/2.14ae9da.js","a9d9e8e7f0f8c40695d59e605c5e7dba"],["/static/js/20.86a8277.js","2d00c6087f01cb206ba98842afafd9eb"],["/static/js/21.b67a9cf.js","d5fb94da2f8d3d1fe5124f7cf4ae1879"],["/static/js/22.e849b9d.js","2f1dc13c7effcfa12fa23e0edd4e004b"],["/static/js/23.fba04c8.js","4a4ae11d167c5349d3a49c150ac2ba92"],["/static/js/24.fea6be5.js","4bf1aa9eec2597222d53bb63e8553a02"],["/static/js/25.6173a25.js","fa666e03947c7b0bfa5e70cee95348a3"],["/static/js/26.38c2b15.js","a2c8ed4ca713f39c0627d7c2eedae5fb"],["/static/js/27.b04abd2.js","f02b93c54df68eb74107a972dabfd9d8"],["/static/js/28.1e55eaa.js","a91250df6f833af34bbd60793f4e346b"],["/static/js/29.45796f7.js","fda63ac9f45c6277253f423c8ec9efd7"],["/static/js/3.2ba83a1.js","c3aa9024b8729cdb0c96158de329c1a1"],["/static/js/30.cfd76e2.js","90559a672b07092535722892a37dfa54"],["/static/js/31.d9c0d5a.js","3a63840b41131656bef3583b3b22705e"],["/static/js/32.119f578.js","364cd57d6fcd226302af5f442c447c1a"],["/static/js/33.00df561.js","fcc4f1edecdd21fd28200de2a2d64e40"],["/static/js/34.19e700c.js","7896afaf122661510a1095a791489b6a"],["/static/js/35.cd6460a.js","1934c91bc68ec7f609cb9e213b578807"],["/static/js/36.db8a786.js","2a0d2fd9cb4e380b423c0a21eca79547"],["/static/js/37.bf842f5.js","b10d11f09333827d023642c3232a349d"],["/static/js/38.1fed885.js","397778964607eb251c7a0825efc896c6"],["/static/js/39.655ed33.js","944604160849f2f7b3a5c8b66796b165"],["/static/js/4.1976222.js","09011f54495bd6bc1de42e3a5ce8ece3"],["/static/js/40.1e0038c.js","c7f951332a99569de024718e73cec1dc"],["/static/js/41.cfe5f36.js","e081530bfe3f992a45d8d1a252df5724"],["/static/js/42.6d5b3e3.js","3de800ee56248e669cdbe0608051f40e"],["/static/js/43.831202c.js","8d5568a59dcb3bdd8bc317b6f886789f"],["/static/js/44.b7a7ea8.js","8b1588e045e359644c6388f92eda27d7"],["/static/js/45.c9c4d36.js","631b85c32d467d591ad32930f11d9fcc"],["/static/js/46.d58bc72.js","309cca2148bdb4bafdf9b703ca33a37b"],["/static/js/47.e038628.js","5d32cd0aa05af1aac81cf8b93119ef35"],["/static/js/48.7f6ed0d.js","3cc66bdcd9169dde6e4d434b0578de1f"],["/static/js/49.c3655b0.js","e8f142d6d653d33e6362b28eae3914c8"],["/static/js/5.c9cb336.js","93a56fcc70e90387738e904eb290c65c"],["/static/js/50.bcb5a18.js","7b47ba30cccda94b503e24790efcb682"],["/static/js/51.c707595.js","b1f725afe3155fc9dccf946fe7d21536"],["/static/js/52.665efbf.js","0085846bd4e88fec9e9e92634f8f409e"],["/static/js/53.d12b737.js","9a1af2fde4e26271b97649ef274b1012"],["/static/js/54.f010ac6.js","17da17f1329adfc41ed4563f883f7b63"],["/static/js/55.6691c4b.js","27a9d563574de566fbe1cb3bb3ee2aed"],["/static/js/56.c23621d.js","87383155c3584aa312d3b790c3448222"],["/static/js/57.1f59f07.js","2076649d1f36f7ce758317cbf25fcf4e"],["/static/js/58.9971a5a.js","e32a10d6f3c006cf3921de976530a4c4"],["/static/js/59.9cdde66.js","596df149eeb567bf357f8ed288fa7d7a"],["/static/js/6.c31d85a.js","e9745ebc5de686bada9d305d4a55100e"],["/static/js/7.08ffcd4.js","6023d697f2a67e8ae8f4bba30f2d6047"],["/static/js/8.d7a4a1c.js","21f8d6acde968fba1160c177b1f8ce5d"],["/static/js/9.445481a.js","3bcddb8f2154d92173f01038ff2b5b58"],["/static/js/admin.1810d2f.js","512842b0a8bf3ad87efe2f3728af371c"],["/static/js/manifest.98fdfd5.js","acc7a5a7c04c4137f345b7b230789847"],["/static/js/vendor.f4d61be.js","85ac65d93ac4842288675903a29e881f"]];
var cacheName = 'sw-precache-v3-doracms-vue2-ssr-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
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

var createCacheKey = function(originalUrl, paramName, paramValue,
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

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
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

var stripIgnoredUrlParameters = function(originalUrl,
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







