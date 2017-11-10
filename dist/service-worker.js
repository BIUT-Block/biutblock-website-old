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

var precacheConfig = [["/static/css/admin.4bc2df0.css","2ce86ef00fe511596a9a90cfa7e7afa6"],["/static/css/app.4bc2df0.css","1ded0956d2f5f55e56750a9550111c82"],["/static/img/element-icons.27c7209.ttf","27c72091ab590fb5d1c3ef90f988ddce"],["/static/img/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/static/img/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/img/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/img/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/static/js/0.b97c46c.js","59143e55f6cfe9af25289f6a8bde36b3"],["/static/js/1.77d1ca2.js","57798a3781409bcc08734d4c6a9dd790"],["/static/js/10.a7ff7a5.js","1b90773617193d80a22ba58265fc20e6"],["/static/js/11.3258262.js","d571f5509f62021bc32b075d3a5f176b"],["/static/js/12.b48386f.js","74d6fdcddbde1855a4c134daa4d99ee3"],["/static/js/13.1675ebc.js","cf6dd6a753848d5545a69f762aab2d38"],["/static/js/14.856c387.js","d53c3d5917423bba31b00e14d02a892f"],["/static/js/15.cc20c43.js","5549239b40b7afc33ab2a789c1178d44"],["/static/js/16.1f0ad2c.js","1b881654be537526571b4dabc13787dd"],["/static/js/17.4a53d27.js","9b916228d160043e9a1ecaaf5f54b5f2"],["/static/js/18.f934167.js","36e45a2c25559b2b6bb651262b620ebd"],["/static/js/19.dfa526a.js","5d8360b4338aea2f887376d358c0a79c"],["/static/js/2.8eca385.js","43f4d904c63d951063a52a9654975e8f"],["/static/js/20.abe0471.js","ce1f3f8b81423719f3e6e7ff25025886"],["/static/js/21.0a87b07.js","1ca603c070c217c970c9837c00f83a05"],["/static/js/22.a0e6362.js","e79175fb20266af1369da28e723bdc38"],["/static/js/23.de51ff4.js","86f8976d211f8db2e9f7626052ee1343"],["/static/js/24.224a226.js","9fba85907ca83532f7ef9c83f50af0ef"],["/static/js/25.39a0300.js","1f380069c1c8420b10a9788ef021f98b"],["/static/js/26.5dd36e4.js","aec64fab0a9cad7fbedbcaeb22bbe6f4"],["/static/js/27.b40e290.js","e733b7b0b78ccb10b6728b1c8a8c8591"],["/static/js/28.4195708.js","aad7fcbaa1063cc8b85beb51a9f5279c"],["/static/js/29.853c397.js","f7ff10cbf6163c770f397c85c1b99e22"],["/static/js/3.7e2856d.js","2947537ec2381ca0fee9731e85817975"],["/static/js/30.228a57b.js","9202991b6a08b5e3121db8cac93fac88"],["/static/js/31.142b556.js","9479423fd854fe60037dc35eed230efb"],["/static/js/32.68cb202.js","8d900bcf318880727b074dfe00caeaac"],["/static/js/33.e1ca955.js","c4aadc5ae1e8b1e67061c799cbe63cb5"],["/static/js/34.06e1f96.js","9c5354399e4f0770e89a4434fb7be20e"],["/static/js/35.b36c1bc.js","1b26e7675ef1705097c3a5e8a0f475f7"],["/static/js/36.24772ec.js","55656c8e09106224f660ffa40a11f5a3"],["/static/js/37.4768d3c.js","9ecae2930cfcad2fa7b6accab360b84e"],["/static/js/38.63d2272.js","4290c4c44a33c14c0bbe9816dcbcc49c"],["/static/js/39.e90baab.js","ee449d0a6e210331998cb885a987f5df"],["/static/js/4.4f10f24.js","f3006b0d976f71709f1e254b5820fbd0"],["/static/js/40.457b2f5.js","83167a8ed387bf938c41d9c996a38730"],["/static/js/41.2e6e342.js","6d2dbbff7134acb43299a6a2b2939574"],["/static/js/42.ce8f935.js","18b2e9ef8256f0b10a26eae05c4d7e35"],["/static/js/43.40bd767.js","1bd54511178ebad06c4ee24e502d2000"],["/static/js/44.613d283.js","b5ba8ba3d3079f202200652c20b19bf3"],["/static/js/45.c92521f.js","482b6ea3653db0c8c5e464118eb3959a"],["/static/js/46.a3c00ba.js","9de21bb71c038e9f75e00911ad9e4b9c"],["/static/js/47.802b2dd.js","9a62968e2ad7045a2ac02b8d54529005"],["/static/js/48.2d0fae5.js","b20f7a7bc133ab565a5e759fa25ed7a4"],["/static/js/49.3fb0a78.js","45dfa07a778049d237dbef291bc18520"],["/static/js/5.3c894e6.js","ee300ef716939b30377f0660f08b7b50"],["/static/js/50.f1fcc87.js","5242c5908eb6adde4073f23137c43b9f"],["/static/js/51.9f851d5.js","cbe463de68701dd9f41fea7201547ced"],["/static/js/52.3119602.js","85395ea775518e6935858f419a75271d"],["/static/js/6.c29a76e.js","73c070a3d02c47a1b20fdd799e174651"],["/static/js/7.a5ced25.js","a84ababa25460bba7afe69412a5470c9"],["/static/js/8.be70a2e.js","1660631ce88cb148e2a1ce1c0f2c2473"],["/static/js/9.a97d438.js","3b7798f8d7d7359c5c040a0d578db5b7"],["/static/js/admin.01fd1b3.js","2062425a60bfcc34aeb6a04668a104c3"],["/static/js/app.4bae372.js","27bfb26e95f64cf827e276d3d31f5972"],["/static/js/manifest.d76ee7e.js","4cf8241cf7bb3bb54b29c173854961dd"],["/static/js/vendor.7ff119a.js","89f37c2d7a8cd38b226fcbbbdb46a8ff"]];
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







