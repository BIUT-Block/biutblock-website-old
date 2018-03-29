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

var precacheConfig = [["/static/css/admin.accf079.css","e48cf19bb322ae9d97af83e6a0cd6c01"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.928ae5c.js","88309f0898b837605da84c7bd4e649cc"],["/static/js/1.4c44c90.js","52e5cefbad3e5855d7671235b4c6c1b0"],["/static/js/10.d6d065c.js","a97d074cfb2528d2881941d84cc27d30"],["/static/js/11.616fb29.js","989332bd5971e64051c872969992080e"],["/static/js/12.3cd2235.js","452a96e6993e69547e99ec776071dac3"],["/static/js/13.ad83a59.js","fb8c4cdf671115515900cebdecfd3d71"],["/static/js/14.da348cc.js","d83ae9556edaca8a13290b011ff8250f"],["/static/js/15.b54a885.js","bb69c6e28e22dd681e41d5f7a5eabca5"],["/static/js/16.3f1fc87.js","5a808bf6bf4ca4d15954fc22a2b351dc"],["/static/js/17.7cba254.js","4c3154b1c2cf125ac93532789740d64e"],["/static/js/18.933c4fe.js","99457554f5be64a65740d167482c4a5f"],["/static/js/19.e47e990.js","d29c0306d75c5d3b44e6bb4d219e2d27"],["/static/js/2.cdc2949.js","df483666d618610f581c55c9f4710170"],["/static/js/20.33632e4.js","f0eae032bdc20accb8e5a11667a1d273"],["/static/js/21.a4b7816.js","f9cd053fb2a8d8e86d793c3aed58c549"],["/static/js/22.102a300.js","65e1f13a23aebc89f6dde429ad311fcc"],["/static/js/23.2675906.js","2b493b24ce9a52cf5a592f953d49f99b"],["/static/js/24.eb862ed.js","78808fa01ee59cb397470e0539ec82ca"],["/static/js/25.5e5a535.js","3683231d8275aba85165541f96cdf47f"],["/static/js/26.8fbf2a3.js","2e5ea4dedc6c7c06f292490cf1157599"],["/static/js/27.41d6bce.js","857f5c3dbbb5bed617d73a4010a8df08"],["/static/js/28.25bb658.js","46f04033ba32913f704a475b725ba159"],["/static/js/29.5579127.js","64baf87806e95fac11465ddd686f9d99"],["/static/js/3.fb5fd2b.js","2aac567927f937eca1d3d57a6121ee94"],["/static/js/30.a1f12b7.js","e3da1b3ca014661fc6aa1d391acf48ae"],["/static/js/31.b2d7506.js","cebbe110ecc23a33ae21a5f687ffc54a"],["/static/js/32.a305333.js","e028bd54e9b89e545ba84e9b7dbdf99a"],["/static/js/33.46f37a6.js","34abdee3bf46a7d6daa30292300dfad8"],["/static/js/34.0de9812.js","05edaf79507f962aac54de975b60ba7b"],["/static/js/35.a7c0ac5.js","04b1cad376a95ff6a84f716f0068b449"],["/static/js/36.5349443.js","c76cb2fe14fc491f01fe5fb380360d75"],["/static/js/37.fb780d5.js","aa024d060d68711c49c99429ea52c272"],["/static/js/38.86f080a.js","eb211602175c7302813e13b17cac46e8"],["/static/js/39.f478884.js","3e9e547c6260a7ba0c21ba956cf1c774"],["/static/js/4.446fa5a.js","f688283122e535f83b3d70f4814a4bb5"],["/static/js/40.a41bf00.js","f6a96ae634e78653d7cab335a4ab9647"],["/static/js/41.eb72fa9.js","2a21e937904927aa38a33483dee2f12f"],["/static/js/42.70fb511.js","66af04283a09a65f1a1d8c7d205be00a"],["/static/js/43.9110359.js","dff88242cff3ce50cc4d159cb5e44145"],["/static/js/44.7e7a701.js","b7e03a48890c5bcde9e429192f1bcfed"],["/static/js/45.2b6f507.js","18f61f19e89bf22d91a73e4154606332"],["/static/js/46.4ca00b5.js","66ee412a318b0b95ba3a3147909740c8"],["/static/js/47.9d265e9.js","dd415d71f3b3ef2e55ec63ff23a0c6c7"],["/static/js/48.eeee94e.js","4cb8d21b470f4894691d65de86f2ee92"],["/static/js/49.02251cc.js","1a27fc1b506a92c6edee6d9a968c6a35"],["/static/js/5.2b552c6.js","b647a2ce8bfba3894d9e4f04843dbaae"],["/static/js/50.a0e8faf.js","87fbbfb9db068aa2584f95711804e83e"],["/static/js/51.916db52.js","c0e8752c0f2494b26a9ea7c7fab3d9dd"],["/static/js/6.e1b2695.js","ff996e0cf8f2ed27a34214b1c46d2003"],["/static/js/7.9dbf7ee.js","d5d93c45d2ac585a92ee154abdfbd071"],["/static/js/8.0605e69.js","2be4f79ccd1a03838d0eb6a683933980"],["/static/js/9.3e15302.js","de8d494350427326ffa793e7480fb0a7"],["/static/js/admin.204f720.js","afd1acb6c8ae7e78a8e9229e9d5e08ae"],["/static/js/element.c36a80e.js","5e0735ef6b13384e717b348248df7aff"],["/static/js/manifest.44f9dab.js","ea6f31914a8777a0c18819ffa568299d"],["/static/js/vendor.fa56a59.js","28ed6e4b93e6fcf6c79bf0b939a59a60"]];
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







