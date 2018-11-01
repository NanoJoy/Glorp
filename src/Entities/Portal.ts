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
            this.main.stopPlayer();
            var tween = this.main.add.tween(this.main.game.world).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.changeIsland, this);
        }

        changeIsland() {
            var stateTransfer = StateTransfer.getInstance();
            stateTransfer.island = this.link;
            stateTransfer.position = this.playerStart;
            stateTransfer.reason = TransferReason.LINK;
            stateTransfer.dialogs = WorldManager.getInstance().exportDialogs();
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
            super(main, position, direction === Direction.Down ? Assets.Sprites.DoorWay.key : Assets.Images.Door, link, playerStart);

            if (direction === Direction.Down) {
                this.sprite.y += (TILE_HEIGHT - (Assets.Sprites.DoorWay.height / 2));
                this.sprite.x -= (Assets.Sprites.DoorWay.width - TILE_WIDTH) / 2;
            } else {
                this.sprite.y -= TILE_HEIGHT;
            }
        }
    }

    export class AdhocPortal extends Portal {
        constructor(main: Main, position: Phaser.Point, link: number, playerStart?: Phaser.Point) {
            super(main, position, "", link, playerStart);
        }
    }
}