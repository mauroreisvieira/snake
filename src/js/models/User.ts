import Util from './../services/Util';
import Md5 from './../services/Md5';
import Service from './../services/Service';
import Storage from './../services/Storage';
import Firebase from './../services/Firebase';

export default class User {
    public id: any;
    public name: string;
    public email: string;
    public photo: any;
    public color: any;
    public score: any;

    constructor (name: string, email: string, color: any) {
        this.name = name;
        this.email = email;
        this.color = color;

        let util = new Util();
        let hash = new Md5();
        let service = new Service();
        let storage = new Storage();
        let firebase = new Firebase();

        // Hash (md5) only use to encrypt the email to get photo in Gravatar API.
        this.id = hash.md5(this.email, false, false);
        this.photo = service.gravatar(this.id);
        this.score = storage.getItem('score') > 0 ? storage.getItem('score') : 0;

        // Updated in Firebase only have connection to internet.
        if (util.online) {
            firebase.all('players/' + this.id).then(response => {
                firebase.destroy('players', this.id);
                firebase.push('players/' + this.id, this);
            });
        }

        storage.addItem('id', this.id);
        storage.addItem('name', this.name);
        storage.addItem('email', this.email);
        storage.addItem('photo', this.photo);
        storage.addItem('color', this.color);
        storage.addItem('score', this.score);
    }

    fullName(): string {
        return this.name;
    }

    userPhoto(): any {
        return this.photo;
    }
}
