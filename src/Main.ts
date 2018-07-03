module MyGame {
    
    export class StateTransfer {
        enemy: Enemy;
        island: number;
        position: Phaser.Point;
        health: number;
        private static instance: StateTransfer;

        private constructor () {
            this.enemy = null;
            this.island = -1;
            this.position = null;
            this.health = -1;
        }

        static getInstance() {
            return StateTransfer.instance || (StateTransfer.instance = new StateTransfer);
        }
    }

    export class Main extends Phaser.State {

        public player: Player;
        public inputs: Inputs;
        public textOnScreen: boolean;
        public island: Island;
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

            var worldManager = WorldManager.getInstance();
            var stateTransfer = StateTransfer.getInstance();
            this.island = worldManager.getIsland(stateTransfer.island === -1 ? 0 : stateTransfer.island);
            this.setupLevel(this.island);

            //new BottomTextDisplay(this, "sample").start();

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
            this.game.world.setBounds(0, 0, island.layout[0].length * TILE_WIDTH,
                island.layout.length * TILE_HEIGHT);
            
            for (let i = 0; i < island.layout.length; i++) {
                let line = island.layout[i];
                for (let j = 0; j < line.length; j++) {
                    switch (line.charAt(j)) {
                        case " ":
                            new Ground(this, j, i);
                            break;
                        case "j":
                            let script = island.getMovementScript(j, i);
                            this.groups.enemies.push(new JamBot(this, new Phaser.Point(j, i), script));
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
            var playerPosition = StateTransfer.getInstance().position || island.playerStart;
            this.player = new Player(this, playerPosition);  
            
            this.groups.enemies.forEach (function (en) {
                this.game.world.bringToTop(en.worldSprite);
            }, this);
        }
    }
}