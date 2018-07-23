module MyGame {
    export abstract class NPC implements Entity, Moveable {
        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        direction: Direction;
        speed: number;
        private movementManager: MovementManager;
        private textManager: TextManager;
        private textDisplay: TextDisplay;
        private buttonPrompt: ButtonPrompt;

        constructor(main: Main, position: Phaser.Point, dialogKey: string, movementScript: MovementScript,
        speed: number, animationSpeed: number, spriteKey: string) {
            this.main = main;
            this.position = position;
            this.speed = speed;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, spriteKey);
            main.physics.arcade.enable(this.sprite);
            SpriteUtils.addPersonAnimations(this.sprite, animationSpeed);

            this.textManager = Dialogs[dialogKey];
            this.textDisplay = new BottomTextDisplay(main, this);
            this.buttonPrompt = new ButtonPrompt(this, main.inputs.O);

            if (movementScript) {
                this.movementManager = new MovementManager(main.game, movementScript, this);
            } else {
                this.sprite.body.moves = false;
            }
            this.sprite.body.immovable = true;
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
                this.buttonPrompt.reposition(this.sprite.x, this.sprite.y);
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

            if (this.textManager.getNext(this.main, this).autoStart || this.buttonPrompt.buttonIsDown()) {
                this.textDisplay.start(this.textManager.useNext(this.main, this));
            }
            this.main.physics.arcade.collide(this.sprite, this.main.player);
        }
    }

    export class OldMan extends NPC {
        constructor(main: Main, position: Phaser.Point, dialogKey: string, movementScript: MovementScript) {
            super(main, position, dialogKey, movementScript, 1000, 3, Assets.Sprites.OldMan.key);
        }
    }
}