import Util from './utils/Util.js';

export default class Snake {

    constructor (posX, posY) {
        this.x = posX;
        this.y = posY;
        this.color = Util.COLOR_SNAKE;

        this.snake = new Array();
        this.create();
    }

    create() {
        this.snake.unshift({
            x : this.x,
            y : this.y
        });
    }

    update(posX, posY) {
        this.snake.unshift({
            x : posX,
            y : posY
        });
        return this.snake;
    }

    remove() {
        return this.snake.pop();
    }

    view(posX, posY) {
        document.querySelectorAll('table tr:nth-child(' + posX + ') td:nth-child(' + posY + ')')[0].style.backgroundColor = this.color;
    }
}
