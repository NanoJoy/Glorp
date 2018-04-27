module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {
			this.preloadBar = this.add.sprite(300, 400, "preloadBar");
            this.load.setPreloadSprite(this.preloadBar);
            
            console.log("loading");
            this.load.image("ball", "assets/visual/ball.png");
            console.log("loaded");
		}

		create() {
			this.game.state.start("MainMenu");
		}
	}
}