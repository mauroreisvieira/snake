import Util from './../utils/Util';
import Md5 from './../utils/Md5';
import Service from './../utils/Service';
import Storage from './../utils/Storage';
import Firebase from './../utils/Firebase';

export default class User {
    public id: any;
    public name: string;
    public email: string;
    public photo: any;
    public color: any;

    constructor (name: string, email: string, color: any) {
        this.name = name;
        this.email = email;
        this.color = color;

        let util = new Util();
        let hash = new Md5();
        let service = new Service();
        let storage = new Storage();
        let firebase = new Firebase();

        this.id = hash.md5(this.email, false, false);
        this.photo = service.gravatar(this.id);

        // Updated in Firebase.
        if (this.util.online) {
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
    }

    fullName(): string {
        return this.name;
    }

    userPhoto(): any {
        return this.photo;
    }
}
