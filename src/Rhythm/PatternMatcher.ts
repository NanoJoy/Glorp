module MyGame {
    export interface IPatternMatcher {
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
        comparer: (pattern: Phaser.KeyCode[], pressed: number, pressedCount: number) => boolean;
        begin: (pattern: PatternNote[]) => void;
        reset: () => void;
    }

    export class PatternMatcher implements IPatternMatcher {
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
        pressCount: number;
        comparer: (pattern: Phaser.KeyCode[], pressed: number, pressedCount: number) => boolean;

        constructor(game: Battle, enemy: Enemy) {
            this.game = game;
            this.tempo = Utils.bpmToMilliseconds(enemy.tempo);
            this.patternLength = enemy.patternLength;
            this.beatLength = enemy.beatLength;
            this.active = false;
            this.inputAllowed = false;
            this.numMils = enemy.patternLength * this.tempo;

            if (enemy.noteComparer) {
                this.comparer = enemy.noteComparer;
            } else {
                this.comparer = (pattern: Phaser.KeyCode[], pressed: number, pressedCount: number) => {
                    return PatternUtil.getNthNote(pattern, pressedCount) === pressed;
                }
            }
        }

        begin(pattern: PatternNote[]) {
            this.pressCount = 0;
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

        reset() {
            this.active = false;
            this.inputAllowed = false;
            this.currentPattern = null;
            this.notesPressed = null;
            this.pressCount = 0;

            var inputs = this.game.inputs.asArray();
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].onDown.removeAll();
            }

            if (this.noteDisplays !== undefined) {
                this.noteDisplays.forEach(function (disp) { disp.destroy(); });
            }
        }

        private checkOnSubBeat(position: number) {
            if (this.noteDisplays[position] === null) {
                var isBeat = position % this.beatLength === 0;
                var noteDisplay = new NoteDisplay(this.game, null, isBeat, false, position, this.patternLength);
                this.noteDisplays[position] = noteDisplay;
            }
        }

        private recordKeyPress(key: Phaser.Key) {
            let keyCode = key.keyCode;
            if (!this.inputAllowed) return;

            let timePressed = this.game.time.now;
            let timeElapsed = timePressed - this.startTime;
            let position = Math.round(timeElapsed / this.tempo);

            let isBeat = position % this.beatLength === 0;
            if (this.noteDisplays[position] === null) {
                var noteDisplay = new NoteDisplay(this.game, keyCode, isBeat, false, position, this.patternLength);
                this.noteDisplays[position] = noteDisplay;
            } else {
                this.noteDisplays[position].updateFrame(keyCode, isBeat);
            }
            if (!this.comparer(this.currentPattern, keyCode, this.pressCount)) {
                this.inputAllowed = false;
                this.noteDisplays[position].tint = 0xFF0000;
                return;
            }
            this.getNextNote();

            let distance = Math.round(Math.abs(timePressed - (position * this.tempo + this.startTime)));
            distance = distance < 10 ? 0 : distance;
            this.noteDisplays[position].alpha = (this.tempo / 2 - distance) / (this.tempo / 2);
            this.notesPressed.push({note: keyCode, position: position, distance: distance});
            this.pressCount += 1;
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

    export class NotePress {
        note: Phaser.KeyCode;
        position: number;
        distance: number;
    }
}