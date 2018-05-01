module MyGame {
    export class Player extends Phaser.Sprite {

        static readonly WALKING_SPEED = 100;
        inputs: Inputs;

        constructor(game: Phaser.Game, inputs: Inputs, x: number, y: number) {
            super(game, x, y, "player", 0);
            game.physics.arcade.enableBody(this);
            this.animations.add("walk", [1, 2, 3, 4], 5, true);
            this.play("walk");
            this.inputs = inputs;
            game.add.existing(this);
        }

        update() {
            var directionDown = 1;
            if (this.inputs.up.isDown) {
                directionDown *= 2;
            }
            if (this.inputs.left.isDown) {
                directionDown *= 3;
            }
            if (this.inputs.down.isDown) {
                directionDown *= 5;
            }
            if (this.inputs.right.isDown) {
                directionDown *= 7;
            }
            switch (directionDown) {
                case 2:
                    this.body.velocity.setTo(0, -Player.WALKING_SPEED);
                    break;
                case 3:
                    this.body.velocity.setTo(-Player.WALKING_SPEED, 0);
                    break;
                case 5:
                    this.body.velocity.setTo(0, Player.WALKING_SPEED);
                    break;
                case 7:
                    this.body.velocity.setTo(Player.WALKING_SPEED, 0);
                    break;
                default:
                    this.body.velocity.setTo(0, 0);
                    break;
            }
            SpriteUtils.snapToPixels(this);            
        }
    }
}