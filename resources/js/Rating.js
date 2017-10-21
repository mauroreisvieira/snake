import Service from './utils/Service.js';

class Rating {

    constructor() {

        this.service = new Service();
        this.players = [];
        this.view();
    }

    view() {
        const table = document.querySelector('.table');
        this.players = JSON.parse(this.service.getItem('players'));
        table.innerHTML = this.players.map((player, key) => {
            return `<tr>
                    <td class="table__image">
                        <img src="${player.photo}" alt="${player.name}" title="${player.name}">
                    </td>
                    <td class="table_name">${player.name}</td>
                    <td class="table__scrore">1000 /pts</td>
                    <td class="table__stars">★★★★</td>
                </tr>`;
        }).join('');
    }
}

new Rating();
