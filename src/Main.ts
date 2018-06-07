module MyGame {
    export class Main extends Phaser.State {

        public player: Player;
        public inputs: Inputs;
        public groups: {
            water: Phaser.Group
        };

        create() {
            this.inputs = {
                 left: this.game.input.keyboard.addKey(Phaser.KeyCode.A),
                 right: this.game.input.keyboard.addKey(Phaser.KeyCode.D),
                 up: this.game.input.keyboard.addKey(Phaser.KeyCode.W),
                 down: this.game.input.keyboard.addKey(Phaser.KeyCode.S),
                 O: this.game.input.keyboard.addKey(Phaser.KeyCode.O),
                 K: this.game.input.keyboard.addKey(Phaser.KeyCode.K)
            };

            this.groups = {
                water: this.game.add.group()
            }

            this.setupLevel(island1);

            new BottomTextDisplay(this, "dump").start();

            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
        }

        update() {
            this.player.update();
        }

        private setupLevel(island: Island) {
            this.game.world.setBounds(0, 0, island.layout[0].length * Constants.TILE_WIDTH,
                island.layout.length * Constants.TILE_HEIGHT);
            
            for (let i = 0; i < island.layout.length; i++) {
                let line = island.layout[i];
                for (let j = 0; j < line.length; j++) {
                    switch (line.charAt(j)) {
                        case " ":
                            new Ground(this, j, i);
                            break;
                        case "o":
                            new RegularWater(this, j, i);
                            break;
                        case "'":
                            if (island.layout[i - 1][j] === "o") {
                                new WaterEdge(this, j, i, Diagonal.NE);
                            } else {
                                new WaterEdge(this, j, i, Diagonal.SW);
                            }
                            break;
                        case "/":
                            if (island.layout[i - 1][j] === "o") {
                                new WaterEdge(this, j, i, Diagonal.NW);
                            } else {
                                new WaterEdge(this, j, i, Diagonal.SE);
                            }
                    }
                }
            }
            this.player = new Player(this, this.game.width / 2, this.game.height / 2);            
        }
    }
}