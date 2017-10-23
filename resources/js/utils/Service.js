export default class Service {

    constructor () {}

    /**
     * [gravatar description]
     * @param  {String} hash [description]
     * @param  {Number} size [description]
     * @return {[type]}      [description]
     */
    gravatar(hash, size = 200) {
        return 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
    }

    addItem(name, value) {
        localStorage.setItem(name, value);
    }

    getItem(item) {
        return localStorage.getItem(item);
    }

    removeItem(item) {
        localStorage.removeItem(item);
    }

    checkAuth() {
        var exists = true;
        if (localStorage.getItem('email') === null) {
            exists = false;
        }
        return exists;
    }

    logout() {
        this.removeItem('email');
    }
}
