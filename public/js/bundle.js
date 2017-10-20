'use strict';

var Setting = function Setting () {};

var staticAccessors = { SPEED: {},BOARD_COLS: {},BOARD_LINES: {},KEY_PAUSE: {},KEY_UP: {},KEY_LEFT: {},KEY_RIGHT: {},KEY_DOWN: {},COLOR_SNAKE: {},COLOR_BOARD: {},COLOR_WALL: {} };

staticAccessors.SPEED.get = function () {
    return 200;
};

staticAccessors.BOARD_COLS.get = function () {
    return 30;
};

staticAccessors.BOARD_LINES.get = function () {
    return 30;
};

staticAccessors.KEY_PAUSE.get = function () {
    return 32;
};

staticAccessors.KEY_UP.get = function () {
    return 38;
};

staticAccessors.KEY_LEFT.get = function () {
    return 37;
};

staticAccessors.KEY_RIGHT.get = function () {
    return 39;
};

staticAccessors.KEY_DOWN.get = function () {
    return 40;
};

staticAccessors.COLOR_SNAKE.get = function () {
    return '#607d8b';
};

staticAccessors.COLOR_BOARD.get = function () {
    return '#fff';
};

staticAccessors.COLOR_WALL.get = function () {
    return '#35f7cf';
};

Object.defineProperties( Setting, staticAccessors );

var Util = function Util () {};

Util.prototype.rand = function rand (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

var User = function User (name, email, score) {
    this.name = name;
    this.email = email;
    this.score = score;
};

var Piece = function Piece (line, column, color) {
    this.line = line;
    this.column = column;
    this.color = color;
};

Piece.prototype.setColor = function setColor (color) {
    this.color = color;
};

Piece.prototype.view = function view (line, column) {
    document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].className = '';
    document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].style.backgroundColor = this.color;
    if (this.isFruit) {
        document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].className = 'blink';
    }
};

var Wall = (function (Piece$$1) {
    function Wall (line, column) {
        Piece$$1.call(this, line, column, Setting.COLOR_WALL);
        this.isFruit = false;
    }

    if ( Piece$$1 ) Wall.__proto__ = Piece$$1;
    Wall.prototype = Object.create( Piece$$1 && Piece$$1.prototype );
    Wall.prototype.constructor = Wall;

    return Wall;
}(Piece));

var Blank = (function (Piece$$1) {
    function Blank (line, column) {
        Piece$$1.call(this, line, column, Setting.COLOR_BOARD);
        this.isFruit = false;
    }

    if ( Piece$$1 ) Blank.__proto__ = Piece$$1;
    Blank.prototype = Object.create( Piece$$1 && Piece$$1.prototype );
    Blank.prototype.constructor = Blank;

    return Blank;
}(Piece));

var Board = function Board (lines, cols, displayInView) {
    this.lines = lines;
    this.cols = cols;
    this.displayInView = displayInView;

    this.colorBoard = Setting.COLOR_BOARD;
    this.colorWall = Setting.COLOR_WALL;

    this.board = new Array(this.lines);
    this.create();
};

Board.prototype.get = function get () {
    return this.board;
};

Board.prototype.create = function create () {
        var this$1 = this;

    for (var line = 0; line < this.lines; line++) {
        this$1.board[line] = new Array(this$1.cols);
        for ( var col = 0; col < this.cols; col++) {
            if (line == 0 || line == this$1.cols -1 || col == 0 || col == this$1.lines -1) {
                this$1.board[line][col] = new Wall(line, col);
            } else {
                this$1.board[line][col] = new Blank(line, col);
            }
        }
    }
};

Board.prototype.view = function view (line, column) {
        var this$1 = this;

    var innerHTML = "";
    innerHTML += "<table>";
    for (var line = 0; line < this.lines; line++) {
        innerHTML += "<tr>";
        for ( var col = 0; col < this.cols; col++) {
            innerHTML += "<td style='background-color: " + this$1.board[line][col].color + "'></td>";
        }
        innerHTML += "</tr>";
    }
    innerHTML += "</table>";
    this.displayInView.innerHTML = innerHTML;
};

Board.prototype.clean = function clean (posX, posY) {
    document.querySelectorAll('table tr:nth-child(' + posX + ') td:nth-child(' + posY + ')')[0].style.backgroundColor = this.colorBoard;
};

var Snake = function Snake (posX, posY) {
    this.x = posX;
    this.y = posY;
    this.color = Setting.COLOR_SNAKE;

    this.snake = new Array();
    this.create();
};

Snake.prototype.create = function create () {
    this.snake.unshift({
        x : this.x,
        y : this.y
    });
};

Snake.prototype.update = function update (posX, posY) {
    console.log(posX);
    console.log(posY);
    this.snake.unshift({
        x : posX,
        y : posY
    });
    return this.snake;
};

Snake.prototype.remove = function remove () {
    return this.snake.pop();
};

