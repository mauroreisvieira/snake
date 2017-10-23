export default class Piece {

    constructor (line, column, color) {
        this.line = line;
        this.column = column;
        this.color = color;
    }

    setColor (color) {
        this.color = color;
    }

    view(line, column) {
        document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].className = '';
        document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].style.backgroundColor = this.color;
        if (this.isFruit) {
            document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].className = 'blink';
        }
    }

}
