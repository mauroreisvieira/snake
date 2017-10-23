import Piece from './../Piece.js';

export default class Chili extends Piece {

    constructor (line, column) {
        super(line, column, '#9c27b0');
        this.isFruit = true;
        this.speed = 100;
        this.power = 50;
    }
}
