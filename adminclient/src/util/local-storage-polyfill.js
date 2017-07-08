// Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
// throw QuotaExceededError. We're going to detect this and just silently drop any calls to setItem
// to avoid the entire page breaking, without having to do a check at each usage of Storage.
if (typeof localStorage === 'object') {
    try {
        localStorage.setItem('localStorage', 1);
        localStorage.removeItem('localStorage');
    } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function () { };
      (function (isStorage) {
    if (!isStorage) {
        var data = {},
            undef;
        window.localStorage = {
            setItem     : function(id, val) { return data[id] = String(val); },
            getItem     : function(id) { return data.hasOwnProperty(id) ? data[id] : undef; },
            removeItem  : function(id) { return delete data[id]; },
            clear       : function() { return data = {}; }
        };
    }
})((function () {
    try {
        return "localStorage" in window && window.localStorage != null;
    } catch (e) {
        return false;
    }
})());
        alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
    }
}