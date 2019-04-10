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
            let stateTransfer = StateTransfer.getInstance();
            let interlude = stateTransfer.interlude;
            this.stage.backgroundColor = Colors.BLACK;
            this.textDisplay = new BottomTextDisplay(this, new Inputs(this), null);
            let encounter = getDialog(interlude.text).getNext(null, null);
            encounter.onFinish = (main: Main, parent: Entity, result?: string) => {
                stateTransfer.island = interlude.nextIsland;
                stateTransfer.position = pof(interlude.startX, interlude.startY);
                stateTransfer.reason = TransferReason.LINK;
                stateTransfer.interlude = null;
                this.state.start(States.Main);
            };
            this.textDisplay.start(encounter);
        }
    }
}