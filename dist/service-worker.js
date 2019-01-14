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

var precacheConfig = [["/static/css/admin.eebaf7c.css","36cd481df54993d0fd4eec3fecbb75a5"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.70f087c.js","8e3690533d01c31bb7f714d315703487"],["/static/js/1.b9a9c59.js","7bf8f535ca47d7c7414dff950d913f98"],["/static/js/10.79b1f92.js","4730fc8a8e70e50b4b6ac32515cda806"],["/static/js/11.d0c242e.js","2192fd42f9a688ab7f0c98ab11f5a31c"],["/static/js/12.797af57.js","1c5c0b7c4cb8aaf0c5386325b2efe54b"],["/static/js/13.a71e691.js","5c1d7fdbdebf20fc59442ddb5984ca03"],["/static/js/14.f4a42d0.js","56437dfde3e63670270f0a47c36ece6d"],["/static/js/15.84c82ca.js","38ace4cde560ab6ed5a5bef740dfc7ff"],["/static/js/16.8a04ed4.js","ee74feb3338373f8849cda1058caeb94"],["/static/js/17.6b966dd.js","86e72228692c23d57e5c16fdc9636b01"],["/static/js/18.87df756.js","ee90a2ab5525c666a5421ab728601e8a"],["/static/js/19.4ddbe8a.js","a0cda36299ed2a2866a220efcac1c601"],["/static/js/2.d4da746.js","a0badcd527430750ff583acb422cc9ba"],["/static/js/20.3dd6302.js","ef1df596bbd124fafdd25561afa3fa73"],["/static/js/21.fa8f3c3.js","e94ee66d467de2a60943fd0a2d8ac149"],["/static/js/22.d2fe9a3.js","a75fb588aeb2fade54f0d30e398c53c9"],["/static/js/23.5b9725e.js","9e07729d6cc6ea93990fe7260c15ed8e"],["/static/js/24.7f898d4.js","dd40672e5582555c27bf00130fafaad7"],["/static/js/25.af03c75.js","f59a1863e651256d28fc84b935e13e95"],["/static/js/26.388a238.js","e183c893795e6a91d313db54c856b644"],["/static/js/27.9af7fab.js","e5053e713249a8ac11289bf7d9261a71"],["/static/js/28.1e55eaa.js","a91250df6f833af34bbd60793f4e346b"],["/static/js/29.c778c63.js","125bdd2b340d5f0c8bbdfba6471c69e8"],["/static/js/3.7c2fd40.js","c62a42b2cbfde0df3f1dcc8531248494"],["/static/js/30.cfd76e2.js","90559a672b07092535722892a37dfa54"],["/static/js/31.d9c0d5a.js","3a63840b41131656bef3583b3b22705e"],["/static/js/32.ed616d4.js","ec45793c52ecf7c23794f0a9856f4e8b"],["/static/js/33.2c3fbf2.js","6357b36b0aa7c35c23c8c3be8e93dd12"],["/static/js/34.378edde.js","ed3b58409d2cc5a49a70e48a2707ba39"],["/static/js/35.2b66609.js","a3125835d6cf0fa60f5f11d824b0674f"],["/static/js/36.db8a786.js","2a0d2fd9cb4e380b423c0a21eca79547"],["/static/js/37.407413b.js","a188e083e5f3d340dcf23c7974b0b817"],["/static/js/38.bd24730.js","2e048e1d14585684087b7993ec55cbb6"],["/static/js/39.bebed6a.js","99d22003b5a82325b86bc881bcbb096f"],["/static/js/4.6c1f303.js","60e95121e167b5fbf29a1d0890e93181"],["/static/js/40.67f4b4f.js","dc28a9bb80c04821ad4979b81e57bbff"],["/static/js/41.7e71f16.js","ca29b4494f23d33320178de9c28f5985"],["/static/js/42.9bbe249.js","882cca674db324690b015f139e4614df"],["/static/js/43.5031c0f.js","f83062bf6a7436e6246170130c38ef33"],["/static/js/44.1ab8d34.js","0f5ff1c4eca28b84725725479e0da33a"],["/static/js/45.5c35ab4.js","cdb473d763630209ef951d2917d2a028"],["/static/js/46.32bf84c.js","c6095f2a19b0970d396ec2548ad2fd99"],["/static/js/47.dde9dd5.js","c14e6b0e5a5b4224182de570902304ce"],["/static/js/48.f506826.js","e0d090190c8c9619927729ba9cfa4ae4"],["/static/js/49.1d71372.js","24037975a0330a924417b73b227d2bb9"],["/static/js/5.3993b5a.js","27c3e946ba86fe3d4ea161179814cc3f"],["/static/js/50.c418dd7.js","93e12e38f67688950ebe5eb25ee0b474"],["/static/js/51.27d73cd.js","d5172b5d330045bf3995b3366e9b2df4"],["/static/js/52.41f09e4.js","1b3f413200c961aeb2ef4b4ca5ca4351"],["/static/js/53.932db8a.js","1502d140e22e21d5ca46b3be6b75d496"],["/static/js/54.a73279d.js","b84fb88f5a22b7fb57198c0dd6e6a31d"],["/static/js/55.27e5958.js","fceb574c6aedcdd86ffbae7f50c19047"],["/static/js/56.7266043.js","9f835bbb3c54d46761476536ebcd5d94"],["/static/js/57.080f7b4.js","4d213a8716f33b0bf6f67614bcfa1cd3"],["/static/js/58.d5239f8.js","92fe3808522381c8a4e80807c7ab1955"],["/static/js/59.9cdde66.js","596df149eeb567bf357f8ed288fa7d7a"],["/static/js/6.4330b9f.js","2e44d3aea848a85ed6ce5854da8244fc"],["/static/js/7.85d3b4f.js","6d737144e1e762f8ce94b6fd54b03b4a"],["/static/js/8.d7a4a1c.js","21f8d6acde968fba1160c177b1f8ce5d"],["/static/js/9.8574945.js","2834c3a2babf14756aa6efef748efd1d"],["/static/js/admin.1810d2f.js","512842b0a8bf3ad87efe2f3728af371c"],["/static/js/manifest.229f19c.js","ce7730ec05d09d964c1fb924013714ef"],["/static/js/vendor.f4d61be.js","85ac65d93ac4842288675903a29e881f"]];
var cacheName = 'sw-precache-v3-doracms-vue2-ssr-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
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

var createCacheKey = function(originalUrl, paramName, paramValue,
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

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
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

var stripIgnoredUrlParameters = function(originalUrl,
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







