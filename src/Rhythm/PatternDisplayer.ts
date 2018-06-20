module MyGame {
    export class PatternDisplayer {
        game: Battle;
        generator: PatternGenerator;
        tempo: number;
        maxNumNotes: number;
        minNumNotes: number;
        isDisplaying: boolean;
        currentPattern: PatternNote[];
        noteDisplays: NoteDisplay[];
        
        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };

        constructor(game: Battle, enemy: Enemy) {
            this.game = game;
            this.isDisplaying = false;
            this.tempo = enemy.tempo;
            this.minNumNotes = enemy.minNumNotes;
            this.maxNumNotes = enemy.maxNumNotes;
            var allowedNotes = [Phaser.KeyCode.W, Phaser.KeyCode.A,
            Phaser.KeyCode.S, Phaser.KeyCode.D, Phaser.KeyCode.O, Phaser.KeyCode.K];
            this.generator = new PatternGenerator(enemy.patternLength, enemy.beatLength, allowedNotes);
        }

        display(): PatternNote[] {
            if (this.isDisplaying) {
                return;
            }
            this.isDisplaying = true;
            this.noteDisplays = [];
            var numNotes = Math.floor(Math.random() + (this.maxNumNotes - this.minNumNotes)) + this.minNumNotes;
            this.currentPattern = this.generator.generate(numNotes);
            for (let i = 0; i < this.generator.length; i++) {
                this.game.time.events.add(this.tempo * i, this.showNote, this, i);
            }
            this.game.time.events.add((this.generator.length + 1) * this.tempo, function () {
                this.isDisplaying = false;
            }, this);
            return this.currentPattern;
        }

        reset() {
            this.currentPattern = null;
            this.isDisplaying = false;
            if (this.noteDisplays !== undefined) {
                this.noteDisplays.forEach(function (disp) {
                    disp.destroy();
                });
            }
        }

        private showNote(position: number) {
            var notes = this.currentPattern.filter(function (value) {
                return value.position === position;
            });
            var noteOrNull = notes.length > 0 ? notes[0].key : null
            this.noteDisplays.push(
                new NoteDisplay(this.game, noteOrNull, position % this.generator.beatLength === 0,
                     true, position, this.generator.length)
            );
        }
    }

    export class NoteDisplay extends Phaser.Image {
        constructor(state: Phaser.State, note: Phaser.KeyCode, isBeat: boolean, isTop: boolean
            , position: number, patternLength: number) {
            var frame = NoteDisplay.getKeyFrame(note, isBeat);
            //10 padding on each side plus 24 for sprite width.
            var width = Constants.SCREEN_WIDTH - 44;
            var xPosition = (width / patternLength) * position + 22;
            var yPosition = isTop ? 22 : 56;
            super(state.game, xPosition, yPosition, "rhythm_symbols", frame);
            this.anchor.set(0.5, 0.5);
            state.add.existing(this);
        }

        updateFrame(key: Phaser.KeyCode, isBeat: boolean) {
            this.frame = NoteDisplay.getKeyFrame(key, isBeat);
        }

        static getKeyFrame(key: Phaser.KeyCode, isBeat: boolean): number {
            switch (key) {
                case Phaser.KeyCode.W:
                    return 0;
                case Phaser.KeyCode.A:
                    return 1;
                case Phaser.KeyCode.S:
                    return 2;
                case Phaser.KeyCode.D:
                    return 3;
                case Phaser.KeyCode.O:
                    return 4;
                case Phaser.KeyCode.K:
                    return 5;
            }
            return isBeat ? 7 : 6;
        }
    }
}