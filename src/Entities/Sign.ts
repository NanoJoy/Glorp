module MyGame {
    export class Sign {
        main: Main;
        sprite: Phaser.Sprite;
        text: TextDump;

        constructor (main: Main, position: Phaser.Point, text: TextDump) {
            this.main = main;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, Assets.Images.Sign);
            main.physics.arcade.enable(this.sprite);
            this.sprite.body.moves = false;
            this.sprite.body.immovable = true;
            this.text = text;
        }
    }
}