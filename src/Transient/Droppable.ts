module MyGame {
    export abstract class Droppable implements Holdable {
        main: Main;
        startPosition: Phaser.Point;
        worldKey: string;
        abstract iconKey: string;

        constructor(main: Main, startPosition: Phaser.Point, worldKey: string) {
            this.main = main;
            this.startPosition = startPosition.clone();
            this.worldKey = worldKey;
            this.use();
        }

        use(): void {
            let rounded = Utils.roundToClosestTile(this.main.player.position);
            this.main.groups.barriers.push(Source.makeSource(this.main, rounded.x, rounded.y, this.worldKey));
        }
    }
}