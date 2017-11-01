import Util from './services/Util';
import Service from './services/Service';
import Firebase from './services/Firebase';
import Storage from './services/Storage';

import * as React from "react";
import * as ReactDOM from "react-dom";

import RatingComponent from './components/RatingComponent';

class Rating {
    private util: any;
    private service: any;
    private storage: any;
    private firebase: any;
    private players: any = {};

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
        this.firebase.all('players').then((response: any) => {
            this.players = response;
            this.players = Object.entries(response);
            this.storage.addItem('players', JSON.stringify(this.players));

            this.players.sort(function(a, b) {
                return a[1].score - b[1].score;
            });
            // Order Players List.
            this.players.reverse();

            const data = {
                players: this.players,
            };

            ReactDOM.render(
                <RatingComponent players={data.players} />,
                document.getElementById('list-players')
            );
        });

        this.addEventListeners();
    }

    addEventListeners (): void {
        // Logout
        document.querySelector('#logout').addEventListener('click', evt => {
            evt.preventDefault();
            this.service.logout();
            this.util.redirect('index');
        });
    }
}

new Rating();
