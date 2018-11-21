module MyGame {
    export abstract class Projectile {
        main: Main;
        sprite: Phaser.Sprite;
        startPosition: Phaser.Point;
        range: number;
        direction: Direction;
        speed: number;
        animations: {
            start: string,
            moving: string,
            end: string
        };
        state: ProjectileState;
        wait: () => void;
        afterFly: () => void;
        
        constructor(main: Main, x: number, y: number, key: string, direction: Direction, speed: number, range = Infinity) {
            this.main = main;
            this.sprite = main.add.sprite(x, y, key);
            main.physics.arcade.enable(this.sprite);
            this.startPosition = pof(x, y);
            this.direction = direction;
            this.range = isVertical(direction) ? range * TILE_HEIGHT : range * TILE_WIDTH;
            this.speed = speed;
            this.animations = {
                start: null,
                moving: null,
                end: null
            }
            this.state = ProjectileState.WAITING;
        }

        update() {
            if (this.state === ProjectileState.DONE) return;
            let updateMap = {
                WAITING: this.wait,
                FLYING: this.fly,
                AFTER_FLYING: this.afterFly
            };
            updateMap[this.state]();
        }

        start() {
            Utils.moveInDirection(this.sprite.body, this.direction, this.speed);
            if (this.animations.start) {
                this.sprite.play(this.animations.start);
            }
            this.state = ProjectileState.FLYING;
        }

        fly() {
            if (this.sprite.position.distance(this.startPosition) > this.range) {
                this.state = ProjectileState.AFTER_FLYING;
                return;
            }
            if (this.animations.moving) {
                this.sprite.play(this.animations.moving);
            }
        }
    }

    export class Crumbs extends Projectile {
        constructor(main: Main, x: number, y: number, direction: Direction) {
            super(main, x, y, Assets.Sprites.Crumbs.key, direction, 150, 3);
            this.sprite.animations.add("start", Utils.animationArray(0, 3), 8, false);
            this.animations.start = "start";
            this.sprite.animations.add("end", Utils.animationArray(4, 6), 2, false);
            this.animations.end = "end";
            this.start();

            this.wait = () => null;
            this.afterFly = () => {
                this.sprite.play(this.animations.end);
            };
        }
    }
}