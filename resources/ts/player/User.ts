import Md5 from './../utils/Md5';
import Service from './../utils/Service';

export default class User {
    private name: string;
    private email: string;
    private score: number;
    private hash: string;
    private photo: any;

    constructor (name: string, email: string, score: number) {
        this.name = name;
        this.email = email;
        this.score = score;

        let hash = new Md5();
        let service = new Service();

        this.hash = hash.md5(this.email);
        this.photo = service.gravatar(this.hash);

        service.addItem('name', this.name);
        service.addItem('email', this.email);
        service.addItem('photo', this.photo);
    }

    get fullName(): string {
        return this.name;
    }

    get userPhoto(): any {
        return this.photo;
    }
}
