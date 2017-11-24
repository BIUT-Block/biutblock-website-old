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

var precacheConfig = [["/static/css/admin.f69a6c3.css","b0a7c81fdb5abe7cc5319a8d1bc8f29e"],["/static/css/app.f69a6c3.css","f3738d92a4ed2a3b71f5cb4695175125"],["/static/img/element-icons.27c7209.ttf","27c72091ab590fb5d1c3ef90f988ddce"],["/static/img/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/static/img/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/img/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/img/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/static/js/0.afd121d.js","04f6290f47b979fa7276aafd39da7a19"],["/static/js/1.bdaa54c.js","da967ddfbc87fd5cf39582ccdcce190a"],["/static/js/10.a9e4421.js","ef1ca8115a0d8d7b53b1fde0622f42ce"],["/static/js/11.97ff37f.js","0e012c497720fa1f63287eade1c2154d"],["/static/js/12.4a58f62.js","2236e155958cb11da282c98089f3fa64"],["/static/js/13.8749d95.js","cded702389e8ee0eb9b1725c666e75e8"],["/static/js/14.a8fb29e.js","203592fb8f54b4a5be7d5a7f7ec3bf2b"],["/static/js/15.073158c.js","fc90f8a086c9823f89150c4a5d59f6b7"],["/static/js/16.c4dd243.js","dc89d71c9e329b9d0e012122c39175e7"],["/static/js/17.d84e6db.js","9cc25962631723c97c5cb6a6ff9a3c68"],["/static/js/18.a00e495.js","e2a0f4318a70a740312abfca678e3cae"],["/static/js/19.6890d7b.js","6cd4789c118d53e37186fd5c1fca5113"],["/static/js/2.9af10b7.js","f03b87541de96cf15d32422f54977143"],["/static/js/20.e1cf4a4.js","fdf5fa5e543492664e234f3bb35c2d6d"],["/static/js/21.1d43672.js","b0f67df94f91b50e17e44b0628f5c3f6"],["/static/js/22.7962dd8.js","40a17f84a3555ed82d1ad29287f07b72"],["/static/js/23.9d522cf.js","4246709482877df4d7b9f8c93260c82f"],["/static/js/24.772af43.js","cb0a5bdbad793946284f89e8b84174f8"],["/static/js/25.899191d.js","1ef1318e446114636b803a04a5d3b9be"],["/static/js/26.bf5f9d6.js","6a91da3751f2b65b6c90fe3de5130f75"],["/static/js/27.91a0b7b.js","36ee288a644bda1e03d43edf861549eb"],["/static/js/28.8667996.js","9d41ef074f339d53144b6472d71999b4"],["/static/js/29.0cb1bda.js","baa4f6aab07598cefb1783404e4364ae"],["/static/js/3.5868402.js","a8256b754a82ec483a5db5d4d9984fb8"],["/static/js/30.3769553.js","ebd1ee3314e8dad761d34caf9a0e1901"],["/static/js/31.ad69a75.js","c25b8265c399d134a89e9e7ffef04791"],["/static/js/32.a4dba46.js","0ea9118879439ff735a91c26ecbed4e0"],["/static/js/33.40b6fa1.js","547142d3a94a34110a8238218ddf602a"],["/static/js/34.7c37cf9.js","e480a0e443c64e32dce43046dfb80e55"],["/static/js/35.dbc0586.js","10adca5a1e1ac3bd6e5ed29245805f94"],["/static/js/36.1bc2cb0.js","6645efe6f0d82347e4bc34f7220e6d56"],["/static/js/37.c4b5ff5.js","f03b968822e23af58078d5f4b4e93b72"],["/static/js/38.9529a37.js","299b40af533689cae52008eadfd06a56"],["/static/js/39.d21b7aa.js","d615a9f1a8d64f8b6c3de8af5e60a9e8"],["/static/js/4.9010ee7.js","06be27a8a8c1300e2de186275625d6fc"],["/static/js/40.2e091e7.js","1ab4ba3faec0979964f1a6daef58d795"],["/static/js/41.cc5c099.js","c2d113d7591c3bd3182f1eea997fcc44"],["/static/js/42.8158389.js","5ba0755ac6caed13d8259fbaac18c4bf"],["/static/js/43.131fe53.js","bf5acf7ef74e8283bed44d9bedcfc0c8"],["/static/js/44.b0918e6.js","4c6f09af2ae91cbf7f1b566c62b82b43"],["/static/js/45.52e3d0a.js","015af99f4e67f6d4f3ec89034afdc8d3"],["/static/js/46.f1bf461.js","f5c15170afc91bd9ad038fde1abead8f"],["/static/js/47.22d1617.js","0b8c6eb2b9b3e262d4c7006525f13bf9"],["/static/js/48.2d03285.js","03c6c1b35498e24cadb49068dfa85557"],["/static/js/49.9cc5619.js","7e1b67fb47d388d1d73f7ccc57a00f49"],["/static/js/5.48860c9.js","ea2be3fe9d86aef335bf8392f2cd4a87"],["/static/js/50.4e34eb9.js","77c56aeebaca96e02aa44dd1a7919b73"],["/static/js/51.bc9ab38.js","39af06b423a0fc056887c68eb86cb4b6"],["/static/js/52.4f4cf1e.js","dcfdb4fa1fd02cea9a2fbf9a6fdadd6e"],["/static/js/53.9a6a9c5.js","deacde0806d8a0448f822c02b4dc23d2"],["/static/js/54.8303dba.js","1c1cc6ab370e008779f4b1eb38deafa6"],["/static/js/6.5472eb3.js","05e33fbfd615589bce6206171acb95e1"],["/static/js/7.b7a4fb7.js","29bc6a43cd2cc586d87f3c1b8881082e"],["/static/js/8.10a389e.js","8bf45084d017637be2dff4e610c436a7"],["/static/js/9.5c85366.js","aeba83dbbe0c46cfdbcb767839095949"],["/static/js/admin.758848b.js","459ab2eaac9ab17a500c3efde73147f2"],["/static/js/app.48305e5.js","bb98fd59a24c6fb58d0fa7b7f911cf23"],["/static/js/manifest.c6714bc.js","c0212fe75b2d1cd2ebdb9128ae570270"],["/static/js/vendor.02fad20.js","efcb34bc306fd06f20c43a1033d99185"]];
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







