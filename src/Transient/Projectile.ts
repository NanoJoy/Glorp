module MyGame {

    export abstract class Projectile implements Holdable {
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
        abstract iconKey: string;
        
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

            this.main.groups.projectiles.push(this);
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

        use(): number {
            Utils.moveInDirection(this.sprite.body, this.direction, this.speed);
            if (this.animations.start) {
                this.sprite.play(this.animations.start);
            }
            this.state = ProjectileState.FLYING;
            return 1;
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

        abstract wait(): void;
        abstract afterFly(): void;
    }

    export class Crumbs extends Projectile {
        static readonly type = Assets.Sprites.Crumbs.key;

        landed: boolean;
        dissolved: boolean;
        iconKey = Assets.Images.CrumbsIcon;

        constructor(main: Main, x: number, y: number, direction: Direction) {
            super(main, x, y, Crumbs.type, direction, 150, 3);
            this.sprite.animations.add("start", Utils.animationArray(0, 3), 8, false);
            this.animations.start = "start";
            this.sprite.animations.add("end", Utils.animationArray(4, 6), 2, false);
            this.animations.end = "end";
            this.main.bringGroupToTop(this.main.groups.barriers.filter(b => {
                return b instanceof Tree || b instanceof Bush || b instanceof StoneWall
            }));
            this.landed = false;
            this.dissolved = false;
        }

        dissolve() {
            if (!this.dissolved) {
                this.dissolved = true;
                this.sprite.play("end");
                this.main.time.events.add(2000, () => {
                    this.state = ProjectileState.DONE;
                }, this);
            }
        }

        wait() {}

        afterFly() {
            if (!this.landed) {
                this.sprite.body.velocity.setTo(0, 0);
                this.landed = true;
                this.main.time.events.add(5000, this.dissolve, this);
            }
        }
    }
}