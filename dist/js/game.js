/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 171);
/******/ })
/************************************************************************/
/******/ ({

/***/ 164:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Piece = /** @class */ (function () {
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
exports.default = Piece;


/***/ }),

/***/ 168:
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(39);
var Piece_1 = __webpack_require__(165);
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(line, column) {
        var _this = _super.call(this, line, column, Util_1.default.COLOR_BLANK) || this;
        _this.isFruit = false;
        return _this;
    }
    return Wall;
}(Piece_1.default));
exports.default = Wall;


/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Http_1 = __webpack_require__(186);
var Util_1 = __webpack_require__(39);
var Blank_1 = __webpack_require__(170);
var Snake_1 = __webpack_require__(172);
var Apple_1 = __webpack_require__(173);
var Chili_1 = __webpack_require__(174);
var Banana_1 = __webpack_require__(175);
var Melon_1 = __webpack_require__(176);
var Strawberry_1 = __webpack_require__(177);
var Board_1 = __webpack_require__(178);
var Game = /** @class */ (function () {
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
        this.numberLines = Util_1.default.BOARD_LINES;
        this.numberCols = Util_1.default.BOARD_COLS;
        this.interval = Util_1.default.SPEED;
        this.util = new Util_1.default();
        this.http = new Http_1.default();
        if (!this.http.checkAuth()) {
            this.util.redirect('index');
        }
        this.http.logout();
        this.gamInBoard = document.getElementById('board');
        if (this.gamInBoard) {
            this.tailX = [this.snakePosX];
            this.tailY = [this.snakePosY];
            this.gameLoop = this.gameLoop.bind(this);
            this.update = this.update.bind(this);
            // Create Board
            this.board = new Board_1.default(this.numberLines, this.numberCols, this.gamInBoard);
            this.board.create();
            this.matriz = this.board.get();
            this.board.view();
            // Write Fruit in Board
            this.writeFruit();
            // Snake
            this.snake = new Snake_1.default(this.snakePosX, this.snakePosY);
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
            fruit = new Chili_1.default(lineRand, columnRand);
        }
        else if (numberFruit === 1) {
            // Banana :: Change Keyboard
            fruit = new Banana_1.default(lineRand, columnRand);
        }
        else if (numberFruit === 2) {
            // Melon :: Super Slow
            fruit = new Melon_1.default(lineRand, columnRand);
        }
        else if (numberFruit === 3) {
            // Apple :: Invisibel Wall
            fruit = new Apple_1.default(lineRand, columnRand);
        }
        else {
            // Strawberry :: Explode Snake
            fruit = new Strawberry_1.default(lineRand, columnRand);
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
            //checks for collisions with fruit
        }
        else if (this.matriz[this.snakePosX][this.snakePosY].isFruit === true) {
            this.score += this.matriz[this.snakePosX][this.snakePosY].power;
            this.matriz[this.snakePosX][this.snakePosY] = new Blank_1.default(this.snakePosX, this.snakePosY);
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
            case Util_1.default.KEY_UP:
                evt.preventDefault();
                if (this.direction != 2) {
                    this.tempdir = 1;
                }
                break;
            case Util_1.default.KEY_DOWN:
                evt.preventDefault();
                if (this.direction != 1) {
                    this.tempdir = 2;
                }
                break;
            case Util_1.default.KEY_RIGHT:
                evt.preventDefault();
                if (this.direction != 0) {
                    this.tempdir = -1;
                }
                break;
            case Util_1.default.KEY_LEFT:
                evt.preventDefault();
                if (this.direction != -1) {
                    this.tempdir = 0;
                }
                break;
            case Util_1.default.KEY_PAUSE:
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
    };
    return Game;
}());
new Game();


