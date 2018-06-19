module MyGame {
    export class Battle extends Phaser.State {
        public inputs: Inputs;
        currentPattern: PatternNote[];
        patternDisplayer: PatternDisplayer;
        patternChecker: PatternMatcher;
        playerHealth: number;
        playerHealthDisplay: Phaser.Text;
        hitPointsDisplay: Phaser.Text;
        enemy: Enemy;

        create() {
            this.playerHealth = 100;

            this.playerHealthDisplay = this.game.add.text(Constants.SCREEN_HEIGHT / 3,
                Constants.SCREEN_WIDTH / 2, this.playerHealth.toString(), { font: "28px okeydokey", fill: "#000000" });
            this.playerHealthDisplay.anchor.set(0.5, 0.5);
            this.enemy = new JamBot();
            this.inputs = new Inputs(this);
            this.hitPointsDisplay = this.game.add.text(Constants.SCREEN_HEIGHT * 2 / 3,
                Constants.SCREEN_WIDTH /2, this.enemy.hitPoints.toString(), { font: "28px okeydokey", fill: "#000000" });
            this.hitPointsDisplay.anchor.set(0.5, 0.5);
            this.patternDisplayer = new PatternDisplayer(this, this.enemy);
            this.patternChecker = new PatternMatcher(this, this.enemy);
            this.startPattern();
            this.time.events.loop(this.enemy.tempo * this.enemy.patternLength * 2, this.startPattern, this);
        }

        private startChecker() {
            this.patternChecker.begin(this.currentPattern);
        }

        private startPattern() {
            if (SpriteUtils.isAThing(this.patternChecker.notesPressed)) {
                this.afterRound();
            }
            this.patternDisplayer.reset();
            this.patternChecker.reset();
            this.currentPattern = this.patternDisplayer.display();
            this.time.events.add((this.enemy.patternLength - 1) * this.enemy.tempo, this.startChecker, this);
        }

        private afterRound() {
            var damage = this.enemy.calculateDamage(this.currentPattern, this.patternChecker.notesPressed);
            if (damage === 0) {
                this.playerHealth = Math.max(this.enemy.getAttackPoints(this.currentPattern), 0);
                this.playerHealthDisplay.text = this.playerHealth.toString();
                if (this.enemy.health === 0) {
                    this.game.time.events.stop(true);
                }
                return;
            }

            this.enemy.health = Math.max(this.enemy.health - damage, 0);
            this.hitPointsDisplay.text = this.enemy.health.toString();
            if (this.enemy.health <= this.enemy.hitPoints / 4) {
                this.hitPointsDisplay.tint = 0xFF0000;
            }
            if (this.enemy.health === 0) {
                this.game.time.events.stop(true);
            }
        }
    }
}