'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAdvancedBinding = getAdvancedBinding;

var _uaParserJs = require('ua-parser-js');

var _uaParserJs2 = _interopRequireDefault(_uaParserJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAdvancedBinding() {
  try {
    if (window.navigator && window.navigator.userAgent && typeof window.navigator.userAgent === 'string') {
      if (window.navigator.userAgent.indexOf('Trident') !== -1) {
        return false;
      }
      var uastring = window.navigator.userAgent;
      var parser = new _uaParserJs2.default();
      parser.setUA(uastring);
      var parseUserAgent = parser.getResult();
      // console.debug({ parseUserAgent, });
      if ((parseUserAgent.browser.name === 'Chrome' || parseUserAgent.browser.name === 'Chrome WebView') && parseUserAgent.os.name === 'Android' && parseInt(parseUserAgent.browser.version, 10) < 50) {
        return false;
      }
      if (parseUserAgent.browser.name === 'Android Browser') {
        return false;
      }
    }
  } catch (e) {
    console.warn('could not detect browser support', e);
    return false;
  }
  return true;
}