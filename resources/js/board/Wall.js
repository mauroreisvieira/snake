import Setting from './../utils/Setting.js';
import Piece from './../Piece.js';

export default class Wall extends Piece {

    constructor (line, column) {
        super(line, column, Setting.COLOR_WALL);
        this.isFruit = false;
    }

}
