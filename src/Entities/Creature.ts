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

    export class Blish extends Creature implements Moveable {
        private static MAX_SPEED = 300;
        private static CUTOFF = 2;

        lines: Phaser.Line[];
        movementManager: MovementManager;
        currentTarget: { crumbs: Crumbs, route: Direction[] };
        direction: Direction;
        speed: number;

        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Blish.key, [Assets.Images.Lillypad, Assets.Sprites.Grounds.key]);
            this.type = Assets.Sprites.Blish.key;
            main.groups.barriers.push(new Water(main, position));
            this.sprite.body.velocity.setTo(0, 0);
            this.sprite.anchor.setTo(0.5, 0.5);
            this.sprite.position.add(TILE_WIDTH / 2, TILE_HEIGHT / 2);
            this.speed = Blish.MAX_SPEED;
        }

        uniqueUpdate() {
            this.main.groups.grounds.filter(g => g.hasBody).forEach(g => {
                this.main.physics.arcade.collide(this.sprite, g.sprite);
            });
            let gridPos = Utils.roundToClosestTile(this.sprite.body.position);
            let possibleTargets = this.main.groups.projectiles.filter(p => {
                if (!(p instanceof Crumbs)) {
                    return false;
                }
                let c = p as Crumbs;
                return !c.dissolved && c.landed;
            }).map(p => {
                return {
                    crumbs: p as Crumbs,
                    route: this.getRouteToTarget(gridPos, Utils.roundToClosestTile(p.sprite.position), this.main.island.layout)
                };
            }).filter(r => r.route);
            let ordered = possibleTargets.sort(r => r.route.length);
            if (ordered.length > 0) {
                let shortest = ordered[0];
                if (!this.currentTarget || (this.currentTarget.crumbs !== shortest.crumbs && (this.currentTarget.crumbs.dissolved || this.currentTarget.route.length > shortest.route.length))) {
                    this.currentTarget = shortest;
                    if (this.movementManager) {
                        this.movementManager.pause();
                    }

                    let script = new MovementScript(gridPos, shortest.route, false);
                    this.movementManager = new MovementManager(this.main.game, script, this);
                    this.movementManager.start(true);
                    this.sprite.body.position.setTo((gridPos.x + 0.5) * TILE_WIDTH, (gridPos.y + 0.5) * TILE_HEIGHT);
                }
            }
            this.main.groups.projectiles.filter(p => p instanceof Crumbs).forEach(c => {
                this.main.physics.arcade.overlap(this.sprite, c.sprite, (bs: Phaser.Sprite, cs: Phaser.Sprite) => {
                    (c as Crumbs).dissolve();
                });
            });
            if (this.direction === Direction.Up && this.sprite.rotation !== 0) {
                this.sprite.rotation = 0;
            } else if (this.direction === Direction.Down && this.sprite.rotation !== Math.PI) {
                this.sprite.rotation = Math.PI;
            } else if (this.direction === Direction.Right && this.sprite.rotation !== Math.PI * 0.5) {
                this.sprite.rotation = Math.PI * 0.5;
            } else if (this.direction === Direction.Left && this.sprite.rotation !== Math.PI * 1.5) {
                this.sprite.rotation = Math.PI * 1.5;
            }
        }

        private getRouteToTarget(start: Phaser.Point, target: Phaser.Point, layout: string[]): Direction[] {
            function positionIsGood(x: number, y: number) {
                return layout[y].charAt(x) === "o" || layout[y].charAt(x) === "?";
            }

            function blockedX(position: Phaser.Point, sign: number) {
                return (sign === -1 && (position.x === 0 || !positionIsGood(position.x - 1, position.y)))
                    || (sign === 1 && (position.x === layout[position.y].length - 1 || !positionIsGood(position.x + 1, position.y)));
            }

            function blockedY(position: Phaser.Point, sign: number) {
                return (sign === -1 && (position.y === 0 || !positionIsGood(position.x, position.y - 1)))
                    || (sign === 1 && (position.y === layout.length - 1 || !positionIsGood(position.x, position.y + 1)));
            }

            let directions = [] as Direction[];
            let current = start.clone();
            let signX = start.x < target.x ? 1 : start.x > target.x ? -1 : 0;
            let signY = start.y < target.y ? 1 : start.y > target.y ? -1 : 0;
            let directionX = signX === 1 ? Direction.Right : signX === -1 ? Direction.Left : null;
            let directionY = signY === 1 ? Direction.Down : signY === -1 ? Direction.Up : null;
            let horizontal = true;
            let doneX = false;
            let doneY = false;
            while (!current.equals(target) && !(doneX && doneY)) {
                doneX = blockedX(current, signX) || current.x === target.x;
                doneY = blockedY(current, signY) || current.y === target.y;
                if (horizontal) {
                    if (doneX) {
                        horizontal = false;
                    } else {
                        directions.push(directionX);
                        current.x += signX;
                    }
                } else {
                    if (doneY) {
                        horizontal = true;
                    } else {
                        directions.push(directionY);
                        current.y += signY;
                    }
                }
            }

            if (current.equals(target)) {
                if (layout[target.y].charAt(target.x) === "?") {
                    directions.pop();
                }
                return directions;
            }
            return null;
        }

        uniqueOnStageBuilt() {
            let sightBlockers = this.barriers;//.concat(this.main.groups.grounds.map(g => g.sprite));
            let leftSides = sightBlockers.map(b => new Phaser.Line(b.left, b.top, b.left, b.bottom));
            let topSides = sightBlockers.map(b => new Phaser.Line(b.left, b.top, b.right, b.top));
            let rightSides = sightBlockers.map(b => new Phaser.Line(b.right, b.top, b.right, b.bottom));
            let bottomSides = sightBlockers.map(b => new Phaser.Line(b.left, b.bottom, b.right, b.bottom));
            this.lines = leftSides.concat(topSides).concat(rightSides).concat(bottomSides);
        };
    }

    enum BlumpusState {
        SLEEPING, AWAKE, MOVING
    }

    const BLUMPUS_FLAG = "BLUMPUS_FLAG";

    export class Blumpus extends Creature {
        animSpeed = 1;
        idleFrames = [0, 1];
        private state: BlumpusState;
        private wakeTime: number;
        private hasWoken: boolean;
        private defeated: boolean;
        private startPosition: Phaser.Point;

        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Blumpus.key);
            this.type = Assets.Sprites.Blumpus.key;
            this.sprite.body.immovable = true;
            this.sprite.anchor.setTo(0.5, 0);
            this.sprite.x += this.sprite.width / 2;
            this.state = BlumpusState.SLEEPING;
            this.sprite.animations.add("wakeup", Utils.animationArray(1, 7), 7, false);
            this.sprite.animations.add("gotosleep", Utils.animationArray(5, 1), 7, false);
            this.sprite.animations.add("idle", Utils.animationArray(6, 7), 3, true);
            this.sprite.animations.add("sleep", this.idleFrames, 1, true);
            this.sprite.animations.add("walk", Utils.animationArray(8, 12), 5, true);
            this.wakeTime = Infinity;
            this.defeated = false;
            this.startPosition = this.sprite.position.clone();
            if (StateTransfer.getInstance().flags[BLUMPUS_FLAG]) {
                this.moveRight();
                this.sprite.x = this.startPosition.x + (TILE_WIDTH * 3);
            }
        }

        uniqueUpdate() {
            this.main.physics.arcade.collide(this.sprite, this.main.player, (sprite: Phaser.Sprite, player: Phaser.Sprite) => {
                if (this.state === BlumpusState.AWAKE && !this.defeated) {
                    let enemy = new BlumpusEncounter(this.main);
                    enemy.startBattle(this.main);
                }
            });
            if (this.state === BlumpusState.SLEEPING) {
                let playerItem = this.main.player.itemManager.peekItem();
                if (playerItem instanceof Airhorn && playerItem.inUse) {
                    this.hasWoken = true;
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
            } else if (this.state === BlumpusState.MOVING) {
                if (this.sprite.x >= this.startPosition.x + (TILE_WIDTH * 3)) {
                    this.sprite.x = this.startPosition.x + (TILE_WIDTH * 3);
                    this.sprite.body.velocity.x = 0;
                    this.state = BlumpusState.SLEEPING;
                    this.sprite.animations.play("gotosleep");
                }
            }
        }

        uniqueOnStageBuilt() { }

        getHasWoken(): boolean {
            return this.hasWoken;
        }

        moveRight(): void {
            this.defeated = true;
            this.state = BlumpusState.MOVING;
            this.sprite.body.velocity.x = 20;
            this.sprite.scale.x = -1;
            this.sprite.play("walk");
            StateTransfer.getInstance().flags[BLUMPUS_FLAG] = true;
        }
    }
}