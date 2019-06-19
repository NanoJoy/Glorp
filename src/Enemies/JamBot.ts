module MyGame {
    abstract class Jammer extends Enemy implements Moveable {
        name: string;
        minNumNotes: number;
        maxNumNotes: number;
        patternLength: number;
        beatLength: number;
        tempo: number;
        abstract battleSpriteKey: string;
        worldSpriteKey: string;
        hitPoints = 100;
        main: Main;
        position: Phaser.Point;
        health: number;
        worldSprite: Phaser.Sprite;
        sprite: Phaser.Sprite;
        direction: Direction;
        speed: number;
        alive: boolean;
        transferPosition: Phaser.Point;
        afterDeath: (main: Main) => void;
        specificUpdate: () => void;
        calculateDamage: (pattern: PatternNote[], notePresses: NotePress[]) => number;
        noteComparer = null as (pattern: Phaser.KeyCode[], pressed: number, pressedCount: number) => boolean;

        constructor(main: Main, position: Phaser.Point, movementScript: MovementScript, hitPoints: number, worldSprite: string) {
            super();
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
            (this.movementManager as MovementManager).start();
        }

        getAttackPoints(pattern: PatternNote[]) {
            return Math.floor((pattern.length * 25) / 4);
        }

        playerOverlap(sp: Phaser.Sprite, pl: Player) {
            this.startBattle(this.main);
        }

        update() {
            if (!this.alive) {
                return;
            }
            (this.movementManager as MovementManager).playNext();
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
        battleSpriteKey = Assets.Images.JamBotBattle;
        music = Assets.Audio.JamBot;

        constructor(main: Main, position: Phaser.Point, movementScript: MovementScript) {
            super(main, position, movementScript, 200, Assets.Sprites.JamBotWorld.key);
            this.name = "JamBot";
            this.minNumNotes = 4;
            this.maxNumNotes = 4;
            this.patternLength = 8;
            this.beatLength = 2;
            this.tempo = 125;
            this.worldSpriteKey = Assets.Sprites.JamBotWorld.key;
            this.hitPoints = 200;
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
        battleSpriteKey = Assets.Sprites.JamBugBattle.key;
        music = Assets.Audio.JamBug;

        constructor(main: Main, position: Phaser.Point, movementScript: MovementScript) {
            super(main, position, movementScript, 200, Assets.Sprites.JamBugWorld.key);
            this.name = "JamBug";
            this.minNumNotes = 4;
            this.maxNumNotes = 6;
            this.patternLength = 8;
            this.beatLength = 2;
            this.tempo = 150;
            this.worldSpriteKey = Assets.Sprites.JamBugWorld.key;
            this.hitPoints = 200;
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
                    damage += Math.round((500 - sortedPresses[i].distance) / 33);
                }
                return damage;
            }
        }
    }
}