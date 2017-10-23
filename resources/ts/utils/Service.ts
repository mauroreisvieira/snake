export default class Service {

    constructor () {}

    /**
     * Method to return avatar based in email.
     * @param  {String} hash [description]
     * @param  {Number} size [description]
     * @return {[type]}      [description]
     */
    gravatar(hash : string, size : number = 200): any {
        return 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
    }

    addItem(name : string, value : string): void {
        localStorage.setItem(name, value);
    }

    getItem(item : string): string {
        return localStorage.getItem(item);
    }

    removeItem(item: string): void{
        localStorage.removeItem(item);
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
