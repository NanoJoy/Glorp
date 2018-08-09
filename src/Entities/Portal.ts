module MyGame {
    export abstract class Portal implements Entity {
        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        link: number;

        constructor(main: Main, position: Phaser.Point, key: string, link: number) {
            this.main = main;
            this.position = position;
            this.link = link;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, key);

            this.main.physics.arcade.enable(this.sprite);
            this.sprite.body.moves = false;
            this.sprite.body.immovable = true;
        }

        update() {
            this.main.physics.arcade.collide(this.sprite, this.main.player, this.onCollide, null, this);
        }

        onCollide(portalSprite: Phaser.Sprite, playerSprite: Phaser.Sprite) {
            this.main.textOnScreen = true;
            this.main.physics.arcade.isPaused = true;
            var tween = this.main.add.tween(this.main.game.world).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.changeIsland, this);
        }

        changeIsland() {
            StateTransfer.getInstance().island = this.link;
            this.main.state.restart();
        }
    }

    export class OutsideBoundsPortal extends Portal {
        constructor(main: Main, position: Phaser.Point, link: number) {
            super(main, position, Assets.Sprites.Blackness.key, link);
        }
    }
}