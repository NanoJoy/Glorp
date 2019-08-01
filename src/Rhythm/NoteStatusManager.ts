module MyGame {
    export class NoteStatusManager {

    }

    class NoteStatus extends Phaser.Image {
        constructor(private battle: Battle) {
            super(battle.game, 0, 0, Assets.Sprites.NoteStatus.key);
            this.visible = false;
        }
    }
}