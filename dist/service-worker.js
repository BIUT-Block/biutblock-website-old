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

var precacheConfig = [["/static/css/admin.a597b11.css","36cd481df54993d0fd4eec3fecbb75a5"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.97e851a.js","55187b11ce94d1d80839f54f1865a033"],["/static/js/1.19bd9a6.js","35f548fcd3e7539a189f98e03a2e24bb"],["/static/js/10.f6f3560.js","bb6d618657578dc2c519f65f0a684199"],["/static/js/11.f04199e.js","3ff71e362a6a9bbb9387561c08aec620"],["/static/js/12.a904201.js","b2ba77a5a3eee08c4f59409807ac9822"],["/static/js/13.32a6c83.js","8b8b035ef3743ba578f60c2bb8a83376"],["/static/js/14.4580726.js","512bd34ff266a2087f859e0a0696f8a5"],["/static/js/15.1992a2c.js","9dddf1f4d207d9cae83c2f751aedb8e4"],["/static/js/16.0ebfafe.js","37f4a5463e0ad9ac7a1f4506191318ee"],["/static/js/17.0314c3a.js","def3bee368dd374038ba9ae45dcf49a1"],["/static/js/18.c20ba17.js","debfab73026c421c5a01f8129a3b7b67"],["/static/js/19.e81e6a6.js","23f7ee71041a6f63a8daccbfcd1573db"],["/static/js/2.ff20cb4.js","e1b047c1a2c0077f083be2757a21c872"],["/static/js/20.36c8fb7.js","2b860bfec35c86dd3a7ee90d73d499af"],["/static/js/21.7a6d647.js","6334a30a8b25108ca84ba7a15675329e"],["/static/js/22.57986c3.js","b01df249a941f883e5016522c3112526"],["/static/js/23.145e984.js","c69bfc093aaef79aaa20f97eef8c0ae1"],["/static/js/24.de960d9.js","09ac3fbf0eb822808d9386d088828d95"],["/static/js/25.c68913e.js","787e707b7e9fbc1de86c46b46f65dd6f"],["/static/js/26.814ce20.js","1b6bb365f5280624d074cbabb9fc6f98"],["/static/js/27.08e882f.js","51accdb3454332d857cecede6df8e75c"],["/static/js/28.35ec227.js","029776390cc7f4cb658e547c42916932"],["/static/js/29.3657d91.js","8d6075ecbe68013ece32377fee1a7f23"],["/static/js/3.c217b1e.js","764d53c34054cc01db074f17b660c927"],["/static/js/30.f9a50b4.js","7c3d516af78024029da5dfa7ac09aaf6"],["/static/js/31.acffcb9.js","46ec38424a2c1c6c7d9ce591a75d2dec"],["/static/js/32.c3bf36e.js","fd16265d4a0c0c4551601335ba4f547e"],["/static/js/33.9443d6c.js","50f9b9ffb2c453fc95fe75c94b707dcf"],["/static/js/34.648fa8c.js","3626581ba0eb8ac5c4cc7b6ea832ee48"],["/static/js/35.b0c5574.js","d7dcdbee806b5a240430ca0fc34d3b8e"],["/static/js/36.1d9c472.js","f99b5edd8c5b8ded4e61f24c2eb67157"],["/static/js/37.1bdf8b0.js","6517b99fea7a0ec5c65b8ba6d25a79ee"],["/static/js/38.a7a16ea.js","21230cb62835782f5978e60824e57a60"],["/static/js/39.44ebc21.js","49cfdfc2db7b87ad1b89d646ba7ac304"],["/static/js/4.9958693.js","17a68a36aacc2a4cb522528c11f9fe61"],["/static/js/40.6cef448.js","948744b5114ff4e696e79e3961a8e4e9"],["/static/js/41.bbfd2e6.js","44ff96525003b949125e79c7f43d9181"],["/static/js/42.f6d6f2c.js","6f979f1597b750b591b266774004694c"],["/static/js/43.6bcf879.js","2dbdfb6a866fc8415f919337a707d11a"],["/static/js/44.fd4e793.js","d14d6064060cbf3e5141b7166b9b9871"],["/static/js/45.96557a5.js","b2cf3979a579dc69430f31384d873643"],["/static/js/46.6a2eb1c.js","84295a707d2c9e21a393a12cc6d6ac0d"],["/static/js/47.e98cb75.js","779c55d9b53400eb0ab2125a7c08013c"],["/static/js/48.fdaf494.js","dbc1b4cdc5a6b5bb3b754421759e5f41"],["/static/js/49.f892e93.js","125d1d314c58dd42f13627b92af88ca7"],["/static/js/5.4460b8d.js","976da475fe6683dd9065795b0b9e6f6c"],["/static/js/50.11c40b3.js","baa1bc39080b5e122fae103e04c11472"],["/static/js/51.adf5f92.js","386f026f48c1be16e3a2d06944221df6"],["/static/js/6.97ba9f4.js","0664d971475f3c92a519a9a83433bfa6"],["/static/js/7.8440fe4.js","9088e28392f757798473e8e2c8d00e2d"],["/static/js/8.ed63eea.js","4436da50c56d7c1bab3f046b5c8b8e92"],["/static/js/9.a0d28d6.js","712501fca201e346b7f7f5433d4da595"],["/static/js/admin.ea1d1ac.js","8ad43d0d96ef65d515a1e51a091fe7a9"],["/static/js/manifest.83e022a.js","607d4706fdc12bbc3333d10f9a46c055"],["/static/js/vendor.0d2243e.js","3f6429ee0cf0cf1c8771ad5a6b99b517"]];
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







