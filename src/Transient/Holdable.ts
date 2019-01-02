module MyGame {
    export var useItem = (type: string, main: Main, x: number, y: number, direction: Direction): Holdable => {
        switch (type) {
            case Crumbs.type:
                return new Crumbs(main, x, y, direction);
            case Assets.Sprites.Grodule.key:
                return new Grodule(main, pof(x, y));
            default:
                throw new Error(`Item type ${type} is invalid.`);
        }
    }

    export interface Holdable {
        main: Main;
        startPosition: Phaser.Point;
        iconKey: string;
        use: () => void;
    }
}