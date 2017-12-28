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

var precacheConfig = [["/static/css/admin.69fe2a7.css","7cd2f970214440480f082088c390fb20"],["/static/css/app.69fe2a7.css","866c24a96f666a161a77391815518cc1"],["/static/img/element-icons.27c7209.ttf","27c72091ab590fb5d1c3ef90f988ddce"],["/static/img/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/static/img/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/img/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/img/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/static/js/0.8e19061.js","2507b0648a6eb42293ee9bfb52f33cb4"],["/static/js/1.392e25f.js","d77bcc9a0cb061d3a65b94c50ce1acd1"],["/static/js/10.54cd20c.js","4232079387a1072e5cd5f5bc7a9a5751"],["/static/js/11.f54e486.js","3ad27a03edd1137c8c5d20b3df34687c"],["/static/js/12.0f42001.js","f4441703ba35b68690215afe67073e31"],["/static/js/13.e15e0f0.js","47a2b9c5ce4c725623063ab10f9799ab"],["/static/js/14.f1febdb.js","7b34d656fbf977f2e37155aeb36533e9"],["/static/js/15.0ff93b5.js","97527222f92f2b3c1e0c2b8ebdd044e7"],["/static/js/16.9539aa3.js","a7783a948609c3e48d8e75ac45797d28"],["/static/js/17.3b84205.js","13bd1bc68ad179df16976dc7c2fec340"],["/static/js/18.3d49a88.js","cf3a50e0a6131cbec99e822192935280"],["/static/js/19.b43fc16.js","461b5412c47e6b432f5a75057854c234"],["/static/js/2.250e915.js","dc40b30f1e564e192ee29479597566a6"],["/static/js/20.9c067f3.js","d9cf06ba9af62e0af9526930a7acec66"],["/static/js/21.29cb08a.js","37b9db9b54996a156beef301cf3634f9"],["/static/js/22.db6ee1f.js","5cf5198b149f945f3c7f8a14fe4bd7e5"],["/static/js/23.0d2a89e.js","b3e9d6290af9d44329d2f5fad89d242b"],["/static/js/24.b1735b0.js","7f21310186233b457e6740dc649d791f"],["/static/js/25.fad87cd.js","c84d2c1f9a4bae5883403fa38ecd0a39"],["/static/js/26.7512587.js","8bb47c4b56a5abf1ccd8fbf71b27cd0b"],["/static/js/27.fdd608f.js","e2b3237f3f31204b1a147bb7966a9a67"],["/static/js/28.2e9974b.js","24e8672f2779f8c487e8441c0c10505a"],["/static/js/29.d32f232.js","a2d806d3fc78387dbe75f4f9759355d6"],["/static/js/3.8a119f7.js","f4b6a827ca96e22417921e79511614ec"],["/static/js/30.5119cc9.js","296bc04edef547abb04cd58ef1dbbaa7"],["/static/js/31.40e8c58.js","a20dec8335ad94bc291e8c5f2ddba484"],["/static/js/32.9bb1fc1.js","5cfa62d044a5a3809f19262bf479a1ca"],["/static/js/33.9931ecb.js","8b5ecac169b070489ac543b8d8ecb5c0"],["/static/js/34.131e07f.js","d2df859e9f102088b50a730dc28c5c7f"],["/static/js/35.e2ebbf2.js","a18ee86d624dcfcd34842fce4b3579f3"],["/static/js/36.febd3d8.js","16bc06c4ace836c66565afcf11a2dfa6"],["/static/js/37.107e832.js","de56dda5c120f76a64313aff09f1ab1e"],["/static/js/38.f81f704.js","b7b696152381d1e0b7cdda5dce303b0f"],["/static/js/39.7da16c0.js","b8deae973272ae6d56b864cb3cc5710e"],["/static/js/4.dcb2f60.js","a4e93fa702f0070f77f68ea86516bbf2"],["/static/js/40.3ce716b.js","0dd8d2b68739eda3011259918ab0d8cb"],["/static/js/41.6b5b6e1.js","d81a0e04d45c21c77d9d02eb5665e294"],["/static/js/42.3f84d78.js","e688861d16ca0bc2dfa21fa9a505350d"],["/static/js/43.178c1a2.js","a23bb41e3ccb25c950080a45396c715d"],["/static/js/44.67d2bec.js","b1b312394373bee587e5005aebb106d2"],["/static/js/45.b3d384a.js","74bf8dac042c49b523b6b51a51f51687"],["/static/js/46.642269e.js","812623370fce504f7b3e86751508dd37"],["/static/js/47.1c877a7.js","95b0089e6d2058f32ab0222d41332468"],["/static/js/48.c118740.js","1cd5409a2348d6e295f8f61cb0d03fff"],["/static/js/49.2f6acd7.js","166430d21a9e358be6dadc232f939baa"],["/static/js/5.009f221.js","d076267997ba1fc1a43accae305b495d"],["/static/js/50.5ae6ae9.js","0ebaff5cd658db1339e38ac677d5c4b2"],["/static/js/51.9626f7f.js","2d66f8d9728710243e8a5e080a551f20"],["/static/js/52.fe31795.js","a4d21efd4127e824f3ad7b23340e963b"],["/static/js/53.be09b91.js","335793e2efd9e58766a570bab74ba56d"],["/static/js/54.e1cf130.js","f6775d08f55a55ac8b48e38d34c2e168"],["/static/js/55.e762706.js","9efaba0455686afe6e1202dfddc41b14"],["/static/js/56.f84e2f8.js","082161d6634b85a25d57039cbe67ceeb"],["/static/js/6.30d6708.js","03b077b0d75e9bb8178b1b7a73f4ed45"],["/static/js/7.b446994.js","1bdd5781e070f63978f52fff32435e52"],["/static/js/8.189452d.js","63db7c90df32d832279d00ac22d0123d"],["/static/js/9.3d2e597.js","d842e34ff84506a281e9fbd797481409"],["/static/js/admin.cec6688.js","3840afd5e3de5a88056addb325dbcd40"],["/static/js/app.577bb7b.js","5e10aea926e10666620ab7f36db41c05"],["/static/js/index.84eb39e.js","4b70d66e6ca93410b4eae2bffc2b0788"],["/static/js/manifest.be0e2f9.js","ce1dd4cba58bcfe10e39601e6710221b"],["/static/js/vendor.1c11c5d.js","603f59074e5923af28a13558f5e935e4"]];
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







