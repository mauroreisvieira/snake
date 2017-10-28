import Util from './utils/Util';
import Service from './utils/Service';
import Firebase from './utils/Firebase';
import Storage from './utils/Storage';

class Friend {
    private util: any;
    private service: any;
    private storage: any;
    private firebase: any;
    private friends: any = {};

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
            this.friends = response;
            this.friends = Object.entries(response);
            this.storage.addItem('friends', JSON.stringify(this.friends));
            this.view();
        });

        this.addEventListeners();
    }

    view(): void {

        document.querySelector('#list-friends').innerHTML = this.friends.map((friend) => {
            if (this.storage.getItem('id') !== friend[1].id) {
                return `<div class="cell-large-4 cell-medium-4 cell-small-12">
                    <div class="item">
                        <div class="item__photo">
                            <span style="color: ${friend[1].color}"></span>
                            <img src="${friend[1].photo}" alt="${friend[1].name}" title="${friend[1].name}">
                        </div>
                        <div class="item__content">
                            <div class="item__name">${friend[1].name}</div>
                            <a href="mailto: ${friend[1].email}" class="item__mail">${friend[1].email}</a>
                            <div class="item__history"><strong>Last Login:</strong> 10 June 2017 </div>
                        </div>
                        <div class="item__options">
                            <button class="button button--small button--yellow" disabled><i class="icon ion-ios-game-controller-b"></i> Challenge</button>
                            <button class="button button--small button--yellow" disabled><i class="icon ion-android-mail"></i> Message</button>
                        </div>
                    </div>
                </div>`;
            }

        }).join('');
    }

    addEventListeners(): void {
        // Logout
        let logout = document.querySelector('#logout');
        logout.addEventListener('click', evt => {
            evt.preventDefault();
            this.service.logout();
            this.util.redirect('index');
        });
    }
}

new Friend();
