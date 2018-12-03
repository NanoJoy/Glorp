module MyGame {
    export enum ProjectileType {
        CRUMBS, NONE
    }

    export var makeProjectile = (type: ProjectileType, main: Main, x: number, y: number, direction: Direction): Projectile => {
        switch (type) {
            case ProjectileType.CRUMBS:
                return new Crumbs(main, x, y, direction);
            case ProjectileType.NONE:
                return null;
        }
    }

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
            switch (this.state) {
                case ProjectileState.WAITING:
                    this.wait();
                    break;
                case ProjectileState.FLYING:
                    this.fly();
                    break;
                case ProjectileState.AFTER_FLYING:
                    this.afterFly();
                    break;
                case ProjectileState.DONE:
                    this.remove();
            }
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

        remove() {
            this.main.groups.projectiles = this.main.groups.projectiles.filter(p => p !== this);
            this.sprite.destroy();
        }
    }

    export class Crumbs extends Projectile {
        landed: boolean;

        constructor(main: Main, x: number, y: number, direction: Direction) {
            super(main, x, y, Assets.Sprites.Crumbs.key, direction, 150, 3);
            this.sprite.animations.add("start", Utils.animationArray(0, 3), 8, false);
            this.animations.start = "start";
            this.sprite.animations.add("end", Utils.animationArray(4, 6), 2, false);
            this.animations.end = "end";
            this.start();

            this.wait = () => null;
            this.afterFly = () => {
                if (!this.landed) {
                    this.sprite.body.velocity.setTo(0, 0);
                    this.landed = true;
                    this.main.time.events.add(5000, this.dissolve, this);
                }
            };
        }

        dissolve() {
            this.sprite.play("end");
            this.main.time.events.add(2000, () => {
                this.state = ProjectileState.DONE;
            }, this)
        }
    }
}