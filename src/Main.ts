module MyGame {
    export class StateTransfer {
        enemy: Enemy;
        island: number;
        position: Phaser.Point;
        health: number;
        private static instance: StateTransfer;

        private constructor() {
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
            grounds: Ground[],
            houses: House[],
            npcs: NPC[],
            signs: Sign[],
            barriers: Barrier[]
        };

        create() {
            this.textOnScreen = false;
            this.inputs = new Inputs(this);

            this.groups = {
                enemies: [],
                grounds: [],
                houses: [],
                npcs: [],
                signs: [],
                barriers: []
            }

            var worldManager = WorldManager.getInstance();
            var stateTransfer = StateTransfer.getInstance();
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
        }

        update() {
            if (!this.textOnScreen) {
                let groupsToUpdate = [this.groups.enemies, this.groups.houses, this.groups.npcs, this.groups.signs];
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
                        case "e":
                            this.groups.enemies.push(island.getEnemy(this, pof(j, i)));
                            break;
                        case "h":
                            this.groups.houses.push(new House(this, pof(j, i)));
                            break;
                        case "n":
                            this.groups.npcs.push(island.getNPC(this, pof(j, i)));
                            break;
                        case "o":
                            this.groups.barriers.push(new Water(this, pof(j, i)));
                    }
                }
            }
            var playerPosition = StateTransfer.getInstance().position || island.playerStart;
            this.player = new Player(this, playerPosition);

            this.setDepths();
        }

        setDepths() {
            this.groups.grounds.forEach(function (gr) { this.game.world.bringToTop(gr); }, this);
            this.groups.barriers.forEach(function (b) { this.game.world.bringToTop(b); }, this);
            this.groups.houses.forEach(function (ho) { this.game.world.bringToTop(ho.sprite); }, this);
            this.groups.npcs.forEach(function (n) { this.game.world.bringToTop(n.sprite); }, this);
            this.groups.enemies.forEach(function (en) { this.game.world.bringToTop(en.worldSprite); }, this);
            this.game.world.bringToTop(this.player);
        }
    }
}