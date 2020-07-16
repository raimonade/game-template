import SnailScene from '../core/SnailScene';
export default class UI extends SnailScene {
    private static _instance:UI;    
    public static get Instance(): UI{
        return this._instance ? this._instance : new UI();
    }

    constructor(){
        super();
    }
}