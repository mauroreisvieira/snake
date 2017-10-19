import Setting from './../utils/Setting.js';
import Piece from './../Piece.js';

export default class Blank extends Piece {

    constructor (line, column) {
        super(line, column, Setting.COLOR_BOARD);
        this.isFruit = false;
    }

}
