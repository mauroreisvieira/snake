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

var Service = (function () {
    function Service() {
        this.storage = new Storage();
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
    /**
     * Check if user have info in storage.
     * @return {boolean}
     */
    Service.prototype.checkAuth = function () {
        var exists = true;
        if (localStorage.getItem('email') === null) {
            exists = false;
        }
        return exists;
    };
    /**
     * Remove user from storage.
    * @return void
    */
    Service.prototype.logout = function () {
        this.storage.removeItem('email');
    };
    return Service;
}());

var Firebase = (function () {
    function Firebase() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCnYJD53OX0pUMHIGvh_dHQZDJPpEXI_Dk",
                authDomain: "snake-c8e67.firebaseapp.com",
                databaseURL: "https://snake-c8e67.firebaseio.com",
                projectId: "snake-c8e67",
                storageBucket: "snake-c8e67.appspot.com",
                messagingSenderId: "247524654285"
            });
        }
    }
    /**
     * Push in Firabase
     * @param {string} node
     * @param {any}    list
     */
    Firebase.prototype.push = function (node, list) {
        firebase.database().ref(node).set(list);
    };
    /**
     * Set in Firabase
     * @param {string} node
     * @param {any}    list
     */
    Firebase.prototype.set = function (node, list) {
        firebase.database().ref(node).set(list);
    };
    /**
     * Updated in Firabase
     * @param {string} node
     * @param {any}    list
     */
    Firebase.prototype.update = function (node, list) {
        firebase.database().ref(node).update(list);
    };
    /**
     * Get All Items in Firebase
     * @param  {string} node
     * @return {any}
     */
    Firebase.prototype.all = function (node) {
        var promise = new Promise(function (resolve, reject) {
            firebase.app().database().ref(node).on("value", function (snapshot) {
                resolve(snapshot.val());
            });
        });
        return promise;
    };
    Firebase.prototype.destroy = function (node, key) {
        firebase.database().ref(node).child(key).remove();
    };
    return Firebase;
}());

var Rating = (function () {
    function Rating() {
        var _this = this;
        this.players = {};
        this.util = new Util();
        this.service = new Service();
        this.storage = new Storage();
        this.firebase = new Firebase();
        // Check if user is Auth
        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }
        // Check if user hava internet connection.
        // this.firebase.all('players').then(response => {
        //     this.players = response;
        //     this.storage.addItem('players', JSON.stringify(this.players));
        //     this.view();
        // });
        fetch('https://randomuser.me/api/?results=9&nat=us')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var playerList = [];
            var points = 1400;
            data.results.forEach(function (val) {
                points = _this.util.rand(100, 2000);
                playerList.push({
                    'name': val.name.first + ' ' + val.name.last,
                    'email': val.email,
                    'points': points,
                    'photo': val.picture.medium
                });
            });
            _this.players = playerList;
            _this.view();
            // this.service.addItem('players', JSON.stringify(playerList));
        });
        this.addEventListeners();
    }
    Rating.prototype.view = function () {
        var table = document.querySelector('.table');
        this.players.sort(function (a, b) {
            return a.points - b.points;
        });
        this.players.reverse();
        table.innerHTML = this.players.map(function (player) {
            return "<tr>\n                <td class=\"table__image\">\n                <img src=\"" + player.photo + "\" alt=\"" + player.name + "\" title=\"" + player.name + "\">\n                </td>\n                <td class=\"table_name\">" + player.name + "</td>\n                <td class=\"table__scrore\">" + player.points + " /pts</td>\n                <td class=\"table__stars\">\u2605\u2605\u2605\u2605</td>\n                </tr>";
        }).join('');
    };
    Rating.prototype.addEventListeners = function () {
        var _this = this;
        // Logout
        var logout = document.querySelector('#logout');
        logout.addEventListener('click', function (evt) {
            evt.preventDefault();
            _this.service.logout();
            _this.util.redirect('index');
        });
    };
    return Rating;
}());
new Rating();

})));
//# sourceMappingURL=rating.js.map
