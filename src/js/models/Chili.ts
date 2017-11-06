import Piece from './Piece';

export default class Chili extends Piece {
    public isFruit: boolean;
    private speed: number = 100;
    private power: number = 20;
    private image: string;

    constructor (line: number, column: number) {
        super(line, column, '#9c27b0');
        this.isFruit = true;
        this.image = "🌶";
    }
}
