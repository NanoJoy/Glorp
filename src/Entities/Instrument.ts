module MyGame {
    export class Instrument extends Creature {
        private activated = false;
        private music: Phaser.Sound;
        private charge = 0;

        constructor(main: Main, x: number, y: number) {
            super(main, pof(x, y), Assets.Sprites.Instrument.key);
            this.sprite.body.immovable = true;
            this.sprite.body.moves = false;
            this.sprite.animations.add("sad", [3, 4], 3, false);
            this.sprite.animations.add("happy", [5, 6], 3, false);
            if (!StateTransfer.getInstance().flags["INSTRUMENT_ACTIVATED"]) {
                for (let i = 1; i < 4; i++) {
                    this.sprite.animations.add(`low_battery_${i}`, [0, i], 1, true);
                }
                this.sprite.play("low_battery_1");
            } else {
                this.music = this.main.sound.play(Assets.Audio.Instrument.key, 0, true);
                this.activated = true;
                this.playFace();
            }
        }

        uniqueUpdate(): void {
            let player = this.main.player;

            if (this.activated) {
                if (this.sprite.inCamera) {
                    let distance = Phaser.Math.distance(this.sprite.centerX, this.sprite.centerY, player.centerX, player.centerY);
                    if (distance <= SCREEN_WIDTH / 2) {
                        if (distance > SCREEN_WIDTH / 4) {
                            let ratio = (distance - (SCREEN_WIDTH / 4)) / (SCREEN_WIDTH / 4);
                            this.main.music.volume = ratio;
                            this.music.volume = 1 - ratio;
                        } else {
                            this.main.music.volume = 0;
                            this.music.volume = 1;
                        }
                    }
                } else {
                    this.music.volume = 0;
                }
            }
        }

        uniqueOnStageBuilt(): void {
            this.barriers.push(this.main.player);
         }

        receiveBatteries(batteries: BatteriesSource) {
            batteries.remove();
            if (++this.charge === 3) {
                StateTransfer.getInstance().flags["INSTRUMENT_ACTIVATED"] = true;
                this.activated = true;
                this.sprite.animations.stop();
                this.playFace();
                this.music = this.main.sound.play(Assets.Audio.Instrument.key, 0, true);
            } else {
                this.sprite.play(`low_battery_${this.charge + 1}`);
            }
        }

        private playFace() {
            let anim = this.sprite.animations.getAnimation(Math.random() > .5 ? "sad" : "happy");
            anim.onComplete.add(this.playFace, this);
            anim.play();
        }
    }
}