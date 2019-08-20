module MyGame {
    export enum NoteStatus {
        GOOD = 0,
        OK = 1,
        MISS = 2
    };

    export class NoteStatusManager {
        private images: NoteStatusImage[];

        constructor(private battle: Battle) {
            this.images = [];
        }

        showStatus(position: number, status: NoteStatus) {
            let image = Utils.firstOrDefault(this.images, (i: NoteStatusImage) => !i.visible);
            if (!image) {
                if (this.images.length === this.battle.enemy.patternLength) {
                    return;
                }
                image = new NoteStatusImage(this.battle);
                this.images.push(image);
            }
            image.appear(position, status);
        }
    }

    class NoteStatusImage extends Phaser.Sprite {
        private millis: number;

        constructor(private battle: Battle) {
            super(battle.game, 0, 0, Assets.Sprites.NoteStatus.key);
            this.millis = Utils.bpmToMilliseconds(battle.enemy.tempo);
            this.visible = false;
            battle.add.existing(this);
        }

        appear(position: number, status: NoteStatus) {
            this.battle.world.bringToTop(this);
            this.visible = true;
            this.frame = status;
            if (position < 0 || position >= this.battle.enemy.patternLength) {
                throw new Error("Invalid position");
            }
            let width = SCREEN_WIDTH - 44;
            let xPosition = (width / (this.battle.enemy.patternLength - 1)) * position + 18;
            this.position.setTo(xPosition, 56);
            let tween = this.battle.add.tween(this.position).to({ y: 100 }, this.millis, Phaser.Easing.Quadratic.In, true);
            tween.onComplete.add(() => {
                this.visible = false;
            });
        }
    }
}