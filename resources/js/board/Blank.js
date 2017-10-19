import Piece from './../Piece.js';

export default class Blank extends Piece {

    constructor (line, column) {
        super(line, column, '#fff');
        this.isFruit = false;
    }

}
