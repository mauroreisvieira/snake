import Service from './utils/Service';
import Util from './utils/Util';
import Board from './Board';
import Blank from './board/Blank';
import Snake from './Snake';
import Apple from './fruits/Apple';
import Chili from './fruits/Chili';
import Banana from './fruits/Banana';
import Melon from './fruits/Melon';
import Strawberry from './fruits/Strawberry';

class Game {
    private util: any;
    private service: any;
    private gamInBoard: any;
    private listFruit: any = [0,1,2,3,4];
    private length: number = 0;
    private tailX: any = [];
    private tailY: any = [];
    private running: boolean = false;
    private gameOver: boolean = false;
    private direction: number = 2;
    private int: number;
    private tempdir = 2;
    private snakePosX: number = 2;
    private snakePosY: number = 2;
    private score: number = 0;
    private time: number = 0;
    private numberLines: number = Util.BOARD_LINES;
    private numberCols: number = Util.BOARD_COLS;
    private interval: number = Util.SPEED;
    private board: any;
    private matriz: any;
    private snake: any;

    constructor () {

        this.util = new Util();
        this.service = new Service();

        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }

        this.gamInBoard = document.querySelector('game-board');

        if (this.gamInBoard) {

            this.tailX = [this.snakePosX];
            this.tailY = [this.snakePosY];

            this.gameLoop = this.gameLoop.bind(this);
            this.update = this.update.bind(this);

            // Create Board
            this.board = new Board(this.numberLines, this.numberCols, this.gamInBoard);
            this.board.create();
            this.matriz = this.board.get();
            this.board.view();

            // Write Fruit in Board
            this.writeFruit();

            // Snake
            this.snake = new Snake(this.snakePosX, this.snakePosY);
            // Write Snake in Board
            this.snake.view(this.snakePosX, this.snakePosY);
            this.matriz[this.snakePosX][this.snakePosY] = this.snake;

            this.int = setInterval(this.gameLoop, this.interval);

            this.speedGame();
        }

        this.addEventListeners();
    }

    resetInterval(): void {
        clearInterval(this.int);
        this.int = setInterval(this.gameLoop, this.interval);
    }

    writeFruit(): void {
        let lineRand = this.util.rand(2, this.numberLines - 2);
        let columnRand = this.util.rand(2, this.numberCols - 2);
        let fruit;
        let numberFruit = this.listFruit[Math.floor(Math.random() * this.listFruit.length)];

        if (numberFruit === 0) {
            // Chili :: Super Fast
            fruit = new Chili(lineRand, columnRand);
        } else if (numberFruit === 1) {
            // Banana :: Change Keyboard
            fruit = new Banana(lineRand, columnRand);
        } else if (numberFruit === 2) {
            // Melon :: Super Slow
            fruit = new Melon(lineRand, columnRand);
        } else if (numberFruit === 3) {
            // Apple :: Invisibel Wall
            fruit = new Apple(lineRand, columnRand);
        } else {
            // Strawberry :: Explode Snake
            fruit = new Strawberry(lineRand, columnRand);
        }

        this.matriz[lineRand][columnRand] = fruit;
        fruit.view(lineRand, columnRand);
    }

    updateSnake(eat: boolean): void {
        // Update Snake
        this.snake.update(this.snakePosX, this.snakePosY);
        this.snake.view(this.snakePosX, this.snakePosY);

        if (eat) return;
        // Remove Snake Tail
        var tailSnake = this.snake.remove();
        // Clean Snake Trail
        this.board.clean(tailSnake.x , tailSnake.y);
    }

    gameLoop(): void {
        if (this.running && !this.gameOver) {
            this.update();
        } else if (this.gameOver){
            clearInterval(this.int);
        }
    }

    update(): void {
        this.direction = this.tempdir;
        // updates the position of the snake according to the direction
        if (this.direction == 0) {
            this.snakePosY--;
        } else if (this.direction == -1) {
            this.snakePosY++;
        } else if (this.direction == 1) {
            this.snakePosX--;
        } else if (this.direction == 2) {
            this.snakePosX++;
        }

        // draws the head of the snake on the tail
        this.updateSnake(false);

        // checks for collisions with self
        // for (var i = this.tailX.length - 1; i >=0; i--) {
        //     if (this.snakePosX == this.tailX[i] && this.snakePosY == this.tailY[i]) {
        //         this.gameOver = true;
        //         break;
        //     }
        // }

        // checks for collision with wall
        if (this.snakePosX == 0 || this.snakePosX == this.numberCols - 1 || this.snakePosY == 0 || this.snakePosY == this.numberLines - 1) {
            this.gameOver = true;
            //checks for collisions with fruit
        } else if (this.matriz[this.snakePosX][this.snakePosY].isFruit === true) {
            this.score += this.matriz[this.snakePosX][this.snakePosY].power;
            this.matriz[this.snakePosX][this.snakePosY] = new Blank(this.snakePosX, this.snakePosY);
            this.resetInterval();

            this.updateSnake(true);
            // creates new fruit, which automatically replaces the old one
            this.writeFruit();
            this.scoreGame();
        }

        this.speedGame();
        this.timeGame();
    }

    speedGame(): void {
        document.querySelector("speed").innerHTML = this.interval;
    }

    scoreGame(): void {
        document.querySelector("score").innerHTML = this.score;
    }

    timeGame(): void {
        setInterval(this.time, 100);
        document.querySelector("time").innerHTML = this.time++;
    }

    keyPressed(evt: any): void {
        switch(evt.keyCode) {
        case Util.KEY_UP:
            evt.preventDefault();
            if (this.direction != 2) {
                this.tempdir = 1;
            }
            break;
        case Util.KEY_DOWN:
            evt.preventDefault();
            if (this.direction != 1) {
                this.tempdir = 2;
            }
            break;
        case Util.KEY_RIGHT:
            evt.preventDefault();
            if (this.direction != 0) {
                this.tempdir = -1;
            }
            break;
        case Util.KEY_LEFT:
            evt.preventDefault();
            if (this.direction != -1) {
                this.tempdir = 0;
            }
            break;
        case Util.KEY_PAUSE:
            evt.preventDefault();
            this.running = !this.running;
            break;
        }
    }

    addEventListeners(): void {
        window.addEventListener('keydown', evt => {
            this.keyPressed(evt);
        });

        // Logout
        let logout = document.querySelector('#logout');
        logout.addEventListener('click', evt => {
            evt.preventDefault();
            this.service.logout();
            this.util.redirect('index');
        });
    }
}

new Game();
