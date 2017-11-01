import Service from './services/Service';
import Util from './services/Util';
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

        this.board = new Array(this.lines);
        this.create();
        this.addEventListeners();
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
                    this.board[line][col] = new Blank(line, col);
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

    addEventListeners(): void {
        // Logout
        let logout = document.querySelector('#logout');
        logout.addEventListener('click', evt => {
            evt.preventDefault();
            let util = new Util();
            let service = new Service();
            service.logout();
            util.redirect('index');
        });
    }
}
