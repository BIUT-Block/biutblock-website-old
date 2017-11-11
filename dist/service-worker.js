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

var precacheConfig = [["/static/css/admin.a5dd57c.css","2ce86ef00fe511596a9a90cfa7e7afa6"],["/static/css/app.a5dd57c.css","f3738d92a4ed2a3b71f5cb4695175125"],["/static/img/element-icons.27c7209.ttf","27c72091ab590fb5d1c3ef90f988ddce"],["/static/img/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/static/img/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/img/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/img/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/static/js/0.6366757.js","465b3901cfc2c82d528e303cdf5e5018"],["/static/js/1.e3947ad.js","f01b2c4ac1c71dd5884f8e6dbbe15b3f"],["/static/js/10.e223fa6.js","1b90773617193d80a22ba58265fc20e6"],["/static/js/11.b34afa3.js","795a6531f7753562127c95d481db81e8"],["/static/js/12.0ce6104.js","d7cfb5dc0d5dff39dcfa0506d46aa769"],["/static/js/13.536f790.js","efadfcd8cd26d6ff6af5f6fe85bf9371"],["/static/js/14.2fcd2ae.js","fd5a3c5abfdde32ec1289a9c0b21703a"],["/static/js/15.a6d0a7b.js","d152b822163a825b86e732929b50b582"],["/static/js/16.a8a92f3.js","6fd6497708bbffdcb6c724323c77d7e4"],["/static/js/17.5775073.js","fa51fbf77d22e5964f0685b7192f40ad"],["/static/js/18.a204c34.js","3d985f29e9988351058639aa146a5f6f"],["/static/js/19.0e354d5.js","c772c6697aa3500fbfee6ada23eefaa3"],["/static/js/2.fc7e5df.js","e6287b907e4834548db673590688b9f3"],["/static/js/20.2515204.js","cf836ece1223ab8b9eaf9d02406e5571"],["/static/js/21.3682c5f.js","2f3d4fc602c610e38fea8e692371214c"],["/static/js/22.75bde27.js","ceb1f32cdad0fb5966dbfa92f7febf51"],["/static/js/23.b094d56.js","deb0acb4e6c971fef451dcc3d346657e"],["/static/js/24.16fd6ef.js","45de9ac46248893e48014c7cf1c2c365"],["/static/js/25.27e2e9c.js","6cc6471e6d0615e968ff8b9bffedbe6a"],["/static/js/26.3d27098.js","32e5634bece7ecfe02c87cf06f688763"],["/static/js/27.55a4a36.js","d1e7aaab67a321da1795aec3beba79f3"],["/static/js/28.812a464.js","aad7fcbaa1063cc8b85beb51a9f5279c"],["/static/js/29.f83ebb2.js","f7ff10cbf6163c770f397c85c1b99e22"],["/static/js/3.9db2252.js","15cd127d037607368ffce702b7440c62"],["/static/js/30.ec5bd85.js","0c78001539faa5e0795e443e94324984"],["/static/js/31.bc94818.js","079ee19a833184bb371378a57db46750"],["/static/js/32.ad464c5.js","ea8e6c306054279fcec976be9e76c290"],["/static/js/33.835d395.js","4ab9b2201f7ffb6a3bde42a442da37eb"],["/static/js/34.4c25dd2.js","941c9bb4db67dde846d84763d1ba03d6"],["/static/js/35.3b0b919.js","02ffe8a41cdcb67145a40dffc177df29"],["/static/js/36.40bac23.js","0be5b53f135acd69e51f16c2c9dcc47d"],["/static/js/37.25a1ac6.js","9ecae2930cfcad2fa7b6accab360b84e"],["/static/js/38.d812eca.js","4290c4c44a33c14c0bbe9816dcbcc49c"],["/static/js/39.058f13b.js","ee449d0a6e210331998cb885a987f5df"],["/static/js/4.5e8450c.js","773f2d52ea6783dca4e7f7ba21c69438"],["/static/js/40.7c2ed2f.js","83167a8ed387bf938c41d9c996a38730"],["/static/js/41.4b57e51.js","6d2dbbff7134acb43299a6a2b2939574"],["/static/js/42.cc7ceb7.js","18b2e9ef8256f0b10a26eae05c4d7e35"],["/static/js/43.329627c.js","3b22bae017e7dfa9a9d9a06dbe95b494"],["/static/js/44.0433852.js","b132932e78abb8a2441688efac122904"],["/static/js/45.20864cf.js","1524332c8a307bcc7511c70823337dc6"],["/static/js/46.1e9c673.js","ec4b979282fa93adee013a9786b40d52"],["/static/js/47.8c1078c.js","4db588385ad1a0c6e7b5e74ce09bfbf2"],["/static/js/48.f57811a.js","b26bc234ee602cb46b9bf785558bd6d4"],["/static/js/49.89978ec.js","0ca858963d6097dc9d43a218dca25785"],["/static/js/5.7f90fed.js","4d29b0ec1ceecebb93d871f38fa78312"],["/static/js/50.c1ffa82.js","aa26dfc34a69cc1789b05303e6eac0a6"],["/static/js/51.4bdf182.js","a8979a82a895ba292378513b065783f8"],["/static/js/52.209f692.js","b47ce7f44dba6b8efff773c3a68bba66"],["/static/js/6.7474be1.js","8cfd676f3d5889277c1dc0d287490cc3"],["/static/js/7.e00e79b.js","a84ababa25460bba7afe69412a5470c9"],["/static/js/8.bbdecae.js","1660631ce88cb148e2a1ce1c0f2c2473"],["/static/js/9.8af45d2.js","3b7798f8d7d7359c5c040a0d578db5b7"],["/static/js/admin.f43c0df.js","359644032f7d918aaaf10fe6a9db2ae4"],["/static/js/app.04ee75d.js","40f65afdd160c35b226f5b6265080fc3"],["/static/js/manifest.dff42b8.js","82de6b39eeab1d801cfc9e3b325d31ba"],["/static/js/vendor.bc2c3ec.js","89f37c2d7a8cd38b226fcbbbdb46a8ff"]];
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







