import Util from './utils/Util';
import Service from './utils/Service';
import Firebase from './utils/Firebase';
import Storage from './utils/Storage';

class Rating {
    private util: any;
    private service: any;
    private storage: any;
    private firebase: any;
    private ratings: any = {};

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
            this.firebase.all('ratings').then(response => {
                this.ratings = response;
                this.storage.addItem('ratings', JSON.stringify(this.ratings));
                this.view();
            });
        } else {
            this.ratings = JSON.parse(this.service.getItem('ratings'));
            this.view();
        }
    }

    view(): void {
        const table = document.querySelector('.table');

        this.ratings.sort(function(a, b) {
            return a.points - b.points;
        });

        this.ratings.reverse();
        table.innerHTML = this.ratings.map((player) => {
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
}

new Rating();
