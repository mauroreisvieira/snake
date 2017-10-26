(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Storage = (function () {
    function Storage() {
    }
    /**
     * Save items in browser storage.
     * @param {string} name
     * @param {string} value
     * @return {void}
     */
    Storage.prototype.addItem = function (name, value) {
        localStorage.setItem(name, value);
    };
    /**
     * Get Item in storage.
     * @param  {string} item
     * @return {string}
     */
    Storage.prototype.getItem = function (item) {
        return localStorage.getItem(item);
    };
    /**
     * Remove Item in storage.
     * @param {string} item [description]
     * @return {void}
     */
    Storage.prototype.removeItem = function (item) {
        localStorage.removeItem(item);
    };
    return Storage;
}());

var Service = (function () {
    function Service() {
        this.storage = new Storage();
    }
    /**
    * Method to return avatar based in email.
    * @param  {String} hash
    * @param  {Number} size
    * @return {String}
    */
    Service.prototype.gravatar = function (hash, size) {
        if (size === void 0) { size = 200; }
        return 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
    };
    /**
     * Check if user have info in storage.
     * @return {boolean}
     */
    Service.prototype.checkAuth = function () {
        var exists = true;
        if (localStorage.getItem('email') === null) {
            exists = false;
        }
        return exists;
    };
    /**
     * Remove user from storage.
    * @return void
    */
    Service.prototype.logout = function () {
        localStorage.clear();
    };
    return Service;
}());

var Util = (function () {
    function Util() {
    }
    /**
     * Receive two number to define limit of random.
     * @param  {integer} min
     * @param  {integer} max
     * @return {integer}
     */
    Util.prototype.rand = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    /**
     * Receive array and field used to orde this array.
     * @param  {array} array
     * @param  {string} field
     * @return {integer}
     */
    Util.prototype.compare = function (array, field) {
        return array.sort(function (a, b) { return a.field !== b.field ? a.field < b.field ? -1 : 1 : 0; });
    };
    /**
     * Method to redirect to other url.
     * @param  {string} url
     * @return {void}
     */
    Util.prototype.redirect = function (url) {
        window.location.href = './' + url + '.html';
    };
    /**
  * Check if browser is connected to internet.
  * @return {boolean}
  */
    Util.prototype.online = function () {
        return navigator.onLine;
    };
    /**
    * Listen for changes to network connectivity:
    * @return {boolean}
    */
    Util.prototype.connection = function () {
        return navigator.connection;
    };
    /**
     * Method provides information about the system's battery, returns a battery promise.
     * @return {any}
     */
    Util.prototype.battery = function () {
        var batteryInfo = {};
        navigator.getBattery().then(function (battery) {
            batteryInfo = battery;
            battery.addEventListener('chargingchange', function () {
                batteryInfo = battery;
            });
        });
        return batteryInfo;
    };
    /**
     * Listen for changes to responsiveness.
     * @return {void}
     */
    Util.prototype.orientation = function () {
        console.log("ORIENTATION");
        media.addListener(function (mql) { return console.log(mql.matches); });
        // Orientation of device changes.
        window.addEventListener('orientationchange', function (e) {
            console.log(screen.orientation.angle);
        });
    };
    Util.SPEED = 200;
    Util.BOARD_COLS = 30;
    Util.BOARD_LINES = 30;
    Util.KEY_PAUSE = 32;
    Util.KEY_UP = 38;
    Util.KEY_LEFT = 37;
    Util.KEY_RIGHT = 39;
    Util.KEY_DOWN = 40;
    Util.COLOR_SNAKE = '#10A9E7';
    Util.COLOR_BLANK = '#fff';
    Util.COLOR_BOARD = '#fff';
    Util.COLOR_WALL = '#696a6b';
    return Util;
}());

var Piece = (function () {
    function Piece(line, column, color) {
        this.line = line;
        this.column = column;
        this.color = color;
    }
    Piece.prototype.setColor = function (color) {
        this.color = color;
    };
    Piece.prototype.view = function (line, column) {
        document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].className = '';
        document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].style.backgroundColor = this.color;
        if (this.isFruit) {
            document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].className = 'blink';
        }
    };
    return Piece;
}());

var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(line, column) {
        _super.call(this, line, column, Util.COLOR_WALL);
        this.isFruit = false;
    }
    return Wall;
}(Piece));

