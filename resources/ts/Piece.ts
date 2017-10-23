export default class Piece {
    public line: number;
    public column: number;
    public color: any;
    public isFruit: boolean;

    constructor (line: number, column: number, color: any) {
        this.line = line;
        this.column = column;
        this.color = color;
    }

    setColor (color: any): void {
        this.color = color;
    }

    view(line: number, column: number): void {
        document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].className = '';
        document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].style.backgroundColor = this.color;
        if (this.isFruit) {
            document.querySelectorAll('table tr:nth-child(' + line + ') td:nth-child(' + column + ')')[0].className = 'blink';
        }
    }
}
