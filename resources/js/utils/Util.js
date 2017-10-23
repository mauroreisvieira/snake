export default class Util {

    constructor () {}

    /**
     * Receive two number to define limit of random.
     * @param  {integer} min
     * @param  {integer} max
     * @return {integer}
     */
    rand (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Receive array and field used to orde this array.
     * @param  {array} array
     * @param  {string} field
     * @return {integer}
     */
    compare(array, field) {
        return array.sort((a, b) => a.field !== b.field ? a.field < b.field ? -1 : 1 : 0);
    }

    /**
     * Method to redirect to other url.
     * @param  string url
     * @return void
     */
    redirect(url) {
        window.location.href = './' + url + '.html';
    }

    static get SPEED () {
        return 200;
    }

    static get BOARD_COLS () {
        return 30;
    }

    static get BOARD_LINES () {
        return 30;
    }

    static get KEY_PAUSE () {
        return 32;
    }

    static get KEY_UP () {
        return 38;
    }

    static get KEY_LEFT () {
        return 37;
    }

    static get KEY_RIGHT () {
        return 39;
    }

    static get KEY_DOWN () {
        return 40;
    }

    static get COLOR_SNAKE () {
        return '#607d8b';
    }

    static get COLOR_BOARD () {
        return '#fff';
    }

    static get COLOR_WALL () {
        return '#35f7cf';
    }
}
