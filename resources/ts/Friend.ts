import Util from './utils/Util';
import Service from './utils/Service';
import Firebase from './utils/Firebase';
import Storage from './utils/Storage';

class Friend {
    private util: any;
    private service: any;
    private storage: any;
    private firebase: any;
    private friends: any = {};

    constructor() {
        this.util = new Util();
        this.service = new Service();
        this.storage = new Storage();
        this.firebase = new Firebase();

        // Check if user is Auth
        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }

        // Check if user hava internet connection.
        if (this.util.online) {
            this.firebase.all('friends/' + this.storage.getItem('id')).then(response => {
                this.friends = response;
                // Updated storage with info in Firebase.
                this.storage.addItem('friends', JSON.stringify(this.friends));
                this.view();
            });
        } else {
            this.friends = JSON.parse(this.service.getItem('friends'));
            this.view();
        }
    }

    view(): void {
        console.log("VIEW");
        console.log(this.friends);
    }
}

new Friend();
