(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var Service = (function () {
    function Service() {
    }
    /**
    * Method to return avatar based in email.
    * @param  {String} hash
    * @param  {Number} size
    * @return {String}
    */
    Service.prototype.gravatar = function (hash, size) {
        if (size === void 0) { size = 200; }
        return 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
    };
    Service.prototype.checkAuth = function () {
        var exists = true;
        if (localStorage.getItem('email') === null) {
            exists = false;
        }
        return exists;
    };
    Service.prototype.logout = function () {
        this.removeItem('email');
    };
    return Service;
}());

var Util = (function () {
    function Util() {
    }
    /**
     * Receive two number to define limit of random.
     * @param  {integer} min
     * @param  {integer} max
     * @return {integer}
     */
    Util.prototype.rand = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    /**
     * Receive array and field used to orde this array.
     * @param  {array} array
     * @param  {string} field
     * @return {integer}
     */
    Util.prototype.compare = function (array, field) {
        return array.sort(function (a, b) { return a.field !== b.field ? a.field < b.field ? -1 : 1 : 0; });
    };
    /**
     * Method to redirect to other url.
     * @param  {string} url
     * @return {void}
     */
    Util.prototype.redirect = function (url) {
        window.location.href = './' + url + '.html';
    };
    /**
  * Check if browser is connected to internet.
  * @return {boolean}
  */
    Util.prototype.online = function () {
        return navigator.onLine;
    };
    /**
    * Listen for changes to network connectivity:
    * @return {boolean}
    */
    Util.prototype.connection = function () {
        return navigator.connection;
    };
    /**
     * Method provides information about the system's battery, returns a battery promise.
     * @return {any}
     */
    Util.prototype.battery = function () {
        var batteryInfo = {};
        navigator.getBattery().then(function (battery) {
            batteryInfo = battery;
            battery.addEventListener('chargingchange', function () {
                batteryInfo = battery;
            });
        });
        return batteryInfo;
    };
    /**
     * Listen for changes to responsiveness.
     * @return {void}
     */
    Util.prototype.orientation = function () {
        console.log("ORIENTATION");
        media.addListener(function (mql) { return console.log(mql.matches); });
        // Orientation of device changes.
        window.addEventListener('orientationchange', function (e) {
            console.log(screen.orientation.angle);
        });
    };
    Util.SPEED = 200;
    Util.BOARD_COLS = 30;
    Util.BOARD_LINES = 30;
    Util.KEY_PAUSE = 32;
    Util.KEY_UP = 38;
    Util.KEY_LEFT = 37;
    Util.KEY_RIGHT = 39;
    Util.KEY_DOWN = 40;
    Util.COLOR_SNAKE = '#10A9E7';
    Util.COLOR_BLANK = '#fff';
    Util.COLOR_BOARD = '#fff';
    Util.COLOR_WALL = '#696a6b';
    return Util;
}());

var Storage = (function () {
    function Storage() {
    }
    /**
     * Save items in browser storage.
     * @param {string} name
     * @param {string} value
     * @return {void}
     */
    Storage.prototype.addItem = function (name, value) {
        localStorage.setItem(name, value);
    };
    /**
     * Get Item in storage.
     * @param  {string} item
     * @return {string}
     */
    Storage.prototype.getItem = function (item) {
        return localStorage.getItem(item);
    };
    /**
     * Remove Item in storage.
     * @param {string} item [description]
     * @return {void}
     */
    Storage.prototype.removeItem = function (item) {
        localStorage.removeItem(item);
    };
    return Storage;
}());

var Md5 = (function () {
    function Md5() {
    }
    Md5.prototype.safeAdd = function (x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    };
    Md5.prototype.bitRotateLeft = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    };
    Md5.prototype.md5cmn = function (q, a, b, x, s, t) {
        return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);
    };
    Md5.prototype.md5ff = function (a, b, c, d, x, s, t) {
        return this.md5cmn((b & c) | (~b & d), a, b, x, s, t);
    };
    Md5.prototype.md5gg = function (a, b, c, d, x, s, t) {
        return this.md5cmn((b & d) | (c & ~d), a, b, x, s, t);
    };
    Md5.prototype.md5hh = function (a, b, c, d, x, s, t) {
        return this.md5cmn(b ^ c ^ d, a, b, x, s, t);
    };
    Md5.prototype.md5ii = function (a, b, c, d, x, s, t) {
        return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);
    };
    Md5.prototype.binlMD5 = function (x, len) {
        x[len >> 5] |= 0x80 << (len % 32);
        x[((len + 64) >>> 9 << 4) + 14] = len;
        var i;
        var olda;
        var oldb;
        var oldc;
        var oldd;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;
            a = this.md5ff(a, b, c, d, x[i], 7, -680876936);
            d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = this.md5gg(b, c, d, a, x[i], 20, -373897302);
            a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = this.md5hh(d, a, b, c, x[i], 11, -358537222);
            c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = this.md5ii(a, b, c, d, x[i], 6, -198630844);
            d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = this.safeAdd(a, olda);
            b = this.safeAdd(b, oldb);
            c = this.safeAdd(c, oldc);
            d = this.safeAdd(d, oldd);
        }
        return [a, b, c, d];
    };
    Md5.prototype.binl2rstr = function (input) {
        var i;
        var output = '';
        var length32 = input.length * 32;
        for (i = 0; i < length32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
        }
        return output;
    };
    Md5.prototype.rstr2binl = function (input) {
        var i;
        var output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        var length8 = input.length * 8;
        for (i = 0; i < length8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
        }
        return output;
    };
    /*
    * Calculate the MD5 of a raw string
    */
    Md5.prototype.rstrMD5 = function (s) {
        return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));
    };
    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    Md5.prototype.rstrHMACMD5 = function (key, data) {
        var i;
        var bkey = this.rstr2binl(key);
        var ipad = [];
        var opad = [];
        var hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = this.binlMD5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5c5c5c5c;
        }
        hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
        return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));
    };
    Md5.prototype.rstr2hex = function (input) {
        var output = '';
        var hexTab = '0123456789abcdef';
        var x;
        var i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
        }
        return output;
    };
    Md5.prototype.str2rstrUTF8 = function (input) {
        return unescape(encodeURIComponent(input));
    };
    Md5.prototype.rawMD5 = function (s) {
        return this.rstrMD5(this.str2rstrUTF8(s));
    };
    Md5.prototype.hexMD5 = function (s) {
        return this.rstr2hex(this.rawMD5(s));
    };
    Md5.prototype.rawHMACMD5 = function (k, d) {
        return this.rstrHMACMD5(this.str2rstrUTF8(k), this.str2rstrUTF8(d));
    };
    Md5.prototype.hexHMACMD5 = function (k, d) {
        return this.rstr2hex(this.rawHMACMD5(k, d));
    };
    Md5.prototype.md5 = function (string, key, raw) {
        if (!key) {
            if (!raw) {
                return this.hexMD5(string);
            }
            return this.rawMD5(string);
        }
        if (!raw) {
            return this.hexHMACMD5(key, string);
        }
        return this.rawHMACMD5(key, string);
    };
    return Md5;
}());

