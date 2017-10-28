import Piece from './Piece';

export default class Banana extends Piece {
    public isFruit: boolean;
    private speed: number = 100;
    private power: number = 20;

    constructor (line: number, column: number) {
        super(line, column, '#ffeb3b');
        this.isFruit = true;
    }
}

