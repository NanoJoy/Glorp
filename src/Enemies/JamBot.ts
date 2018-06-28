module MyGame {
    export class JamBot implements Enemy {
        name = "JamBot";
        minNumNotes = 4;
        maxNumNotes = 4;
        patternLength = 8;
        beatLength = 2;
        tempo = 500;
        battleSpriteKey = "jambot";
        worldSpriteKey = Assets.Sprites.JamBotWorld.key;
        hitPoints = 200;
        main: Main;
        x: number;
        y: number;
        health: number;
        worldSprite: Phaser.Sprite;
        movementScript: MovementScript;

        constructor(main: Main, x: number, y: number, movementScript: MovementScript) {
            this.main = main;
            this.x = x;
            this.y = y;
            this.movementScript = movementScript;
            this.health = this.hitPoints;
            this.worldSprite = this.main.add.sprite(x * Constants.TILE_WIDTH, y * Constants.TILE_HEIGHT, this.worldSpriteKey);
            this.main.physics.arcade.enable(this.worldSprite);
            this.worldSprite.animations.add("walk", SpriteUtils.animationArray(0, 7), 5, true);
            this.worldSprite.play("walk");
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
            console.log("overlap");
            stateTransfer.enemy = this;
            this.main.state.start(States.Battle);
        }

        update() {
            this.main.physics.arcade.overlap(this.worldSprite, this.main.player, this.playerOverlap, null, this);
        }
    }
}