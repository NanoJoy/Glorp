module MyGame {
    export abstract class Enemy {
        name: string;
        minNumNotes: number;
        maxNumNotes: number;
        patternLength: number;
        beatLength: number;
        tempo: number;
        battleSpriteKey: string;
        worldSpriteKey: string;
        worldSprite: Phaser.Sprite;
        hitPoints: number;
        health: number;
        alive: boolean;
        movementManager: MovementManager;
        transferPosition: Phaser.Point;
        music: AudioAsset;
        abstract onStageBuilt(): void;
        abstract update(): void;
        abstract afterDeath(main: Main): void;

        
        abstract calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number;
        abstract getAttackPoints(pattern: PatternNote[]): number;
        abstract die(): void;
        abstract noteComparer(pattern: Phaser.KeyCode[], pressed: number, pressedCount: number): boolean;

        startBattle(main: Main) {
            let stateTransfer = StateTransfer.getInstance();
            stateTransfer.island = main.island.num;
            stateTransfer.enemy = this;
            stateTransfer.dialogs = WorldManager.getInstance().exportDialogs();
            stateTransfer.triggers = main.triggers.filter(t => !t.active)
                .map(t => new Location(main.island.num, t.x, t.y));
            main.groups.npcs.filter(n => n.hasSaveInfo()).forEach(n => {
                let info = n.unloadSaveInfo();
                let matches = stateTransfer.npcs.filter(t => t.old.equals(info.old));
                if (matches.length > 0) {
                    let match = matches[0];
                    match.now = info.now;
                    match.script = info.script;
                    match.speed = info.speed;
                } else {
                    stateTransfer.npcs.push(info);
                }
            });
            stateTransfer.health = main.player.health;
            main.stopPlayer();
            Utils.fadeToBlack(main, 500, States.Battle);
        }
    }

    abstract class AdhocEncounter extends Enemy {
        abstract name: string;
        abstract minNumNotes: number;
        abstract maxNumNotes: number;
        abstract patternLength: number;
        abstract beatLength: number;
        abstract tempo: number;
        abstract hitPoints: number;
        abstract health: number;
        abstract battleSpriteKey: string;
        worldSpriteKey = null as string;
        worldSprite = null as Phaser.Sprite;
        alive: boolean;
        movementManager = null as MovementManager;
        transferPosition: Phaser.Point;
        onStageBuilt: () => void;
        update: () => void;
        afterDeath: (main: Main) => void;

        constructor() {
            super();
        }
    }

    export class OvenEncounter extends AdhocEncounter {
        main: Main;
        name = "Oven";
        battleSpriteKey = Assets.Images.OvenBattle;
        minNumNotes = 4;
        maxNumNotes = 6;
        patternLength = 9;
        beatLength = 3;
        tempo = 140;
        hitPoints = 300;
        health = 300;

        constructor(main: Main) {
            super();
            this.main = main;
            this.transferPosition = pof(17, 5);
        }

        calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number {
            if (pattern.length !== notePresses.length) {
                return 0;
            }
            let sortedPattern = pattern.sort(function (a, b) { return a.position - b.position });
            let sortedPresses = notePresses.sort(function (a, b) { return b.position - a.position });
            let damage = 0;
            for (let i = 0; i < sortedPattern.length; i++) {
                if (sortedPattern[i].key !== sortedPresses[i].note) {
                    return 0;
                }
                damage += Math.round((500 - sortedPresses[i].distance) / 33);
            }
            return damage;
        }

        getAttackPoints(pattern: PatternNote[]) {
            return Math.floor((pattern.length * 25) / 2);
        }

        noteComparer(pattern: Phaser.KeyCode[], pressed: number, pressedCount: number): boolean {
            var noNulls = pattern.filter(p => Utils.isAThing(p));
            if (pressedCount > noNulls.length) {
                return false;
            }
            return noNulls[noNulls.length - 1 - pressedCount] === pressed;
        }

        die() {
            this.alive = false;
        }
    }
}