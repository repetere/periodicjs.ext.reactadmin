import UAParser from 'ua-parser-js';

export function getAdvancedBinding() {
  try {
    if (window.navigator && window.navigator.userAgent &&  typeof window.navigator.userAgent==='string') {
      if(window.navigator.userAgent.indexOf('Trident') !== -1) {
        return false;
      }
      var uastring = window.navigator.userAgent;
      var parser = new UAParser();
      parser.setUA(uastring);
      var parseUserAgent = parser.getResult();
      // console.debug({ parseUserAgent, });
      if ((parseUserAgent.browser.name === 'Chrome' || parseUserAgent.browser.name === 'Chrome WebView' ) && parseUserAgent.os.name === 'Android' && parseInt(parseUserAgent.browser.version, 10) < 50) {
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