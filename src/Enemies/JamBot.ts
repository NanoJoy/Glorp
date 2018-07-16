module MyGame {
    export class JamBot implements Enemy,  Moveable {
        name = "JamBot";
        minNumNotes = 4;
        maxNumNotes = 4;
        patternLength = 8;
        beatLength = 2;
        tempo = 500;
        battleSpriteKey = "jambot";
        worldSpriteKey = Assets.Sprites.JamBotWorld.key;
        hitPoints = 50;//200;
        main: Main;
        position: Phaser.Point;
        health: number;
        worldSprite: Phaser.Sprite;
        sprite: Phaser.Sprite;
        direction: Direction;
        movementManager: MovementManager;
        alive: boolean;

        constructor(main: Main, position: Phaser.Point, movementScript: MovementScript) {
            this.alive = true;
            this.main = main;
            this.position = position;
            this.health = this.hitPoints;
            this.worldSprite = this.main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, this.worldSpriteKey);
            this.main.physics.arcade.enable(this.worldSprite);
            this.worldSprite.animations.add("walk", SpriteUtils.animationArray(0, 7), 5, true);
            this.worldSprite.play("walk");
            this.sprite = this.worldSprite;
            this.movementManager = new MovementManager(this.main.game, movementScript, this);
        }

        onStageBuilt() {
            this.movementManager.start();
        }

        calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number {
            if (pattern.length !== notePresses.length) {
                return 0;
            }
            var sortedPattern = pattern.sort(function (a, b) { return a.position - b.position });
            var sortedPresses = notePresses.sort(function (a, b) { return a.position - b.position });
            var damage = 0;
            for (var i = 0; i < sortedPattern.length; i++) {
                if (sortedPattern[i].key !== sortedPresses[i].note) {
                    return 0;
                }
                var amount = Math.round((500 - sortedPresses[i].distance) / 50);
                if (sortedPattern[i].position === sortedPresses[i].position) {
                    amount = Math.floor(amount * 1.5);
                }
                damage += amount;
            }
            return damage;
        }

        getAttackPoints(pattern: PatternNote[]) {
            return pattern.length * 20;
        }

        playerOverlap(sp: Phaser.Sprite, pl: Player) {
            var stateTransfer = StateTransfer.getInstance();
            stateTransfer.island = this.main.island.num;
            stateTransfer.enemy = this;
            this.main.state.start(States.Battle);
        }

        update() {
            if (!this.alive) {
                return;
            }
            this.movementManager.playNext();
            this.main.physics.arcade.overlap(this.worldSprite, this.main.player, this.playerOverlap, null, this);
        }

        die() {
            this.alive = false;
            WorldManager.getInstance().changeLayout(StateTransfer.getInstance().island, this.position, "J");
        }
    }
}