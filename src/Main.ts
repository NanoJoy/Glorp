module MyGame {
    export class Main extends Phaser.State {

        public player: Player;
        public inputs: Inputs;
        public textOnScreen: boolean;
        public groups: {
            enemies: Enemy[],
            water: Phaser.Group
        };

        create() {
            this.textOnScreen = false;
            this.inputs = new Inputs(this);

            this.groups = {
                enemies: [],
                water: this.game.add.group()
            }

            this.setupLevel(island1);

            new BottomTextDisplay(this, "sample").start();

            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
        }

        update() {
            if (!this.textOnScreen) {
                for (let i = 0; i < this.groups.enemies.length; i++) {
                    this.groups.enemies[i].update();
                }
            }
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
                        case "j":
                            let script = island.getMovementScript(j, i);
                            this.groups.enemies.push(new JamBot(this, j, i, script));
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

    class StateTransfer {
        enemy: Enemy;
        position: Phaser.Point;
        health: number;
    }

    export var stateTransfer = {
        enemy: null,
        position: new Phaser.Point(0, 0),
        health: 0
    } as StateTransfer;
}