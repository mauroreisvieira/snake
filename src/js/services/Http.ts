import Storage from './Storage';
import Util from './Util';

export default class Http {
    private storage: any;
    private util: any;

    constructor () {
        this.storage = new Storage();
        this.util = new Util();
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
        // Logout
        let logout = document.querySelector('#logout');
        logout.addEventListener('click', evt => {
            evt.preventDefault();
            localStorage.clear();
            this.util.redirect('index');
        });
    }
}
