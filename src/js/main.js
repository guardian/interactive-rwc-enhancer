var el = document.createElement('script');

el.src = '<%= path %>/app.js';
document.body.appendChild(el);

var parentwindow = window.parent;
var parentdoc = window.parent.window.document;

var s = parentdoc.createElement('link');
s.type = 'text/css';
s.rel = 'stylesheet';
s.href = '<%= path %>/main.css';
parentdoc.head.appendChild(s);


// Update share buttons with window location

const winLoc = window.location.href;
const shareText = window.guardian.config.page.webTitle || "Guardian interactive";

const twitterLink = 'https://twitter.com/intent/tweet?text=' + encodeURI(shareText) + '&url=' + encodeURIComponent(winLoc + '?CMP=share_btn_tw');
const facebookLink = 'https://www.facebook.com/dialog/share?app_id=180444840287&href=' + encodeURIComponent(winLoc + '?CMP=share_btn_fb');
const emailLink = 'mailto:?subject=' + encodeURIComponent(shareText) + '&body=' + encodeURIComponent(winLoc + '?CMP=share_btn_link');

const twitterEl = document.querySelector('.od-share__button--twitter a');
const facebookEl = document.querySelector('.od-share__button--facebook a');
const emailEl = document.querySelector('.od-share__button--email a'); 

twitterEl.setAttribute("href", twitterLink);
facebookEl.setAttribute("href", facebookLink);
emailEl.setAttribute("href", emailLink);



















// THIS IS A .find() Polyfill
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length"))
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}