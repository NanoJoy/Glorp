module MyGame {
    export class Result extends Phaser.State {
        create() {
            let stateTransfer = StateTransfer.getInstance();
            this.stage.backgroundColor = Colors.GRAY;
            this.sound.play(stateTransfer.reason === TransferReason.DEATH ? Assets.Audio.DeathJingle.key : Assets.Audio.VictoryJingle.key);
            let text = this.add.image(0, 0, Assets.Sprites.ResultText.key, stateTransfer.reason === TransferReason.DEATH ? 0 : 1);
            text.scale.setTo(2, 2);
            text.smoothed = false;
            Utils.centerImage(text, true, true);
            let tween = this.add.tween(this.world).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 2000);
            tween.onComplete.add(() => { this.state.start(States.Main); }, this)
        }
    }
}