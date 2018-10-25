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
        noteDisplays: NoteDisplay[];
        notesPressed: NotePress[];

        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };
        readonly redStyle = { font: "14px okeydokey", fill: "#ff0000" };

        constructor(game: Battle, enemy: Enemy) {
            this.game = game;
            this.tempo = Utils.bpmToMilliseconds(enemy.tempo);
            this.patternLength = enemy.patternLength;
            this.beatLength = enemy.beatLength;
            this.active = false;
            this.inputAllowed = false;
            this.numMils = enemy.patternLength * this.tempo;
        }

        begin(pattern: PatternNote[]) {
            this.currentPattern = PatternUtil.convertPatternNotesToArray(pattern, this.patternLength);
            this.active = true;
            this.getFirstNote();
            this.startTime = this.game.time.now + this.tempo;
            this.noteDisplays = [] as NoteDisplay[];
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
                var isBeat = position % this.beatLength === 0;
                var noteDisplay = new NoteDisplay(this.game, null, isBeat, false, position, this.patternLength);
                this.noteDisplays[position] = noteDisplay;
            }
        }

        recordKeyPress(key: Phaser.Key) {
            var keyCode = key.keyCode;
            if (!this.inputAllowed) return;

            var timePressed = this.game.time.now;
            var timeElapsed = timePressed - this.startTime;
            var position = Math.round(timeElapsed / this.tempo);

            var isBeat = position % this.beatLength === 0;
            if (this.noteDisplays[position] === null) {
                var noteDisplay = new NoteDisplay(this.game, keyCode, isBeat, false, position, this.patternLength);
                this.noteDisplays[position] = noteDisplay;
            } else {
                this.noteDisplays[position].updateFrame(keyCode, isBeat);
            }
            if (this.currentPattern[this.nextNote] !== keyCode) {
                this.inputAllowed = false;
                this.noteDisplays[position].tint = 0xFF0000;
                return;
            }
            this.getNextNote();

            var distance = Math.round(Math.abs(timePressed - (position * this.tempo + this.startTime)));
            distance = distance < 10 ? 0 : distance;
            this.noteDisplays[position].alpha = (this.tempo / 2 - distance) / (this.tempo / 2);
            this.notesPressed.push({note: keyCode, position: position, distance: distance});
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

        private makeNoteImage() {

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