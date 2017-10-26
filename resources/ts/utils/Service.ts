import Storage from './Storage';

export default class Service {
    private storage: any;

    constructor () {
        this.storage = new Storage();
    }

    /**
    * Method to return avatar based in email.
    * @param  {String} hash
    * @param  {Number} size
    * @return {String}
    */
    gravatar(hash : string, size : number = 200): any {
        return 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
    }

    /**
     * Check if user have info in storage.
     * @return {boolean}
     */
     checkAuth(): boolean{
         var exists = true;
         if (localStorage.getItem('email') === null) {
             exists = false;
         }
         return exists;
     }

    /**
     * Remove user from storage.
    * @return void
    */
    logout(): void {
        localStorage.clear();
    }
}
