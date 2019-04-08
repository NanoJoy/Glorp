module MyGame {

	export class Game extends Phaser.Game {

		constructor() {

			super(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, 'content', null);

			this.state.add(States.Boot, Boot, false);
			this.state.add(States.Preloader, Preloader, false);
			this.state.add(States.Main, Main, false);
			this.state.add(States.Battle, Battle, false);
			this.state.add(States.MainMenu, MainMenu, false);
			this.state.add(States.Interlude, Interlude, false);

			this.state.start(States.Boot);
		}

	}


}