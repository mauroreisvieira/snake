import * as React from "react";

export const RatingComponent = function list(props : any): any {
    const friends = props.friends;
    const listItems = friends.map((friend: any) =>
        <tr key={friend[0]}>
            <td className="table__image">
                <img src={player[1].photo} alt={player[1].name} title={player[1].name} />
            </td>
            <td className="table__name">{player[1].name}</td>
            <td className="table__scrore">{player[1].score} /pts</td>
            <td>
                <button className="button button--green button--icon button-add-friend" data-id={player[0]}>
                    <i className="icon ion-person-add"></i>
                </button>
            </td>
        </tr>
    );

    return (
        <div className="row">{listItems}</div>
    );
}

