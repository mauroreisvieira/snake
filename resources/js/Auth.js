import Service from './utils/Service.js';
import Util from './utils/Util.js';
import User from './player/User.js';

class Auth {

    constructor () {
        this.util = new Util();
        this.service = new Service();

        if (this.service.checkAuth()) {
            this.util.redirect('game');
        }
        this.form = document.querySelector('form');
        this.addEventListeners();
    }


    callback(evt) {
        console.log("callback");
        let name = evt.srcElement[0].value;
        let email = evt.srcElement[1].value;

        if (email.length > 0) {
            this.player = new User(name, email);
            this.util.redirect('game');
        }
    }

    addEventListeners () {
        this.form.addEventListener('submit', evt => {
            evt.preventDefault();
            this.callback(evt);
        });
    }
}

new Auth();
