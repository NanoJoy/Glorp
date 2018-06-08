module MyGame {
    export class Player extends Phaser.Sprite {

        static readonly WALKING_SPEED = 100;
        direction: Direction;
        inputs: Inputs;
        state: Main;
        hasCollided: boolean;

        constructor(state: Main, x: number, y: number) {
            super(state.game, x, y, "player", 0);
            state.game.physics.arcade.enableBody(this);
            this.animations.add("walk_back", SpriteUtils.animationArray(1, 4), 5, true);
            this.animations.add("walk_forward", SpriteUtils.animationArray(6, 9), 5, true);
            this.animations.add("walk_right", SpriteUtils.animationArray(10, 13), 5, true);
            this.animations.add("walk_left", SpriteUtils.animationArray(14, 17), 5, true);
            this.animations.add("idle_back", [0], 5, true);
            this.animations.add("idle_forward", [5], 5, true);
            this.animations.add("idle_right", [10], 5, true);
            this.animations.add("idle_left", [14], 5, true);
            this.play("idle_back");
            this.inputs = state.inputs;
            this.direction = Direction.Back;
            state.game.add.existing(this);
            this.state = state;
        }

        update() {
            if (this.state.textOnScreen) return;
            var player = this;
            var game = this.game;
            this.hasCollided = false;
            this.state.groups.water.forEach(function (water: Water) {
                game.physics.arcade.collide(player, water, water.collisionBehavior, water.collisionCheck, water);
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
                switch (this.direction) {
                    case Direction.Back:
                        animName = "idle_back";
                        break;
                    case Direction.Forward:
                        animName = "idle_forward";
                        break;
                    case Direction.Right:
                        animName = "idle_right";
                        break;
                    case Direction.Left:
                        animName = "idle_left";
                        break;
                    default:
                        animName = this.animations.currentAnim.name;
                }
            }
            if (this.animations.currentAnim.name !== animName) {
                this.play(animName);
            }
            
            SpriteUtils.snapToPixels(this);
        }
    }
}