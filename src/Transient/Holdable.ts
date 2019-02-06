module MyGame {
    export function useItem(type: string, main: Main, x: number, y: number, direction: Direction): number {
        switch (type) {
            case Assets.Sprites.Airhorn.key:
                return new Airhorn(main, x, y).use();
            case Crumbs.type:
                return new Crumbs(main, x, y, direction).drop();
            case Assets.Sprites.Grodule.key:
                return new Grodule(main, x, y).drop();
            default:
                throw new Error(`Item type ${type} is invalid.`);
        }
    }

    export function dropItem(type: string, main: Main, x: number, y: number, direction: Direction): void {
        switch (type) {
            case Assets.Sprites.Grodule.key:
                new Grodule(main, x, y).drop();
            case Assets.Sprites.Airhorn.key:
                new Airhorn(main, x, y).drop();
            }
    }

    export interface Holdable {
        main: Main;
        startPosition: Phaser.Point;
        iconKey: string;
        drop: () => number;
        use: () => number;
    }
}