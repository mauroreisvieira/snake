import Md5 from './utils/Md5.js';
import Service from './utils/Service.js';
import Setting from './utils/Setting.js';
import Util from './utils/Util.js';
import User from './player/User.js';
import Board from './Board.js';
import Blank from './board/Blank.js';
import Snake from './Snake.js';
import Piece from './Piece.js';
import Apple from './fruits/Apple.js';
import Chili from './fruits/Chili.js';
import Banana from './fruits/Banana.js';
import Melon from './fruits/Melon.js';
import Strawberry from './fruits/Strawberry.js';

class Game {

    constructor () {

        this.util = new Util();
        this.hash = new Md5();
        this.service = new Service();
        let h = this.hash.md5('mauroreisvieira@gmail.com');
        let avatar = this.service.getAvatar(h);

        this.gamInBoard = document.querySelector('game-board');
        this.form = document.querySelector('form');
        this.player = new User('Mauro Reis Vieira', 'mauroreisvieira@gmail.com');
        console.log(this.player);

        if (this.gamInBoard ) {
            this.listFruit = new Array(0,1,2,3,4);

            this.length = 0;
            this.tailX = [this.snakePosX];
            this.tailY = [this.snakePosY];

            this.running = false;
            this.gameOver = false;
            this.direction = 2;
            this.int;
            this.tempdir = this.direction;

            this.snakePosX = 2;
            this.snakePosY = 2;

            this.score = 0;
            this.time = 0;

            this.numberLines = Setting.BOARD_LINES;
            this.numberCols = Setting.BOARD_COLS;
            this.interval = Setting.SPEED;

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

    resetInterval() {
        clearInterval(this.int);
        this.int = setInterval(this.gameLoop, this.interval);
    }

    writeFruit() {
        var lineRand = this.util.rand(2, this.numberLines - 2);
        var columnRand = this.util.rand(2, this.numberCols - 2);
        var fruit;

        var numberFruit = this.listFruit[Math.floor(Math.random() * this.listFruit.length)];
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

    updateSnake(eat) {
        console.log("UPDATE SNAKE");
        // Update Snake
        this.snake.update(this.snakePosX, this.snakePosY);
        this.snake.view(this.snakePosX, this.snakePosY);
        console.log(this.snake);

        if (eat) return;
        // Remove Snake Tail
        var tailSnake = this.snake.remove();
        // Clean Snake Trail
        this.board.clean(tailSnake.x , tailSnake.y);
    }

    gameLoop() {
        if (this.running && !this.gameOver) {
            this.update();
        } else if (this.gameOver){
            clearInterval(this.int);
        }
    }

    update() {
        console.log("UPDATE");
        this.direction = this.tempdir;
        //update the tail
        //sets the last segment of the tail to blank  before moving the snake

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

    speedGame() {
        document.querySelector("speed").innerHTML = this.interval;
    }

    scoreGame() {
        document.querySelector("score").innerHTML = this.score;
    }

    timeGame() {
        setInterval(this.time, 100);
        document.querySelector("time").innerHTML = this.time++;
    }

    keyPressed(evt) {
        switch(evt.keyCode) {
            case Setting.KEY_UP:
            evt.preventDefault();
            if (this.direction != 2) {
                this.tempdir = 1;
            }
            break;
            case Setting.KEY_DOWN:
            evt.preventDefault();
            if (this.direction != 1) {
                this.tempdir = 2;
            }
            break;
            case Setting.KEY_RIGHT:
            evt.preventDefault();
            if (this.direction != 0) {
                this.tempdir = -1;
            }
            break;
            case Setting.KEY_LEFT:
            evt.preventDefault();
            if (this.direction != -1) {
                this.tempdir = 0;
            }
            break;
            case Setting.KEY_PAUSE:
            evt.preventDefault();
            this.running = !this.running;
            break;
        }
    }

    callback(evt) {
        var name = evt.srcElement[0].value;
        var email = evt.srcElement[1].value;
        this.player = new User(name, email);
        console.log(this.player);
        localStorage.setItem(21323213231, this.player.name);
        localStorage.setItem('email', this.player.email);
    }

    addEventListeners () {
        window.addEventListener('keydown', evt => {
            this.keyPressed(evt);
        });

        if (!this.form) return;
        this.form.addEventListener('submit', evt => {
            evt.preventDefault();
            this.callback(evt);
        });
    }
}

new Game();
