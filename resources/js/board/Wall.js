import {Util} from './../utils/Util.js';
import {Piece} from './../Piece.js';

export default class Wall extends Piece {

    constructor (line, column) {
        super(line, column, Util.COLOR_WALL);
        this.isFruit = false;
    }

}
