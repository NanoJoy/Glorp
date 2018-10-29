module MyGame {
    abstract class Jammer implements Enemy, Moveable {
        name: string;
        minNumNotes: number;
        maxNumNotes: number;
        patternLength: number;
        beatLength: number;
        tempo: number;
        battleSpriteKey: string;
        worldSpriteKey: string;
        hitPoints = 100;
        main: Main;
        position: Phaser.Point;
        health: number;
        worldSprite: Phaser.Sprite;
        sprite: Phaser.Sprite;
        direction: Direction;
        speed: number;
        movementManager: MovementManager;
        alive: boolean;
        afterDeath: (main: Main) => void;
        specificUpdate: () => void;
        calculateDamage: (pattern: PatternNote[], notePresses: NotePress[]) => number;

        constructor(main: Main, position: Phaser.Point, movementScript: MovementScript, hitPoints: number, worldSprite: string) {
            this.alive = true;
            this.main = main;
            this.position = position;
            this.health = hitPoints;
            this.worldSprite = this.main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, worldSprite);
            this.worldSprite.anchor.setTo(0.5, 0.5);
            this.main.physics.arcade.enable(this.worldSprite);
            this.worldSprite.animations.add("walk", Utils.animationArray(0, 7), 5, true);
            this.worldSprite.play("walk");
            this.sprite = this.worldSprite;
            this.movementManager = new MovementManager(this.main.game, movementScript, this);
        }

        onStageBuilt() {
            this.movementManager.start();
        }

        getAttackPoints(pattern: PatternNote[]) {
            return Math.floor((pattern.length * 25) / 2);
        }

        playerOverlap(sp: Phaser.Sprite, pl: Player) {
            var stateTransfer = StateTransfer.getInstance();
            stateTransfer.island = this.main.island.num;
            stateTransfer.enemy = this;
            stateTransfer.dialogs = WorldManager.getInstance().exportDialogs();
            stateTransfer.triggers = this.main.triggers.filter(t => !t.active)
                .map(t => new Location(this.main.island.num, t.x, t.y));
            stateTransfer.npcs = this.main.groups.npcs.filter(n => n.positionToSave)
                .map(n => {
                    return {
                        old: new Location(this.main.island.num, n.startX, n.startY),
                        now: new Location(this.main.island.num, n.positionToSave.x, n.positionToSave.y)
                    }
                });
            this.main.state.start(States.Battle);
        }

        update() {
            if (!this.alive) {
                return;
            }
            this.movementManager.playNext();
            this.main.physics.arcade.overlap(this.worldSprite, this.main.player, this.playerOverlap, null, this);
            if (Utils.isAThing(this.specificUpdate)) {
                this.specificUpdate();
            }
        }

        die() {
            this.alive = false;
            WorldManager.getInstance().changeLayout(StateTransfer.getInstance().island, this.position, "J");
        }
    }

    export class JamBot extends Jammer {
        constructor(main: Main, position: Phaser.Point, movementScript: MovementScript) {
            super(main, position, movementScript, 100, Assets.Sprites.JamBotWorld.key);
            this.name = "JamBot";
            this.minNumNotes = 4;
            this.maxNumNotes = 4;
            this.patternLength = 8;
            this.beatLength = 2;
            this.tempo = 100;
            this.battleSpriteKey = "jambot";
            this.worldSpriteKey = Assets.Sprites.JamBotWorld.key;
            this.hitPoints = 100;
            this.speed = 1000;

            this.calculateDamage = (pattern: PatternNote[], notePresses: NotePress[]) => {
                if (pattern.length !== notePresses.length) {
                    return 0;
                }
                let sortedPattern = pattern.sort(function (a, b) { return a.position - b.position });
                let sortedPresses = notePresses.sort(function (a, b) { return a.position - b.position });
                let damage = 0;
                for (let i = 0; i < sortedPattern.length; i++) {
                    if (sortedPattern[i].key !== sortedPresses[i].note) {
                        return 0;
                    }
                    let amount = Math.max(Math.round((500 - sortedPresses[i].distance) / 60), 0);
                    if (sortedPattern[i].position === sortedPresses[i].position) {
                        amount = Math.floor(amount * 2);
                    }
                    damage += amount;
                }
                return damage;
            }
        }
    }

    export class JamBug extends Jammer {
        constructor(main: Main, position: Phaser.Point, movementScript: MovementScript) {
            super(main, position, movementScript, 100, Assets.Sprites.JamBugWorld.key);
            this.name = "JamBug";
            this.minNumNotes = 4;
            this.maxNumNotes = 4;
            this.patternLength = 8;
            this.beatLength = 2;
            this.tempo = 150;
            this.battleSpriteKey = "jambot";
            this.worldSpriteKey = Assets.Sprites.JamBugWorld.key;
            this.hitPoints = 100;
            this.speed = 500;

            this.specificUpdate = () => {
                if (this.direction === Direction.Up && this.sprite.rotation !== Math.PI) {
                    this.sprite.rotation = Math.PI;
                } else if (this.direction === Direction.Down && this.sprite.rotation !== 0) {
                    this.sprite.rotation = 0;
                } else if (this.direction === Direction.Right && this.sprite.rotation !== Math.PI * 1.5) {
                    this.sprite.rotation = Math.PI * 1.5;
                } else if (this.direction === Direction.Left && this.sprite.rotation !== Math.PI * 0.5) {
                    this.sprite.rotation = Math.PI * 0.5;
                }
            }

            this.calculateDamage = (pattern: PatternNote[], notePresses: NotePress[]) => {
                if (pattern.length !== notePresses.length) {
                    return 0;
                }
                let sortedPattern = pattern.sort(function (a, b) { return a.position - b.position });
                let sortedPresses = notePresses.sort(function (a, b) { return a.position - b.position });
                let damage = 0;
                for (let i = 0; i < sortedPattern.length; i++) {
                    if (sortedPattern[i].key !== sortedPresses[i].note || sortedPattern[i].position !== sortedPresses[i].position) {
                        return 0;
                    }
                    damage += Math.round((500 - sortedPresses[i].distance) / 100);
                }
                return damage;
            }
        }
    }
}