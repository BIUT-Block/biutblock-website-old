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

var precacheConfig = [["/static/css/admin.834721a.css","e48cf19bb322ae9d97af83e6a0cd6c01"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.5751b68.js","9f01beb49fcae4c9d8e63857e06b529b"],["/static/js/1.dfc440d.js","bc6072b3887766a63ed3c5607d520b7f"],["/static/js/10.649a470.js","dfe2bc38f0b4277fdd36fba9aa2f1430"],["/static/js/11.5fe52e0.js","6f98e265a40a1892184c4b73cafbe680"],["/static/js/12.2f16725.js","ecd5b0c6c21e2ddb5c2e4a352f3a2799"],["/static/js/13.1f4926b.js","872c09d4f5aa9229e4f9804326135c51"],["/static/js/14.4ada395.js","f57210bbe081dcfd78c62da90d06538c"],["/static/js/15.5c3e9d1.js","2debd033aeb97674a38025e6dc6a12e7"],["/static/js/16.25fa2b8.js","5dd1ee8ed35c9ae289b8fee0fad6238d"],["/static/js/17.96c562d.js","815ec85fa335d232b56a9a8147a07673"],["/static/js/18.0bef85c.js","1e4fb9b55fb36c55ff1fbfd5cc0cc2f0"],["/static/js/19.1bf13ba.js","b9ea621668bc059684b84d6b61332cec"],["/static/js/2.a335739.js","17e34a1949ed3a6416297786e8cc97ea"],["/static/js/20.0c1d18d.js","db8c5cabe92114d4b412e431ebe8f6e7"],["/static/js/21.1482b31.js","e9495480bf1acacc1251d7a499f8eabe"],["/static/js/22.20b2f0f.js","826f3890a9e7fa30e56492f59dde64df"],["/static/js/23.b72d35b.js","e5f617cc3461e3f60dfda9e23e8ea71a"],["/static/js/24.961f480.js","c5d0d44ad3bc632680a086ff10922325"],["/static/js/25.924e7f9.js","8e7300208f9535fa9a05af49e8804fd8"],["/static/js/26.734df1d.js","840386f3bb8598e0a16047006e938f43"],["/static/js/27.a03bff6.js","156d87628670b0642658a39d529cf4de"],["/static/js/28.27b9e26.js","72439008ccc6344329a06a7e85d5d048"],["/static/js/29.02cd641.js","62e28ff48068c500c7ea18b328dec148"],["/static/js/3.881d602.js","510c3b1ebe52b6aab71d2b3efb3507c0"],["/static/js/30.c807700.js","7bdb3574c9a4fdd001896cfeab4305d9"],["/static/js/31.7c3ff61.js","bb004cbbaf3174e6886e053673bc9502"],["/static/js/32.c1a2e99.js","77d1af8a7cd8e5990f5d6157e427ecdc"],["/static/js/33.a7c7026.js","647aade619d96264297a0c7137f4f2cc"],["/static/js/34.dc993b5.js","e7440837e02c663b95697ed09f5e108b"],["/static/js/35.a010e5e.js","8c0d975935605345246d0a02867850dd"],["/static/js/36.54a4b7a.js","8a8bfd98acfad6e74d51079e3f5a37a0"],["/static/js/37.a90783f.js","ef9fb0035c09fbc65a9824f3978ef7d4"],["/static/js/38.8dcf6ae.js","9e2580f97eced12a2b988895255dca9d"],["/static/js/39.ff6b24c.js","654f5e5440ea5f8cbd089854d8797c04"],["/static/js/4.56adc75.js","d108fd816d89422e82a73b243e4a29ce"],["/static/js/40.46842e3.js","d9696147a608926895f588e1a526d7e2"],["/static/js/41.434fcb2.js","169ed5cf83e336a3167606e3af0d2c13"],["/static/js/42.465dd08.js","1c4a1ff8cc1d1dc99d2381aa565fc101"],["/static/js/43.639253f.js","1f1471879ca2b9426b5205004c3a35f0"],["/static/js/44.740739e.js","f8be679c35894c9ca91a87b7b8f54d2f"],["/static/js/45.60bf102.js","c739b2a93edfc8297166c81958fc7ea2"],["/static/js/46.bae4700.js","7b38e74897dd07bba27be6dd201526a4"],["/static/js/47.111ee3e.js","0bb933e5e8faae2409cb15c8710814e7"],["/static/js/48.6671f68.js","aa64b1509550508e3d9b611360f4ec22"],["/static/js/49.017a963.js","f59f8551557f5031dd0cf253e9b4786e"],["/static/js/5.b55fa6d.js","da35b6817d09688473942b00bca70198"],["/static/js/50.0d13bba.js","581141742012c13c9b79fab23a555405"],["/static/js/51.d273a7e.js","be146af248f5ff9ad686db93d226c338"],["/static/js/6.c7271ee.js","28e5692262aad36854bc63a1b5146d3f"],["/static/js/7.3a75bc5.js","215e3f8d0cf1eee7c45532c37e8378b8"],["/static/js/8.d9a1120.js","371270d5a762335801f47fb5db6ff85f"],["/static/js/9.fa8d0f5.js","4e86904644465de09b85aa62b849104a"],["/static/js/admin.e831d2f.js","8531fb3a774d7eab55bdaccdaa7e16e8"],["/static/js/element.c21acbd.js","bc2cdb426a2c09b29fe3f8c57e5d2a00"],["/static/js/manifest.b108525.js","ea03e941b2514474eb7019c3e510ef15"],["/static/js/vendor.1abab1a.js","2aefcb96b4c2c5058048fa880c6ec2c4"]];
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