Snake.prototype.view = function view (posX, posY) {
    document.querySelectorAll('table tr:nth-child(' + posX + ') td:nth-child(' + posY + ')')[0].style.backgroundColor = this.color;
};

var Apple = (function (Piece$$1) {
    function Apple (line, column) {
        Piece$$1.call(this, line, column, '#009688');
        this.isFruit = true;
        this.speed = 20;
        this.power = 10;
    }

    if ( Piece$$1 ) Apple.__proto__ = Piece$$1;
    Apple.prototype = Object.create( Piece$$1 && Piece$$1.prototype );
    Apple.prototype.constructor = Apple;

    return Apple;
}(Piece));

var Chili = (function (Piece$$1) {
    function Chili (line, column) {
        Piece$$1.call(this, line, column, '#9c27b0');
        this.isFruit = true;
        this.speed = 100;
        this.power = 50;
    }

    if ( Piece$$1 ) Chili.__proto__ = Piece$$1;
    Chili.prototype = Object.create( Piece$$1 && Piece$$1.prototype );
    Chili.prototype.constructor = Chili;

    return Chili;
}(Piece));

var Banana = (function (Piece$$1) {
    function Banana (line, column) {
        Piece$$1.call(this, line, column, '#ffeb3b');
        this.isFruit = true;
        this.speed = -50;
        this.power = 1;
    }

    if ( Piece$$1 ) Banana.__proto__ = Piece$$1;
    Banana.prototype = Object.create( Piece$$1 && Piece$$1.prototype );
    Banana.prototype.constructor = Banana;

    return Banana;
}(Piece));

var Melon = (function (Piece$$1) {
    function Melon (line, column) {
        Piece$$1.call(this, line, column, '#4caf50');
        this.isFruit = true;
        this.speed = 50;
        this.power = 20;
    }

    if ( Piece$$1 ) Melon.__proto__ = Piece$$1;
    Melon.prototype = Object.create( Piece$$1 && Piece$$1.prototype );
    Melon.prototype.constructor = Melon;

    return Melon;
}(Piece));

var Apple$2 = (function (Piece$$1) {
    function Apple (line, column) {
        Piece$$1.call(this, line, column, '#f44336');
        this.isFruit = true;
        this.speed = -75;
        this.power = 5;
    }

    if ( Piece$$1 ) Apple.__proto__ = Piece$$1;
    Apple.prototype = Object.create( Piece$$1 && Piece$$1.prototype );
    Apple.prototype.constructor = Apple;

    return Apple;
}(Piece));

var Game = function Game () {

    this.util = new Util();

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
};

Game.prototype.resetInterval = function resetInterval () {
    clearInterval(this.int);
    this.int = setInterval(this.gameLoop, this.interval);
};

Game.prototype.writeFruit = function writeFruit () {
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
        fruit = new Apple$2(lineRand, columnRand);
    }

    this.matriz[lineRand][columnRand] = fruit;
    fruit.view(lineRand, columnRand);
};

Game.prototype.updateSnake = function updateSnake (eat) {
    console.log("UPDATE SNAKE");
    // Update Snake
    this.snake.update(this.snakePosX, this.snakePosY);
    this.snake.view(this.snakePosX, this.snakePosY);
    console.log(this.snake);

    if (eat) { return; }
    // Remove Snake Tail
    var tailSnake = this.snake.remove();
    // Clean Snake Trail
    this.board.clean(tailSnake.x , tailSnake.y);
};

Game.prototype.gameLoop = function gameLoop () {
    if (this.running && !this.gameOver) {
        this.update();
    } else if (this.gameOver){
        clearInterval(this.int);
    }
};

Game.prototype.update = function update () {
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
    // if (this.snakePosX == this.tailX[i] && this.snakePosY == this.tailY[i]) {
    //     this.gameOver = true;
    //     break;
    // }
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
};

Game.prototype.speedGame = function speedGame () {
    document.querySelector("speed").innerHTML = this.interval;
};

Game.prototype.scoreGame = function scoreGame () {
    document.querySelector("score").innerHTML = this.score;
};

Game.prototype.timeGame = function timeGame () {
    setInterval(this.time, 100);
    document.querySelector("time").innerHTML = this.time++;
};

Game.prototype.keyPressed = function keyPressed (evt) {
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
};

Game.prototype.callback = function callback (evt) {
    var name = evt.srcElement[0].value;
    var email = evt.srcElement[1].value;
    this.player = new User(name, email);
    console.log(this.player);
    localStorage.setItem(21323213231, this.player.name);
    localStorage.setItem('email', this.player.email);
};

Game.prototype.addEventListeners = function addEventListeners () {
        var this$1 = this;

    window.addEventListener('keydown', function (evt) {
        this$1.keyPressed(evt);
    });

    if (!this.form) { return; }
    this.form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        this$1.callback(evt);
    });
};

new Game();
//# sourceMappingURL=bundle.js.map
