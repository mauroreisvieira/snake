import Service from './utils/Service';
import Storage from './utils/Storage';
import Util from './utils/Util';

export default class Snake {
    private x: number;
    private y: number;
    private color: any = Util.COLOR_SNAKE;
    private snake: any = [];
    private service: any;
    private storage: any;

    constructor (posX: number, posY: number) {
        this.x = posX;
        this.y = posY;

        this.service = new Service();
        this.storage = new Storage();

        this.color = this.storage.getItem('color') === undefined ? this.color : this.storage.getItem('color');
        this.create();
    }

    create(): void {
        this.snake.unshift({
            x : this.x,
            y : this.y
        });
    }

    update(posX: number, posY: number): any {
        this.snake.unshift({
            x : posX,
            y : posY
        });
        return this.snake;
    }

    remove(): any {
        return this.snake.pop();
    }

    view(posX: number, posY: number): void {
        document.querySelectorAll('table tr:nth-child(' + posX + ') td:nth-child(' + posY + ')')[0].style.backgroundColor = this.color;
    }
}
