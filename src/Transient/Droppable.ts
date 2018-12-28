module MyGame {
    export abstract class Droppable implements Holdable {
        main: Main;
        startPosition: Phaser.Point;
        image: Phaser.Image;
        abstract iconKey: string;

        constructor(main: Main, startPosition: Phaser.Point, key: string) {
            this.main = main;
            this.startPosition = startPosition.clone();
            this.use();
        }

        use(): void {

        }
    }
}