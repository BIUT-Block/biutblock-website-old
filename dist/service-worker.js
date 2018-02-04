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

var precacheConfig = [["/static/css/admin.a05b247.css","e48cf19bb322ae9d97af83e6a0cd6c01"],["/static/img/doracms-logo.1903ff3.png","1903ff39c1fc9280155fca936fe7aa26"],["/static/js/0.04b8c12.js","d76fe8273d2127474e51f24fd4ba6e3f"],["/static/js/1.0621efe.js","7bc01da83ee5bfc57b4bd90ba2cffe04"],["/static/js/10.7961e32.js","4918dbd60f06aab802aa0304fa55829f"],["/static/js/11.bad0f7c.js","356c835c3bb05b2eb7c894694799ac6f"],["/static/js/12.e36743c.js","d65642c18b5a386eaf9f4d039a5d6a94"],["/static/js/13.ce3eaa2.js","219de906196237fbee689ebe9a32cb66"],["/static/js/14.ca6e738.js","798370bc2c4d9dbcaac535ceec2a1719"],["/static/js/15.1be4746.js","cb50dcbcda8e636453110df4269c12d4"],["/static/js/16.dab1d22.js","ec6a90214c36405ed2d71c5f0d91a372"],["/static/js/17.9c40010.js","22b915e670101b33cde1ec7b0cbfbe10"],["/static/js/18.ed1db63.js","5dd3c075bcc3f323007bec57452ac338"],["/static/js/19.dbf15d3.js","539265c3223cc997b95a27a00bfd5d7a"],["/static/js/2.e0c3a73.js","5a80f0bc0b736261f4069883baa781da"],["/static/js/20.5c4c56b.js","bfc1f7c572026020aa3d81bbf55954a5"],["/static/js/21.438e2e4.js","6319cdffdc39bac3ea32a135523da65d"],["/static/js/22.6166927.js","3ada1cd5323dc92d90bdaaa4cb7c8910"],["/static/js/23.4740f17.js","9976fc237865b0f7d9bdf30ab20a82ec"],["/static/js/24.9a2debb.js","f2c1b4e483e9450ae626a215ee235896"],["/static/js/25.553f2da.js","1662120bf4e1f42f7b26729347a6f1d9"],["/static/js/26.e503649.js","c2df0f668638956b9fe2b526999b94af"],["/static/js/27.11c7b4b.js","c3657216365789bff05a1df86051d52d"],["/static/js/28.39d2481.js","050eb233a69232dae817babe8ff23d38"],["/static/js/29.51be4a9.js","4f53be3b3952c7c1e28e946afbab89de"],["/static/js/3.eaff5cc.js","e8d2da26abe08ed3f35e4e5994101307"],["/static/js/30.79d7c13.js","b7c3166ea53769cc81427f8f46743c03"],["/static/js/31.509f00a.js","8b614b261e220b7f52ff457b7c1cb157"],["/static/js/32.19ecd4f.js","36606e1456be7d52e03c9b8a8fca48d4"],["/static/js/33.c9de95d.js","ca716052588d39762115244ae170fc36"],["/static/js/34.bbe60b5.js","08739e4d48cdcd88fb759939595fd84d"],["/static/js/35.622cb7f.js","a2ecbe54db06751c0576dc6415f7f33e"],["/static/js/36.16f4fd1.js","92141393765c02384a2b49023687045f"],["/static/js/37.4367ac1.js","8909b731cb83d82207caa2427304a94b"],["/static/js/38.f17b7c5.js","ace2ff9849227f438e45bef7c76ebb53"],["/static/js/39.8e56ba1.js","2643a07aba0fa3494998f0a555193570"],["/static/js/4.ccdfdcf.js","19f1c8ebec19d68ea49440c40e4889ae"],["/static/js/40.e3aaaaf.js","821247aaf26fa8313846597f26df1d51"],["/static/js/41.3a80e2a.js","071b5abf94a69f58aa6cf62a4f8bb3cc"],["/static/js/42.44b8a8c.js","58c3b6b8d1fd2fc844412d98c5eb7e82"],["/static/js/43.71534d2.js","ccfc74cf66cdbbb755de2d8e5d91f2ad"],["/static/js/44.ebd8aa5.js","333830b5738a30f8ea6ac6743b84e666"],["/static/js/45.ced251a.js","a3087c6ee79e1dd270f680c206fbe4a3"],["/static/js/46.b21f600.js","b141f2078ff3ea5a2592503ccfcc62a4"],["/static/js/47.feec07e.js","6aa8a0a638e3bc6bdf9396bf59d967c2"],["/static/js/48.f6f9294.js","e6c987fa82a2f754df505d830243e99d"],["/static/js/49.8810d34.js","eaa9be20eddf26da5a5b2eca86285085"],["/static/js/5.2d019e0.js","97cce41e47b73ea7fd53b02a2bb71bea"],["/static/js/50.98ac566.js","d8c6920785f5c7e4f04ca36be780de5d"],["/static/js/51.8bf620c.js","9fed94c6b30b32485938d823b330af9a"],["/static/js/6.d339045.js","b467dda0d920585c478ea24badc4c382"],["/static/js/7.5a675a9.js","c73d8d58295f59f205250d0af97ba09e"],["/static/js/8.e556eeb.js","6496cb3774ad34a46626f0758fd95b96"],["/static/js/9.c440cd8.js","84a6078a938ee514954de20b8fbc39a6"],["/static/js/admin.afeee8e.js","561b93ff8ac7bff90b24f85f839d1999"],["/static/js/element.a7ac824.js","60c1e39c05f5d703a89fe6521aa80ffd"],["/static/js/manifest.39136e0.js","2c7deccea3edd721d7633220bdcce169"],["/static/js/vendor.ae90f5f.js","4cb55416f5778c0fbcfa8ed9f436c171"]];
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







