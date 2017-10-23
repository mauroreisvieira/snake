import Service from './utils/Service';
import Util from './utils/Util';
import User from './player/User';

class Settings {
    private util: any;
    private service: any;
    private form: any;
    private logout: any;

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

        let name = evt.srcElement[0].value;
        let email = evt.srcElement[1].value;

        if (email.length > 0) {
            new User(name, email);
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
