export default class Firebase {

    constructor () {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCnYJD53OX0pUMHIGvh_dHQZDJPpEXI_Dk",
                authDomain: "snake-c8e67.firebaseapp.com",
                databaseURL: "https://snake-c8e67.firebaseio.com",
                projectId: "snake-c8e67",
                storageBucket: "snake-c8e67.appspot.com",
                messagingSenderId: "247524654285"
            });
        }
    }

    /**
     * Push in Firabase
     * @param {string} cell
     * @param {any}    list
     */
    push(cell: string, list : any): void {
        firebase.database().ref(cell).set(list);
    }

    /**
     * Set in Firabase
     * @param {string} cell
     * @param {any}    list
     */
    set(cell: string, list : any): void {
        firebase.database().ref(cell).set(list);
    }

    /**
     * Updated in Firabase
     * @param {string} cell
     * @param {any}    list
     */
    update(cell: string, list : any): void {
        firebase.database().ref(cell).update(list);
    }

    /**
     * Get All Items in Firebase
     * @param  {string} cell
     * @return {any}
     */
    all(cell: string): any{
        var promise = new Promise((resolve, reject) => {
            firebase.app().database().ref(cell).on("value", function(snapshot) {
                let data = snapshot.val();
                let list = [];
                for (var key in data) {
                    list.push({
                        name: data[key].name,
                        email: data[key].email
                    });
                }
                resolve(list);
            });
        });
        return promise;
    }
}
