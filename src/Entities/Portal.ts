module MyGame {
    export abstract class Portal implements Entity {
        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        link: number;
        playerStart: Phaser.Point;

        constructor(main: Main, position: Phaser.Point, key: string, link: number, playerStart?: Phaser.Point) {
            this.main = main;
            this.position = pcop(position);
            this.playerStart = pcop(playerStart);
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
            var tween = this.main.add.tween(this.main.game.world).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.changeIsland, this);
        }

        changeIsland() {
            var stateTransfer = StateTransfer.getInstance();
            stateTransfer.island = this.link;
            stateTransfer.position = this.playerStart;
            stateTransfer.fromLink = true;
            this.main.state.restart();
        }
    }

    export class OutsideBoundsPortal extends Portal {
        constructor(main: Main, position: Phaser.Point, link: number, playerStart?: Phaser.Point) {
            super(main, position, Assets.Sprites.Blackness.key, link, playerStart);
        }
    }

    export class Doorway extends Portal {
        constructor(main: Main, position: Phaser.Point, link: number, direction: Direction, playerStart?: Phaser.Point) {
            super(main, position, Assets.Sprites.DoorWay.key, link, playerStart);

            let asset = Assets.Sprites.DoorWay;

            if (direction === Direction.Down) {
                this.sprite.y += (TILE_HEIGHT - (Assets.Sprites.DoorWay.height / 2));
            } else {
                this.sprite.y -= (TILE_HEIGHT - (Assets.Sprites.DoorWay.height / 2));
            }

            this.sprite.body.setSize(asset.width, asset.height / 2, 0, asset.height / 2);
        }
    }
}