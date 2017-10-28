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
        localStorage.clear();
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
        this.firebase.all('players').then(function (response) {
            _this.players = response;
            _this.players = Object.entries(response);
            _this.storage.addItem('players', JSON.stringify(_this.players));
            _this.view();
        });
        this.addEventListeners();
    }
    Rating.prototype.view = function () {
        var table = document.querySelector('.table');
        var loading = document.querySelector('#loading');
        this.players.sort(function (a, b) {
            return a[1].score - b[1].score;
        });
        // Order Players List.
        this.players.reverse();
        loading.classList.remove("loading--on");
        table.innerHTML = this.players.map(function (player) {
            return "<tr>\n                    <td class=\"table__image\">\n                        <img src=\"" + player[1].photo + "\" alt=\"" + player[1].name + "\" title=\"" + player[1].name + "\">\n                    </td>\n                    <td class=\"table__name\">" + player[1].name + "</td>\n                    <td class=\"table__scrore\">" + player[1].score + " /pts</td>\n                    <td><button class=\"button button--green button--icon button-add-friend\" data-id=\"" + player[0] + "\"><i class=\"icon ion-person-add\"></i></button></td>\n                </tr>";
        }).join('');
        // Bind Options
        this.bind();
    };
    Rating.prototype.bind = function () {
        var _this = this;
        document.body.addEventListener('click', function (evt) {
            var evt = evt || window.event;
            var target = evt.target || evt.srcElement;
            if (target.className.match(/button-add-friend/)) {
                _this.addToFriend(target.dataset.id);
            }
        }, false);
    };
    /**
     * Add player to list of friends.
     *
     * @param {any} id
     * @return {void}
     */
    Rating.prototype.addToFriend = function (id) {
        var myID = this.storage.getItem('id');
        console.log("id", id);
        console.log("id", this.players);
        this.firebase.all('friends/' + myID).then(function (response) {
            if (response === null) {
            }
            console.log(response);
        });
    };
    Rating.prototype.addEventListeners = function () {
        var _this = this;
        // Logout
        document.querySelector('#logout').addEventListener('click', function (evt) {
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
