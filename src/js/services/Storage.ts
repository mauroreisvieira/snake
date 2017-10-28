export default class Storage {

    constructor () {

    }

    /**
     * Save items in browser storage.
     * @param {string} name
     * @param {string} value
     * @return {void}
     */
    addItem(name : string, value : any): void {
        localStorage.setItem(name, value);
    }

    /**
     * Get Item in storage.
     * @param  {string} item
     * @return {string}
     */
    getItem(item : string): string {
        return localStorage.getItem(item);
    }

    /**
     * Remove Item in storage.
     * @param {string} item [description]
     * @return {void}
     */
    removeItem(item: string): void{
        localStorage.removeItem(item);
    }
}
