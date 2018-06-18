module MyGame {
    export class Battle extends Phaser.State {
        public inputs: Inputs;
        currentPattern: PatternNote[];
        patternDisplayer: PatternDisplayer;
        patternChecker: PatternMatcher;
        enemy: Enemy;

        create () {
            this.enemy = new JamBot();

            this.inputs = new Inputs(this);
            this.patternDisplayer = new PatternDisplayer(this, this.enemy);
            this.patternChecker = new PatternMatcher(this, this.enemy);
            this.startPattern();
            this.time.events.loop(this.enemy.tempo * this.enemy.patternLength * 2, this.startPattern, this);
        }

        startChecker() {
            this.patternChecker.begin(this.currentPattern);
        }

        startPattern() {
            if (SpriteUtils.isAThing(this.patternChecker.notesPressed)) {
                console.log(this.enemy.calculateDamage(this.currentPattern, this.patternChecker.notesPressed));
            }
            this.patternDisplayer.reset();
            this.patternChecker.reset();
            this.currentPattern = this.patternDisplayer.display();
            this.time.events.add((this.enemy.patternLength - 1) * this.enemy.tempo, this.startChecker, this);
        }
    }
}