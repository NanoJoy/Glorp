module MyGame {
    export interface Enemy {
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
        calculateDamage: (pattern: PatternNote[], notePresses: NotePress[]) => number;
        getAttackPoints: (pattern: PatternNote[]) => number;
        onStageBuilt: () => void;
        update: () => void;
        die: () => void;
        afterDeath: (main: Main) => void;
    }
}