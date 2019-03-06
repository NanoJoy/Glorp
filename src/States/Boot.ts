module MyGame {

	export class Boot extends Phaser.State {

		init() {
			//  Unless you specifically need to support multitouch I would recommend setting this to 1
			this.input.maxPointers = 0;

			//  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
			this.stage.disableVisibilityChange = false;

			// Enable physics
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.stage.setBackgroundColor(0x000000)

			if (this.game.device.desktop) {
				//  If you have any desktop specific settings, they can go in here
				this.scale.pageAlignHorizontally = true;
			}
			else {
				//  Same goes for mobile settings.
				//  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
				this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				this.scale.setMinMax(480, 260, 1024, 768);
				this.scale.forceLandscape = true;
				this.scale.pageAlignHorizontally = true;
			}

		}

		preload() {
			this.load.image("loadingBar", `assets/visual/${Assets.Images.LoadingBar}.png`);
		}

		create() {
			//  By this point the preloader assets have loaded to the cache, we've set the game settings
			//  So now let's start the real preloader going
			this.game.state.start(States.Preloader);
		}
	}
}
