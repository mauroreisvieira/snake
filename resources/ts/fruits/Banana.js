import Piece from './../Piece.js';

export default class Banana extends Piece {

    constructor (line, column) {
        super(line, column, '#ffeb3b');
        this.isFruit = true;
        this.speed = -50;
        this.power = 1;
    }

}
