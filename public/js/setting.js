'use strict';

var Service = function Service () {};

Service.prototype.gravatar = function gravatar (hash, size) {
        if ( size === void 0 ) size = 200;

    return 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
};

Service.prototype.addItem = function addItem (name, value) {
    localStorage.setItem(name, value);
};

Service.prototype.getItem = function getItem (item) {
    return localStorage.getItem(item);
};

Service.prototype.removeItem = function removeItem (item) {
    localStorage.removeItem(item);
};

Service.prototype.checkAuth = function checkAuth () {
    var exists = true;
    if (localStorage.getItem('email') === null) {
        exists = false;
    }
    return exists;
};

Service.prototype.logout = function logout () {
    this.removeItem('email');
};

var Util = function Util () {};

var staticAccessors = { SPEED: {},BOARD_COLS: {},BOARD_LINES: {},KEY_PAUSE: {},KEY_UP: {},KEY_LEFT: {},KEY_RIGHT: {},KEY_DOWN: {},COLOR_SNAKE: {},COLOR_BOARD: {},COLOR_WALL: {} };

Util.prototype.rand = function rand (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

Util.prototype.redirect = function redirect (url) {
    window.location.href = './' + url + '.html';
};

staticAccessors.SPEED.get = function () {
    return 200;
};

staticAccessors.BOARD_COLS.get = function () {
    return 30;
};

staticAccessors.BOARD_LINES.get = function () {
    return 30;
};

staticAccessors.KEY_PAUSE.get = function () {
    return 32;
};

staticAccessors.KEY_UP.get = function () {
    return 38;
};

staticAccessors.KEY_LEFT.get = function () {
    return 37;
};

staticAccessors.KEY_RIGHT.get = function () {
    return 39;
};

staticAccessors.KEY_DOWN.get = function () {
    return 40;
};

staticAccessors.COLOR_SNAKE.get = function () {
    return '#607d8b';
};

staticAccessors.COLOR_BOARD.get = function () {
    return '#fff';
};

staticAccessors.COLOR_WALL.get = function () {
    return '#35f7cf';
};

Object.defineProperties( Util, staticAccessors );

var Md5 = function Md5 () {
  this.hexTab = '0123456789abcdef';
};

Md5.prototype.safeAdd = function safeAdd (x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff)
};

Md5.prototype.bitRotateLeft = function bitRotateLeft (num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
};

Md5.prototype.md5cmn = function md5cmn (q, a, b, x, s, t) {
  return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b)
};

Md5.prototype.md5ff = function md5ff (a, b, c, d, x, s, t) {
  return this.md5cmn((b & c) | (~b & d), a, b, x, s, t)
};

Md5.prototype.md5gg = function md5gg (a, b, c, d, x, s, t) {
  return this.md5cmn((b & d) | (c & ~d), a, b, x, s, t)
};

Md5.prototype.md5hh = function md5hh (a, b, c, d, x, s, t) {
  return this.md5cmn(b ^ c ^ d, a, b, x, s, t)
};

Md5.prototype.md5ii = function md5ii (a, b, c, d, x, s, t) {
  return this.md5cmn(c ^ (b | ~d), a, b, x, s, t)
};

Md5.prototype.binlMD5 = function binlMD5 (x, len) {
    var this$1 = this;

  /* append padding */
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

    a = this$1.md5ff(a, b, c, d, x[i], 7, -680876936);
    d = this$1.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = this$1.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = this$1.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = this$1.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = this$1.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = this$1.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = this$1.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = this$1.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = this$1.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = this$1.md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = this$1.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = this$1.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = this$1.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = this$1.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = this$1.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = this$1.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = this$1.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = this$1.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = this$1.md5gg(b, c, d, a, x[i], 20, -373897302);
    a = this$1.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = this$1.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = this$1.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = this$1.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = this$1.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = this$1.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = this$1.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = this$1.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = this$1.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = this$1.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = this$1.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = this$1.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = this$1.md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = this$1.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = this$1.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = this$1.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = this$1.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = this$1.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = this$1.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = this$1.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = this$1.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = this$1.md5hh(d, a, b, c, x[i], 11, -358537222);
    c = this$1.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = this$1.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = this$1.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = this$1.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = this$1.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = this$1.md5hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = this$1.md5ii(a, b, c, d, x[i], 6, -198630844);
    d = this$1.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = this$1.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = this$1.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = this$1.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = this$1.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = this$1.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = this$1.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = this$1.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = this$1.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = this$1.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = this$1.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = this$1.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = this$1.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = this$1.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = this$1.md5ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = this$1.safeAdd(a, olda);
    b = this$1.safeAdd(b, oldb);
    c = this$1.safeAdd(c, oldc);
    d = this$1.safeAdd(d, oldd);
  }

  return [a, b, c, d]
};

