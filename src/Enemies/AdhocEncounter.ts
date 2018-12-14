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
        calculateDamage: (pattern: PatternNote[], notePresses: NotePress[]) => number;
        getAttackPoints: (pattern: PatternNote[]) => number;
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
    }

    export class OvenEncounter extends AdhocEncounter {
        constructor() {
            super("Oven", 4, 6, 9, 3, 140, 500);
        }
    }
}