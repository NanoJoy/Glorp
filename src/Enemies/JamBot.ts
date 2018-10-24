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

        constructor(main: Main, position: Phaser.Point, movementScript: MovementScript, hitPoints: number, worldSprite: string) {
            this.alive = true;
            this.main = main;
            this.position = position;
            console.log(position);
            this.health = hitPoints;
            this.worldSprite = this.main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, worldSprite);
            this.main.physics.arcade.enable(this.worldSprite);
            this.worldSprite.animations.add("walk", Utils.animationArray(0, 7), 5, true);
            this.worldSprite.play("walk");
            console.log(this.worldSprite);
            this.sprite = this.worldSprite;
            this.movementManager = new MovementManager(this.main.game, movementScript, this);
        }

        onStageBuilt() {
            this.movementManager.start();
        }

        calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number {
            if (pattern.length !== notePresses.length) {
                return 0;
            }
            var sortedPattern = pattern.sort(function (a, b) { return a.position - b.position });
            var sortedPresses = notePresses.sort(function (a, b) { return a.position - b.position });
            var damage = 0;
            for (var i = 0; i < sortedPattern.length; i++) {
                if (sortedPattern[i].key !== sortedPresses[i].note) {
                    return 0;
                }
                var amount = Math.round((500 - sortedPresses[i].distance) / 50);
                if (sortedPattern[i].position === sortedPresses[i].position) {
                    amount = Math.floor(amount * 1.5);
                }
                damage += amount;
            }
            return damage;
        }

        getAttackPoints(pattern: PatternNote[]) {
            return pattern.length * 25;
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
            this.tempo = 500;
            this.battleSpriteKey = "jambot";
            this.worldSpriteKey = Assets.Sprites.JamBotWorld.key;
            this.hitPoints = 100;
            this.speed = 1000;
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
            this.tempo = 500;
            this.battleSpriteKey = "jambot";
            this.worldSpriteKey = Assets.Sprites.JamBugWorld.key;
            this.hitPoints = 100;
            this.speed = 1000;
        }
    }
}