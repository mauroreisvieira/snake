import Http from './services/Http';
import Util from './services/Util';
import Firebase from './services/Firebase';
import Storage from './services/Storage';

import * as React from "react";
import * as ReactDOM from "react-dom";

import RatingComponent from './components/RatingComponent';

class Rating {
    private util: any;
    private http: any;
    private storage: any;
    private firebase: any;
    private players: any = {};

    constructor() {

        this.util = new Util();
        this.storage = new Storage();
        this.firebase = new Firebase();
        this.http = new Http();

        // Check if user is Auth
        if (!this.http.checkAuth()) {
            this.util.redirect('index');
        }
        this.http.logout();

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
                id: this.storage.getItem('id')
            };

            ReactDOM.render(
                <RatingComponent players={data.players} id={data.id} />,
                document.getElementById('list-players')
            );
        });

    }
}

new Rating();
