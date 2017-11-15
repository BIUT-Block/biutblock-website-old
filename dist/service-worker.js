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

var precacheConfig = [["/static/css/admin.496c2c1.css","b0a7c81fdb5abe7cc5319a8d1bc8f29e"],["/static/css/app.496c2c1.css","f3738d92a4ed2a3b71f5cb4695175125"],["/static/img/element-icons.27c7209.ttf","27c72091ab590fb5d1c3ef90f988ddce"],["/static/img/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/static/img/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/img/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/img/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/static/js/0.6e75b20.js","adf445db670d6c1880975634fb4f9701"],["/static/js/1.d6a3dff.js","990571777a11fb1fa0e5df0f3421b7bc"],["/static/js/10.6a74263.js","e9aa3f5ad6087d9ec295ae564dce9c8b"],["/static/js/11.8349caf.js","55dfe6bbf78dc6fc8df6c631d855a8d6"],["/static/js/12.35dc067.js","18268c9347ca7374bed63b4a16562b85"],["/static/js/13.2abe089.js","a9534a36669e89b8f9f29c7920a7207b"],["/static/js/14.1a90161.js","97a901662ff1c6bc7a7d21cfe4395be1"],["/static/js/15.8d839f1.js","c8bb157aa082543e08c6f03dded6c859"],["/static/js/16.a6ce95c.js","a29d6d8b2f917edf8216a5a21d5819df"],["/static/js/17.8b8c88d.js","9923b14f8e7d6770a454fd146ced9b97"],["/static/js/18.e7d8f66.js","be73ef0014bfbc8c5b4b4addd5fab1da"],["/static/js/19.2a2a8ae.js","52a1184d299fd199d123cbdbcccdd130"],["/static/js/2.65989ff.js","91d4273416d257515c229b1f9e6b10b2"],["/static/js/20.8d9434f.js","1db149b685d96b15462c6744b5f5ac8b"],["/static/js/21.66b493c.js","dbe58e4a3935bc79fa54e95ad38b2493"],["/static/js/22.b23a2c0.js","f4e7c826acc6087f5205172f18ff446a"],["/static/js/23.7ff7307.js","ca95b336b22e6b7a149eb787eead2122"],["/static/js/24.4c07e8e.js","e42b54745db819159c211b1faacc8f9b"],["/static/js/25.162da11.js","55b7f8662a7f5cefd5d1da23c85c04e9"],["/static/js/26.eecbf6e.js","8992745e32e722eaa9873a44f9cd9eb6"],["/static/js/27.5dbc375.js","b5364c14c48927d9fe4641a40906f82a"],["/static/js/28.a59e3f3.js","ac3651da86deb518209ccda561610999"],["/static/js/29.3e5c4a9.js","14c896d4f39cc8caba85cec91f4efdb6"],["/static/js/3.8945ee7.js","399d6c27c6d180d2beedc7a66bec7164"],["/static/js/30.73306e7.js","a847c9bde6d708cf61572038115f465c"],["/static/js/31.a259873.js","a2d6400aeb2e31862ae4cdaca8d9dfc1"],["/static/js/32.e05a6ff.js","cc0145943ca5cc0724d014aed7c3f3f4"],["/static/js/33.fcf29ed.js","d58b166986a448dc76f8297252452728"],["/static/js/34.f5d97fa.js","9be47a7df72d88335667f50de968e121"],["/static/js/35.fcad498.js","03c0903bc2d9d7257c35194d7dd127b0"],["/static/js/36.6383420.js","79266747c44511f72466eb9b2b845c78"],["/static/js/37.abdb986.js","fbb7116f42638ff9562093cbc215dccb"],["/static/js/38.41ada8a.js","95f082d6b37c5fb01c1a36fa68f70b21"],["/static/js/39.e437e0d.js","e586d950a2eab70826dab2af0d5a444d"],["/static/js/4.df3c149.js","d8b2f283465026786a41d96c1cda756c"],["/static/js/40.1bae6b7.js","58e50da8349ab46f20baa1b4b8890802"],["/static/js/41.94e6a82.js","04dab2bd7aa67ff3622aa6649f96c83a"],["/static/js/42.b7eadf6.js","bd82af1700e3fba32bcdf2e867adf5b1"],["/static/js/43.b904d4a.js","6fd7de28b2942f731328f2435cd6ce47"],["/static/js/44.fb0987c.js","3a16d46875ec74214632dbf571a77246"],["/static/js/45.c686246.js","4e0def46f5bfbffce29e12c1011963a8"],["/static/js/46.abb5092.js","14260afb5390fcd00f98195ba8f2abf1"],["/static/js/47.adbfd80.js","165988e8dc8169163604bf871db3375d"],["/static/js/48.60543c9.js","75c8b6575a08b1f7703b05597e0bb6a1"],["/static/js/49.a9b3588.js","39edfac74052eca26019900bebc4b613"],["/static/js/5.888c6e8.js","91d930d34d8dc70638511f58587a714d"],["/static/js/50.d808e20.js","870022e34f40b44fa50196afdf50bc5e"],["/static/js/51.f8abf1b.js","7c25ba33dbe0832751362880d601d27f"],["/static/js/52.6a8ee4b.js","d418ebde787f2d24ae181b9104cae817"],["/static/js/53.f301f9c.js","903aa32b866ddc2325c1dd99bc466b50"],["/static/js/54.8a2269e.js","ad39076010770a515c99e812d4233c2d"],["/static/js/6.50647a2.js","ca655f17f584ef7bf66a457bf78730a9"],["/static/js/7.3f411b1.js","48cc77ebb97d263b5584bb93990712dd"],["/static/js/8.4f660d3.js","746264d433144f6874355ca03a65d27b"],["/static/js/9.3630997.js","af7aed213072063df5d79eb149f0200e"],["/static/js/admin.3f9db7e.js","cb38dfb895f7ab8bee1c4be316514140"],["/static/js/app.f6d0589.js","39fa740099900928dfcc276e7ccca77e"],["/static/js/manifest.13123f9.js","0a82c007ba26567cdd637aa06285f204"],["/static/js/vendor.b0bd378.js","774a5335dd19dbdba8855ee8ba43acc7"]];
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