var User = (function () {
    function User(name, email, color) {
        this.name = name;
        this.email = email;
        this.color = color;
        var hash = new Md5();
        var storage = new Storage();
        var service = new Service();
        var date = new Date().valueOf();
        this.photo = service.gravatar(hash.md5(this.email, false, false));
        this.id = hash.md5(date, false, false);
        storage.addItem('id', this.id);
        storage.addItem('name', this.name);
        storage.addItem('email', this.email);
        storage.addItem('photo', this.photo);
        storage.addItem('color', this.color);
    }
    Object.defineProperty(User.prototype, "fullName", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "userPhoto", {
        get: function () {
            return this.photo;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());

var Settings = (function () {
    function Settings() {
        this.util = new Util();
        this.service = new Service();
        this.storage = new Storage();
        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }
        this.form = document.querySelector('form');
        this.logout = document.querySelector('#logout');
        this.view();
        this.addEventListeners();
    }
    Settings.prototype.view = function () {
        var name = document.querySelector('#inputName');
        var email = document.querySelector('#inputEmail');
        var photo = document.querySelector('#photoProfile');
        var colors = document.querySelectorAll('[name="color"]');
        name.value = this.storage.getItem('name');
        email.value = this.storage.getItem('email');
        photo.src = this.storage.getItem('photo');
        var currentColor = this.storage.getItem('color');
        for (var i = 0; i < colors.length; i++) {
            colors[i].checked = false;
            if (colors[i].value === currentColor)
                colors[i].checked = true;
        }
        var colorChecked = document.querySelector('[name="color"]:checked');
        if (!colorChecked) {
            colors[0].checked = true;
        }
    };
    /**
     * Updated info user.
     * @param {any} evt
     * @return {void}
     */
    Settings.prototype.updateUser = function (evt) {
        var name = evt.srcElement[0].value;
        var email = evt.srcElement[1].value;
        var color = document.querySelector('[name="color"]:checked').value;
        if (email.length > 0) {
            new User(name, email, color);
        }
    };
    Settings.prototype.addEventListeners = function () {
        var _this = this;
        this.form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            _this.updateUser(evt);
        });
        this.logout.addEventListener('click', function (evt) {
            evt.preventDefault();
            _this.service.logout();
            _this.util.redirect('index');
        });
    };
    return Settings;
}());
new Settings();

})));
//# sourceMappingURL=setting.js.map
