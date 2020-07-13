import * as PIXI from "pixi.js";
import { isConstructorDeclaration } from 'typescript';

export default class Game {
    private static _root: HTMLElement;
    public static get Root() : HTMLElement {
        return this._root;
    }

    private static _game: PIXI.Application;
    public static get Game(): PIXI.Application {
        return  this._game
    }

    private _activeScenes: PIXI.Container[];

    constructor(element: HTMLElement){
        Game._root = element;

        this._activeScenes = [];
    
        this.setupPixi();
    }

    private setupPixi(){
        Game._game = new PIXI.Application({
            backgroundColor: 0xE0F0DA, 
        });

        Game._game.ticker.maxFPS = 60;
        Game._game.view.style.position = 'absolute';
        Game.Root.appendChild(Game._game.view);

    }
}