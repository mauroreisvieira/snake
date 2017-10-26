import Util from './utils/Util';
import Service from './utils/Service';
import Firebase from './utils/Firebase';
import Storage from './utils/Storage';

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
        // this.firebase.all('players').then(response => {
        //     this.players = response;
        //     this.storage.addItem('players', JSON.stringify(this.players));
        //     this.view();
        // });

        fetch('https://randomuser.me/api/?results=9&nat=us')
        .then( response => { return response.json(); })
        .then( data => {
            const playerList = [];
            var points = 1400;
            data.results.forEach( (val) => {
                points = this.util.rand(100, 2000);
                playerList.push({
                    'name' : val.name.first + ' ' + val.name.last,
                    'email' : val.email,
                    'points' : points,
                    'photo' : val.picture.medium
                });
            });
            this.players = playerList;
            this.view();
            // this.service.addItem('players', JSON.stringify(playerList));
        });

        this.addEventListeners();
    }

    view(): void {
        const table = document.querySelector('.table');
        this.players.sort(function(a, b) {
            return a.points - b.points;
        });

        this.players.reverse();
        table.innerHTML = this.players.map((player) => {
            return `<tr>
                <td class="table__image">
                <img src="${player.photo}" alt="${player.name}" title="${player.name}">
                </td>
                <td class="table_name">${player.name}</td>
                <td class="table__scrore">${player.points} /pts</td>
                <td class="table__stars">★★★★</td>
                </tr>`;
        }).join('');
    }

    addEventListeners (): void {
        // Logout
        let logout = document.querySelector('#logout');
        logout.addEventListener('click', evt => {
            evt.preventDefault();
            this.service.logout();
            this.util.redirect('index');
        });
    }
}

new Rating();
