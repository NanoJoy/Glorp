module MyGame {
    export class NPC implements Entity, Moveable {
        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        direction: Direction;
        private movementManager: MovementManager;
        private textDisplay: BottomTextDisplay;
        private buttonPrompt: ButtonPrompt;
        private touchingPlayer: boolean;

        constructor(main: Main, position: Phaser.Point, spriteKey: string, dialogKey: string, movementScript: MovementScript) {
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, spriteKey);
            main.physics.arcade.enable(this.sprite);
            SpriteUtils.addPersonAnimations(this.sprite);

            this.textDisplay = new BottomTextDisplay(main, dialogKey);
            this.buttonPrompt = new ButtonPrompt(this, main.inputs.O);

            if (movementScript) {
                this.movementManager = new MovementManager(main.game, movementScript, this);
            } else {
                this.sprite.body.moves = false;
                this.sprite.body.immovable = true;
            }
            this.direction = Direction.Back;
        }

        onStageBuilt() {
            if (this.movementManager) {
                this.movementManager.start();
            }
        }

        update() {
            let player = this.main.player;
            if (Phaser.Math.distance(this.sprite.centerX, this.sprite.centerY, player.centerX, player.centerY) < TILE_HEIGHT * 1.5) {
                this.buttonPrompt.show();
                if (this.movementManager) {
                    this.movementManager.pause();
                }
                if (player.centerY < this.sprite.y) {
                    this.direction = Direction.Forward;
                } else if (player.centerY > this.sprite.bottom) {
                    this.direction = Direction.Back;
                } else if (player.centerX < this.sprite.left) {
                    this.direction = Direction.Left;
                } else {
                    this.direction = Direction.Right;
                }
                this.sprite.play(SpriteUtils.getIdleAnimName(this.direction));
            } else {
                this.buttonPrompt.hide();
                if (this.movementManager) {
                    this.movementManager.resume();
                }
            }

            if (this.movementManager && !this.movementManager.paused) {
                let walkingAnim = SpriteUtils.getWalkingAnimName(this.direction);
                if (walkingAnim !== this.sprite.animations.currentAnim.name) {
                    this.sprite.play(walkingAnim);
                }
            }

            if (this.buttonPrompt.buttonIsDown()) {
                this.textDisplay.start();
            }
            this.main.physics.arcade.collide(this.sprite, this.main.player);
        }
    }
}