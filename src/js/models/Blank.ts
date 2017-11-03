import Util from './../services/Util';
import Piece from './Piece';

export default class Wall extends Piece {
    public isFruit: boolean;

    constructor (line: number, column: number, color: any) {
        super(line, column, color);
        this.isFruit = false;
    }
}
