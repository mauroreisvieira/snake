import Service from './utils/Service.js';
import Util from './utils/Util.js';
import User from './player/User.js';

class Settings {

    constructor () {
        this.util = new Util();
        this.service = new Service();

        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }

        this.form = document.querySelector('form');

        this.view();
        this.addEventListeners();
    }


    view() {
        this.form[0].value = this.service.getItem('name');
        this.form[1].value = this.service.getItem('email');
        document.querySelector('#photoProfile').src = this.service.getItem('photo');
    }

    updateUser(evt) {
        console.log("callback");
        let name = evt.srcElement[0].value;
        let email = evt.srcElement[1].value;

        if (email.length > 0) {
            this.player = new User(name, email);
        }
    }

    addEventListeners () {
        this.form.addEventListener('submit', evt => {
            evt.preventDefault();
            this.updateUser(evt);
        });
    }
}

new Settings();