var Wall$1 = (function (_super) {
    __extends(Wall, _super);
    function Wall(line, column) {
        _super.call(this, line, column, Util.COLOR_BLANK);
        this.isFruit = false;
    }
    return Wall;
}(Piece));

var Board = (function () {
    function Board(lines, cols, displayInView) {
        this.colorBoard = Util.COLOR_BOARD;
        this.colorWall = Util.COLOR_WALL;
        this.board = [];
        this.lines = lines;
        this.cols = cols;
        this.displayInView = displayInView;
        this.board = new Array(this.lines);
        this.create();
        this.addEventListeners();
    }
    Board.prototype.get = function () {
        return this.board;
    };
    Board.prototype.create = function () {
        for (var line = 0; line < this.lines; line++) {
            this.board[line] = new Array(this.cols);
            for (var col = 0; col < this.cols; col++) {
                if (line == 0 || line == this.cols - 1 || col == 0 || col == this.lines - 1) {
                    this.board[line][col] = new Wall(line, col);
                }
                else {
                    this.board[line][col] = new Wall$1(line, col);
                }
            }
        }
    };
    Board.prototype.view = function () {
        var innerHTML = "";
        innerHTML += "<table>";
        for (var line = 0; line < this.lines; line++) {
            innerHTML += "<tr>";
            for (var col = 0; col < this.cols; col++) {
                innerHTML += "<td style='background-color: " + this.board[line][col].color + "'></td>";
            }
            innerHTML += "</tr>";
        }
        innerHTML += "</table>";
        this.displayInView.innerHTML = innerHTML;
    };
    Board.prototype.clean = function (posX, posY) {
        document.querySelectorAll('table tr:nth-child(' + posX + ') td:nth-child(' + posY + ')')[0].style.backgroundColor = this.colorBoard;
    };
    Board.prototype.addEventListeners = function () {
        var _this = this;
        // Logout
        var logout = document.querySelector('#logout');
        logout.addEventListener('click', function (evt) {
            evt.preventDefault();
            _this.service.logout();
            _this.util.redirect('index');
        });
    };
    return Board;
}());

var Snake = (function () {
    function Snake(posX, posY) {
        this.color = Util.COLOR_SNAKE;
        this.snake = [];
        this.x = posX;
        this.y = posY;
        this.service = new Service();
        this.storage = new Storage();
        this.color = this.storage.getItem('color') === undefined ? this.color : this.storage.getItem('color');
        this.create();
    }
    Snake.prototype.create = function () {
        this.snake.unshift({
            x: this.x,
            y: this.y
        });
    };
    Snake.prototype.update = function (posX, posY) {
        this.snake.unshift({
            x: posX,
            y: posY
        });
        return this.snake;
    };
    Snake.prototype.remove = function () {
        return this.snake.pop();
    };
    Snake.prototype.view = function (posX, posY) {
        document.querySelectorAll('table tr:nth-child(' + posX + ') td:nth-child(' + posY + ')')[0].style.backgroundColor = this.color;
    };
    return Snake;
}());

var Apple = (function (_super) {
    __extends(Apple, _super);
    function Apple(line, column) {
        _super.call(this, line, column, '#009688');
        this.speed = 100;
        this.power = 20;
        this.isFruit = true;
    }
    return Apple;
}(Piece));

var Chili = (function (_super) {
    __extends(Chili, _super);
    function Chili(line, column) {
        _super.call(this, line, column, '#9c27b0');
        this.speed = 100;
        this.power = 20;
        this.isFruit = true;
    }
    return Chili;
}(Piece));

var Banana = (function (_super) {
    __extends(Banana, _super);
    function Banana(line, column) {
        _super.call(this, line, column, '#ffeb3b');
        this.speed = 100;
        this.power = 20;
        this.isFruit = true;
    }
    return Banana;
}(Piece));

var Melon = (function (_super) {
    __extends(Melon, _super);
    function Melon(line, column) {
        _super.call(this, line, column, '#4caf50');
        this.speed = 100;
        this.power = 20;
        this.isFruit = true;
    }
    return Melon;
}(Piece));

