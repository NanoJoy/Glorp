module MyGame {
    export class House {
        main: Main;
        sprite: Phaser.Sprite;

        constructor(main: Main, position: Phaser.Point) {
            this.main = main;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, Assets.Images.House);
            this.sprite.scale.setTo(2, 2);
            this.sprite.smoothed = false;
            main.physics.arcade.enable(this.sprite);
            this.sprite.body.moves = true;
            this.sprite.body.immovable = true;
        }

        update() {
            this.main.physics.arcade.collide(this.sprite, this.main.player);
        }
    }
}