import * as React from "react";
import * as ReactDOM from "react-dom";

class BoardComponent extends React.Component {

    constructor(props: any){
        super(props);
    }

    render(): any {
        const board = Array.from(Array(this.props.lines).keys()).map((line: any) =>
            <tr key={line + 1}>
                {Array.from(Array(this.props.cols).keys()).map((col: any) =>
                    <td key={(line + 1) * col} style={{backgroundColor: this.props.board[line][col].color}}></td>
                )}
            </tr>
        );
        return (
        <table>
            <tbody>{board}</tbody>
        </table>
        );
    }
}

export default BoardComponent;

