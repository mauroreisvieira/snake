export default class Service {

    constructor () {

    }

    getAvatar(hash, size = 200) {
        fetch('http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size, {
            method: 'get'
        }).then(response => {
            console.info(response);
        }).catch(err => {
            console.warn(err);
        });
    }

}
