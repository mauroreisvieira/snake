'use strict';

var Service = function Service () {};

Service.prototype.gravatar = function gravatar (hash, size) {
        if ( size === void 0 ) size = 200;

    return 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
};

Service.prototype.addItem = function addItem (name, value) {
    localStorage.setItem(name, value);
};

Service.prototype.getItem = function getItem (item) {
    return localStorage.getItem(item);
};

Service.prototype.removeItem = function removeItem (item) {
    localStorage.removeItem(item);
};

Service.prototype.checkAuth = function checkAuth () {
    var exists = true;
    if (localStorage.getItem('email') === null) {
        exists = false;
    }
    return exists;
};

Service.prototype.logout = function logout () {
    this.removeItem('email');
};

var Util = function Util () {};

var staticAccessors = { SPEED: {},BOARD_COLS: {},BOARD_LINES: {},KEY_PAUSE: {},KEY_UP: {},KEY_LEFT: {},KEY_RIGHT: {},KEY_DOWN: {},COLOR_SNAKE: {},COLOR_BOARD: {},COLOR_WALL: {} };

Util.prototype.rand = function rand (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

Util.prototype.redirect = function redirect (url) {
    window.location.href = './' + url + '.html';
};

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

Object.defineProperties( Util, staticAccessors );

var Md5 = function Md5 () {
  this.hexTab = '0123456789abcdef';
};

Md5.prototype.safeAdd = function safeAdd (x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff)
};

Md5.prototype.bitRotateLeft = function bitRotateLeft (num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
};

Md5.prototype.md5cmn = function md5cmn (q, a, b, x, s, t) {
  return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b)
};

Md5.prototype.md5ff = function md5ff (a, b, c, d, x, s, t) {
  return this.md5cmn((b & c) | (~b & d), a, b, x, s, t)
};

Md5.prototype.md5gg = function md5gg (a, b, c, d, x, s, t) {
  return this.md5cmn((b & d) | (c & ~d), a, b, x, s, t)
};

Md5.prototype.md5hh = function md5hh (a, b, c, d, x, s, t) {
  return this.md5cmn(b ^ c ^ d, a, b, x, s, t)
};

Md5.prototype.md5ii = function md5ii (a, b, c, d, x, s, t) {
  return this.md5cmn(c ^ (b | ~d), a, b, x, s, t)
};

Md5.prototype.binlMD5 = function binlMD5 (x, len) {
    var this$1 = this;

  /* append padding */
  x[len >> 5] |= 0x80 << (len % 32);
  x[((len + 64) >>> 9 << 4) + 14] = len;

  var i;
  var olda;
  var oldb;
  var oldc;
  var oldd;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = this$1.md5ff(a, b, c, d, x[i], 7, -680876936);
    d = this$1.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = this$1.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = this$1.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = this$1.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = this$1.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = this$1.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = this$1.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = this$1.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = this$1.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = this$1.md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = this$1.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = this$1.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = this$1.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = this$1.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = this$1.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = this$1.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = this$1.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = this$1.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = this$1.md5gg(b, c, d, a, x[i], 20, -373897302);
    a = this$1.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = this$1.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = this$1.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = this$1.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = this$1.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = this$1.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = this$1.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = this$1.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = this$1.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = this$1.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = this$1.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = this$1.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = this$1.md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = this$1.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = this$1.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = this$1.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = this$1.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = this$1.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = this$1.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = this$1.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = this$1.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = this$1.md5hh(d, a, b, c, x[i], 11, -358537222);
    c = this$1.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = this$1.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = this$1.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = this$1.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = this$1.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = this$1.md5hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = this$1.md5ii(a, b, c, d, x[i], 6, -198630844);
    d = this$1.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = this$1.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = this$1.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = this$1.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = this$1.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = this$1.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = this$1.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = this$1.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = this$1.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = this$1.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = this$1.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = this$1.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = this$1.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = this$1.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = this$1.md5ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = this$1.safeAdd(a, olda);
    b = this$1.safeAdd(b, oldb);
    c = this$1.safeAdd(c, oldc);
    d = this$1.safeAdd(d, oldd);
  }

  return [a, b, c, d]
};

Md5.prototype.binl2rstr = function binl2rstr (input) {
  var i;
  var output = '';
  var length32 = input.length * 32;
  for (i = 0; i < length32; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
  }
  return output
};

/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/
Md5.prototype.rstr2binl = function rstr2binl (input) {
  var i;
  var output = [];
  output[(input.length >> 2) - 1] = undefined;
  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }
  var length8 = input.length * 8;
  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
  }
  return output
};

