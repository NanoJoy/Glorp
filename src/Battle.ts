module MyGame {
    export class Battle extends Phaser.State {
        public inputs: Inputs;
        currentPattern: PatternNote[];
        patternDisplayer: PatternDisplayer;
        patternChecker: PatternMatcher;
        tempo: number;

        create () {
            this.inputs = new Inputs(this);
            this.tempo = 500;
            this.patternDisplayer = new PatternDisplayer(this, 4, 4, 8, 8, this.tempo);
            this.patternChecker = new PatternMatcher(this, 500, 8, 1);
            this.startPattern();
            this.time.events.loop(this.tempo * 16, this.startPattern, this);
        }

        startChecker() {
            this.patternChecker.begin(this.currentPattern);
        }

        startPattern() {
            console.log("here");
            this.patternDisplayer.reset();
            this.patternChecker.reset();
            this.currentPattern = this.patternDisplayer.display();
            this.time.events.add(7 * this.tempo, this.startChecker, this);
        }
    }
}