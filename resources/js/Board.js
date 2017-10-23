import {Util} from './utils/Util.js';
import {Wall} from './board/Wall.js';
import {Blank} from './board/Blank.js';

export default class Board {

    constructor (lines, cols, displayInView) {
        this.lines = lines;
        this.cols = cols;
        this.displayInView = displayInView;

        this.colorBoard = Util.COLOR_BOARD;
        this.colorWall = Util.COLOR_WALL;

        this.board = new Array(this.lines);
        this.create();
    }

    get() {
        return this.board;
    }

    create() {
        for (var line = 0; line < this.lines; line++) {
            this.board[line] = new Array(this.cols);
            for ( var col = 0; col < this.cols; col++) {
                if (line == 0 || line == this.cols -1 || col == 0 || col == this.lines -1) {
                    this.board[line][col] = new Wall(line, col);
                } else {
                    this.board[line][col] = new Blank(line, col);
                }
            }
        }
    }

    view() {
        var innerHTML = "";
        innerHTML += "<table>";
        for (let line = 0; line < this.lines; line++) {
            innerHTML += "<tr>";
            for ( var col = 0; col < this.cols; col++) {
                innerHTML += "<td style='background-color: " + this.board[line][col].color + "'></td>";
            }
            innerHTML += "</tr>";
        }
        innerHTML += "</table>";
        this.displayInView.innerHTML = innerHTML;
    }

    clean(posX, posY) {
        document.querySelectorAll('table tr:nth-child(' + posX + ') td:nth-child(' + posY + ')')[0].style.backgroundColor = this.colorBoard;
    }
}
