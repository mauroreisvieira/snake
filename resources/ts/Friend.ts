import Util from './utils/Util';
import Service from './utils/Service';

class Friend {
    private util: any;
    private service: any;

    constructor () {

        this.util = new Util();
        this.service = new Service();

        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }
    }
}

new Friend();
