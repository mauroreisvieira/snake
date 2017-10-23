import {Piece} from './../Piece.js';

export default class Melon extends Piece {

    constructor (line, column) {
        super(line, column, '#4caf50');
        this.isFruit = true;
        this.speed = 50;
        this.power = 20;
    }

}
