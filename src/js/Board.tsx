import Util from './services/Util';
import Wall from './models/Wall';
import Blank from './models/Blank';

import * as React from "react";
import * as ReactDOM from "react-dom";

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
        var innerHTML = "";
        innerHTML += "<table>";
        for (let line = 0; line < this.lines; line++) {
            innerHTML += "<tr>";
            for ( let col = 0; col < this.cols; col++) {
                innerHTML += "<td style='background-color: " + this.board[line][col].color + "'></td>";
            }
            innerHTML += "</tr>";
        }
        innerHTML += "</table>";
        this.displayInView.innerHTML = innerHTML;
    }

    clean(posX: number, posY: number): void {
        document.querySelectorAll('table tr:nth-child(' + posX + ') td:nth-child(' + posY + ')')[0].style.backgroundColor = this.colorBoard;
    }

    addEventListeners(): void {
        // Logout
        let logout = document.querySelector('#logout');
        logout.addEventListener('click', evt => {
            evt.preventDefault();
            this.service.logout();
            this.util.redirect('index');
        });
    }
}
