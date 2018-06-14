module MyGame {
    export class PatternMatcher {
        game: Battle;
        tempo: number;
        patternLength: number;
        beatLength: number;
        currentPattern: Phaser.KeyCode[];
        nextNote: number;
        active: boolean;
        numMils: number;
        startTime: number;
        inputAllowed: boolean;
        noteDisplays: Phaser.Text[];

        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };

        constructor(game: Battle, tempo: number, patternLength: number, beatLength: number) {
            this.game = game;
            this.tempo = tempo;
            this.patternLength = patternLength;
            this.beatLength = beatLength;
            this.active = false;
            this.inputAllowed = false;
            this.numMils = patternLength * tempo;
        }

        begin(pattern: PatternNote[]) {
            this.currentPattern = PatternUtil.convertPatternNotesToArray(pattern, this.patternLength);
            console.log(this.currentPattern);
            this.active = true;
            this.getFirstNote();
            this.startTime = this.game.time.now + this.tempo;
            this.noteDisplays = [] as Phaser.Text[];
            this.inputAllowed = true;
            for (let i = 0; i < this.patternLength; i++) this.noteDisplays.push(null);

            var inputs = this.game.inputs.asArray();

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].onDown.add(this.recordKeyPress, this, 0, inputs[i]);
            }

            for (let i = 0; i < this.patternLength; i++) {
                this.game.time.events.add(this.tempo * (i + 1), this.checkOnSubBeat, this, i);
            }
        }

        checkOnSubBeat(position: number) {
            if (this.noteDisplays[position] === null) {
                this.noteDisplays[position] = this.game.add.text(100, 20 * position, "-", this.fontStyle);
            }
        }

        recordKeyPress(key: Phaser.Key) {
            var keyCode = key.keyCode;
            console.log(this.currentPattern[this.nextNote]);
            if (!this.inputAllowed) return;

            if (this.currentPattern[this.nextNote] !== keyCode) {
                this.inputAllowed = false;
                return;
            }
            this.getNextNote();

            var timeElapsed = this.game.time.now - this.startTime;
            var closestSubBeat = Math.round(timeElapsed / this.tempo);
            var text = PatternDisplayer.getKeyString(keyCode);
            if (this.noteDisplays[closestSubBeat] === null) {
                this.noteDisplays[closestSubBeat] = this.game.add.text(100, 20 * closestSubBeat, text, this.fontStyle);
            } else {
                this.noteDisplays[closestSubBeat].text = text;
            }
        }

        private getFirstNote() {
            this.nextNote = 0;
            while (this.currentPattern[this.nextNote] === null && this.nextNote < this.currentPattern.length) {
                this.nextNote++;
            }
        }

        private getNextNote() {
            this.nextNote++;
            while (this.currentPattern[this.nextNote] === null && this.nextNote < this.currentPattern.length) {
                this.nextNote++;
            }
        }
    }
}