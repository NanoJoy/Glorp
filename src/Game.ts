module MyGame {

	export class Game extends Phaser.Game {

		constructor() {

			super(288, 320, Phaser.AUTO, 'content', null);

			this.state.add(States.Boot, Boot, false);
			this.state.add(States.Preloader, Preloader, false);
			this.state.add(States.Main, Main, false);
			this.state.add(States.Battle, Battle, false);

			this.state.start(States.Boot);
		}

	}


}