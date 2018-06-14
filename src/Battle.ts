module MyGame {
    export class Battle extends Phaser.State {
        public inputs: Inputs;
        currentPattern: PatternNote[];

        create () {
            this.inputs = new Inputs(this);
            var tempo = 500;
            var patternDisplayer = new PatternDisplayer(this, 4, 4, 8, 8, tempo);
            this.currentPattern = patternDisplayer.display();
            this.time.events.add(7 * tempo, this.startChecker, this);
        }

        startChecker() {
            var patterChecker = new PatternMatcher(this, 500, 8, 1);
            patterChecker.begin(this.currentPattern);
        }
    }
}