/*
* Calculate the MD5 of a raw string
*/
Md5.prototype.rstrMD5 = function rstrMD5 (s) {
  return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8))
};

/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/
Md5.prototype.rstrHMACMD5 = function rstrHMACMD5 (key, data) {
  var i;
  var bkey = this.rstr2binl(key);
  var ipad = [];
  var opad = [];
  var hash;
  ipad[15] = opad[15] = undefined;
  if (bkey.length > 16) {
    bkey = this.binlMD5(bkey, key.length * 8);
  }
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5c5c5c5c;
  }
  hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
  return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128))
};

Md5.prototype.rstr2hex = function rstr2hex (input) {
    var this$1 = this;

  var output = '';
  var x;
  var i;
  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i);
    output += this$1.hexTab.charAt((x >>> 4) & 0x0f) + this$1.hexTab.charAt(x & 0x0f);
  }
  return output
};

Md5.prototype.str2rstrUTF8 = function str2rstrUTF8 (input) {
  return unescape(encodeURIComponent(input))
};

Md5.prototype.rawMD5 = function rawMD5 (s) {
  return this.rstrMD5(this.str2rstrUTF8(s))
};

Md5.prototype.hexMD5 = function hexMD5 (s) {
  return this.rstr2hex(this.rawMD5(s))
};

Md5.prototype.rawHMACMD5 = function rawHMACMD5 (k, d) {
  return this.rstrHMACMD5(this.str2rstrUTF8(k), this.str2rstrUTF8(d))
};

Md5.prototype.hexHMACMD5 = function hexHMACMD5 (k, d) {
  return this.rstr2hex(this.rawHMACMD5(k, d))
};

Md5.prototype.md5 = function md5 (string, key, raw) {
  if (!key) {
    if (!raw) {
      return this.hexMD5(string)
    }
    return this.rawMD5(string)
  }
  if (!raw) {
    return this.hexHMACMD5(key, string)
  }
  return this.rawHMACMD5(key, string)
};

var User = function User (name, email, score) {
    this.name = name;
    this.email = email;
    this.score = score;

    var hash = new Md5();
    this.hash = hash.md5(this.email);
    this.service = new Service();
    this.photo = this.service.gravatar(this.hash);

    this.service.addItem('name', this.name);
    this.service.addItem('email', this.email);
    this.service.addItem('photo', this.photo);

};

User.prototype.getPhoto = function getPhoto () {
    return this.photo;
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
        Piece$$1.call(this, line, column, Util.COLOR_WALL);
        this.isFruit = false;
    }

    if ( Piece$$1 ) Wall.__proto__ = Piece$$1;
    Wall.prototype = Object.create( Piece$$1 && Piece$$1.prototype );
    Wall.prototype.constructor = Wall;

    return Wall;
}(Piece));

var Blank = (function (Piece$$1) {
    function Blank (line, column) {
        Piece$$1.call(this, line, column, Util.COLOR_BOARD);
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

    this.colorBoard = Util.COLOR_BOARD;
    this.colorWall = Util.COLOR_WALL;

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
    this.color = Util.COLOR_SNAKE;

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
    var this$1 = this;


    this.util = new Util();
    this.service = new Service();

    fetch('https://randomuser.me/api/?results=9')
        .then( function (response) { return response.json(); })
        .then( function (data) {
            var playerList = [];
            data.results.forEach( function (val, key) {
                playerList.push({
                    'name' : val.name.first + ' ' + val.name.last,
                    'email' : val.email,
                    'photo' : val.picture.medium
                });
            });
            this$1.service.addItem('players', JSON.stringify(playerList));
    });

    if (!this.service.checkAuth()) {
        this.util.redirect('index');
    }

    this.gamInBoard = document.querySelector('game-board');
    this.logout = document.querySelector('#logout');

    if (this.gamInBoard) {
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

        this.numberLines = Util.BOARD_LINES;
        this.numberCols = Util.BOARD_COLS;
        this.interval = Util.SPEED;

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

Game.prototype.addEventListeners = function addEventListeners () {
        var this$1 = this;

    window.addEventListener('keydown', function (evt) {
        this$1.keyPressed(evt);
    });

    this.logout.addEventListener('click', function (evt) {
        evt.preventDefault();
        this$1.service.logout();
        this$1.util.redirect('index');
    });
};

new Game();
//# sourceMappingURL=game.js.map
