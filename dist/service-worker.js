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

var precacheConfig = [["/static/css/admin.117fb35.css","36cd481df54993d0fd4eec3fecbb75a5"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.ef01162.js","e8ae3ce01c2c64103b6fc207afc2ef4f"],["/static/js/1.b19407e.js","2877356e64b259c3ffe051ccdaa58720"],["/static/js/10.5e6e071.js","42b29c3d13e667d6a1ab35284fe7cbea"],["/static/js/11.ab8b01a.js","2a277121ee24eaac99c310bdb9272d22"],["/static/js/12.155cb08.js","c45bc4bd2d28d6937247adfb9fe00239"],["/static/js/13.94e94a5.js","df617f05c61f4910722272fc9d88bcf6"],["/static/js/14.cf30189.js","0a2eae785556c9442ca66fd74724c925"],["/static/js/15.8ebf0fa.js","2c0c314728e222a35d5327d8befefd7e"],["/static/js/16.b480c9b.js","b696d3968377663efe7daf53738d1bda"],["/static/js/17.490cf76.js","9b99903f1b50b2123e1962fae3c3f9bb"],["/static/js/18.57fa09d.js","e0d8784877aed488453ee9be803d8243"],["/static/js/19.50141d7.js","9a9dfa8eecab5a956ccf878c5e06e6ef"],["/static/js/2.a71debc.js","bd75ae2d00b6d8a34517de6f8df53431"],["/static/js/20.cda5325.js","4d444b1cc8d8c421b82aa5ba869aafd9"],["/static/js/21.adfd7e5.js","fa27c85838707350c23b1c4ff2d3d3a4"],["/static/js/22.5aa269d.js","f4e4c7badb6f1311f7fc38b10fcc7ba0"],["/static/js/23.774cb91.js","de9e2a021e2700c81177bb440a815c95"],["/static/js/24.84aa72d.js","02eefde54bbd24354dc65377623d57bf"],["/static/js/25.db94ad0.js","ba21e8ef7f12ed4e9abf3499a1540cbb"],["/static/js/26.07cddc5.js","bb170711dbae0868907125aedb9b560f"],["/static/js/27.c29c69e.js","d0fe434ec016b36a191dc21df9ae1f25"],["/static/js/28.66990ce.js","0a444d955596e0162842421234b2eb5e"],["/static/js/29.015ed8f.js","08f3467afc3a4a155556c394fac66e2e"],["/static/js/3.8a24b60.js","443d518272da6403fd713c8ae3ba76e4"],["/static/js/30.f376998.js","cb87aeaa1037d467776ff8b3e4280326"],["/static/js/31.de409d2.js","db6a30d90199ef4b8ca8ef308a5e86ae"],["/static/js/32.59469c9.js","2ebee6a5e8660602e7ec603d130ece0d"],["/static/js/33.9180620.js","d84bccf542f5fcaf15d7e2bc172996ba"],["/static/js/34.64e945b.js","6620861a45e54bc2427f97340cb839d0"],["/static/js/35.2751b8e.js","fee90311b972e805a7679c735fb44438"],["/static/js/36.dee338f.js","c5900cf07082060c9e7db46f1361c93d"],["/static/js/37.caf63d5.js","01231d9921d6008a7eb51e5bc1b3be8d"],["/static/js/38.592da46.js","c23b4a86cb4a439189ab33498ec2dc5f"],["/static/js/39.748ce0d.js","797c1cdedbcc15e60cc2062fef465c5e"],["/static/js/4.9d6fc8b.js","d8dfc9706b99f6f7da511a5ef2dec944"],["/static/js/40.e36221c.js","3b5cfa83cc820aa9e4e02302d2f4fdc4"],["/static/js/41.ee39f1a.js","00ee014528f6c9926baece0f31a067a2"],["/static/js/42.1c02ab9.js","922141bfca7924a47a6dd5211bee5669"],["/static/js/43.a9a6c53.js","b66ae226c606a61d3e0476a9a3af66ef"],["/static/js/44.aabb5b2.js","d6cff7fcad09d740691d09d9b85cc0ee"],["/static/js/45.7f7902d.js","71204ad94b676ba579b749236b5bf7df"],["/static/js/46.d6b885a.js","fb6bc37d97d83468792d1834e0da8cab"],["/static/js/47.3f36a43.js","c7fcea9cc0be6e9fbaaff43c41aa54ac"],["/static/js/48.d6b19f6.js","2fd6d018de54484c0c36243bdc92cb34"],["/static/js/49.ab14dc5.js","ea07146c2133d21fc681db681b279add"],["/static/js/5.a105857.js","12282f8f87d3a9e74df6b141ba6bb058"],["/static/js/50.fd1d3f4.js","36205ddd2965a545293bd43463ba17d0"],["/static/js/51.2c47e5a.js","68720e6e1882502573f29d820b40e670"],["/static/js/52.b761eb7.js","d164ec591a1748e585100a55c875a611"],["/static/js/53.6313c1e.js","92cffa98683558c3dab72ed16c8d18b3"],["/static/js/6.b9fb188.js","580aec5534c1484ad03b09a133c88115"],["/static/js/7.83d8698.js","bdbbef0030ec2487654b6aebe398b55d"],["/static/js/8.801db66.js","e1b9fc07b687d764ac9afc539c19c86c"],["/static/js/9.0de2163.js","ba13b12718f416b0c147dd5afa3fb913"],["/static/js/admin.275bd72.js","e8496d6a8be1e6bb6b1df99d88600f04"],["/static/js/manifest.ab029ff.js","b5dd318df6913b6a6a851561a9a149e4"],["/static/js/vendor.29406bb.js","0decf908a26bf2145e54776612712d45"]];
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







