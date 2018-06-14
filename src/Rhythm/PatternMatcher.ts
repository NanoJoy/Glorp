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
        notesPressed: NotePress[];

        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };
        readonly redStyle = { font: "14px okeydokey", fill: "#ff0000" };

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
            this.notesPressed = [] as NotePress[];
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
            if (!this.inputAllowed) return;

            var timePressed = this.game.time.now;
            var timeElapsed = timePressed - this.startTime;
            var closestSubBeat = Math.round(timeElapsed / this.tempo);

            var text = PatternDisplayer.getKeyString(keyCode);
            if (this.noteDisplays[closestSubBeat] === null) {
                this.noteDisplays[closestSubBeat] = this.game.add.text(100, 20 * closestSubBeat, text, this.fontStyle);
            } else {
                this.noteDisplays[closestSubBeat].text = text;
            }
            if (this.currentPattern[this.nextNote] !== keyCode) {
                this.inputAllowed = false;
                this.noteDisplays[closestSubBeat].setStyle(this.redStyle);
                return;
            }
            this.getNextNote();

            var distance = Math.round(Math.abs(timePressed - (closestSubBeat * this.tempo + this.startTime)));
            distance = distance < 10 ? 0 : distance;
            this.noteDisplays[closestSubBeat].alpha = (this.tempo / 2 - distance) / (this.tempo / 2);
            this.notesPressed.push({note: keyCode, position: closestSubBeat, distance: distance});
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

        reset() {
            this.active = false;
            this.inputAllowed = false;
            this.currentPattern = null;
            this.notesPressed = null;

            var inputs = this.game.inputs.asArray();
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].onDown.removeAll();
            }

            if (this.noteDisplays !== undefined) {
                this.noteDisplays.forEach(function (disp) { disp.destroy(); });
            }
        }
    }

    export class NotePress {
        note: Phaser.KeyCode;
        position: number;
        distance: number;
    }
}