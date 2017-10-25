export default class Util {
    public static SPEED: number = 200;
    public static BOARD_COLS: number = 30;
    public static BOARD_LINES: number = 30;
    public static KEY_PAUSE: number = 32;
    public static KEY_UP: number = 38;
    public static KEY_LEFT: number = 37;
    public static KEY_RIGHT: number = 39;
    public static KEY_DOWN: number = 40;
    public static COLOR_SNAKE: string = '#10A9E7';
    public static COLOR_BLANK: string = '#fff';
    public static COLOR_BOARD: string = '#fff';
    public static COLOR_WALL: string = '#696a6b';

    constructor () {}

    /**
     * Receive two number to define limit of random.
     * @param  {integer} min
     * @param  {integer} max
     * @return {integer}
     */
     rand (min : number, max : number): number {
         return Math.floor(Math.random() * (max - min) + min);
     }

    /**
     * Receive array and field used to orde this array.
     * @param  {array} array
     * @param  {string} field
     * @return {integer}
     */
     compare(array : any, field : string) : any {
         return array.sort((a, b) => a.field !== b.field ? a.field < b.field ? -1 : 1 : 0);
     }

    /**
     * Method to redirect to other url.
     * @param  {string} url
     * @return {void}
     */
     redirect(url : string) : void {
         window.location.href = './' + url + '.html';
     }

      /**
    * Check if browser is connected to internet.
    * @return {boolean}
    */
    online(): boolean {
        return navigator.onLine;
    }

    /**
    * Listen for changes to network connectivity:
    * @return {boolean}
    */
    connection(): any {
        return navigator.connection;
    }

    /**
     * Method provides information about the system's battery, returns a battery promise.
     * @return {any}
     */
    battery(): any {
        const batteryInfo = {};
        navigator.getBattery().then(function(battery) {
            batteryInfo = battery;
            battery.addEventListener('chargingchange', function() {
                batteryInfo = battery;
            });
        });
        return batteryInfo;
    }

    /**
     * Listen for changes to responsiveness.
     * @return {void}
     */
    orientation(): void {
        console.log("ORIENTATION");
        media.addListener(mql => console.log(mql.matches));

        // Orientation of device changes.
        window.addEventListener('orientationchange', e => {
            console.log(screen.orientation.angle)
        });
    }
 }
