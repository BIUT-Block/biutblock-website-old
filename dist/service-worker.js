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

var precacheConfig = [["/static/css/admin.ad4ab0e.css","7cd2f970214440480f082088c390fb20"],["/static/css/app.ad4ab0e.css","b4c53d6fc7c2f6104fce5c61ecdddcb1"],["/static/img/element-icons.27c7209.ttf","27c72091ab590fb5d1c3ef90f988ddce"],["/static/img/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/static/img/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/img/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/img/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/static/js/0.6f445b9.js","073d40104ac7d6e4eaca59e90a38374d"],["/static/js/1.abfd872.js","c9ab5075e42cb8170705cdae123e6895"],["/static/js/10.4ceba27.js","7093b7b96dcf5b509e6a8fcc7860d2b3"],["/static/js/11.467763f.js","9b12b667bd8e892a1f4011ecf50618cb"],["/static/js/12.cfa508b.js","52f7d2e4da7b5c9f0fa71b7f547d16d0"],["/static/js/13.cdb8a49.js","f1b5e4b37dba5accb43b3b90efa2671a"],["/static/js/14.df3f825.js","dd66679f5c98640de0b4ad3c03eb77fc"],["/static/js/15.7f07f56.js","1cc9141a3ca804deb82ae5cacad6ac29"],["/static/js/16.f5fbd24.js","5434318c630c967064018948260e8278"],["/static/js/17.9e16288.js","2fbcbc2d204f7721baa33500dd044f4c"],["/static/js/18.4abfd03.js","82203933491fe8fb8daa2ed9548de712"],["/static/js/19.554dec6.js","4036aecdd4f2c5d991bc6a7af5c96f59"],["/static/js/2.9448d88.js","80804c4c3c42a221252ebcd37ce4099e"],["/static/js/20.d9a9c35.js","4b7e23ba203a5919d64ed6fdaf89877e"],["/static/js/21.a05f4c5.js","830fe56486e2284509f91f6966c0862c"],["/static/js/22.adba4b0.js","6e0b12150dcb34310b3efb10f050c396"],["/static/js/23.4a76c86.js","c28a8518adf0e26a1b4967775cb90e55"],["/static/js/24.4e675a5.js","e3ab046d6974c0e54dcff362358c3618"],["/static/js/25.357fc84.js","8d27f1c4250a7f3e2d8e6161d0a93b56"],["/static/js/26.14306e5.js","5c2a7539f460c1773d04a04cf44c81a0"],["/static/js/27.e3eb1f5.js","fdf9dcf83f6c44db9163fc6ee49d0021"],["/static/js/28.47043d4.js","d0176f47df60dfb6fa0f3cf32f8cd0a4"],["/static/js/29.ad4722b.js","5c0ad0c7caef9ed4c368006e351c4588"],["/static/js/3.780a0a6.js","913a076452dc5cd3d9fcf39d306e9819"],["/static/js/30.f7e91e7.js","58edff0810148ea5259f1e9952ff98e0"],["/static/js/31.6ef15e3.js","5822327b12c74f1c3140a4aa9412214b"],["/static/js/32.7e8aa20.js","72ec65777da3d0e3a3c7a8a263027c81"],["/static/js/33.c9337b3.js","bf92efe18a5056aeb4d242affeca2c2e"],["/static/js/34.be582fc.js","a4815634be7554dfc9b08e37db5c47b1"],["/static/js/35.ba58434.js","deb224a7aad9b2871e61dcdd9693f5d6"],["/static/js/36.ed5a44d.js","b0886e4998a40701be4db0e0181f01f3"],["/static/js/37.6295c43.js","ed592f08d36eaf8466948810dae74dc2"],["/static/js/38.150bd99.js","2ce4a5cf461a780a5253b581126b4e31"],["/static/js/39.c43cb7d.js","346a7acc9cddc0ed412d600a86667ce6"],["/static/js/4.2eb60cc.js","ee143bc4d86b1078e4f9ce37bd9a2770"],["/static/js/40.780c44a.js","c8ce5b447ffc7ca11da82f2155506627"],["/static/js/41.e6345fa.js","a7c1dd826a99c7f2b6a5dc577d89a90e"],["/static/js/42.c81202c.js","f33ad043413ccba5b84b39de1aa6c07b"],["/static/js/43.6e37344.js","dc437d04a6b682311813cee861925ca4"],["/static/js/44.da727a3.js","0838ea7d833158e48d308bb26e37dd7c"],["/static/js/45.041814a.js","c1e117389b35a1dbabc2cdfc43f37bf4"],["/static/js/46.4b61a90.js","acc7e5b2f115a23268e138dfabd92c29"],["/static/js/47.6c2f181.js","d324d376ee84b81e268792990e69418c"],["/static/js/48.21558d1.js","10d8ea8aae51a82a5e42a3bf4f70d08e"],["/static/js/49.0133e10.js","2f1922e57ed0ac4f6ae26ce198fd51ed"],["/static/js/5.862a9d1.js","750424944cecc69d8e68001d62a05628"],["/static/js/50.c169024.js","37782a67e0b3628aa76fe6683025d408"],["/static/js/51.2dded82.js","ebfe00cc8c97960e1256b175aade0beb"],["/static/js/52.efca9d0.js","ea137f355b7f0b28f1e2e4aa6e611377"],["/static/js/53.a45b5e5.js","9de8f274ff62adc9825acc458fb9b9ea"],["/static/js/54.8d4ded2.js","cae8ae825ff09e4f1048ef42373e840a"],["/static/js/6.abdc310.js","67ab4e961177ab3f6a91b15be9c3c48b"],["/static/js/7.277268d.js","d9adf92f774efbd6207235fa8dc37cea"],["/static/js/8.bdb12b5.js","d85662d44e5f9b21bae61a331263e78c"],["/static/js/9.da98653.js","54575ac5a9f8fcf8a52e63589ac81f2e"],["/static/js/admin.544db8c.js","5b205f827d305ca3c87cd54e64e56018"],["/static/js/app.fe9b392.js","3317482c638852937c6884a4fde7b167"],["/static/js/manifest.ffadb7d.js","e1a4234c822f183615f01cb4749c2b0e"],["/static/js/vendor.b439bb0.js","1c4278aab7302499599b32874a6b0106"]];
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







