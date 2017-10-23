import Util from './utils/Util.js';
import Service from './utils/Service.js';

class Rating {

    constructor() {

        this.util = new Util();
        this.service = new Service();

        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }

        this.players = [];
        this.view();
    }

    view() {
        const table = document.querySelector('.table');
        this.players = JSON.parse(this.service.getItem('players'));
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