Md5.prototype.binl2rstr = function binl2rstr (input) {
  var i;
  var output = '';
  var length32 = input.length * 32;
  for (i = 0; i < length32; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
  }
  return output
};

/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/
Md5.prototype.rstr2binl = function rstr2binl (input) {
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
  return output
};

/*
* Calculate the MD5 of a raw string
*/
Md5.prototype.rstrMD5 = function rstrMD5 (s) {
  return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8))
};

/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/
Md5.prototype.rstrHMACMD5 = function rstrHMACMD5 (key, data) {
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
  return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128))
};

Md5.prototype.rstr2hex = function rstr2hex (input) {
    var this$1 = this;

  var output = '';
  var x;
  var i;
  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i);
    output += this$1.hexTab.charAt((x >>> 4) & 0x0f) + this$1.hexTab.charAt(x & 0x0f);
  }
  return output
};

Md5.prototype.str2rstrUTF8 = function str2rstrUTF8 (input) {
  return unescape(encodeURIComponent(input))
};

Md5.prototype.rawMD5 = function rawMD5 (s) {
  return this.rstrMD5(this.str2rstrUTF8(s))
};

Md5.prototype.hexMD5 = function hexMD5 (s) {
  return this.rstr2hex(this.rawMD5(s))
};

Md5.prototype.rawHMACMD5 = function rawHMACMD5 (k, d) {
  return this.rstrHMACMD5(this.str2rstrUTF8(k), this.str2rstrUTF8(d))
};

Md5.prototype.hexHMACMD5 = function hexHMACMD5 (k, d) {
  return this.rstr2hex(this.rawHMACMD5(k, d))
};

Md5.prototype.md5 = function md5 (string, key, raw) {
  if (!key) {
    if (!raw) {
      return this.hexMD5(string)
    }
    return this.rawMD5(string)
  }
  if (!raw) {
    return this.hexHMACMD5(key, string)
  }
  return this.rawHMACMD5(key, string)
};

var User = function User (name, email, score) {
    this.name = name;
    this.email = email;
    this.score = score;

    var hash = new Md5();
    this.hash = hash.md5(this.email);
    this.service = new Service();
    this.photo = this.service.gravatar(this.hash);

    this.service.addItem('name', this.name);
    this.service.addItem('email', this.email);
    this.service.addItem('photo', this.photo);

};

User.prototype.getPhoto = function getPhoto () {
    return this.photo;
};

var Settings = function Settings () {
    this.util = new Util();
    this.service = new Service();

    if (!this.service.checkAuth()) {
        this.util.redirect('index');
    }

    this.form = document.querySelector('form');
    this.logout = document.querySelector('#logout');

    this.view();
    this.addEventListeners();
};


Settings.prototype.view = function view () {
    var name = document.querySelector('#inputName');
    var email = document.querySelector('#inputEmail');
    var photo = document.querySelector('#photoProfile');

    name.value = this.service.getItem('name');
    email.value = this.service.getItem('email');
    photo.src = this.service.getItem('photo');
};

Settings.prototype.updateUser = function updateUser (evt) {
    console.log("updateUser");
    var name = evt.srcElement[0].value;
    var email = evt.srcElement[1].value;

    if (email.length > 0) {
        this.player = new User(name, email);
    }
};

Settings.prototype.addEventListeners = function addEventListeners () {
        var this$1 = this;

    this.form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        this$1.updateUser(evt);
    });

    this.logout.addEventListener('click', function (evt) {
        evt.preventDefault();
        this$1.service.logout();
        this$1.util.redirect('index');
    });
};

new Settings();
//# sourceMappingURL=setting.js.map
