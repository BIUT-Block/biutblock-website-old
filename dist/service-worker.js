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

var precacheConfig = [["/static/css/admin.eef6858.css","36cd481df54993d0fd4eec3fecbb75a5"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.d8184cc.js","c111a5fb76c9b7772f8d54529bafb992"],["/static/js/1.7687536.js","48ecfe06773844408317a914cbd936d8"],["/static/js/10.8d72333.js","2e87ef371d619fd090267183ed9742bf"],["/static/js/11.39252f2.js","2b2a2522d147eea17cb6b01779dfaa92"],["/static/js/12.25bb146.js","8e9e218bd20fec81c8d07b30238b4b7e"],["/static/js/13.aaa6fe7.js","41551794107140488fe760663bcc40bf"],["/static/js/14.816e9a6.js","43bd8355d8791ea55a7c15c462e359cf"],["/static/js/15.8f35827.js","92548e05a1ce7e2b47919261c991328a"],["/static/js/16.e34397e.js","664817ef4d5326e09e283eb4760e257a"],["/static/js/17.2a2b6d4.js","3eb1279aa5281fa674b6c08e944f5c30"],["/static/js/18.5391369.js","dc334607560a6576a0a9de82d46aaa86"],["/static/js/19.8d99d7c.js","3e17c5b2fbe39c1c3b47a8806157ff3a"],["/static/js/2.40de7ef.js","c96713ea780e96e6c1157963c2769d48"],["/static/js/20.ac144c5.js","11e2ae7b7df4e32ff856f39a0ef36174"],["/static/js/21.43da9f2.js","d614b1e9d216a297e48e598fa273fccb"],["/static/js/22.6a087f4.js","e173ea6ba16762220e10c56dac13480c"],["/static/js/23.a98084b.js","ffffb580eebc3dab13bd315134d5e04b"],["/static/js/24.e564338.js","fc9858b0b283ad489143a50e65f88702"],["/static/js/25.41ca18f.js","0b4a9a30b3627663b48867a9588cbdbf"],["/static/js/26.4d175c0.js","f2e6d6ee9edac1444c7404ae62855009"],["/static/js/27.7946884.js","751f8193969afde88eb9327ca430e708"],["/static/js/28.04793db.js","ef47319f845089e7387bb33a27eb5c5d"],["/static/js/29.9af560e.js","2e608953da2b47c3ef96dc176bfbb244"],["/static/js/3.d16f7e0.js","0adf6232992ea6c0dd48664e703d1a02"],["/static/js/30.1e29e25.js","95d9eb2d99f4b60743e2081d828f3abd"],["/static/js/31.4212eac.js","bf3cf2931fc7d076f21d8f0ba9acda8e"],["/static/js/32.f645d8d.js","0c3714990e7476747326252cd2c55a4c"],["/static/js/33.b70d269.js","77b44a7a22cf8d38a3dade134752fa6a"],["/static/js/34.6303912.js","454eb2aae2a686a70f5012ff2372df4a"],["/static/js/35.180b8f6.js","d7ba368338df68dbf52127ea7003306e"],["/static/js/36.67dea3a.js","3827a20ee076c0486902da6337c3fb38"],["/static/js/37.f51cae6.js","fbfd13bbc723d8567afecdc6d1931544"],["/static/js/38.7e690d9.js","cd42fb695671eaa35d4f40b3d8846dc3"],["/static/js/39.ced9c3b.js","6a5e80a37a7f81cbaeaf73785c97af71"],["/static/js/4.67926d2.js","dfcb9d9772b45074c2f115ecd29ac51c"],["/static/js/40.09d8eda.js","440418571c26fc20fea42abcbd9c988c"],["/static/js/41.db16b44.js","0ab4eea204a21c2f9dad2bbd2cf68806"],["/static/js/42.2291d62.js","25c1eff14eeba68d557b08b174904e0f"],["/static/js/43.15b4570.js","4b154c42e8741e3566d32a652a73c9de"],["/static/js/44.b2e9338.js","0e907927a2777c982b6482959fb74619"],["/static/js/45.33babf6.js","be127f09040ae370848bc9a4b75faa7f"],["/static/js/46.24b7141.js","e3fce1ed9b3184b8e1dabf6c59a2ec09"],["/static/js/47.169a3a0.js","d969067330ef12871bb5a339dd87109e"],["/static/js/48.7e08a96.js","7c93258ee613cdbd3cb59c9da6e8a03d"],["/static/js/49.a90806d.js","fadbc961ea3d33dd80dffa6fd936fae5"],["/static/js/5.58e5508.js","cbc989994fff85d551b8fdeff4cdc166"],["/static/js/50.34fa78b.js","4b7583a77f2832406fccbee08637c2d2"],["/static/js/51.0658e9d.js","1f062ec768d6595948c94c74b7bd7d0f"],["/static/js/52.e2c70d6.js","7e3115398ada25814fe72898805bb261"],["/static/js/53.0e00ba1.js","5bc4ea058ceaa2fb3dff7f873046b2c1"],["/static/js/6.ac03096.js","acb316953cb87e06a0c92e2934e25b07"],["/static/js/7.08aead7.js","751ff51f6337404605c0323e5e23e492"],["/static/js/8.2fef7d7.js","ca733ba40503bb1c2ef841c3a3cc45ae"],["/static/js/9.fbd11ee.js","5b7daff27f7da8b25fc7ded923487b09"],["/static/js/admin.9ce5581.js","b908ac7600c3ac56f0b87eeb706fe061"],["/static/js/manifest.c7837c2.js","bf0fb8817c949c3c6d7180f3182e3e97"],["/static/js/vendor.3baa394.js","d22904e0ef61641081aba5e1631543f8"]];
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







