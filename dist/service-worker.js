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

var precacheConfig = [["/static/css/admin.ea6c478.css","8f8b77a9d4ed54ffcf244d2ce489b2a8"],["/static/css/app.ea6c478.css","26df1c3cfe26bceb888e988c930cae21"],["/static/img/element-icons.6f0a763.ttf","6f0a76321d30f3c8120915e57f7bd77e"],["/static/img/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/static/img/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/img/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/img/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/static/js/0.fd95b64.js","55356151443edbd2ecf69a519ccd04b0"],["/static/js/1.fb2d407.js","dfc38b78a0b9e17cd3b02027976430c5"],["/static/js/10.077d698.js","f74bbc9a06ab25835070a4a5f948f54e"],["/static/js/11.37c04c0.js","ec7897e752d00ff77f6d660b78e2d6f7"],["/static/js/12.753b86f.js","bcbd45b4c9202bcd4c26c8910b5aac00"],["/static/js/13.2b6ede0.js","044b4b448738f7a184fe2425189bc486"],["/static/js/14.6e0ebf5.js","7bfbc31065956c1dc159b6ef3f245e3f"],["/static/js/15.b95701c.js","788b98eac6ca2ca8e744e2c3bddeb583"],["/static/js/16.0dce01a.js","809bac514502b2f0a51582aab3e2bf38"],["/static/js/17.8486d95.js","a4d37bb69f3442935afa548eacee2b10"],["/static/js/18.9378103.js","ece4232fb749995c3b6b0a4f3b9af911"],["/static/js/19.edcf45d.js","30d4fc64e5b15d4c68fccd78c2915332"],["/static/js/2.586f932.js","1395648e02f23c7b9812d2c21b329e30"],["/static/js/20.1f509d7.js","a94b57fada50ef1065780f516d8d68dd"],["/static/js/21.690ad8d.js","bd430d42bf4265da9cfd045897de1b6d"],["/static/js/22.adc7ea2.js","0c5ca938505c22e13946ee45623604cf"],["/static/js/23.4d63f90.js","a0d417cad4e455ae17a3eefe8d828a8f"],["/static/js/24.f1e9dbd.js","3bc066c569adf54f70455ea96cbdb2ad"],["/static/js/25.d90d167.js","84360681c2d655c5393bf6d25e0a5ddc"],["/static/js/26.9658877.js","3c6d4e63960c16391570087b9ba01373"],["/static/js/27.c0dd883.js","e256d388cd40361fd0d3ad29fc5d9488"],["/static/js/28.4edea07.js","eb3dbf7371435d46ff5f54bbadaad922"],["/static/js/29.e3f7ccb.js","f6d5ab71f22048c7dfd7498d8728f908"],["/static/js/3.a2f2a24.js","371c5f8512a71234cffee2427f868cc7"],["/static/js/30.6970485.js","ebd1ee3314e8dad761d34caf9a0e1901"],["/static/js/31.15e53d6.js","c25b8265c399d134a89e9e7ffef04791"],["/static/js/32.7832d76.js","0ea9118879439ff735a91c26ecbed4e0"],["/static/js/33.7af7b33.js","170d37fec2ca2680572c11776d3a9770"],["/static/js/34.c681480.js","3bf4e9ca33561fb60eee37f5e683d5c9"],["/static/js/35.388c095.js","41bfa21a7177ad01cc8d1852ce8d9ce2"],["/static/js/36.96cadbc.js","890ccbde890c4ea057a6e676b7b288c3"],["/static/js/37.448df6a.js","eaa122ea5f4bb19eacebbfcf42fcb83d"],["/static/js/38.c0b7123.js","fc714133dff6bcbb80777faeeff4f15d"],["/static/js/39.d7ff0bd.js","d615a9f1a8d64f8b6c3de8af5e60a9e8"],["/static/js/4.1947c43.js","56b9d48f597b5c0136599f23a5de0b8b"],["/static/js/40.19329b7.js","1ab4ba3faec0979964f1a6daef58d795"],["/static/js/41.8a5319d.js","c2d113d7591c3bd3182f1eea997fcc44"],["/static/js/42.34e6c84.js","5ba0755ac6caed13d8259fbaac18c4bf"],["/static/js/43.3b8f55f.js","bf5acf7ef74e8283bed44d9bedcfc0c8"],["/static/js/44.672db62.js","4c6f09af2ae91cbf7f1b566c62b82b43"],["/static/js/45.f34fbcf.js","6879216c8d836b8e0f5b137b349f607f"],["/static/js/46.a46cce9.js","4dea9cb5f3b97ea4cfd07028e03b07aa"],["/static/js/47.6ea7915.js","8b8ecf53466cae6a59e92935cfb08c34"],["/static/js/48.8c8e128.js","0645bf719d16f5cab4ee94276f927fc7"],["/static/js/49.ad8da27.js","dd73e19c3d734fbf4e3b426d71227349"],["/static/js/5.eb43c6f.js","88410d3b0f9326bae3889dc38b357044"],["/static/js/50.8a06b7f.js","bd0f2bb9d6854ef852f3abe330116a03"],["/static/js/51.96e8eed.js","4c60571795da76a3aed03bf3cd9d074a"],["/static/js/52.e464282.js","7780ce5b0a5dfe5f211a3904c34f5081"],["/static/js/53.3b59148.js","f9aa463fb43a411d5ca1b63480502571"],["/static/js/54.a938360.js","75997e9c9493e1cfa55e77f890a687ef"],["/static/js/6.f460049.js","e28613d2b27cf7b68903c4c463590574"],["/static/js/7.5f023c2.js","f804ecd75f4ffdf75f9a84ceca07da23"],["/static/js/8.4274fdd.js","5117c69af4bc13c105bc44b3d3ad689d"],["/static/js/9.d499aa6.js","95e7c4d9e35e0b995efbca381dc3bf36"],["/static/js/admin.8141ec1.js","0ae28cf651b7a0531c3aa41754bb6348"],["/static/js/app.68e4bff.js","778694db91087fc0717fa7173694f546"],["/static/js/manifest.3cd862c.js","70608c129cd7e3ac510770093c6a963d"],["/static/js/vendor.f7866fb.js","f645caadb6a9eec0214b1089645ef581"]];
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







