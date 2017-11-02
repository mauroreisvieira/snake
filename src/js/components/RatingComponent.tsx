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
        this.state = { value: false };
    }

    addToFriendList(friendID : any): void {
        let myID = this.storage.getItem('id');
        this.firebase.all('friends/' + myID).then((response: any) => {
            let players = JSON.parse(this.storage.getItem('players'));
            if (response === null) {
                // Get players in storage.
                players.map((player: any) => {
                    if (player[0] === friendID && player[0] !== myID) {
                        this.firebase.push('friends/' + myID + '/' + player[0], player[1]);
                    }
                });
            } else {
                // Get players in storage.
                players.map((player: any) => {
                    if (player[0] === friendID && player[0] !== myID) {
                        this.firebase.push('friends/' + myID + '/' + player[0], player[1]);
                    }
                });
            }
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
                    <button onClick={() => this.addToFriendList(player[0])}
                        className="button button--green button--icon button-add-friend">
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
