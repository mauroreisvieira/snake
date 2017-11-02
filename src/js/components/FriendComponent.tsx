import * as React from "react";
import * as ReactDOM from "react-dom";

class FriendComponent extends React.Component {

    constructor(props: any){
        super(props);
    }

    render(): any {
        if (this.props.friends) {
            const listItems = this.props.friends.map((friend: any) =>
                <div key={friend[0]} className="cell-large-4 cell-medium-4 cell-small-12">
                    <div className="item">
                        <div className="item__photo">
                            <span style={{color: friend[1].color}}></span>
                            <img src={friend[1].photo} alt={friend[1].name} title={friend[1].name} />
                        </div>
                        <div className="item__content">
                            <div className="item__name">{friend[1].name}</div>
                            <a className="item__mail">{friend[1].email}</a>
                            <div className="item__history"><strong>Last Login:</strong></div>
                        </div>
                        <div className="item__options">
                            <button className="button button--small button--yellow" disabled><i className="icon ion-ios-game-controller-b"></i> Challenge</button>
                            <button className="button button--small button--yellow" disabled><i className="icon ion-android-mail"></i> Message</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            const listItems = <div className="cell-large-12 cell-medium-12 cell-small-12">
                <span className="size-100">😋</span>
                <h4 className="color-white">You don't have any friends yeat!!</h4><br />
            </div>
        }
        return (
            <div className="row">{listItems}</div>
        );
    }
}

export default FriendComponent;
