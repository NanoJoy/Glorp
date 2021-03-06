module MyGame {
    export class Neighborhood {
        above: string;
        left: string;
        right: string;
        below: string;
    }

    class MainGroups {
        barriers: Barrier[] = [];
        creatures: Creature[] = [];
        enemies: Enemy[] = [];
        grounds: Ground[] = [];
        houses: House[] = [];
        npcs: NPC[] = [];
        portals: Portal[] = [];
        projectiles: Projectile[] = [];
        signs: Sign[] = [];
        frontOfPlayer: Entity[] = [];
        buttons: Button[] = [];
    }

    export class Main extends Phaser.State {
        player: Player;
        inputs: Inputs;
        playerStopped: boolean;
        island: Island;
        pauseMenu: IPauseMenu;
        triggers: Trigger[];
        groups: MainGroups;
        projectileDisplay: HoldableDisplay;
        cinematicBars: CinematicBars;
        healthBar: HealthBar;
        music: Phaser.Sound;

        create() {
            this.game.renderer.renderSession.roundPixels = true;
            this.time.reset();
            this.time.events.removeAll();
            this.playerStopped = false;
            let gameSaver = GameSaver.getInstance();

            let worldManager = WorldManager.getInstance();
            let stateTransfer = StateTransfer.getInstance();
            let saveState = gameSaver.loadGame();
            if (stateTransfer.reason !== TransferReason.LINK) {
                this.sound.stopAll();
                this.music = this.sound.play(Assets.Audio.World.key, 1, true);
            }
            if (stateTransfer.interlude) {
                this.state.start(States.Interlude);
            }
            // Load from save.
            if (stateTransfer.flags["USE_SAVE"] && (stateTransfer.reason === TransferReason.DEATH || stateTransfer.reason === TransferReason.NONE) && saveState) {
                stateTransfer.loadFromSave(saveState);
                worldManager.importLayouts(saveState.layouts);
                worldManager.importDialogs(this, saveState.dialogs);
                // Coming from link.
            }
            this.world.alpha = 0;
            let tween = this.add.tween(this.world).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(() => { this.unstopPlayer(); }, this);
            this.inputs = new Inputs(this);

            this.groups = new MainGroups();

            this.island = worldManager.getIsland(stateTransfer.island === -1 ? Islands.TUTORIAL : stateTransfer.island);

            if (DEVELOPER_MODE && stateTransfer.island === -1) {
                this.island = worldManager.getIsland(START_ISLAND);
            }

            this.setupLevel(this.island, saveState);
            this.groups.enemies.forEach(e => { e.onStageBuilt(); });
            this.groups.npcs.forEach(n => { n.onStageBuilt(); });
            this.groups.creatures.forEach(c => { c.onStageBuilt(); });
            this.groups.buttons.forEach(b => { b.onStageBuilt(); });
            this.groups.barriers.forEach(b => { b.onStageBuilt(); });
            this.player.onStageBuilt();

            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

            this.inputs.spacebar.onDown.add(this.spacebarDown, this);

            if (stateTransfer.funcs) {
                stateTransfer.funcs(this);
                stateTransfer.funcs = null;
            }
        }

        update() {
            if (!this.playerStopped) {
                this.triggers.forEach(t => t.checkPlayerOverlap());

                let groupsToUpdate = [this.groups.enemies, this.groups.houses, this.groups.npcs, this.groups.portals, this.groups.creatures, this.groups.projectiles, this.groups.buttons];
                for (let i = 0; i < groupsToUpdate.length; i++) {
                    let grp = groupsToUpdate[i];
                    for (let j = 0; j < grp.length; j++) {
                        grp[j].update();
                    }
                }
            }
            else {
                for (let npc of this.groups.npcs) {
                    npc.playerStoppedUpdate();
                }
            }
        }

        private setupLevel(island: Island, savedGame: SaveState) {
            this.stage.backgroundColor = island.type === IslandType.INSIDE ? Colors.BLACK : Colors.GRAY;
            this.game.world.setBounds(0, 0, island.layout[0].length * TILE_WIDTH,
                island.layout.length * TILE_HEIGHT);

            for (let y = 0; y < island.layout.length; y++) {
                let line = island.layout[y];
                for (let x = 0; x < line.length; x++) {
                    switch (line.charAt(x)) {
                        case " ":
                        case "-":
                            this.groups.grounds.push(Ground.makeGround(this, island.type, pof(x, y)));
                            break;
                        case "*":
                            this.groups.barriers.push(new Bush(this, pof(x, y)));
                            this.groups.grounds.push(Ground.makeGround(this, island.type, pof(x, y)));
                            break;
                        case "#":
                            this.groups.barriers.push(new Path(this, pof(x, y)));
                            break;
                        case "|":
                            this.groups.barriers.push(new Bridge(this, pof(x, y)));
                            break;
                        case "?":
                            let mapButton = this.getThingAtPosition(island.buttons, x, y, "button") as MapButton;
                            this.groups.buttons.push(new Button(this, x, y, mapButton.direction, mapButton.action, mapButton.backgroundType, mapButton.resetTime));
                            break;
                        case "a":
                            this.groups.barriers.push(new Bottle(this, pof(x, y)));
                            break;
                        case "b":
                            this.groups.barriers.push(new Blackness(this, pof(x, y)));
                            break;
                        case "c":
                            this.groups.creatures.push(island.getCreature(this, x, y));
                            break;
                        case "d":
                            this.groups.portals.push(island.makeDoorway(this, pof(x, y)));
                            this.groups.grounds.push(Ground.makeGround(this, island.type, pof(x, y)));
                            break;
                        case "e":
                            this.groups.grounds.push(Ground.makeGround(this, island.type, pof(x, y)));
                            this.groups.enemies.push(island.getEnemy(this, pof(x, y)));
                            break;
                        case "g":
                            this.groups.barriers.push(new Gate(this, pof(x, y)));
                            this.groups.grounds.push(Ground.makeGround(this, island.type, pof(x, y)));
                            break;
                        case "h":
                            let house = new House(this, pof(x, y))
                            this.groups.houses.push(house);
                            this.groups.grounds.push(Ground.makeGround(this, island.type, pof(x, y)));
                            this.groups.frontOfPlayer.push(house)
                            break;
                        case "n":
                            this.groups.grounds.push(Ground.makeGround(this, island.type, pof(x, y)));
                            this.groups.npcs.push(island.getNPC(this, pof(x, y)));
                            break;
                        case "o":
                            this.groups.barriers.push(new Water(this, pof(x, y)));
                            break;
                        case "p":
                            this.groups.barriers.push(new Lillypad(this, pof(x, y)));
                            break;
                        case "s":
                            let type = this.getTypeOfThing(island.sources, x, y, "Source");
                            this.groups.barriers.push(Source.makeSource(this, x, y, type));
                            break;
                        case "t":
                            let tree = new Tree(this, pof(x, y));
                            this.groups.barriers.push(tree);
                            this.groups.grounds.push(Ground.makeGround(this, island.type, pof(x, y)));
                            this.groups.frontOfPlayer.push(tree)
                            break;
                        case "v":
                            let tallGrass = new TallGrass(this, pof(x, y))
                            this.groups.barriers.push(tallGrass);
                            this.groups.frontOfPlayer.push(tallGrass);
                            break;
                        case "w":
                            this.groups.barriers.push(new StoneWall(this, pof(x, y), island.getNeighborhood(pof(x, y))));
                            break;
                        case "x":
                            let customBarrier = this.getThingAtPosition(island.customBarriers, x, y, "Custom Barrier") as MapCustomBarrier;
                            let barrier = new CustomBarrier(this, pof(x, y), customBarrier.type, customBarrier.playerCollides);
                            this.groups.barriers.push(barrier);
                            this.groups.grounds.push(Ground.makeGround(this, island.type, pof(x, y)));
                    }
                }
            }

            this.groups.portals = this.groups.portals.concat(island.getPortals(this), island.makeOtherLinks(this));
            this.triggers = island.makeTriggers(this);
            let stateTransfer = StateTransfer.getInstance();

            if (stateTransfer.flags["USE_SAVE"]) {
                let npcsToImport = savedGame ? savedGame.npcs : stateTransfer.npcs;
                for (let npc of npcsToImport.filter(t => t.old.island === island.num)) {
                    let matches = this.groups.npcs.filter(n => n.startX === npc.old.x && n.startY === npc.old.y);
                    if (matches.length === 0) {
                        throw new Error(`No matching npc found with start position ${npc.old.x} ${npc.old.y}`);
                    }
                    let match = matches[0];
                    if (npc.now) {
                        match.setPosition(npc.now);
                    }
                    if (npc.script) {
                        match.doScript(Utils.reverseMovementScript(npc.script), npc.script.start, true);
                    }
                    if (npc.speed) {
                        match.setSpeed(npc.speed);
                    }
                }

                let triggersToImport = savedGame ? savedGame.triggers : stateTransfer.triggers;
                for (let saveTrigger of triggersToImport.filter(t => t.island === island.num)) {
                    for (let matchingTrigger of this.triggers.filter(t => t.x === saveTrigger.x && t.y === saveTrigger.y)) {
                        matchingTrigger.active = false;
                    }
                }
            }

            stateTransfer.addedItems.filter(i => i.location.island === this.island.num)
                .forEach(i => {
                    let source = Source.makeSource(this, i.location.x, i.location.y, i.type);
                    this.groups.barriers.push(source);
                });

            let playerPosition = null as Phaser.Point;
            if (stateTransfer.position) {
                if (stateTransfer.reason === TransferReason.LINK || stateTransfer.reason === TransferReason.DEATH || stateTransfer.reason === TransferReason.VICTORY) {
                    playerPosition = island.getAdjustedPosition(stateTransfer.position.clone());
                } else {
                    playerPosition = stateTransfer.position.clone();
                }
            } else {
                playerPosition = island.getAdjustedPosition(island.playerStart.clone());
            }

            if (DEVELOPER_MODE && !stateTransfer.position) {
                playerPosition = island.getAdjustedPosition(pof(PLAYER_START_X, PLAYER_START_Y));
            }

            this.player = new Player(this, playerPosition, stateTransfer.health === -1 ? 100 : stateTransfer.health);
            this.projectileDisplay = new HoldableDisplay(this);
            if (stateTransfer.heldItems) {
                this.player.itemManager.changeItem(stateTransfer.heldItems.type, stateTransfer.heldItems.amount);
                this.projectileDisplay.updateIcon(stateTransfer.heldItems.type + "_" + ICON);
                this.projectileDisplay.updateCount(stateTransfer.heldItems.amount);
            }
            this.healthBar = new HealthBar(this, stateTransfer.health === -1 ? 100 : stateTransfer.health);
            this.stopPlayer();
            this.setDepths();
        }

        setDepths() {
            this.groups.grounds.forEach(function (gr) { this.game.world.bringToTop(gr); }, this);
            this.groups.portals.forEach(function (p) { this.game.world.bringToTop(p.sprite); }, this);
            this.groups.barriers.forEach(b => {
                if (b.sprite.key !== "blackness") {
                    this.game.world.bringToTop(b.sprite);
                }
            }, this);
            this.groups.buttons.forEach((b) => { this.game.world.bringToTop(b.sprite); }, this);
            this.groups.creatures.forEach((c) => { this.game.world.bringToTop(c.sprite); }, this);
            this.groups.barriers.forEach(b => {
                if (b.sprite.key === Assets.Images.Bridge) {
                    this.game.world.bringToTop(b.sprite);
                }
            })
            this.groups.houses.forEach(function (ho) { this.game.world.bringToTop(ho.sprite); }, this);
            this.groups.npcs.forEach(function (n) { this.game.world.bringToTop(n.sprite); }, this);
            this.groups.enemies.forEach(function (en) { this.game.world.bringToTop(en.worldSprite); }, this);
            this.game.world.bringToTop(this.player);
            this.groups.frontOfPlayer.forEach(f => this.game.world.bringToTop(f.sprite));
            this.projectileDisplay.bringToTop();
            this.healthBar.bringToTop();
        }

        paused() {

        }

        spacebarDown() {
            if (this.playerStopped) return;
            this.game.paused = !this.game.paused;
            if (!this.game.paused) {
                this.pauseMenu.exit();
                return;
            }
            this.pauseMenu = new PauseMenu(this);
            this.inputs.down.onDown.add(this.pauseMenu.changeSelection, this.pauseMenu);
            this.inputs.up.onDown.add(this.pauseMenu.changeSelection, this.pauseMenu);
            this.inputs.O.onDown.add(this.pauseMenu.select, this.pauseMenu);
        }

        saveGame() {
            var gameSaver = GameSaver.getInstance();
            gameSaver.saveGame(this, WorldManager.getInstance());
        }

        stopPlayer() {
            this.playerStopped = true;
            this.player.body.velocity.setTo(0, 0);
            this.groups.enemies.forEach(e => {
                if (e.movementManager) {
                    e.movementManager.pause();
                }
            });
        }

        unstopPlayer() {
            if (StateTransfer.getInstance().flags["LOCK_PLAYER"]) return;
            this.playerStopped = false;
            this.groups.enemies.forEach(e => {
                if (e.movementManager) {
                    e.movementManager.resume();
                }
            })
        }

        getTypeOfThing(things: StringPos[], x: number, y: number, thingType = "thing"): string {
            return this.getThingAtPosition(things, x, y, thingType).type;
        }

        getThingAtPosition(things: StringPos[], x: number, y: number, thingType = "thing"): StringPos {
            let matching = things.filter(t => {
                let adjusted = this.island.getAdjustedPosition(pof(t.x, t.y));
                return adjusted.x === x && adjusted.y === y;
            });
            if (matching.length === 0) {
                throw new Error(`${thingType} information could not be found at x: ${x}, y: ${y}.`);
            }
            return matching[0];
        }

        bringGroupToTop(group: Entity[]) {
            group.forEach(g => { this.world.bringToTop(g.sprite); });
            this.projectileDisplay.bringToTop();
        }

        addItem(x: number, y: number, key: string) {
            let source = Source.makeSource(this, x, y, key);
            this.groups.barriers.push(source);
            StateTransfer.getInstance().addedItems.push({
                location: new Location(this.island.num, x, y),
                type: key
            });
        }

        startCinematic(follow: Phaser.Sprite) {
            var bars = this.cinematicBars ? this.cinematicBars : (this.cinematicBars = new CinematicBars(this));
            bars.show();
            bars.bringToTop();
            this.camera.unfollow();
            this.camera.follow(follow, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
            StateTransfer.getInstance().flags["LOCK_PLAYER"] = true;
            this.stopPlayer();
        }

        endCinematic() {
            StateTransfer.getInstance().flags["LOCK_PLAYER"] = false;
            this.camera.unfollow();
            var tween = this.add.tween(this.camera).to({ x: this.player.x - (SCREEN_WIDTH / 2), y: this.player.y - (SCREEN_HEIGHT / 2) }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(() => {
                this.cinematicBars.hide();
                this.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
                this.unstopPlayer();
            }, this);
        }

        removeBarrier(pos: Phaser.Point, backgroundType: IslandType) {
            let barrier = Utils.firstOrDefault(this.groups.barriers, b => b.position.equals(pos));
            barrier.sprite.destroy();
            this.groups.barriers = this.groups.barriers.filter(b => b !== barrier);
            switch (backgroundType) {
                case IslandType.INSIDE:
                    this.groups.barriers.push(new Blackness(this, pos));
                    WorldManager.getInstance().changeLayout(this.island.num, pos, "b");
                    break;
                case IslandType.OUTSIDE:
                    this.groups.grounds.push(new Grass(this, pos));
                    WorldManager.getInstance().changeLayout(this.island.num, pos, " ");
                    break;
                case IslandType.WATER:
                    this.groups.barriers.push(new Water(this, pos));
                    WorldManager.getInstance().changeLayout(this.island.num, pos, "o");
                    break;
            }
            this.setDepths();
        }

        addBarrier(barrier: Barrier) {
            this.groups.barriers.push(barrier);
            WorldManager.getInstance().changeLayout(this.island.num, barrier.position, barrier.char);
        }

        updateHealth(addedHealth: number) {
            let health = Math.max(Math.min(100, this.player.health + addedHealth), 0);
            this.player.health = health;
            this.healthBar.updateHealth(health);
            StateTransfer.getInstance().health = health;
        }
    }
}