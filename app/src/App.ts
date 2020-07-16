import * as PIXI from "pixi.js";
import Game from './Game';

export default class App {
    private readonly _element: HTMLElement;

    constructor(){
        this._element = document.createElement('div');
        this._element.id = 'GameElement';
        document.body.appendChild(this._element);

        this.initGame();
    }

    private initGame(){
        new Game(this._element);
        console.log('Game started');
    }


}

(function() { new App(); }) ();