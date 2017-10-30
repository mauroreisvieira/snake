import Util from './services/Util';
import Service from './services/Service';
import Firebase from './services/Firebase';
import Storage from './services/Storage';

import * as React from "react";
import * as ReactDOM from "react-dom";

import {RatingComponent} from './components/RatingComponent';

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
        this.firebase.all('players').then(response => {
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
                <RatingComponent friends={data.players} />,
                document.getElementById('list-players')
            );
        });

        this.addEventListeners();
    }

    view(): void {
        const table = document.querySelector('.table');
        const loading = document.querySelector('#loading');

        this.players.sort(function(a, b) {
            return a[1].score - b[1].score;
        });
        // Order Players List.
        this.players.reverse();
        loading.classList.remove("loading--on");
        table.innerHTML = this.players.map((player) => {
            return `<tr>
                    <td class="table__image">
                        <img src="${player[1].photo}" alt="${player[1].name}" title="${player[1].name}">
                    </td>
                    <td class="table__name">${player[1].name}</td>
                    <td class="table__scrore">${player[1].score} /pts</td>
                    <td><button class="button button--green button--icon button-add-friend" data-id="${player[0]}"><i class="icon ion-person-add"></i></button></td>
                </tr>`;
        }).join('');

        // Bind Options
        this.bind();
    }

    bind() : void {
        document.body.addEventListener('click', evt => {
            let evt = evt || window.event;
            var target = evt.target || evt.srcElement;
            if (target.className.match(/button-add-friend/)) {
                this.addToFriend(target.dataset.id);
            }
        }, false);
    }

    /**
     * Add player to list of friends.
     *
     * @param {any} id
     * @return {void}
     */
    addToFriend(id: any) : void {
        let myID = this.storage.getItem('id');
        console.log("id", id);
        console.log("id", this.players);
        this.firebase.all('friends/' + myID).then(response => {
            if (response === null) {

            }
            console.log(response);
        });
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
