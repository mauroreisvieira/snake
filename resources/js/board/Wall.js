import Piece from './../Piece.js';

export default class Wall extends Piece {

    constructor (line, column) {
        super(line, column, '#000');
        this.isFruit = false;
    }

}
