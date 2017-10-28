import Util from './../services/Util';
import Piece from './Piece';

export default class Wall extends Piece {
    public isFruit: boolean;

    constructor (line: number, column: number) {
        super(line, column, Util.COLOR_WALL);
        this.isFruit = false;
    }
}
