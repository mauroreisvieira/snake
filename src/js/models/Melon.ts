import Piece from './Piece';

export default class Melon extends Piece {
    public isFruit: boolean;
    private speed: number = 100;
    private power: number = 20;

    constructor (line: number, column: number) {
        super(line, column, '#4caf50');
        this.isFruit = true;
    }
}
