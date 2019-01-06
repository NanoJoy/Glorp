module MyGame {
    const TILE_DISTANCE = 2;

    export abstract class Droppable implements Holdable {
        main: Main;
        startPosition: Phaser.Point;
        worldKey: string;
        abstract iconKey: string;

        constructor(main: Main, startPosition: Phaser.Point, worldKey: string) {
            this.main = main;
            this.startPosition = startPosition.clone();
            this.worldKey = worldKey;
        }

        use(): number {
            let player = this.main.player;
            let rounded = Utils.roundToClosestTile(player.position);
            let x = player.direction === Direction.Left ? rounded.x - TILE_DISTANCE : player.direction === Direction.Right ? rounded.x + TILE_DISTANCE : rounded.x;
            let y = player.direction === Direction.Up ? rounded.y - TILE_DISTANCE : player.direction === Direction.Down ? rounded.y + TILE_DISTANCE : rounded.y;
            if (Utils.tileisClear(x, y, this.main)) {
                this.main.addItem(x, y, this.worldKey);
                return 1;
            }
            return 0;
        }
    }

    export class Grodule extends Droppable {
        iconKey = Assets.Images.GroduleIcon;

        constructor(main: Main, startPosition: Phaser.Point) {
            super(main, startPosition, Assets.Sprites.Grodule.key);
        }
    }
}