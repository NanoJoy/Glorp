module MyGame {
    var frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5];
    export class Ground implements Entity {
        main: Main;
        position: Phaser.Point;
        image: Phaser.Image;

        constructor (main: Main, position: Phaser.Point) {
            this.main = main;
            this.position = position;
            this.image = main.add.image(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, Assets.Sprites.Grounds.key);
            this.image.frame = frames[Math.floor(Math.random() * frames.length)];
        }
    }
}