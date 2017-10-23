import Piece from './../Piece.js';

export default class Apple extends Piece {

    constructor (line, column) {
        super(line, column, '#f44336');
        this.isFruit = true;
        this.speed = -75;
        this.power = 5;
    }

}
