module MyGame {
    export abstract class Creature implements Entity {
        readonly MOVE = "move";

        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        type: string;
        collidesWith: string[];
        barriers: Phaser.Sprite[];
        animSpeed = 10;
        idleFrames: number[];

        constructor(main: Main, position: Phaser.Point, spriteKey: string, collidesWith?: string[]) {
            this.main = main;
            this.position = position.clone();
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, spriteKey);
            this.main.physics.arcade.enableBody(this.sprite);
            this.collidesWith = collidesWith;
        }

        abstract uniqueUpdate(): void;
        abstract uniqueOnStageBuilt(): void;

        onStageBuilt() {
            this.sprite.animations.add(this.MOVE, this.idleFrames, this.animSpeed, true);
            this.sprite.play(this.MOVE);
            if (this.collidesWith !== undefined) {
                this.barriers = this.main.groups.barriers
                    .filter(b => this.collidesWith.indexOf(b.sprite.key as string) !== -1)
                    .map(b => b.sprite);
            } else {
                this.barriers = this.main.groups.barriers.map(b => b.sprite);
            }
            this.uniqueOnStageBuilt();
        }

        update() {
            this.main.physics.arcade.collide(this.sprite, this.barriers);
            this.uniqueUpdate();
        }
    }

    export class Blish extends Creature {
        private static MAX_SPEED = 100;
        private static CUTOFF = 2;

        lines: Phaser.Line[];

        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Blish.key, [Assets.Images.Lillypad, Assets.Sprites.Grounds.key]);
            this.type = Assets.Sprites.Blish.key;
            main.groups.barriers.push(new Water(main, position));
            this.sprite.body.velocity.setTo(0, 0);
            this.sprite.anchor.setTo(0.5, 0.5);
            this.sprite.position.add(TILE_WIDTH / 2, TILE_HEIGHT / 2);
        }

        uniqueUpdate() {
            this.main.groups.grounds.filter(g => g.hasBody).forEach(g => {
                this.main.physics.arcade.collide(this.sprite, g.sprite);
            });
            this.main.groups.projectiles.filter(p => p instanceof Crumbs).forEach(c => {
                let sees = Utils.sees(this.sprite.position, c.sprite.position, Infinity, this.lines);
                if (sees.item1 || sees.item2) {
                    Utils.moveToTarget(this.sprite.body, c.sprite.body.position, Blish.MAX_SPEED, Blish.CUTOFF, sees);
                }
                let crumbs = c as Crumbs;
                this.main.physics.arcade.overlap(this.sprite, c.sprite, (blishSprite: Phaser.Sprite, crumbSprite: Phaser.Sprite) => {
                    if (crumbs.landed) {
                        crumbs.dissolve();
                    }
                })
            });
            if (this.sprite.body.velocity.y < 0 && this.sprite.rotation !== 0) {
                this.sprite.rotation = 0;
            } else if (this.sprite.body.velocity.y > 0 && this.sprite.rotation !== Math.PI) {
                this.sprite.rotation = Math.PI;
            } else if (this.sprite.body.velocity.x > 0 && this.sprite.rotation !== Math.PI * 0.5) {
                this.sprite.rotation = Math.PI * 0.5;
            } else if (this.sprite.body.velocity.x < 0 && this.sprite.rotation !== Math.PI * 1.5) {
                this.sprite.rotation = Math.PI * 1.5;
            }
        }

        uniqueOnStageBuilt() {
            let leftSides = this.barriers.map(b => new Phaser.Line(b.left, b.top, b.left, b.bottom));
            let topSides = this.barriers.map(b => new Phaser.Line(b.left, b.top, b.right, b.top));
            this.lines = leftSides.concat(topSides);
        };
    }

    enum BlumpusState {
        SLEEPING, AWAKE
    }

    export class Blumpus extends Creature {
        animSpeed = 1;
        private state: BlumpusState;
        private wakeTime: number;
        idleFrames = [0, 1];

        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Blumpus.key);
            this.type = Assets.Sprites.Blumpus.key;
            this.sprite.body.moves = false;
            this.sprite.body.immovable = true;
            this.state = BlumpusState.SLEEPING;
            this.sprite.animations.add("wakeup", Utils.animationArray(1, 7), 7, false);
            this.sprite.animations.add("gotosleep", Utils.animationArray(7, 1), 7, false);
            this.sprite.animations.add("idle", Utils.animationArray(6, 7), 3, true);
            this.sprite.animations.add("sleep", this.idleFrames, 1, true);
            this.wakeTime = Infinity;
        }

        uniqueUpdate() {
            this.main.physics.arcade.collide(this.sprite, this.main.player);
            if (this.state === BlumpusState.SLEEPING) {
                let playerItem = this.main.player.itemManager.peekItem();
                if (playerItem instanceof Airhorn && playerItem.inUse) {
                    this.state = BlumpusState.AWAKE;
                    this.sprite.play("wakeup");
                    this.sprite.animations.currentAnim.onComplete.add(() => { 
                        this.sprite.play("idle");
                        this.wakeTime = new Date().getTime();
                    }, this);
                }
            } else if (this.state === BlumpusState.AWAKE) {
                if (new Date().getTime() > this.wakeTime + 5000) {
                    this.state = BlumpusState.SLEEPING;
                    this.sprite.play("gotosleep");
                    this.sprite.animations.currentAnim.onComplete.add(() => {
                        this.sprite.play("sleep");
                    }, this);
                    this.wakeTime = Infinity;
                }
            }
        }

        uniqueOnStageBuilt() { }
    }
}