import Util from './../services/Util';
import Md5 from './../services/Md5';
import Storage from './../services/Storage';
import Firebase from './../services/Firebase';

export default class User {
    public id: any;
    public name: string;
    public email: string;
    public photo: any;
    public color: any;
    public colorBoard: any;
    public score: any;
    public date: any;

    constructor (name: string, email: string, color: any) {
        this.name = name;
        this.email = email;
        this.color = color;

        let util = new Util();
        let hash = new Md5();
        let storage = new Storage();
        let firebase = new Firebase();

        // Hash (md5) only use to encrypt the email to get photo in Gravatar API.
        this.id = hash.md5(this.email, false, false);
        this.photo = this.userPhoto(this.id);
        this.score = storage.getItem('score') > 0 ? storage.getItem('score') : 0;
        this.date = new Date();

        // Updated in Firebase only have connection to internet.
        if (util.online) {
            firebase.all('players/' + this.id).then((response : any) => {
                firebase.destroy('players', this.id);
                firebase.push('players/' + this.id, this);
            });
        }

        // Save User info in browser storage.
        storage.addItem('id', this.id);
        storage.addItem('name', this.name);
        storage.addItem('email', this.email);
        storage.addItem('photo', this.photo);
        storage.addItem('color', this.color);
        storage.addItem('score', this.score);
        storage.addItem('date', this.date);
    }

    /**
    * Method to return avatar based in email.
    * @param  {String} hash
    * @param  {Number} size
    * @return {String}
    */
    userPhoto(hash : string, size : number = 200): any {
        return 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
    }
}
