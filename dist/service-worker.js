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

var precacheConfig = [["/static/css/admin.3ad2342.css","7cd2f970214440480f082088c390fb20"],["/static/css/app.3ad2342.css","9381216ac888e82bed18de045d63cc5f"],["/static/img/element-icons.27c7209.ttf","27c72091ab590fb5d1c3ef90f988ddce"],["/static/img/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/static/img/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/img/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/img/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/static/js/0.ab6ef94.js","1457c198671fea7640540aec4f9ccd61"],["/static/js/1.90554fa.js","23c200c42203ac2b44d4fc69e0ccea46"],["/static/js/10.53f9747.js","697f8527f3c43add9d364bcd433bb377"],["/static/js/11.7ed1ec2.js","686a8c1fadcfdb02798186924350ff75"],["/static/js/12.655721d.js","6b0037f93403a799714198ffc949b477"],["/static/js/13.e0fdb92.js","b54407ac9dbe9e302630e5556bf7032c"],["/static/js/14.15ecc3a.js","d7d228c3337cccacfa4e6be80fbd0d51"],["/static/js/15.5efb547.js","cc5b0fa941fded75184759b667f2ea18"],["/static/js/16.4a0e534.js","225065a1d55a40cb8f312c0d8de77608"],["/static/js/17.c56b9b9.js","3e0171d7ee2bbe2a1d42ae420177eda9"],["/static/js/18.29c0fba.js","35cd57bb3db3a86b99380536f8df5cd6"],["/static/js/19.0a24ced.js","832d1597ab0a74f84a84eb798437ae2e"],["/static/js/2.e630295.js","6f256e494b41478ffee42abf71f4826c"],["/static/js/20.7bcb708.js","5692c2e0c099a675135b257e8fae7c03"],["/static/js/21.3c78fe8.js","7e8fd883f267d49a85a74f8f7f5b29a4"],["/static/js/22.adba4b0.js","6e0b12150dcb34310b3efb10f050c396"],["/static/js/23.9cb25bf.js","ab18cb903dd5b17008404fc7a6d98e48"],["/static/js/24.394ab74.js","3f0b121263c558e63fb92e4e55611bd3"],["/static/js/25.357fc84.js","8d27f1c4250a7f3e2d8e6161d0a93b56"],["/static/js/26.d415d8a.js","90fb0bf1946eb880a9e44c13f3104acd"],["/static/js/27.e3eb1f5.js","fdf9dcf83f6c44db9163fc6ee49d0021"],["/static/js/28.1b8b35c.js","582bca823f7359c6f013333f7ccaf43e"],["/static/js/29.ad4722b.js","5c0ad0c7caef9ed4c368006e351c4588"],["/static/js/3.8eae8f4.js","d006f77be954f475741349ccd5de34f3"],["/static/js/30.6073b1e.js","717a398e84449ab8dd1c233305b3b596"],["/static/js/31.10a2278.js","528bcb55c2f2f127ea1679376edb435e"],["/static/js/32.95268c6.js","016632fdca28242ecf0ac7101e224762"],["/static/js/33.0a976e9.js","80f768023da2baa2c4b79d997d0cfe4e"],["/static/js/34.3e62716.js","4b32870e65faa2cc8cdafaa30d316b5e"],["/static/js/35.a708fa4.js","6fcece130f00e3d7180369dad5e87f26"],["/static/js/36.850448a.js","e0958024447780fe6c15d78ab4290304"],["/static/js/37.1980a67.js","934a4c38da86d7e0e6d7445daf5c0dda"],["/static/js/38.590e4b4.js","c06af673f821738c944cbba27f074cff"],["/static/js/39.4c02656.js","cc54ad6b7ba2bdbe441e22ca88a4e7e9"],["/static/js/4.c3a9e32.js","123a97cb3b7c0b53c16c6edef56a3292"],["/static/js/40.bb162e5.js","9927f8c4326fec40db6017555741944a"],["/static/js/41.ec9c45d.js","4006f1ba028859c70ae056f564ec254c"],["/static/js/42.80a06d4.js","7d82082d85fdac66780120150651e0d3"],["/static/js/43.3f3c0e6.js","c35ed2232693e6d0d3e72060d64a44c1"],["/static/js/44.16a8974.js","3be068c2800c46c971be570cffb726e3"],["/static/js/45.0698808.js","49cb0dbb255cb4403249910dd848664a"],["/static/js/46.d290fd5.js","e400855c5f414aa77e6fd5f09c2e6e66"],["/static/js/47.3c1dc76.js","57c5183904ffdf4035401ff054ec2c01"],["/static/js/48.0b83fc3.js","e2fda1784e6f724dbc58a6fe734718ba"],["/static/js/49.5d04c68.js","d2401afbba97e095dacbc857b75a619e"],["/static/js/5.1d92fd2.js","a3d7f7edfa8e8d66e9e658b4a7c3bffc"],["/static/js/50.8427ef5.js","08c3e07c25e4c857c8b55463635ccf81"],["/static/js/51.cae83e2.js","e687a7a8fbf5f0754e5090ac3a311e9a"],["/static/js/52.97e6f3d.js","0e1f822fb1df2f202ccb71cde9902be9"],["/static/js/53.80c8190.js","866f5eda2554a9f0db9fedb762d0a36f"],["/static/js/54.79fc16d.js","a27edaebc15ebc6526183995bcda9776"],["/static/js/6.1afef50.js","8400ee8d9c5795022b598bd057462644"],["/static/js/7.1ece9ed.js","ec0316703a5f43f867d46ca919e1e366"],["/static/js/8.4e70290.js","f3233fc29b60940e1ac430087e9ff8bf"],["/static/js/9.3ff6183.js","7a46b99fa71ba2160c40ab00f5bb61a9"],["/static/js/admin.544db8c.js","5b205f827d305ca3c87cd54e64e56018"],["/static/js/app.289606c.js","89cc613f0c19535c7cb2d8b9d616f3ea"],["/static/js/manifest.1a45a65.js","9a3f26730063f4b7f7f0757b70fb9657"],["/static/js/vendor.b439bb0.js","1c4278aab7302499599b32874a6b0106"]];
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







