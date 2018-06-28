module MyGame {
    export class MovementScript {
        start: Phaser.Point;
        directions: Direction[];
        speed: number;
    }

    export class MovementManager {
        script: MovementScript;
        sprite: Phaser.Sprite;

        
    }
}