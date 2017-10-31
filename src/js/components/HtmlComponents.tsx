import * as React from "react";
import * as ReactDOM from "react-dom";

class HtmlComponents extends React.Component {
    constructor(props: any){
        super(props);
    }

    addToFriendList(key : any): void {
        console.log("handleClick");
        console.log(key);
    }

    render(): any {
        const listItems = this.props.friends.map((friend: any) =>
            <tr key={friend[0]}>
                <td className="table__image">
                    <img src={friend[1].photo} alt={friend[1].name} title={friend[1].name} />
                </td>
                <td className="table__name">{friend[1].name}</td>
                <td className="table__scrore">{friend[1].score} /pts</td>
                <td>
                    <button onClick={() => this.addToFriendList(friend[0])} className="button button--green button--icon button-add-friend" data-id={friend[0]}>
                        <i className="icon ion-person-add"></i>
                    </button>
                </td>
            </tr>
        );
        return (
            <table className="table">
                <tbody>{listItems}</tbody>
            </table>
        );
    }
}

export default HtmlComponents;
