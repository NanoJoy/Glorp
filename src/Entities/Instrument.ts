module MyGame {
    export class Instrument extends Creature {
        private activated = false;
        private music: Phaser.Sound;

        constructor(main: Main, x: number, y: number) {
            super(main, pof(x, y), Assets.Sprites.Instrument.key);
            this.sprite.body.immovable = true;
            this.sprite.body.moves = false;
            this.sprite.animations.add("sad", [2, 3], 3, false);
            this.sprite.animations.add("happy", [4, 5], 3, false);
            if (!StateTransfer.getInstance().flags["INSTRUMENT_ACTIVATED"]) {
                this.sprite.animations.add("low_battery", [0, 1], 1, true);
                this.sprite.play("low_battery");
            } else {
                this.activated = true;
                this.playFace();
            }
        }

        uniqueUpdate(): void {
            let player = this.main.player;
            //this.main.physics.arcade.collide(this.sprite, player);

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
            StateTransfer.getInstance().flags["INSTRUMENT_ACTIVATED"] = true;
            this.activated = true;
            batteries.remove();
            this.sprite.animations.stop();
            this.playFace();
            this.music = this.main.sound.play(Assets.Audio.Instrument.key, 0, true);
        }

        private playFace() {
            let anim = this.sprite.animations.getAnimation(Math.random() > .5 ? "sad" : "happy");
            anim.onComplete.add(this.playFace, this);
            anim.play();
        }
    }
}