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

var precacheConfig = [["/static/css/admin.1615b28.css","7cd2f970214440480f082088c390fb20"],["/static/css/app.1615b28.css","f04305728e74995f0617ebbf835c4fff"],["/static/img/element-icons.27c7209.ttf","27c72091ab590fb5d1c3ef90f988ddce"],["/static/img/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/static/img/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/img/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/img/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/static/js/0.dc8fd85.js","9b06aa24ec5ce7a48d600fa6628c5e1c"],["/static/js/1.76acab6.js","326eb3c369b969fad62a8c370ad16cc9"],["/static/js/10.8202b09.js","c7db2171f62cca0b529f90852b04a71f"],["/static/js/11.9621ab0.js","f45093e4b2db1c2f85e7faddefeaba31"],["/static/js/12.550df89.js","c08bf4948414b0b16ec68200c1f05885"],["/static/js/13.caa66a4.js","d70e1f73b425a977f1fb978a72061ce3"],["/static/js/14.c8aa458.js","6c53a213c00fcafe0b603b5efff4d3ce"],["/static/js/15.5317c93.js","d4b7e211af5e733fff56c781d158de9c"],["/static/js/16.573d589.js","d45d5c55d9d3e8364c241b9384350265"],["/static/js/17.13f5a52.js","7aefde548ce635dd83d53982823ecafa"],["/static/js/18.4b53495.js","5df08a2a5085205d9ec078fdea1fd6ca"],["/static/js/19.66a41d6.js","59bee5d03023ee8520ff45cddb50d490"],["/static/js/2.126e724.js","c450c32ad955fdc39409b05292a2bc42"],["/static/js/20.c6fc095.js","e528ddfb6b8ea5d60b38805c0271d28b"],["/static/js/21.ab2b955.js","622a59cb6f10ffa8d3d9adbbe90b86af"],["/static/js/22.7f0dec3.js","98f45f150e695bf25fe6cb5edda7caf5"],["/static/js/23.1ea833e.js","b9a76480114a301cf000d64a096cd538"],["/static/js/24.a82818e.js","707be05808bbf9c793af304d20c69165"],["/static/js/25.d423141.js","00026ccb64ebd876fa0315ad74a3def6"],["/static/js/26.d7f511b.js","c754fb113a1b96d4e6036c191fc50eee"],["/static/js/27.5158c43.js","9c631689f0639e48f3169bd745636821"],["/static/js/28.30099eb.js","13c8f5ce301220109f0a7a020e9fa728"],["/static/js/29.69c7112.js","75eb0ed50f699591e1e1c3a1c8272e0d"],["/static/js/3.6766567.js","a0b6923ec576042da487d95edad39f76"],["/static/js/30.38dfe66.js","028713869b39773f525b16bda9417e86"],["/static/js/31.b2b1905.js","e9e2e5e5291176fdcff4d5976499aaa9"],["/static/js/32.aae8b0b.js","768cd75a195d5294a7b32094d185f162"],["/static/js/33.89dc4fa.js","e8242c53ccbcfb009f6d6b90f171d36c"],["/static/js/34.7fda358.js","5c69e5dcc47ffef995e06b904ffbce73"],["/static/js/35.f6e9cda.js","46d506e09d39e3c7251b376996046165"],["/static/js/36.4f5f6ce.js","b46179c3a54844bbbb8519d6f9718b4c"],["/static/js/37.039338b.js","9dcd7be9a327505a4af96f5711c0443c"],["/static/js/38.c923cd7.js","571502c6decd8588ae5c295feb636386"],["/static/js/39.e7c37b5.js","b63cb8f34ece08d465d3ce582c97e060"],["/static/js/4.82f5cb4.js","6a237a370e8a291b3e82a1c6a4261083"],["/static/js/40.b6daca5.js","2bbe9372003261676e3b897ee3545ef1"],["/static/js/41.4036892.js","c3a8fc79ca37552856e385a524139946"],["/static/js/42.27385a8.js","b07e0acac76902a90905615f7be9e053"],["/static/js/43.c6ac695.js","0425d41b1541dbce1e69f6eba22e21f3"],["/static/js/44.cff6b87.js","0f065cebfdff3264743cca624f497891"],["/static/js/45.634b2c9.js","e144ad619deceb39f27aa66fe6e06d82"],["/static/js/46.09a5541.js","86b4efcacf1a9a65144a30edf6a51f14"],["/static/js/47.b85b7d5.js","9ac9ea9f87a06feb98e920922e178c62"],["/static/js/48.efd5ebe.js","40ac63a3237bc342b02e03c7ddeaec25"],["/static/js/49.cc8bab2.js","e2b159a9a7865448501bd16497d91d0c"],["/static/js/5.fdbbe40.js","2ec950742864b37f54cdac618ccb517e"],["/static/js/50.db2a332.js","9004aeeb970bc8676f3b5fa4b3b225b7"],["/static/js/51.071d21c.js","00868b3d4113754986111dccc1d1c9a6"],["/static/js/52.90913c2.js","063f9e6b25cd525152b1e7708160f7a9"],["/static/js/53.e1ed711.js","eee8feaa6a8464d2cdca26fa84fecd20"],["/static/js/54.a47700e.js","f6c44054485442fd19e74d5dcd624a5b"],["/static/js/55.37d7218.js","9c8978a0a9eb50124ed246f744e3a688"],["/static/js/6.2187682.js","4207f72f740d0b2a0a287d9a9b7c49dd"],["/static/js/7.14a9b33.js","71ed564c4734d357a6ef7eee36996466"],["/static/js/8.94283b7.js","c617499082092e02584e4f182a9dc5c0"],["/static/js/9.acabb65.js","bdc90a65aaf587c932a00d62fa152177"],["/static/js/admin.fe01f15.js","c58239f23fb0ae7a2256a1f84078df18"],["/static/js/app.d0f6087.js","c04ae90b2b6bfad458072537e4468dc5"],["/static/js/manifest.73305f6.js","61948e5d38db5107867c1bbf33876511"],["/static/js/vendor.190c5e2.js","ad147e55d263bb0e81925e24d8e95896"]];
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







