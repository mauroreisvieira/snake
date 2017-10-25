import Service from './utils/Service';
import Util from './utils/Util';
import User from './player/User';

class Auth {
    private util: any;
    private service: any;
    private form: any;

    constructor () {
        this.util = new Util();
        this.service = new Service();

        if (this.service.checkAuth()) {
            this.util.redirect('game');
        }
        this.form = document.querySelector('form');
        this.addEventListeners();
    }


    login(evt: any): void {
        let name = evt.srcElement[0].value;
        let email = evt.srcElement[1].value;

        if (email.length > 0) {
            new User(name, email, this.util.COLOR_SNAKE); // Need update user information in Firebase.
            this.util.redirect('game');
        }
    }

    addEventListeners (): void {
        this.form.addEventListener('submit', evt => {
            evt.preventDefault();
            this.login(evt);
        });
    }
}

new Auth();
