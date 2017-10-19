export default class Setting {

    constructor () {}

    static get SPEED () {
        return 400;
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
        return '#000';
    }

}
