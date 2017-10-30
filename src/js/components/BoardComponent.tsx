import * as React from "react";

export const BoardComponent = function list(props : any): any {
    console.log("WIN");
    console.log(props.lines);
    const board = Array.from(Array(props.lines).keys()).map((line: any) =>
        <tr key={line + 1}>
            {Array.from(Array(props.cols).keys()).map((col: any) =>
                <td key={(line + 1) * col} style={{backgroundColor: props.board[line][col].color}}></td>
            )}
        </tr>
    );

    return (
        <table>
            <tbody>
                {board}
            </tbody>
        </table>
    );
}

