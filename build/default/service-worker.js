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

var precacheConfig = [["/bower_components/app-route/app-location.html","e3bd813962e634bd71009586ddd39db1"],["/bower_components/app-route/app-route-converter-behavior.html","5ed794fad917e6c6cae8ecc2da6a1840"],["/bower_components/app-route/app-route.html","25c486d42a8a5370b7f636c77f3aea78"],["/bower_components/font-roboto/roboto.html","196f915c2bb639c50e0748d057754841"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","7da2a1b06dbf5fc05631df208da0ba8b"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","26309806bc5a08dab92ec43a33bf85ad"],["/bower_components/iron-behaviors/iron-button-state.html","69eabb470fcadef4e70ff50a09bedafc"],["/bower_components/iron-behaviors/iron-control-state.html","c206f87dd46f347d33c37004913a24b1"],["/bower_components/iron-flex-layout/iron-flex-layout.html","d209230aa135c45c817b0deacd4fe0cf"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","729d7e9d023843e50ec4d04d66b4376e"],["/bower_components/iron-icon/iron-icon.html","531c4dce3ccc0ca17182d137fb82e2f7"],["/bower_components/iron-icons/iron-icons.html","263c425f0e794d1e2fd636f8039a8586"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","df2b26b9f276a709bfe9e75d5f46fbfa"],["/bower_components/iron-input/iron-input.html","5c723fffebe679215012b380bb3d825e"],["/bower_components/iron-location/iron-location.html","632fb5f2d963b7096f3ee6786bef3bf4"],["/bower_components/iron-location/iron-query-params.html","7af5593d2603020de94ba9e63af91b5b"],["/bower_components/iron-meta/iron-meta.html","9a240eda67672e29b82e15898a9619d1"],["/bower_components/iron-pages/iron-pages.html","82d5debc56ced36961be39a181280795"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","369445436b6316b3ce3a36621808e152"],["/bower_components/iron-selector/iron-selectable.html","a179d62580cfdf7c022dcdf24841487a"],["/bower_components/iron-selector/iron-selection.html","3343a653dfada7e893aad0571ceb946d"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","276f0be293659b862bc108eabfdb04e5"],["/bower_components/paper-behaviors/paper-button-behavior.html","1b832001d3a6001ddeb2380e4b5bee47"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","26f84434724812da0631633cdd54676e"],["/bower_components/paper-button/paper-button.html","62bf2d88f8ce996c95502a364a2ccfd9"],["/bower_components/paper-fab/paper-fab.html","5385b4d4b440b9060b4d19335146e1a7"],["/bower_components/paper-input/paper-input-addon-behavior.html","2a44f95760e14f00e2edef2941dc3a01"],["/bower_components/paper-input/paper-input-behavior.html","5414ca3c1c15e9914a016e5dc42253d0"],["/bower_components/paper-input/paper-input-char-counter.html","0b700395d284f73e0d5fefb8ecc97786"],["/bower_components/paper-input/paper-input-container.html","449870d5e326ce0057df9453c320e3ea"],["/bower_components/paper-input/paper-input-error.html","ea91878f0704d294c5f7a9090852aba5"],["/bower_components/paper-input/paper-input.html","a2e412908d2b65105baad3f07728dfe1"],["/bower_components/paper-material/paper-material-shared-styles.html","96e347b417f6c92a317813cc08a23c8d"],["/bower_components/paper-ripple/paper-ripple.html","ab48a97fb99a146ad6eff4bf3e6d0ad8"],["/bower_components/paper-styles/color.html","731b5f7949a2c3f26ce829fd9be99c2d"],["/bower_components/paper-styles/default-theme.html","9e845d4da61bd65308eb8e4682cd8506"],["/bower_components/paper-styles/element-styles/paper-material-styles.html","5ec8869184ed32a11ed066818aa05dc1"],["/bower_components/paper-styles/shadow.html","17203fd5db371a3e5cb4efabb11951f9"],["/bower_components/paper-styles/typography.html","dc2b6f8af5ebcb16a63800b46017a08a"],["/bower_components/paper-toolbar/paper-toolbar.html","4ced0a25dc09a3aaff5433c50b3fa387"],["/bower_components/polymer/polymer-micro.html","51bf9669120232f00691f897cd456e35"],["/bower_components/polymer/polymer-mini.html","70300bbedb25a0e0fa086ad307a45117"],["/bower_components/polymer/polymer.html","fcfd1ca7766ad2fc9845a9f5d7d7c8ce"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/index.html","74af3c5424e5097bbf44f4d5ddce780d"],["/src/chat-page/chat-page.html","fc1a907ce44a4d93881685c06b9f308d"],["/src/css/chat.css","136bdafe39bcf35a3a55acf63733f231"],["/src/css/login.css","57b168a0c2fac6fb89de2c25989718d5"],["/src/css/main.css","f725de47559284e68a300c52d8026e28"],["/src/js/NetworkUtils.js","e30453ea9b9c2733b41b1d49b935b70b"],["/src/login-page/login-page.html","63632e82c995a99e87979988e04a0b3a"],["/src/main-app/main-app.html","cf8fad3f94100d9c24da87177090c111"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
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
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
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
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
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

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
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
    var navigateFallback = 'index.html';
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







