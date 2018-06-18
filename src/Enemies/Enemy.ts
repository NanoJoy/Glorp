module MyGame {
    export interface Enemy {
        minNumNotes: number;
        maxNumNotes: number;
        patternLength: number;
        beatLength: number;
        tempo: number;
        spriteKey: string;
        hitPoints: number;
        calculateDamage: (pattern: PatternNote[], notePresses: NotePress[]) => number;
    }
}