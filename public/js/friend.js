'use strict';

var Service = function Service () {};

/**
 * [gravatar description]
 * @param  {String} hash [description]
 * @param  {Number} size [description]
 * @return {[type]}  [description]
 */
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

/**
 * Receive two number to define limit of random.
 * @param  {integer} min
 * @param  {integer} max
 * @return {integer}
 */
Util.prototype.rand = function rand (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Receive array and field used to orde this array.
 * @param  {array} array
 * @param  {string} field
 * @return {integer}
 */
Util.prototype.compare = function compare (array, field) {
    return array.sort(function (a, b) { return a.field !== b.field ? a.field < b.field ? -1 : 1 : 0; });
};

/**
 * Method to redirect to other url.
 * @param  string url
 * @return void
 */
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

var Friend = function Friend () {

    this.util = new Util();
    this.service = new Service();

    if (!this.service.checkAuth()) {
        this.util.redirect('index');
    }

};

new Friend();
//# sourceMappingURL=friend.js.map
