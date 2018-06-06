module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {
			this.preloadBar = this.add.sprite(300, 400, "preloadBar");
			this.load.setPreloadSprite(this.preloadBar);
			
			this.load.bitmapFont("testbitmap", "assets/fonts/okeydokey_0.png", "assets/fonts/okeydokey.xml");
			this.load.image("ball", "assets/visual/ball.png");
			this.load.image("bottom_text_background", "assets/visual/bottom_text_background.png");
			this.load.spritesheet("player", "assets/visual/maincharacter.png", Constants.TILE_WIDTH, Constants.TILE_HEIGHT);
			this.load.spritesheet("grounds", "assets/visual/grounds.png", Constants.TILE_WIDTH, Constants.TILE_HEIGHT);
			this.load.spritesheet("water", "assets/visual/water.png", Constants.TILE_WIDTH, Constants.TILE_HEIGHT);
		}

		create() {
			this.game.state.start("Main");
		}
	}
}