module MyGame {
    export function useItem(type: string, main: Main, x: number, y: number, direction: Direction): number {
        switch (type) {
            case Crumbs.type:
                return new Crumbs(main, x, y, direction).use();
            case Assets.Sprites.Grodule.key:
                return new Grodule(main, pof(x, y)).use();
            default:
                throw new Error(`Item type ${type} is invalid.`);
        }
    }

    export function dropItem(type: string, main: Main, x: number, y: number, direction: Direction): void {
        switch (type) {
            case Assets.Sprites.Grodule.key:
                new Grodule(main, pof(x, y)).use();
        }
    }

    export interface Holdable {
        main: Main;
        startPosition: Phaser.Point;
        iconKey: string;
        use: () => number;
    }
}