import Piece from './../Piece.js';

export default class Apple extends Piece {

    constructor (line, column) {
        super(line, column, '#009688');
        this.isFruit = true;
        this.speed = 20;
        this.power = 10;
    }

}
