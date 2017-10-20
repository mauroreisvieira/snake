import Util from './../utils/Util.js';
import Piece from './../Piece.js';

export default class Blank extends Piece {

    constructor (line, column) {
        super(line, column, Util.COLOR_BOARD);
        this.isFruit = false;
    }

}
