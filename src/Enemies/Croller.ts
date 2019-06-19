module MyGame {
    export class Croller extends Enemy implements Moveable {
        sprite: Phaser.Sprite;
        direction: Direction;
        speed = 100;
        main: Main;
        position: Phaser.Point;
        movementManager: IMovementManager;
        afterDeath(main: Main): void { }

        constructor(main: Main, position: Phaser.Point) {
            super();
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, Assets.Sprites.Croller.key);
            main.physics.arcade.enableBody(this.sprite);
            this.worldSprite = this.sprite;
            let blockers = main.groups.barriers.filter(b => b.playerCollides);
            this.movementManager = new TargetMover(this, blockers);
        }

        update(): void {
            (this.movementManager as TargetMover).update();
        }

        onStageBuilt() {
            (this.movementManager as TargetMover).followTarget(this.main.player);
        }
    
        calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number {
            return this.health;
        }

        getAttackPoints(pattern: PatternNote[]): number {
            return 100;
        }

        die(): void {
            this.alive = false;
            WorldManager.getInstance().changeLayout(StateTransfer.getInstance().island, this.position, "C");
        }

        noteComparer(pattern: Phaser.KeyCode[], pressed: number, pressedCount: number): boolean {
            return true;
        }
    }
}