module MyGame {
    export abstract class Ground implements Entity {
        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Image;

        constructor(main: Main, position: Phaser.Point, imageKey: string) {
            this.main = main;
            this.position = position;
            this.sprite = main.add.image(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, imageKey);
        }
    }

    export class Grass extends Ground {
        private static frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5];

        constructor (main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Grounds.key);
            this.sprite.frame = Grass.frames[Math.floor(Math.random() * Grass.frames.length)];
        }
    }

    export class TileFloor extends Ground {
        wall: Phaser.Image;

        constructor(main: Main, position: Phaser.Point, fromDoor = false) {
            super(main, position, Assets.Images.TileFloor);
            console.log(fromDoor);
            if (!fromDoor && position.y > 0 && main.island.layout[position.y - 1][position.x] === "b") {
                this.wall = main.add.image(position.x * TILE_WIDTH, (position.y - 1) * TILE_HEIGHT, Assets.Images.Wall);
            }
        }
    }
}