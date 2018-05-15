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

var precacheConfig = [["/static/css/admin.538a1c9.css","36cd481df54993d0fd4eec3fecbb75a5"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.ff2dc8d.js","4a86c4b137e80f517d7ff76035b0cc98"],["/static/js/1.72c8ac7.js","255f896b5fcde9b8d3f9635c11d76ae2"],["/static/js/10.65d81e7.js","bcd3f6da615391cf96ff81ba3d7e85a9"],["/static/js/11.585527f.js","ffb61f57556458edb3274ce3c34e235a"],["/static/js/12.8483dbc.js","72e3a8ac93eae8793b44907ae58b1a8f"],["/static/js/13.648140f.js","b75ab5bde704242f32f83dc39fd5e716"],["/static/js/14.a578b9b.js","c510348705956b8cb90ac8ec598a05a9"],["/static/js/15.9e2eac4.js","93968ca2bf453eeb2579ba8ea768e144"],["/static/js/16.dded444.js","74ecf1818397424a1b5ab0406bb88c25"],["/static/js/17.5949e3f.js","9a0b7370b04e83536403209c36656060"],["/static/js/18.de5a176.js","3c0ebb0df8d483aebd2e4f069a605dcb"],["/static/js/19.e75dbc1.js","364b557417f1d9a208ca8c01ab41e7ae"],["/static/js/2.83144b9.js","dadb0f649217307ebc8fbcc1ef056b6f"],["/static/js/20.f9d1262.js","8e3c6879cfd5d2dd5d3f274aad41c5e5"],["/static/js/21.d7ab0bc.js","b9a37e742d927dca2025bb1f925c7518"],["/static/js/22.80bd7ad.js","99c308b3df8ee8b9f266c4888d21fe9d"],["/static/js/23.395347a.js","f2784b6b0967d7e0f3b55091df6cc54b"],["/static/js/24.4642604.js","5709f6082ee60b214a143dde53ba8ed4"],["/static/js/25.a9fe2d4.js","dc4c557853de6785779581f41d536f77"],["/static/js/26.e8469e3.js","7e34ce344a25fbdc83346d81389470fa"],["/static/js/27.887a09f.js","f00fe97ead9a6602a63fd290125b0439"],["/static/js/28.f66c412.js","1c28f4356eb78a59f568c279422b51b9"],["/static/js/29.3761942.js","a6d7a71571dc5df389f7c984fb151cce"],["/static/js/3.7ee010a.js","a1a54c916fdc41c4c1a31987e0ebc2c9"],["/static/js/30.3adffc5.js","6ffeb3ca031968050a2929a3a9b75de6"],["/static/js/31.19ce31c.js","77c5834b961970a88775a843dfa10ef3"],["/static/js/32.b1b2a01.js","27e8be6129a79601a2807ff8b89aaa8f"],["/static/js/33.cc05d03.js","518548dce5656ec001e38006bfa83d85"],["/static/js/34.0c0521c.js","c7a919dd48c0861e10b4a4704f2a9ecc"],["/static/js/35.29b53e5.js","6ab4c227ea76768c3b6ee5d3e5067bbb"],["/static/js/36.503738d.js","630c3257b1c30822cf270f6f75f3dd46"],["/static/js/37.3e693a3.js","ba7a205bbcbfeeb188d2eb935c305b44"],["/static/js/38.cc225d0.js","cac3efe9cbe75fb0284ea08621521b4e"],["/static/js/39.15b6bd8.js","09cbf96a57a3021baaa51363fd951614"],["/static/js/4.2c53c43.js","4c34b3229b139aca2a0af4752bca4e29"],["/static/js/40.81c7a09.js","2a79054c11b77680a42231a9382be2a7"],["/static/js/41.5646f16.js","1b21908857a5f1e032d14e794a6097a5"],["/static/js/42.6ecda00.js","0adb83f105ef1bbb7973d1bb0a0076f5"],["/static/js/43.b558984.js","544e4605c55206f329899bdac96d63cf"],["/static/js/44.adcc09b.js","b928f8d2e83feb979ac6cbad0cd2df4e"],["/static/js/45.3adf5cf.js","bda4d1c98700e02e4f1868cfa160312c"],["/static/js/46.201c88d.js","55c1961ffef4c71d281908c8a559cebe"],["/static/js/47.c516575.js","e991cbc2073ffd896c3ff4e69c98f189"],["/static/js/48.da8ddf2.js","0791f0a2679312c542c68e0d09cfcbed"],["/static/js/49.56da9c3.js","e12024ac0687a507b9025afea127bd4c"],["/static/js/5.6ae53c1.js","340b41fcf3b760212e9fc15d11c26f90"],["/static/js/50.dab6c07.js","4e680c7715007280cad089d42146ba44"],["/static/js/51.f9ee3f8.js","3e28441735efb4c6d499146dd5fdf763"],["/static/js/52.0591181.js","33bccfea19ea68bb1c178ba6107324fa"],["/static/js/53.4273771.js","7d82339c8bb937439469b11ca3cfca02"],["/static/js/54.3d2bef5.js","66d95d2b326e8f92f23cfd5b10b5a619"],["/static/js/55.d3968e4.js","9f6c5b48f7ad75999c4892c3d4ddf491"],["/static/js/56.a7cd244.js","b907316fd31a5ba97447e00223ee1f61"],["/static/js/57.fe49ad2.js","511289f0bcf89501e6b4635be8085379"],["/static/js/6.5445d25.js","f727f6a4c8b92b59dc0f58f575b6a784"],["/static/js/7.3452e43.js","d0ea4a5eeac4854042d04bec24320703"],["/static/js/8.9ff213b.js","aeb185d6fbeb7fb332a363528c817149"],["/static/js/9.de5205f.js","e0851cfb8a2453a6a03204834fff574c"],["/static/js/admin.d24f472.js","c17b0d0857f8cf5e0bd9e77a9957b2c1"],["/static/js/element.b60fe4e.js","efb303536affb24ffc93b35cdadafaa8"],["/static/js/manifest.764c8ef.js","3c03b209289aba5ee18187721a32bd92"],["/static/js/vendor.b6eb106.js","b62899d29e7d4de434cce6eb589f6722"]];
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







