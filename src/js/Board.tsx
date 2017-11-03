import Util from './services/Util';
import Storage from './services/Storage';
import Wall from './models/Wall';
import Blank from './models/Blank';

import * as React from "react";
import * as ReactDOM from "react-dom";

import BoardComponent from './components/BoardComponent';

export default class Board {
    private lines: number;
    private cols: number;
    private displayInView: any;
    private colorBoard: any = Util.COLOR_BOARD;
    private colorWall: any = Util.COLOR_WALL;
    private board: any = [];

    constructor (lines: number, cols: number, displayInView: any) {
        this.lines = lines;
        this.cols = cols;
        this.displayInView = displayInView;

        let storage = new Storage();
        this.colorBoard = storage.getItem('theme') === undefined ? this.colorBoard : storage.getItem('theme');

        this.board = new Array(this.lines);
        this.create();
    }

    get(): any {
        return this.board;
    }

    create(): void {
        for (var line = 0; line < this.lines; line++) {
            this.board[line] = new Array(this.cols);
            for ( var col = 0; col < this.cols; col++) {
                if (line == 0 || line == this.cols -1 || col == 0 || col == this.lines -1) {
                    this.board[line][col] = new Wall(line, col);
                } else {
                    this.board[line][col] = new Blank(line, col, this.colorBoard);
                }
            }
        }
    }

    view(): void {
        const data = {
            board: this.board,
            lines: this.lines,
            cols: this.cols
        };

        ReactDOM.render(
            <BoardComponent
                board={data.board}
                lines={data.lines}
                cols={data.cols} />,
            document.getElementById('board')
        );
    }

    clean(posX: number, posY: number): void {
        document.querySelectorAll('table tr:nth-child(' + posX + ') td:nth-child(' + posY + ')')[0].style.backgroundColor = this.colorBoard;
    }
}
