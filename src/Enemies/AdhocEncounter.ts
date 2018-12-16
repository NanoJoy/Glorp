module MyGame {
    abstract class AdhocEncounter implements Enemy {
        name: string;
        minNumNotes: number;
        maxNumNotes: number;
        patternLength: number;
        beatLength: number;
        tempo: number;
        battleSpriteKey: string;
        worldSpriteKey = null as string;
        worldSprite = null as Phaser.Sprite;
        hitPoints: number;
        health: number;
        alive: boolean;
        movementManager = null as MovementManager;
        onStageBuilt: () => void;
        update: () => void;
        die: () => void;
        afterDeath: (main: Main) => void;

        constructor(name: string, minNumNotes: number, maxNumNotes: number, patternLength: number, beatLength: number, tempo: number, hitPoints: number) {
            this.name = name;
            this.minNumNotes = minNumNotes;
            this.maxNumNotes = maxNumNotes;
            this.patternLength = patternLength;
            this.beatLength = beatLength;
            this.tempo = tempo;
            this.hitPoints = hitPoints;
        }

        abstract calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number;
        abstract getAttackPoints(pattern: PatternNote[]): number;
        abstract noteComparer(pattern: Phaser.KeyCode[], pressed: number, pressedCount: number): boolean;
    }

    export class OvenEncounter extends AdhocEncounter {
        constructor() {
            super("Oven", 4, 6, 9, 3, 140, 500);
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
    }
}