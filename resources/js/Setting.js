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
        this.logout = document.querySelector('#logout');

        this.view();
        this.addEventListeners();
    }


    view() {
        const name = document.querySelector('#inputName');
        const email = document.querySelector('#inputEmail');
        const photo = document.querySelector('#photoProfile');

        name.value = this.service.getItem('name');
        email.value = this.service.getItem('email');
        photo.src = this.service.getItem('photo');
    }

    updateUser(evt) {
        console.log("updateUser");
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

        this.logout.addEventListener('click', evt => {
            evt.preventDefault();
            this.service.logout();
            this.util.redirect('index');
        });
    }
}

new Settings();