/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Storage_1 = __webpack_require__(40);
var Util_1 = __webpack_require__(39);
var Snake = /** @class */ (function () {
    function Snake(posX, posY) {
        this.color = Util_1.default.COLOR_SNAKE;
        this.snake = [];
        this.x = posX;
        this.y = posY;
        this.storage = new Storage_1.default();
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
exports.default = Snake;


/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Piece_1 = __webpack_require__(165);
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(line, column) {
        var _this = _super.call(this, line, column, '#009688') || this;
        _this.speed = 100;
        _this.power = 20;
        _this.isFruit = true;
        return _this;
    }
    return Apple;
}(Piece_1.default));
exports.default = Apple;


/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Piece_1 = __webpack_require__(165);
var Chili = /** @class */ (function (_super) {
    __extends(Chili, _super);
    function Chili(line, column) {
        var _this = _super.call(this, line, column, '#9c27b0') || this;
        _this.speed = 100;
        _this.power = 20;
        _this.isFruit = true;
        return _this;
    }
    return Chili;
}(Piece_1.default));
exports.default = Chili;


/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Piece_1 = __webpack_require__(165);
var Banana = /** @class */ (function (_super) {
    __extends(Banana, _super);
    function Banana(line, column) {
        var _this = _super.call(this, line, column, '#ffeb3b') || this;
        _this.speed = 100;
        _this.power = 20;
        _this.isFruit = true;
        return _this;
    }
    return Banana;
}(Piece_1.default));
exports.default = Banana;


/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Piece_1 = __webpack_require__(165);
var Melon = /** @class */ (function (_super) {
    __extends(Melon, _super);
    function Melon(line, column) {
        var _this = _super.call(this, line, column, '#4caf50') || this;
        _this.speed = 100;
        _this.power = 20;
        _this.isFruit = true;
        return _this;
    }
    return Melon;
}(Piece_1.default));
exports.default = Melon;


/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Piece_1 = __webpack_require__(165);
var Strawberry = /** @class */ (function (_super) {
    __extends(Strawberry, _super);
    function Strawberry(line, column) {
        var _this = _super.call(this, line, column, '#f44336') || this;
        _this.speed = 100;
        _this.power = 5;
        _this.isFruit = true;
        return _this;
    }
    return Strawberry;
}(Piece_1.default));
exports.default = Strawberry;


/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(39);
var Wall_1 = __webpack_require__(179);
var Blank_1 = __webpack_require__(170);
var React = __webpack_require__(164);
var ReactDOM = __webpack_require__(168);
var BoardComponent_1 = __webpack_require__(180);
var Board = /** @class */ (function () {
    function Board(lines, cols, displayInView) {
        this.colorBoard = Util_1.default.COLOR_BOARD;
        this.colorWall = Util_1.default.COLOR_WALL;
        this.board = [];
        this.lines = lines;
        this.cols = cols;
        this.displayInView = displayInView;
        this.board = new Array(this.lines);
        this.create();
    }
    Board.prototype.get = function () {
        return this.board;
    };
    Board.prototype.create = function () {
        for (var line = 0; line < this.lines; line++) {
            this.board[line] = new Array(this.cols);
            for (var col = 0; col < this.cols; col++) {
                if (line == 0 || line == this.cols - 1 || col == 0 || col == this.lines - 1) {
                    this.board[line][col] = new Wall_1.default(line, col);
                }
                else {
                    this.board[line][col] = new Blank_1.default(line, col);
                }
            }
        }
    };
    Board.prototype.view = function () {
        var data = {
            board: this.board,
            lines: this.lines,
            cols: this.cols
        };
        ReactDOM.render(React.createElement(BoardComponent_1.default, { board: data.board, lines: data.lines, cols: data.cols }), document.getElementById('board'));
    };
    Board.prototype.clean = function (posX, posY) {
        document.querySelectorAll('table tr:nth-child(' + posX + ') td:nth-child(' + posY + ')')[0].style.backgroundColor = this.colorBoard;
    };
    return Board;
}());
exports.default = Board;


/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = __webpack_require__(39);
var Piece_1 = __webpack_require__(165);
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(line, column) {
        var _this = _super.call(this, line, column, Util_1.default.COLOR_WALL) || this;
        _this.isFruit = false;
        return _this;
    }
    return Wall;
}(Piece_1.default));
exports.default = Wall;


/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(164);
var BoardComponent = /** @class */ (function (_super) {
    __extends(BoardComponent, _super);
    function BoardComponent(props) {
        return _super.call(this, props) || this;
    }
    BoardComponent.prototype.render = function () {
        var _this = this;
        var board = Array.from(Array(this.props.lines).keys()).map(function (line) {
            return React.createElement("tr", { key: line + 1 }, Array.from(Array(_this.props.cols).keys()).map(function (col) {
                return React.createElement("td", { key: (line + 1) * col, style: { backgroundColor: _this.props.board[line][col].color } });
            }));
        });
        return (React.createElement("table", null,
            React.createElement("tbody", null, board)));
    };
    return BoardComponent;
}(React.Component));
exports.default = BoardComponent;


/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Storage_1 = __webpack_require__(40);
var Util_1 = __webpack_require__(39);
var Http = /** @class */ (function () {
    function Http() {
        this.storage = new Storage_1.default();
        this.util = new Util_1.default();
    }
    /**
    * Check if user have info in storage.
    * @return {boolean}
    */
    Http.prototype.checkAuth = function () {
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
    Http.prototype.logout = function () {
        var _this = this;
        // Logout
        var logout = document.querySelector('#logout');
        logout.addEventListener('click', function (evt) {
            evt.preventDefault();
            localStorage.clear();
            _this.util.redirect('index');
        });
    };
    return Http;
}());
exports.default = Http;


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
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
     * @param  {any} array
     * @param  {string} field
     * @return {number}
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
exports.default = Util;


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Storage = /** @class */ (function () {
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
exports.default = Storage;


/***/ })

/******/ });
//# sourceMappingURL=game.js.map