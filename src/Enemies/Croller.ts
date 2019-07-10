module MyGame {
    export class Croller extends Enemy implements Moveable {
        sprite: Phaser.Sprite;
        direction: Direction;
        speed = 200;
        main: Main;
        position: Phaser.Point;
        movementManager: IMovementManager;
        blockers: Barrier[];
        battleSpriteKey = Assets.Sprites.CrollerBattle.key;
        music = Assets.Audio.Blumpus;
        minNumNotes = 4;
        maxNumNotes = 4;
        patternLength = 8;
        beatLength = 4;
        tempo = 150;
        hitPoints = 300;
        health = 300;
        name: "Croller";

        private noteCount = 8;
        private positions: number[];

        afterDeath(main: Main): void { }

        constructor(main: Main, position: Phaser.Point) {
            super();
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, Assets.Sprites.Croller.key);
            main.physics.arcade.enableBody(this.sprite);
            this.worldSprite = this.sprite;

            this.sprite.animations.add("walk", Utils.animationArray(0, 5), 8, true);
            this.sprite.animations.add("stand", [0], 4);
        }

        playerOverlap(sp1: Phaser.Sprite, sp2: Phaser.Sprite): void {
            this.startBattle(this.main);
        }

        update(): void {
            (this.movementManager as TargetMover).update();
            this.main.physics.arcade.collide(this.sprite, this.blockers.map(b => b.sprite));
            this.main.physics.arcade.collide(this.sprite, this.main.player, this.playerOverlap, null, this);

            if ((this.sprite.body as Phaser.Physics.Arcade.Body).velocity.isZero()) {
                if (this.sprite.animations.currentAnim.name === "walk") {
                    this.sprite.play("stand");
                }
            } else if (this.sprite.animations.currentAnim.name === "stand") {
                this.sprite.play("walk", 8, true);
            }
        }

        onStageBuilt() {
            this.blockers = this.main.groups.barriers.filter(b => b.playerCollides);
            this.movementManager = new TargetMover(this, this.blockers);
            (this.movementManager as TargetMover).followTarget(this.main.player);
        }
    
        calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number {
            if (notePresses.length < this.minNumNotes) {
                return 0;
            }
            return this.health / 4;
        }

        getAttackPoints(pattern: PatternNote[]): number {
            return 34;
        }

        die(): void {
            this.alive = false;
            WorldManager.getInstance().changeLayout(StateTransfer.getInstance().island, this.position, "C");
        }

        noteComparer(pattern: Phaser.KeyCode[], pressed: number, pressedCount: number, beatPos: number): boolean {
            let orderedPositions = this.positions.sort();
            return orderedPositions[pressedCount] === beatPos && PatternUtil.getNthNote(pattern, pressedCount) === pressed;
        }

        onNoteDisplay(game: Battle, noteOrNull: Phaser.KeyCode, beatPos: number) {
            if (this.noteCount === this.patternLength) {
                this.positions = [];
                for (let i = 0; i < 4; i++) {
                    let rand = Math.floor(Math.random() * this.patternLength);
                    while (this.positions.indexOf(rand) !== -1) {
                        rand = (rand + 1) % this.patternLength;
                    }
                    this.positions.push(rand);
                }
                this.noteCount = 0;
            }
            
            if (this.positions.indexOf(beatPos) > -1) {
                game.enemyDisplay.playAnim("spark", [2, 1, 0], 12);
            }
            this.noteCount += 1;
        }
    }

    export class Foller extends Croller {
        constructor(main: Main, position: Phaser.Point, movementScript: MovementScript) {
            super(main, position);
            this.movementManager = new MovementManager(main.game, movementScript, this);
        }

        update() {
            
        }

        seesPlayer(): boolean {
            let playerPos = this.main.player.position;
            let pos = this.sprite.position;
            let line = new Phaser.Line(pos.x, pos.y, playerPos.x, playerPos.y);
            let slope = (playerPos.y - pos.y) / (playerPos.x - pos.x);
            let startQuarter = 0;
            switch (this.direction) {
                case Direction.Left:
                    startQuarter = 5;
                    break;
                case Direction.Right:
                    startQuarter = 1;
                    break;
                case Direction.Down:
                    startQuarter = 3;
                    break;
                case Direction.Up:
                    startQuarter = -1;
                    break;
            }
            let angle = line.angle > 7 * Math.PI / 4 ? line.angle - 2 * Math.PI : line.angle;
            if (angle < startQuarter * Math.PI / 4 || angle > (startQuarter + 2) * Math.PI / 4) {
                return false;
            }
            let playerCollides = this.main.groups.barriers.filter(b => b.playerCollides);
            let switchDir = playerPos.x > pos.x ? 1 : -1;
            for (let i = 0; i < Math.abs(playerPos.x - playerPos.y); i++) {
                let checkX = switchDir * i;
                let checkY = Math.floor(switchDir * i * slope);
                if (playerCollides.some(b => b.position.equalsXY(checkX, checkY))) {
                    return false;
                }
            }
            return true;
        }
    }
}