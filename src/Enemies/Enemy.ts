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
        calculateDamage: (pattern: PatternNote[], notePresses: NotePress[]) => number;
        getAttackPoints: (pattern: PatternNote[]) => number;
        onStageBuilt: () => void;
        update: () => void;
        die: () => void;
        afterDeath: (main: Main) => void;
        noteComparer: (pattern: Phaser.KeyCode[], pressed: number, pressedCount: number) => boolean;
    }
}