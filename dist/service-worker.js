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

var precacheConfig = [["/static/css/admin.7fd21ce.css","b0a7c81fdb5abe7cc5319a8d1bc8f29e"],["/static/css/app.7fd21ce.css","f3738d92a4ed2a3b71f5cb4695175125"],["/static/img/element-icons.27c7209.ttf","27c72091ab590fb5d1c3ef90f988ddce"],["/static/img/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/static/img/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/img/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/img/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/static/js/0.786a3a9.js","8629599a71f8dc2bd456f393ed70baee"],["/static/js/1.1376fcd.js","a0be3aed13a8126324c960a095713bb2"],["/static/js/10.db9087e.js","e9aa3f5ad6087d9ec295ae564dce9c8b"],["/static/js/11.cffd540.js","cb3c7d565c42d12f8abd823b1a84007d"],["/static/js/12.6a3e9ba.js","4160bbb753e8200258fbad012da068be"],["/static/js/13.6330243.js","1a05d160cf89e504d367b4dd8037423b"],["/static/js/14.6e01c70.js","9837d780261dd3fc671105dde351fd83"],["/static/js/15.5500ec5.js","573deb76f6a5f2904a92fab6fc72a8c8"],["/static/js/16.5a749db.js","3cd90cda7585d87efe18b53743e1a060"],["/static/js/17.7d20a92.js","e3dc411f589af8b89d5d055d39fb58f2"],["/static/js/18.446d91a.js","216131bef509238230d9970af2893e14"],["/static/js/19.9e6d36b.js","e35e66846b4cbda809e97d5122ca3c90"],["/static/js/2.796d07e.js","bc2c29c65efaef67be296fee22d71a83"],["/static/js/20.6120b45.js","7b3170c75946eccad5a3430f412b09eb"],["/static/js/21.1bf7bb1.js","e422bba949764df6875b3006efd9e705"],["/static/js/22.33b5402.js","51a1d909d1e6a2a8aa54daa08e8a723e"],["/static/js/23.9cbf405.js","66338f3d778890bd546ed0a7786dc6ea"],["/static/js/24.87b2a21.js","cab04cc78a79bd29ec63456ba0fe6115"],["/static/js/25.bb82a96.js","4a95e9c553e350997d3f3f23e0717b30"],["/static/js/26.83517dc.js","c93e2f9e19f4d69474ed1ccd6038e56b"],["/static/js/27.33b1605.js","07fba2c9b34c303833f006d12899053a"],["/static/js/28.f539c2a.js","731759d2caab1d9abb692bfaeff4f5bd"],["/static/js/29.9abf1ee.js","2ef22c834a11da50b36755f0448ebf9a"],["/static/js/3.26ee1d0.js","c0d949ce5daf37e810eb1dd7e91bb21b"],["/static/js/30.e92a71f.js","a847c9bde6d708cf61572038115f465c"],["/static/js/31.2ac773f.js","a2d6400aeb2e31862ae4cdaca8d9dfc1"],["/static/js/32.439e80d.js","cc0145943ca5cc0724d014aed7c3f3f4"],["/static/js/33.447a51b.js","4ca6d38f5bc64de8a6e7fc09117007bb"],["/static/js/34.4e00016.js","e51f0daf7383b9a18fa5fbad9efe954a"],["/static/js/35.10b71b0.js","b24c13cfdf2402cca51819104e528aba"],["/static/js/36.f06d59f.js","5af34d346c496d92f00f147955482d04"],["/static/js/37.a8ca31d.js","6c9cc6d1ea0e992d87767388d41ce439"],["/static/js/38.be7593d.js","cfc3aff750c4a86449ecdd4be9864eea"],["/static/js/39.c970d3b.js","e586d950a2eab70826dab2af0d5a444d"],["/static/js/4.33159b8.js","1005d251f645ee943060769417885bba"],["/static/js/40.3576666.js","58e50da8349ab46f20baa1b4b8890802"],["/static/js/41.754db21.js","04dab2bd7aa67ff3622aa6649f96c83a"],["/static/js/42.3707562.js","bd82af1700e3fba32bcdf2e867adf5b1"],["/static/js/43.0e6f77f.js","6fd7de28b2942f731328f2435cd6ce47"],["/static/js/44.b0b4ca6.js","3a16d46875ec74214632dbf571a77246"],["/static/js/45.35c5d6a.js","280e60c5f6d54f9bd378b167dc5c822c"],["/static/js/46.8c978d5.js","2a2ac2b539d044a1bffa8e44dc107bb6"],["/static/js/47.9eab270.js","4aea6f3c17c94fcb2bce0f36f75b5d05"],["/static/js/48.0b53b90.js","46eaabdebcffcfa3f39b0dd71e4f7531"],["/static/js/49.b5e6ca6.js","39461787f7d53776a55df795489784c8"],["/static/js/5.63181e2.js","3f47f8e1755e5fb4ed137c72ad395bc2"],["/static/js/50.49d1f9b.js","d6899a428f4f69e54ae779c0e967bd5d"],["/static/js/51.39fefbc.js","507dd2669c9c1a425ebf0f657c4e6d89"],["/static/js/52.3efb427.js","79492a81fd3fbe335c106d24a8f1eaea"],["/static/js/53.284eaec.js","dddc36029b563b4d79d18f9781002ac7"],["/static/js/54.f82f99f.js","aa7688f3c102656701f4d146837602e2"],["/static/js/6.3a71b2d.js","f20dbbc04b98f3e96b3f78d3a9632959"],["/static/js/7.e2fca09.js","48cc77ebb97d263b5584bb93990712dd"],["/static/js/8.7826591.js","746264d433144f6874355ca03a65d27b"],["/static/js/9.3bde30c.js","af7aed213072063df5d79eb149f0200e"],["/static/js/admin.4f281a4.js","0c1d9939771dd0946b77580b797985ec"],["/static/js/app.46ff4f4.js","665a771cca1fa763dcbf5a6f61e400f1"],["/static/js/manifest.6c03243.js","10ac06ef464f424e6f3dd4d3beb865bb"],["/static/js/vendor.37df754.js","774a5335dd19dbdba8855ee8ba43acc7"]];
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







