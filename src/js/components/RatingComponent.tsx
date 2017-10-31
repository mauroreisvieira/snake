import Storage from './../services/Storage';
import Firebase from './../services/Firebase';

import * as React from "react";
import * as ReactDOM from "react-dom";

class RatingComponent extends React.Component {
    private storage: any;
    private firebase: any;

    constructor(props: any){
        super(props);
        this.storage = new Storage();
        this.firebase = new Firebase();
    }

    addToFriendList(key : any): void {
        let myID = this.storage.getItem('id');
        console.log("friend ID", key);
        console.log("my ID", myID);
        this.firebase.all('friends/' + myID).then(response => {
            if (response === null) {

            }
            console.log(response);
        });
    }

    render(): any {
        const listItems = this.props.players.map((player: any) =>
            <tr key={player[0]}>
                <td className="table__image">
                    <img src={player[1].photo} alt={player[1].name} title={player[1].name} />
                </td>
                <td className="table__name">{player[1].name}</td>
                <td className="table__scrore">{player[1].score} /pts</td>
                <td>
                    <button onClick={() => this.addToFriendList(player[0])} className="button button--green button--icon button-add-friend" data-id={player[0]}>
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

export default RatingComponent;
