module MyGame {
    interface Enemy {
        patternLength: number;
        beatLength: number;
        spriteKey: string;
        hitPoints: number;
        calculateDamage: (notePresses: NotePress[]) => number;
    }
}