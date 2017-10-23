import Util from './utils/Util';
import Service from './utils/Service';

class Rating {
    private util: any;
    private service: any;
    private players: any = {};

    constructor() {

        this.util = new Util();
        this.service = new Service();

        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }
        this.view();
    }

    view(): void {
        const table = document.querySelector('.table');
        this.players = JSON.parse(this.service.getItem('players'));
        // Sort Array
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
}

new Rating();
