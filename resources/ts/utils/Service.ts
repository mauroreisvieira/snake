    export default class Service {

        constructor () {}

    /**
    * Method to return avatar based in email.
    * @param  {String} hash
    * @param  {Number} size
    * @return {String}
    */
    gravatar(hash : string, size : number = 200): any {
        return 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
    }

    checkAuth(): boolean{
        var exists = true;
        if (localStorage.getItem('email') === null) {
            exists = false;
        }
        return exists;
    }

    logout(): void {
        this.removeItem('email');
    }
}
