module MyGame {
    export class InterludeSpec {
        text: Texts;
        nextIsland: number;
        startX: number;
        startY: number;
        spriteKey: string;
        frames?: number[];
    }

    export class Interlude extends Phaser.State {
        private sprite: Phaser.Sprite;
        private textDisplay: BottomTextDisplay;

        create() {
            let stateTransfer = StateTransfer.getInstance();
            let interlude = stateTransfer.interlude;
            this.world.alpha = 1;
            this.stage.backgroundColor = Colors.BLACK;
            this.sprite = this.add.sprite(0, 0, interlude.spriteKey);
            Utils.centerImage(this.sprite);
            if (interlude.frames) {
                this.sprite.animations.add("thing", interlude.frames, 10, true);
                this.sprite.play("thing");
            }
            this.textDisplay = new BottomTextDisplay(this, new Inputs(this), null);
            let encounter = getDialog(interlude.text).getNext(null, null);
            encounter.onFinish = (main: Main, parent: Entity, result?: string) => {
                stateTransfer.island = interlude.nextIsland;
                stateTransfer.position = pof(interlude.startX, interlude.startY);
                stateTransfer.reason = TransferReason.INTERLUDE;
                stateTransfer.interlude = null;
                let tween = this.add.tween(this.world).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(() => { this.state.start(States.Main); }, this)
            };
            this.textDisplay.start(encounter);
        }
    }
}