module MyGame {
    export class NPC implements Entity {
        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        movementManager: MovementManager;
        direction: Direction;
        textDisplay: BottomTextDisplay;

        constructor(main: Main, position: Phaser.Point, spriteKey: string, dialogKey: string, movementScript: MovementScript) {
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, spriteKey);
            main.physics.arcade.enable(this.sprite);
            SpriteUtils.addPersonAnimations(this.sprite);

            this.textDisplay = new BottomTextDisplay(main, dialogKey);

            if (movementScript) {
                this.movementManager = new MovementManager(main.game, movementScript, this.sprite);
            }
        }

        onStageBuilt() {
            if (this.movementManager) {
                this.movementManager.start();
            }
        }

        update() {
            this.main.physics.arcade.collide(this.sprite, this.main.player, this.playerCollide, null, this);
        }

        playerCollide(ns: Phaser.Sprite, ps: Phaser.Sprite) {
            if (this.movementManager) {
                this.movementManager.pause();
            }
            this.textDisplay.start();
        }
    }
}