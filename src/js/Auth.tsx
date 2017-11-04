import Util from './services/Util';
import Storage from './services/Storage';
import Firebase from './services/Firebase';
import User from './models/User';

import * as React from "react";
import * as ReactDOM from "react-dom";

export default class Auth {
    private util: any;
    private storage: any;
    private firebase: any;
    private form: any;

    constructor () {
        this.util = new Util();
        this.storage = new Storage();
        this.firebase = new Firebase();

        this.form = document.querySelector('form');
        this.addEventListeners();
    }

    login(evt: any): void {
        let name = evt.srcElement[0].value;
        let email = evt.srcElement[1].value;
        let user;
        let playerExists = false;

        if (email.length > 0) {
            this.firebase.all('players').then((response : any) => {
                // Get size of object.
                var size = Object.keys(response).length;
                if (size > 0) {
                    for (let key in response) {
                        if (response[key].email === email) {
                            playerExists = true; // alreday exists this player.
                            user = response[key]; // get info this player.
                        }
                    }
                    // If player not exists in Firebase.
                    if (!playerExists) {
                        // New User.
                        new User(name, email, Util.COLOR_SNAKE, Util.COLOR_BOARD, 0);
                    } else {
                        new User(user.name, user.email, user.color, user.theme, user.score);
                    }

                    // Redirect user to game board.
                    this.util.redirect('game');
                }
            });
        }
    }

    addEventListeners (): void {
        this.form.addEventListener('submit', (evt: any) => {
            evt.preventDefault();
            this.login(evt);
        });
    }
}

new Auth();
