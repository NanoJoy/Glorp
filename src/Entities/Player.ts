module MyGame {
    export class Player extends Phaser.Sprite {

        static readonly WALKING_SPEED = 100;
        static readonly STARTING_HEALTH = 100;
        direction: Direction;
        inputs: Inputs;
        state: Main;
        hasCollided: boolean;

        projectileType: ProjectileType;
        projectileCount: number;

        constructor(state: Main, position: Phaser.Point, health?: number) {
            super(state.game, position.x * TILE_WIDTH, position.y * TILE_HEIGHT, Assets.Sprites.Player.key, 0);
            state.game.physics.arcade.enableBody(this);
            Utils.addPersonAnimations(this);
            this.inputs = state.inputs;
            this.direction = Direction.Down;
            state.add.existing(this);
            this.state = state;
            this.health = Utils.isAThing(health) ? health : Player.STARTING_HEALTH;
            this.inputs.K.onUp.add(this.throwProjectile, this);

            this.projectileType = ProjectileType.NONE;
            this.projectileCount = 0;
        }

        onStageBuilt() {
            this.play("idle_back");
        }

        update() {
            if (this.state.playerStopped) {
                this.play(Utils.getIdleAnimName(this.direction));
                return;
            }
            var player = this;
            var game = this.game;
            this.hasCollided = false;
            this.state.groups.barriers.filter(b => b.playerCollides && b.hasBody).forEach(function (barrier) {
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
                    this.direction = Direction.Up;
                    animName = "walk_forward";
                    this.body.velocity.setTo(0, -Player.WALKING_SPEED);
                    break;
                case 3:
                    this.direction = Direction.Left;
                    animName = "walk_left";
                    this.body.velocity.setTo(-Player.WALKING_SPEED, 0);
                    break;
                case 5:
                    this.direction = Direction.Down;
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

        throwProjectile() {
            if (this.projectileCount > 0) {
                this.state.groups.projectiles.push(makeProjectile(this.projectileType, this.state, this.x, this.y, this.direction));
                this.projectileCount -= 1;
            }
        }
    }
}