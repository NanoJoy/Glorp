module MyGame {
    export interface Enemy {
        minNumNotes: number;
        maxNumNotes: number;
        patternLength: number;
        beatLength: number;
        tempo: number;
        spriteKey: string;
        hitPoints: number;
        health: number;
        calculateDamage: (pattern: PatternNote[], notePresses: NotePress[]) => number;
        getAttackPoints: (pattern: PatternNote[]) => number; 
    }
}