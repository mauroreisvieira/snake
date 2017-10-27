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
        this.firebase.all('players').then(response => {
            this.players = response;
            this.players = Object.entries(response);
            this.storage.addItem('players', JSON.stringify(this.players));
            this.view();
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
