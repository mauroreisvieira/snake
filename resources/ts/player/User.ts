import Md5 from './../utils/Md5';
import Service from './../utils/Service';
import Storage from './../utils/Storage';

export default class User {
    public id: number;
    public name: string;
    public email: string;
    public hash: string;
    public photo: any;
    public color: any;

    constructor (name: string, email: string, color: any) {
        this.name = name;
        this.email = email;
        this.color = color;

        let hash = new Md5();
        let storage = new Storage();
        let service = new Service();
        const date = new Date().valueOf();

        this.photo = service.gravatar(hash.md5(this.email, false, false));
        this.id = hash.md5(date, false, false);

        storage.addItem('id', this.id);
        storage.addItem('name', this.name);
        storage.addItem('email', this.email);
        storage.addItem('photo', this.photo);
        storage.addItem('color', this.color);
    }

    get fullName(): string {
        return this.name;
    }

    get userPhoto(): any {
        return this.photo;
    }
}
