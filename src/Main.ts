module MyGame {
    export class Neighborhood {
        above: string;
        left: string;
        right: string;
        below: string;
    }

    export class StateTransfer {
        enemy: Enemy;
        island: number;
        position: Phaser.Point;
        health: number;
        fromLink: boolean;
        private static instance: StateTransfer;

        private constructor() {
            this.enemy = null;
            this.island = -1;
            this.position = null;
            this.health = -1;
            this.fromLink = false;
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
        pauseMenu: IPauseMenu;
        public groups: {
            barriers: Barrier[]
            enemies: Enemy[],
            grounds: Ground[],
            houses: House[],
            npcs: NPC[],
            portals: Portal[],
            signs: Sign[]
        };

        create() {
            let gameSaver = GameSaver.getInstance();
            let worldManager = WorldManager.getInstance();
            let stateTransfer = StateTransfer.getInstance();
            let saveState = gameSaver.loadGame();
            console.log(saveState);
            if (saveState) {
                stateTransfer.island = saveState.islandNum;
                stateTransfer.position = pof(saveState.playerPosition.x, saveState.playerPosition.y);
                worldManager.importLayouts(saveState.layouts);
            } else if (stateTransfer.island !== -1) {
                var tween = this.add.tween(this.world).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(function () {
                    this.physics.arcade.isPaused = false;
                    this.textOnScreen = false;
                }, this);
            }
            this.inputs = new Inputs(this);

            this.groups = {
                enemies: [],
                grounds: [],
                houses: [],
                npcs: [],
                portals: [],
                signs: [],
                barriers: []
            }

            this.island = worldManager.getIsland(stateTransfer.island === -1 ? 0 : stateTransfer.island);
            this.setupLevel(this.island);
            this.groups.enemies.forEach(function (value: Enemy) {
                value.onStageBuilt();
            }, this)

            this.groups.npcs.forEach(function (value: NPC) {
                value.onStageBuilt();
            }, this)

            this.player.onStageBuilt();

            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

            this.inputs.spacebar.onDown.add(this.spacebarDown, this);
        }

        update() {
            if (!this.textOnScreen) {
                let groupsToUpdate = [this.groups.enemies, this.groups.houses, this.groups.npcs, this.groups.portals, this.groups.signs];
                for (let i = 0; i < groupsToUpdate.length; i++) {
                    let grp = groupsToUpdate[i];
                    for (let j = 0; j < grp.length; j++) {
                        grp[j].update();
                    }
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
                            this.groups.grounds.push(island.makeGround(this, pof(j, i)));
                            break;
                        case "b":
                            this.groups.barriers.push(new Blackness(this, pof(j, i)));
                            break;
                        case "d":
                            this.groups.portals.push(island.makeDoorway(this, pof(j, i)));
                            console.log("making door");
                            this.groups.grounds.push(island.makeGround(this, pof(j, i), true));
                            break;
                        case "e":
                            this.groups.grounds.push(island.makeGround(this, pof(j, i)));
                            this.groups.enemies.push(island.getEnemy(this, pof(j, i)));
                            break;
                        case "h":
                            this.groups.houses.push(new House(this, pof(j, i)));
                            break;
                        case "n":
                            this.groups.grounds.push(island.makeGround(this, pof(j, i)));
                            this.groups.npcs.push(island.getNPC(this, pof(j, i)));
                            break;
                        case "o":
                            this.groups.barriers.push(new Water(this, pof(j, i)));
                            break;
                        case "w":
                            this.groups.barriers.push(new StoneWall(this, pof(j, i), island.getNeighborhood(pof(j, i))));
                    }
                }
            }

            this.groups.portals = this.groups.portals.concat(island.getPortals(this));

            var playerPosition = null as Phaser.Point;
            var stateTransfer = StateTransfer.getInstance();
            if (stateTransfer.position) {
                playerPosition = stateTransfer.fromLink ? island.getAdjustedPosition(stateTransfer.position.clone()) : stateTransfer.position.clone();
            } else {
                playerPosition = island.playerStart.clone();
            }
            this.player = new Player(this, playerPosition);

            this.setDepths();
        }

        setDepths() {
            this.groups.grounds.forEach(function (gr) { this.game.world.bringToTop(gr); }, this);
            this.groups.portals.forEach(function (p) { this.game.world.bringToTop(p.sprite); }, this);
            this.groups.barriers.forEach(function (b) { this.game.world.bringToTop(b); }, this);
            this.groups.houses.forEach(function (ho) { this.game.world.bringToTop(ho.sprite); }, this);
            this.groups.npcs.forEach(function (n) { this.game.world.bringToTop(n.sprite); }, this);
            this.groups.enemies.forEach(function (en) { this.game.world.bringToTop(en.worldSprite); }, this);
            this.game.world.bringToTop(this.player);
        }

        paused() {
            
        }

        spacebarDown() {
            this.game.paused = !this.game.paused;
            if (this.game.paused) {
                this.pauseMenu = new PauseMenu(this);
                this.inputs.down.onDown.add(this.pauseMenu.changeSelection, this.pauseMenu);
                this.inputs.up.onDown.add(this.pauseMenu.changeSelection, this.pauseMenu);
                this.inputs.O.onDown.add(this.pauseMenu.select, this.pauseMenu);
                return;
            }
            this.pauseMenu.exit();
            this.inputs.down.onDown.remove(this.pauseMenu.changeSelection, this.pauseMenu);
            this.inputs.up.onDown.remove(this.pauseMenu.changeSelection, this.pauseMenu);
            this.inputs.O.onDown.remove(this.pauseMenu.select, this.pauseMenu);
        }

        saveGame() {
            var gameSaver = GameSaver.getInstance();
            gameSaver.saveGame(this, WorldManager.getInstance());
        }
    }
}