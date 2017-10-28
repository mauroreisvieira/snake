import Piece from './Piece';

export default class Strawberry extends Piece {
    public isFruit: boolean;
    private speed: number = 100;
    private power: number = 5;

    constructor (line: number, column: number) {
        super(line, column, '#f44336');
        this.isFruit = true;
    }
}
