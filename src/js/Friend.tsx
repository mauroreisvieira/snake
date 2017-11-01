import Util from './services/Util';
import Service from './services/Service';
import Firebase from './services/Firebase';
import Storage from './services/Storage';

import * as React from "react";
import * as ReactDOM from "react-dom";

import FriendComponent from './components/FriendComponent';

class Friend {
    private util: any;
    private service: any;
    private firebase: any;
    private storage: any;
    private friends: any = {};

    constructor() {
        this.util = new Util();
        this.service = new Service();
        this.firebase = new Firebase();
        this.storage = new Storage();

        // Check if user is Auth
        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }

        this.firebase.all('players').then(response => {
            this.friends = response;
            this.friends = Object.entries(response);
            this.storage.addItem('friends', JSON.stringify(this.friends));

            const data = {
                players: this.friends,
            };

            ReactDOM.render(
                <FriendComponent friends={data.players} />,
                document.getElementById('list-friends')
            );
        })

        this.addEventListeners();
    }

    addEventListeners(): void {
        // Logout
        let logout = document.querySelector('#logout');
        logout.addEventListener('click', evt => {
            evt.preventDefault();
            this.service.logout();
            this.util.redirect('index');
        });
    }
}

new Friend();
