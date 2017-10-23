import Md5 from './../utils/Md5.js';
import Service from './../utils/Service.js';

export class User {

    constructor (name, email, score) {
        this.name = name;
        this.email = email;
        this.score = score;

        let hash = new Md5();
        this.hash = hash.md5(this.email);
        this.service = new Service();
        this.photo = this.service.gravatar(this.hash);

        this.service.addItem('name', this.name);
        this.service.addItem('email', this.email);
        this.service.addItem('photo', this.photo);

    }

    getPhoto() {
        return this.photo;
    }
}
