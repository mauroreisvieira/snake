export default class Service {

    constructor () {}

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
