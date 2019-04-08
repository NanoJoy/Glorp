module MyGame {
    export class InterludeSpec {
        text: Texts;
        nextIsland: number;
        startX: number;
        startY: number;
    }

    export class Interlude extends Phaser.State {
        private sprite: Phaser.Sprite;
        private textDisplay: BottomTextDisplay;

        create() {
            this.stage.backgroundColor = Colors.BLACK;
            this.textDisplay = new BottomTextDisplay(this, new Inputs(this), null);
            this.textDisplay.start(getDialog(StateTransfer.getInstance().interlude).getNext(null, null));
        }
    }
}