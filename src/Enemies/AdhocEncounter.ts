module MyGame {
    abstract class AdhocEncounter implements Enemy {
        abstract name: string;
        abstract minNumNotes: number;
        abstract maxNumNotes: number;
        abstract patternLength: number;
        abstract beatLength: number;
        abstract tempo: number;
        abstract hitPoints: number;
        abstract health: number;
        battleSpriteKey: string;
        worldSpriteKey = null as string;
        worldSprite = null as Phaser.Sprite;
        alive: boolean;
        movementManager = null as MovementManager;
        transferPosition: Phaser.Point;
        onStageBuilt: () => void;
        update: () => void;
        afterDeath: (main: Main) => void;

        constructor() {
        }

        abstract calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number;
        abstract getAttackPoints(pattern: PatternNote[]): number;
        abstract noteComparer(pattern: Phaser.KeyCode[], pressed: number, pressedCount: number): boolean;
        abstract die(): void;
    }

    export class OvenEncounter extends AdhocEncounter {
        name = "Oven";
        minNumNotes = 4;
        maxNumNotes = 6;
        patternLength = 9;
        beatLength = 3;
        tempo = 140;
        hitPoints = 300;
        health = 300;

        constructor() {
            super();
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

        die() {}
    }
}