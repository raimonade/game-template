import { SignalDispatcher } from "strongly-typed-events";

export default class Events {

    private _onClick = new SignalDispatcher();
    public get onClick() {
        return this._onClick.asEvent();
    }

    public onClicked() {
        this._onClick.dispatch();
    }

}