module MyGame {

	export class Game extends Phaser.Game {

		constructor() {

			super(288, 320, Phaser.AUTO, 'content', null);

			this.state.add('Boot', Boot, false);
			this.state.add("Preloader", Preloader, false);
			this.state.add("Main", Main, false);
			this.state.add("Battle", Battle, false);

			this.state.start('Boot');
		}

	}


}