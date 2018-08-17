module MyGame {
    export class Player extends Phaser.Sprite {

        static readonly WALKING_SPEED = 100;
        direction: Direction;
        inputs: Inputs;
        state: Main;
        hasCollided: boolean;

        constructor(state: Main, position: Phaser.Point) {
            super(state.game, position.x * TILE_WIDTH, position.y * TILE_HEIGHT, Assets.Sprites.Player.key, 0);
            state.game.physics.arcade.enableBody(this);
            Utils.addPersonAnimations(this);
            this.inputs = state.inputs;
            this.direction = Direction.Back;
            state.add.existing(this);
            this.state = state;
        }

        onStageBuilt() {
            this.play("idle_back");
        }

        update() {
            if (this.state.textOnScreen) {
                this.play(Utils.getIdleAnimName(this.direction));
                return;
            }
            var player = this;
            var game = this.game;
            this.hasCollided = false;
            this.state.groups.barriers.filter(b => b.hasBody).forEach(function (barrier) {
                game.physics.arcade.collide(player, barrier.sprite, barrier.onCollision, null, barrier);
            });

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
            var animName = "";
            switch (directionDown) {
                case 2:
                    this.direction = Direction.Forward;
                    animName = "walk_forward";
                    this.body.velocity.setTo(0, -Player.WALKING_SPEED);
                    break;
                case 3:
                    this.direction = Direction.Left;
                    animName = "walk_left";
                    this.body.velocity.setTo(-Player.WALKING_SPEED, 0);
                    break;
                case 5:
                    this.direction = Direction.Back;
                    animName = "walk_back";
                    this.body.velocity.setTo(0, Player.WALKING_SPEED);
                    break;
                case 7:
                    this.direction = Direction.Right;
                    animName = "walk_right";
                    this.body.velocity.setTo(Player.WALKING_SPEED, 0);
                    break;
                default:
                    this.body.velocity.setTo(0, 0);
                    break;
            }
            if (directionDown === 1) {
                animName = Utils.getIdleAnimName(this.direction);
            }
            if (this.animations.currentAnim.name !== animName) {
                this.play(animName);
            }
            
            Utils.snapToPixels(this);
        }
    }
}