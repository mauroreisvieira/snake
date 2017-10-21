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

var Rating = function Rating() {

    this.service = new Service();
    this.players = [];
    this.view();
};

Rating.prototype.view = function view () {
    var table = document.querySelector('.table');
    this.players = JSON.parse(this.service.getItem('players'));
    table.innerHTML = this.players.map(function (player, key) {
        return ("<tr>\n                    <td class=\"table__image\">\n                        <img src=\"" + (player.photo) + "\" alt=\"" + (player.name) + "\" title=\"" + (player.name) + "\">\n                    </td>\n                    <td class=\"table_name\">" + (player.name) + "</td>\n                    <td class=\"table__scrore\">1000 /pts</td>\n                    <td class=\"table__stars\">★★★★</td>\n                </tr>");
    }).join('');
};

new Rating();
//# sourceMappingURL=rating.js.map
