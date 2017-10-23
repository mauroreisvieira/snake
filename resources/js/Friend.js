import Service from './utils/Service.js';
import Util from './utils/Util.js';

class Friend {

    constructor () {

        this.util = new Util();
        this.service = new Service();

        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }

    }
}

new Friend();
