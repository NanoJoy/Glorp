module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		readonly asset = "assets";
		readonly visual = "visual";
		readonly png = "png";

		preload() {
			this.preloadBar = this.add.sprite(300, 400, "preloadBar");
			this.load.setPreloadSprite(this.preloadBar);

			var spriteAssets = Object.getOwnPropertyNames(Assets.Sprites)
			for (let i = 0; i < spriteAssets.length; i++) {
				let a = Assets.Sprites[spriteAssets[i]];
				this.load.spritesheet(a.key, `${VISUAL_ASSETS_PATH}/${a.key}.${PNG}`, a.width, a.height);
			}

			var imageAssets = Object.getOwnPropertyNames(Assets.Images);
			for (let i = 0; i < imageAssets.length; i++) {
				let a = Assets.Images[imageAssets[i]];
				this.load.image(`${VISUAL_ASSETS_PATH}/${a}`);
			}

			this.load.bitmapFont("testbitmap", "assets/fonts/okeydokey_0.png", "assets/fonts/okeydokey.xml");
		}

		create() {
			this.game.state.start("Battle");
		}
	}
}