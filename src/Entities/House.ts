module MyGame {
    export class House implements Entity {
        main: Main;
        sprite: Phaser.Sprite;
        position: Phaser.Point;
        link: AdhocPortal;

        constructor(main: Main, position: Phaser.Point) {
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, Assets.Sprites.House.key);
            this.sprite.scale.setTo(2, 2);
            main.physics.arcade.enable(this.sprite);
            this.sprite.body.moves = true;
            this.sprite.body.immovable = true;
            this.sprite.smoothed = false;
            this.sprite.body.setSize(Assets.Sprites.House.width, Assets.Sprites.House.height * (2 / 3), 0, Assets.Sprites.House.height * (1 / 3));
        }

        update() {
            this.main.physics.arcade.collide(this.sprite, this.main.player);
        }
    }
}