var Strawberry = (function (_super) {
    __extends(Strawberry, _super);
    function Strawberry(line, column) {
        _super.call(this, line, column, '#f44336');
        this.speed = 100;
        this.power = 5;
        this.isFruit = true;
    }
    return Strawberry;
}(Piece));

var Game = (function () {
    function Game() {
        this.listFruit = [0, 1, 2, 3, 4];
        this.length = 0;
        this.tailX = [];
        this.tailY = [];
        this.running = false;
        this.gameOver = false;
        this.direction = 2;
        this.tempdir = 2;
        this.snakePosX = 2;
        this.snakePosY = 2;
        this.score = 0;
        this.time = 0;
        this.numberLines = Util.BOARD_LINES;
        this.numberCols = Util.BOARD_COLS;
        this.interval = Util.SPEED;
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
    Game.prototype.resetInterval = function () {
        clearInterval(this.int);
        this.int = setInterval(this.gameLoop, this.interval);
    };
    Game.prototype.writeFruit = function () {
        var lineRand = this.util.rand(2, this.numberLines - 2);
        var columnRand = this.util.rand(2, this.numberCols - 2);
        var fruit;
        var numberFruit = this.listFruit[Math.floor(Math.random() * this.listFruit.length)];
        if (numberFruit === 0) {
            // Chili :: Super Fast
            fruit = new Chili(lineRand, columnRand);
        }
        else if (numberFruit === 1) {
            // Banana :: Change Keyboard
            fruit = new Banana(lineRand, columnRand);
        }
        else if (numberFruit === 2) {
            // Melon :: Super Slow
            fruit = new Melon(lineRand, columnRand);
        }
        else if (numberFruit === 3) {
            // Apple :: Invisibel Wall
            fruit = new Apple(lineRand, columnRand);
        }
        else {
            // Strawberry :: Explode Snake
            fruit = new Strawberry(lineRand, columnRand);
        }
        this.matriz[lineRand][columnRand] = fruit;
        fruit.view(lineRand, columnRand);
    };
    Game.prototype.updateSnake = function (eat) {
        // Update Snake
        this.snake.update(this.snakePosX, this.snakePosY);
        this.snake.view(this.snakePosX, this.snakePosY);
        if (eat)
            return;
        // Remove Snake Tail
        var tailSnake = this.snake.remove();
        // Clean Snake Trail
        this.board.clean(tailSnake.x, tailSnake.y);
    };
    Game.prototype.gameLoop = function () {
        if (this.running && !this.gameOver) {
            this.update();
        }
        else if (this.gameOver) {
            clearInterval(this.int);
        }
    };
    Game.prototype.update = function () {
        this.direction = this.tempdir;
        // updates the position of the snake according to the direction
        if (this.direction == 0) {
            this.snakePosY--;
        }
        else if (this.direction == -1) {
            this.snakePosY++;
        }
        else if (this.direction == 1) {
            this.snakePosX--;
        }
        else if (this.direction == 2) {
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
        }
        else if (this.matriz[this.snakePosX][this.snakePosY].isFruit === true) {
            this.score += this.matriz[this.snakePosX][this.snakePosY].power;
            this.matriz[this.snakePosX][this.snakePosY] = new Wall$1(this.snakePosX, this.snakePosY);
            this.resetInterval();
            this.updateSnake(true);
            // creates new fruit, which automatically replaces the old one
            this.writeFruit();
            this.scoreGame();
        }
        this.speedGame();
        this.timeGame();
    };
    Game.prototype.speedGame = function () {
        document.querySelector("speed").innerHTML = this.interval;
    };
    Game.prototype.scoreGame = function () {
        document.querySelector("score").innerHTML = this.score;
    };
    Game.prototype.timeGame = function () {
        setInterval(this.time, 100);
        document.querySelector("time").innerHTML = this.time++;
    };
    Game.prototype.keyPressed = function (evt) {
        switch (evt.keyCode) {
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
    };
    Game.prototype.addEventListeners = function () {
        var _this = this;
        window.addEventListener('keydown', function (evt) {
            _this.keyPressed(evt);
        });
        // Logout
        var logout = document.querySelector('#logout');
        logout.addEventListener('click', function (evt) {
            evt.preventDefault();
            _this.service.logout();
            _this.util.redirect('index');
        });
    };
    return Game;
}());
new Game();

})));
//# sourceMappingURL=game.js.map
