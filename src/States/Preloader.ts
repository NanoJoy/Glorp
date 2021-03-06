module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {
			this.preloadBar = this.add.sprite(300, 400, "loadingBar");
			this.load.setPreloadSprite(this.preloadBar);

			let spriteAssets = Object.getOwnPropertyNames(Assets.Sprites)
			for (let i = 0; i < spriteAssets.length; i++) {
				let a = Assets.Sprites[spriteAssets[i]];
				this.load.spritesheet(a.key, `${VISUAL_ASSETS_PATH}/${a.key}.${PNG}`, a.width, a.height);
			}

			let imageAssets = Object.getOwnPropertyNames(Assets.Images);
			for (let i = 0; i < imageAssets.length; i++) {
				let a = Assets.Images[imageAssets[i]];
				this.load.image(a, `${VISUAL_ASSETS_PATH}/${a}.${PNG}`);
			}

			let audioAssets = Object.getOwnPropertyNames(Assets.Audio);
			for (let i = 0; i < audioAssets.length; i++) {
				let a = Assets.Audio[audioAssets[i]];
				this.load.audio(a.key, `${AUDIO_ASSETS_PATH}/${a.key}.${MP3}`);
			}

			this.load.bitmapFont("testbitmap", "assets/fonts/okeydokey_0.png", "assets/fonts/okeydokey.xml");
		}

		create() {
			this.game.state.start(States.MainMenu);
		}
	}
}