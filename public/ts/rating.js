(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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
     * @param  string url
     * @return void
     */
    Util.prototype.redirect = function (url) {
        window.location.href = './' + url + '.html';
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
    Service.prototype.addItem = function (name, value) {
        localStorage.setItem(name, value);
    };
    Service.prototype.getItem = function (item) {
        return localStorage.getItem(item);
    };
    Service.prototype.removeItem = function (item) {
        localStorage.removeItem(item);
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

var Rating = (function () {
    function Rating() {
        this.players = {};
        this.util = new Util();
        this.service = new Service();
        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }
        this.view();
    }
    Rating.prototype.view = function () {
        var table = document.querySelector('.table');
        this.players = JSON.parse(this.service.getItem('players'));
        // Sort Array
        this.players.sort(function (a, b) {
            return a.points - b.points;
        });
        this.players.reverse();
        table.innerHTML = this.players.map(function (player) {
            return "<tr>\n                    <td class=\"table__image\">\n                        <img src=\"" + player.photo + "\" alt=\"" + player.name + "\" title=\"" + player.name + "\">\n                    </td>\n                    <td class=\"table_name\">" + player.name + "</td>\n                    <td class=\"table__scrore\">" + player.points + " /pts</td>\n                    <td class=\"table__stars\">\u2605\u2605\u2605\u2605</td>\n                </tr>";
        }).join('');
    };
    return Rating;
}());
new Rating();

})));
//# sourceMappingURL=rating.js.map
