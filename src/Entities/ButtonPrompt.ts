module MyGame {
    export class ButtonPrompt implements Entity {
        PADDING = 6;
        main: Main;
        position: Phaser.Point;
        parent: Entity;
        input: Phaser.Key;
        bubbleImage: Phaser.Image;
        buttonImage: Phaser.Image;
        sprite: Phaser.Image;
        private displayed: boolean;

        constructor(parent: Entity, input: Phaser.Key, leftOffset = 0) {
            this.parent = parent;
            this.bubbleImage = parent.main.add.image(0, 0, Assets.Images.ButtonPrompt);
            this.sprite = this.bubbleImage;
            var parentPosition = parent.position.clone().multiply(TILE_WIDTH, TILE_HEIGHT);

            this.input = input;
            this.buttonImage = parent.main.add.image(0, 0, Assets.Sprites.RhythmSymbols.key);
            this.buttonImage.frame = NoteDisplay.getKeyFrame(input.keyCode);
            this.position = new Phaser.Point(0, 0);
            this.reposition(parentPosition.x, parentPosition.y, leftOffset);

            this.displayed = true;
            this.hide();
        }

        reposition(x: number, y: number, leftOffset = 0) {
            this.position.set(x + leftOffset, y - this.bubbleImage.height - 2);
            this.bubbleImage.position.setTo(this.position.x, this.position.y);
            this.buttonImage.position.setTo(this.position.x + this.PADDING, this.position.y + this.PADDING);
        }

        show() {
            if (this.displayed) return;
            this.displayed = true;
            this.bubbleImage.visible = true;
            this.buttonImage.visible = true;
            this.parent.main.world.bringToTop(this.bubbleImage);
            this.parent.main.world.bringToTop(this.buttonImage);
        }

        hide() {
            if (!this.displayed) return;
            this.displayed = false;
            this.bubbleImage.visible = false;
            this.buttonImage.visible = false;
        }

        buttonIsDown() {
            return this.displayed && this.input.isDown;
        }

        isShowing(): boolean {
            return this.displayed;
        }
    }
}