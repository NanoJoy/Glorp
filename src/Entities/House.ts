module MyGame {
    export class House implements Entity {
        main: Main;
        sprite: Phaser.Sprite;
        position: Phaser.Point;

        constructor(main: Main, position: Phaser.Point) {
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, Assets.Images.House);
            main.physics.arcade.enable(this.sprite);
            this.sprite.body.moves = true;
            this.sprite.body.immovable = true;
        }

        update() {
            this.main.physics.arcade.collide(this.sprite, this.main.player);
        }
    }
}