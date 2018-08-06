module MyGame {
    export abstract class Ground implements Entity {
        main: Main;
        position: Phaser.Point;
        image: Phaser.Image;

        constructor(main: Main, position: Phaser.Point, imageKey: string) {
            this.main = main;
            this.position = position;
            this.image = main.add.image(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, imageKey);
        }
    }

    export class Grass extends Ground {
        private static frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5];

        constructor (main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Grounds.key);
            this.image.frame = Grass.frames[Math.floor(Math.random() * Grass.frames.length)];
        }
    }

    export class TileFloor extends Ground {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Images.TileFloor);
        }
    }
}