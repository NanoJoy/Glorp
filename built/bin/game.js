var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyGame;
(function (MyGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 0;
            this.stage.disableVisibilityChange = false;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.stage.setBackgroundColor(0x000000);
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(480, 260, 1024, 768);
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
            }
        };
        Boot.prototype.preload = function () {
            this.load.image("preloadBar", "assets/visual/loading_bar.png");
        };
        Boot.prototype.create = function () {
            this.game.state.start(MyGame.States.Preloader);
        };
        return Boot;
    }(Phaser.State));
    MyGame.Boot = Boot;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    MyGame.SCREEN_WIDTH = 288;
    MyGame.SCREEN_HEIGHT = 320;
    MyGame.TILE_WIDTH = 28;
    MyGame.TILE_HEIGHT = 32;
    MyGame.DEVELOPER_MODE = false;
    MyGame.START_ISLAND = 3;
    MyGame.CLEAR_SAVE = false;
    MyGame.PLAYER_START_X = 5;
    MyGame.PLAYER_START_Y = 6;
    MyGame.States = {
        Boot: "Boot",
        Preloader: "Preloader",
        Main: "Main",
        Battle: "Battle"
    };
    MyGame.Colors = {
        BLACK: 0x000000,
        GRAY: 0xEAEAEA
    };
    var Frames = (function () {
        function Frames() {
        }
        Frames.Arrow = {
            UP: 0,
            DOWN: 1,
            LEFT: 3,
            RIGHT: 2,
            O: 4
        };
        Frames.PlayerBattle = {
            OUTSIDE: 0,
            INSIDE: 1
        };
        return Frames;
    }());
    MyGame.Frames = Frames;
    var SpriteAsset = (function () {
        function SpriteAsset(key, width, height) {
            this.key = key;
            this.width = width === undefined ? MyGame.TILE_WIDTH : width;
            this.height = height === undefined ? MyGame.TILE_HEIGHT : height;
        }
        return SpriteAsset;
    }());
    MyGame.SpriteAsset = SpriteAsset;
    var SpriteAssets = (function () {
        function SpriteAssets() {
            this.Albert = new SpriteAsset("albert");
            this.Arrow = new SpriteAsset("arrow", 12, 12);
            this.Blackness = new SpriteAsset("blackness");
            this.Blish = new SpriteAsset("blish");
            this.Bush = new SpriteAsset("bush");
            this.Crumbs = new SpriteAsset("crumbs");
            this.DoorWay = new SpriteAsset("doorway", 36, 8);
            this.Grodule = new SpriteAsset("grodule");
            this.Grounds = new SpriteAsset("grounds");
            this.House = new SpriteAsset("house", 112, 96);
            this.JamBotWorld = new SpriteAsset("jambot_world");
            this.JamBugWorld = new SpriteAsset("jambug_world");
            this.OldMan = new SpriteAsset("old_man");
            this.Player = new SpriteAsset("player");
            this.PlayerBattle = new SpriteAsset("player_battle", 136, 136);
            this.RhythmSymbols = new SpriteAsset("rhythm_symbols", 24, 24);
            this.Stanley = new SpriteAsset("stanley");
            this.StoneWall = new SpriteAsset("stone_wall");
            this.TheMeep = new SpriteAsset("the_meep", 224, 320);
            this.Tree = new SpriteAsset("tree", 56, 64);
            this.Water = new SpriteAsset("water");
        }
        return SpriteAssets;
    }());
    var ImageAssets = (function () {
        function ImageAssets() {
            this.BlackScreen = "black_screen";
            this.BottomTextBackground = "bottom_text_background";
            this.ButtonPrompt = "button_prompt";
            this.Couch = "couch";
            this.CrumbsIcon = "crumbs_icon";
            this.CrumbsSource = "crumbs_source";
            this.Door = "door";
            this.FruitStand = "fruit_stand";
            this.Gate = "gate";
            this.GroduleIcon = "grodule_icon";
            this.HealthBarContainer = "healthbar_container";
            this.JamBotBattle = "jambot_battle";
            this.Lillypad = "lillypad";
            this.MenuBackground = "menu_background";
            this.OptionsBackground = "options_background";
            this.Oven = "oven";
            this.OvenBattle = "oven_battle";
            this.ProjectileDisplay = "projectile_display";
            this.Rug = "rug";
            this.Sign = "sign";
            this.TileFloor = "tile_floor";
            this.Wall = "wall";
        }
        return ImageAssets;
    }());
    var AudioAsset = (function () {
        function AudioAsset(key, measures) {
            this.key = key;
            this.measures = measures;
        }
        return AudioAsset;
    }());
    var AudioAssets = (function () {
        function AudioAssets() {
            this.JamBot = new AudioAsset("jambot", 4);
        }
        return AudioAssets;
    }());
    MyGame.Assets = {
        Sprites: new SpriteAssets(),
        Images: new ImageAssets(),
        Audio: new AudioAssets(),
        FontName: "testbitmap",
        FontSize: 14
    };
    MyGame.VISUAL_ASSETS_PATH = "assets/visual";
    MyGame.AUDIO_ASSETS_PATH = "assets/audio";
    MyGame.PNG = "png";
    MyGame.MP3 = "mp3";
    MyGame.SAVE_FILE_NAME = "GlorpGlorpGlorp";
    MyGame.ICON = "icon";
    MyGame.SOURCE = "source";
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Direction;
    (function (Direction) {
        Direction[Direction["Left"] = 0] = "Left";
        Direction[Direction["Right"] = 1] = "Right";
        Direction[Direction["Up"] = 2] = "Up";
        Direction[Direction["Down"] = 3] = "Down";
    })(Direction = MyGame.Direction || (MyGame.Direction = {}));
    var Diagonal;
    (function (Diagonal) {
        Diagonal[Diagonal["SW"] = 0] = "SW";
        Diagonal[Diagonal["NE"] = 1] = "NE";
        Diagonal[Diagonal["NW"] = 2] = "NW";
        Diagonal[Diagonal["SE"] = 3] = "SE";
    })(Diagonal = MyGame.Diagonal || (MyGame.Diagonal = {}));
    var TransferReason;
    (function (TransferReason) {
        TransferReason[TransferReason["NONE"] = 0] = "NONE";
        TransferReason[TransferReason["LINK"] = 1] = "LINK";
        TransferReason[TransferReason["DEATH"] = 2] = "DEATH";
        TransferReason[TransferReason["VICTORY"] = 3] = "VICTORY";
    })(TransferReason = MyGame.TransferReason || (MyGame.TransferReason = {}));
    var ProjectileState;
    (function (ProjectileState) {
        ProjectileState[ProjectileState["WAITING"] = 0] = "WAITING";
        ProjectileState[ProjectileState["FLYING"] = 1] = "FLYING";
        ProjectileState[ProjectileState["AFTER_FLYING"] = 2] = "AFTER_FLYING";
        ProjectileState[ProjectileState["DONE"] = 3] = "DONE";
    })(ProjectileState = MyGame.ProjectileState || (MyGame.ProjectileState = {}));
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 288, 320, Phaser.AUTO, 'content', null) || this;
            _this.state.add(MyGame.States.Boot, MyGame.Boot, false);
            _this.state.add(MyGame.States.Preloader, MyGame.Preloader, false);
            _this.state.add(MyGame.States.Main, MyGame.Main, false);
            _this.state.add(MyGame.States.Battle, MyGame.Battle, false);
            _this.state.start(MyGame.States.Boot);
            return _this;
        }
        return Game;
    }(Phaser.Game));
    MyGame.Game = Game;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var SaveState = (function () {
        function SaveState() {
        }
        return SaveState;
    }());
    MyGame.SaveState = SaveState;
    var GameSaver = (function () {
        function GameSaver() {
        }
        GameSaver.getInstance = function () {
            return this.instance || (this.instance = new GameSaver());
        };
        GameSaver.prototype.saveGame = function (main, worldManager) {
            var stateTransfer = MyGame.StateTransfer.getInstance();
            var npcs = this.loadGame() ? this.loadGame().npcs : [];
            var _loop_1 = function (npc) {
                if (npc.hasSaveInfo()) {
                    var info = npc.unloadSaveInfo();
                    var old_1 = new MyGame.Location(main.island.num, npc.startX, npc.startY);
                    var matching = npcs.filter(function (n) { return n.old.equals(old_1); });
                    if (matching.length > 0) {
                        var match = matching[0];
                        match.now = new MyGame.Location(main.island.num, info.now.x, info.now.y);
                        match.script = info.script;
                        match.speed = info.speed;
                    }
                    else {
                        var created = {
                            old: old_1,
                            now: null,
                            script: info.script,
                            speed: info.speed
                        };
                        if (info.now) {
                            created.now = new MyGame.Location(main.island.num, info.now.x, info.now.y);
                        }
                        npcs.push(created);
                    }
                }
            };
            for (var _i = 0, _a = main.groups.npcs; _i < _a.length; _i++) {
                var npc = _a[_i];
                _loop_1(npc);
            }
            var triggers = this.loadGame() ? this.loadGame().triggers : [];
            var triggerLocations = main.triggers
                .filter(function (t) { return !t.active; })
                .map(function (t) { return new MyGame.Location(main.island.num, t.x, t.y); });
            var _loop_2 = function (trigger) {
                var matching = triggers.filter(function (t) { return t.equals(trigger); });
                if (matching.length === 0) {
                    triggers.push(trigger);
                }
            };
            for (var _b = 0, triggerLocations_1 = triggerLocations; _b < triggerLocations_1.length; _b++) {
                var trigger = triggerLocations_1[_b];
                _loop_2(trigger);
            }
            var saveState = {
                islandNum: main.island.num,
                layouts: worldManager.exportLayouts(),
                playerPosition: {
                    x: Math.round(main.player.x / MyGame.TILE_WIDTH),
                    y: Math.round(main.player.y / MyGame.TILE_HEIGHT)
                },
                dialogs: worldManager.exportDialogs(),
                triggers: triggers,
                npcs: npcs,
                health: stateTransfer.health,
                items: stateTransfer.addedItems,
                heldItems: stateTransfer.heldItems
            };
            localStorage.setItem(MyGame.SAVE_FILE_NAME, JSON.stringify(saveState));
            this.cached = saveState;
        };
        GameSaver.prototype.loadGame = function () {
            if (this.cached) {
                return this.cached;
            }
            var file = localStorage.getItem(MyGame.SAVE_FILE_NAME);
            if (!file) {
                return null;
            }
            this.cached = JSON.parse(file);
            this.cached.triggers = this.cached.triggers.map(function (t) { return new MyGame.Location(t.island, t.x, t.y); });
            this.cached.npcs = this.cached.npcs.map(function (n) {
                var now = n.now ? new MyGame.Location(n.now.island, n.now.x, n.now.y) : null;
                return {
                    script: n.script,
                    speed: n.speed,
                    old: new MyGame.Location(n.old.island, n.old.x, n.old.y),
                    now: now
                };
            });
            this.cached.items.forEach(function (i) {
                i.location = new MyGame.Location(i.location.island, i.location.x, i.location.y);
            });
            return this.cached;
        };
        GameSaver.prototype.clearData = function () {
            localStorage.removeItem(MyGame.SAVE_FILE_NAME);
            this.cached = null;
        };
        return GameSaver;
    }());
    MyGame.GameSaver = GameSaver;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Inputs = (function () {
        function Inputs(game) {
            this.left = game.input.keyboard.addKey(Phaser.KeyCode.A);
            this.right = game.input.keyboard.addKey(Phaser.KeyCode.D);
            this.up = game.input.keyboard.addKey(Phaser.KeyCode.W);
            this.down = game.input.keyboard.addKey(Phaser.KeyCode.S);
            this.O = game.input.keyboard.addKey(Phaser.KeyCode.O);
            this.K = game.input.keyboard.addKey(Phaser.KeyCode.K);
            this.spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        }
        Inputs.prototype.asArray = function () {
            return [this.left, this.right, this.up, this.down, this.K, this.O, this.spacebar];
        };
        return Inputs;
    }());
    MyGame.Inputs = Inputs;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Neighborhood = (function () {
        function Neighborhood() {
        }
        return Neighborhood;
    }());
    MyGame.Neighborhood = Neighborhood;
    var MainGroups = (function () {
        function MainGroups() {
            this.barriers = [];
            this.creatures = [];
            this.enemies = [];
            this.grounds = [];
            this.houses = [];
            this.npcs = [];
            this.portals = [];
            this.projectiles = [];
            this.signs = [];
            this.frontOfPlayer = [];
        }
        return MainGroups;
    }());
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.create = function () {
            this.playerStopped = false;
            var gameSaver = MyGame.GameSaver.getInstance();
            if (MyGame.DEVELOPER_MODE && MyGame.CLEAR_SAVE) {
                gameSaver.clearData();
            }
            var worldManager = MyGame.WorldManager.getInstance();
            var stateTransfer = MyGame.StateTransfer.getInstance();
            var saveState = gameSaver.loadGame();
            if ((stateTransfer.reason === MyGame.TransferReason.DEATH || stateTransfer.reason === MyGame.TransferReason.NONE) && saveState) {
                stateTransfer.loadFromSave(saveState);
                worldManager.importLayouts(saveState.layouts);
                worldManager.importDialogs(this, saveState.dialogs);
            }
            else if (stateTransfer.reason === MyGame.TransferReason.LINK && stateTransfer.island !== -1) {
                var tween = this.add.tween(this.world).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(function () {
                    this.unstopPlayer();
                }, this);
            }
            this.inputs = new MyGame.Inputs(this);
            this.groups = new MainGroups();
            this.island = worldManager.getIsland(stateTransfer.island === -1 ? 0 : stateTransfer.island);
            if (MyGame.DEVELOPER_MODE && stateTransfer.island === -1) {
                this.island = worldManager.getIsland(MyGame.START_ISLAND);
            }
            this.setupLevel(this.island, saveState);
            this.groups.enemies.forEach(function (e) { e.onStageBuilt(); });
            this.groups.npcs.forEach(function (n) { n.onStageBuilt(); });
            this.groups.creatures.forEach(function (c) { c.onStageBuilt(); });
            this.player.onStageBuilt();
            if (stateTransfer.funcs) {
                stateTransfer.funcs(this);
                stateTransfer.funcs = null;
            }
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
            this.inputs.spacebar.onDown.add(this.spacebarDown, this);
        };
        Main.prototype.update = function () {
            if (!this.playerStopped) {
                this.triggers.forEach(function (t) { return t.checkPlayerOverlap(); });
                var groupsToUpdate = [this.groups.enemies, this.groups.houses, this.groups.npcs, this.groups.portals, this.groups.creatures, this.groups.projectiles];
                for (var i = 0; i < groupsToUpdate.length; i++) {
                    var grp = groupsToUpdate[i];
                    for (var j = 0; j < grp.length; j++) {
                        grp[j].update();
                    }
                }
            }
            else {
                for (var _i = 0, _a = this.groups.npcs; _i < _a.length; _i++) {
                    var npc = _a[_i];
                    npc.playerStoppedUpdate();
                }
            }
        };
        Main.prototype.setupLevel = function (island, savedGame) {
            var _this = this;
            this.stage.backgroundColor = island.type === MyGame.IslandType.INSIDE ? MyGame.Colors.BLACK : MyGame.Colors.GRAY;
            this.game.world.setBounds(0, 0, island.layout[0].length * MyGame.TILE_WIDTH, island.layout.length * MyGame.TILE_HEIGHT);
            for (var y = 0; y < island.layout.length; y++) {
                var line = island.layout[y];
                for (var x = 0; x < line.length; x++) {
                    switch (line.charAt(x)) {
                        case " ":
                        case "-":
                            this.groups.grounds.push(MyGame.Ground.makeGround(this, island.type, MyGame.pof(x, y)));
                            break;
                        case "*":
                            this.groups.barriers.push(new MyGame.Bush(this, MyGame.pof(x, y)));
                            this.groups.grounds.push(MyGame.Ground.makeGround(this, island.type, MyGame.pof(x, y)));
                            break;
                        case "b":
                            this.groups.barriers.push(new MyGame.Blackness(this, MyGame.pof(x, y)));
                            break;
                        case "c":
                            this.groups.creatures.push(island.getCreature(this, x, y));
                            break;
                        case "d":
                            this.groups.portals.push(island.makeDoorway(this, MyGame.pof(x, y)));
                            this.groups.grounds.push(MyGame.Ground.makeGround(this, island.type, MyGame.pof(x, y)));
                            break;
                        case "e":
                            this.groups.grounds.push(MyGame.Ground.makeGround(this, island.type, MyGame.pof(x, y)));
                            this.groups.enemies.push(island.getEnemy(this, MyGame.pof(x, y)));
                            break;
                        case "g":
                            this.groups.barriers.push(new MyGame.Gate(this, MyGame.pof(x, y)));
                            this.groups.grounds.push(MyGame.Ground.makeGround(this, island.type, MyGame.pof(x, y)));
                            break;
                        case "h":
                            var house = new MyGame.House(this, MyGame.pof(x, y));
                            this.groups.houses.push(house);
                            this.groups.grounds.push(MyGame.Ground.makeGround(this, island.type, MyGame.pof(x, y)));
                            this.groups.frontOfPlayer.push(house);
                            break;
                        case "n":
                            this.groups.grounds.push(MyGame.Ground.makeGround(this, island.type, MyGame.pof(x, y)));
                            this.groups.npcs.push(island.getNPC(this, MyGame.pof(x, y)));
                            break;
                        case "o":
                            this.groups.barriers.push(new MyGame.Water(this, MyGame.pof(x, y)));
                            break;
                        case "p":
                            this.groups.barriers.push(new MyGame.Lillypad(this, MyGame.pof(x, y)));
                            break;
                        case "s":
                            var type = this.getTypeOfThing(island.sources, x, y, "Source");
                            this.groups.barriers.push(MyGame.Source.makeSource(this, x, y, type));
                            break;
                        case "t":
                            var tree = new MyGame.Tree(this, MyGame.pof(x, y));
                            this.groups.barriers.push(tree);
                            this.groups.grounds.push(MyGame.Ground.makeGround(this, island.type, MyGame.pof(x, y)));
                            this.groups.frontOfPlayer.push(tree);
                            break;
                        case "w":
                            this.groups.barriers.push(new MyGame.StoneWall(this, MyGame.pof(x, y), island.getNeighborhood(MyGame.pof(x, y))));
                            break;
                        case "x":
                            var customBarrier = this.getThingAtPosition(island.customBarriers, x, y, "Custom Barrier");
                            var barrier = new MyGame.CustomBarrier(this, MyGame.pof(x, y), customBarrier.type, customBarrier.playerCollides);
                            this.groups.barriers.push(barrier);
                            this.groups.grounds.push(MyGame.Ground.makeGround(this, island.type, MyGame.pof(x, y)));
                    }
                }
            }
            this.groups.portals = this.groups.portals.concat(island.getPortals(this), island.makeOtherLinks(this));
            this.triggers = island.makeTriggers(this);
            var stateTransfer = MyGame.StateTransfer.getInstance();
            var npcsToImport = savedGame ? savedGame.npcs : stateTransfer.npcs;
            var _loop_3 = function (npc) {
                var matches = this_1.groups.npcs.filter(function (n) { return n.startX === npc.old.x && n.startY === npc.old.y; });
                if (matches.length === 0) {
                    throw new Error("No matching npc found with start position " + npc.old.x + " " + npc.old.y);
                }
                var match = matches[0];
                if (npc.now) {
                    match.setPosition(npc.now);
                }
                if (npc.script) {
                    match.doScript(MyGame.Utils.reverseMovementScript(npc.script), npc.script.start, true);
                }
                if (npc.speed) {
                    match.setSpeed(npc.speed);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = npcsToImport.filter(function (t) { return t.old.island === island.num; }); _i < _a.length; _i++) {
                var npc = _a[_i];
                _loop_3(npc);
            }
            var triggersToImport = savedGame ? savedGame.triggers : stateTransfer.triggers;
            var _loop_4 = function (saveTrigger) {
                for (var _i = 0, _a = this_2.triggers.filter(function (t) { return t.x === saveTrigger.x && t.y === saveTrigger.y; }); _i < _a.length; _i++) {
                    var matchingTrigger = _a[_i];
                    matchingTrigger.active = false;
                }
            };
            var this_2 = this;
            for (var _b = 0, _c = triggersToImport.filter(function (t) { return t.island === island.num; }); _b < _c.length; _b++) {
                var saveTrigger = _c[_b];
                _loop_4(saveTrigger);
            }
            stateTransfer.addedItems.filter(function (i) { return i.location.island === _this.island.num; })
                .forEach(function (i) {
                var source = MyGame.Source.makeSource(_this, i.location.x, i.location.y, i.type);
                _this.groups.barriers.push(source);
            });
            var playerPosition = null;
            if (stateTransfer.position) {
                if (stateTransfer.reason === MyGame.TransferReason.LINK || stateTransfer.reason === MyGame.TransferReason.DEATH || stateTransfer.reason === MyGame.TransferReason.VICTORY) {
                    playerPosition = island.getAdjustedPosition(stateTransfer.position.clone());
                }
                else {
                    playerPosition = stateTransfer.position.clone();
                }
            }
            else {
                playerPosition = island.getAdjustedPosition(island.playerStart.clone());
            }
            if (MyGame.DEVELOPER_MODE && !stateTransfer.position) {
                playerPosition = island.getAdjustedPosition(MyGame.pof(MyGame.PLAYER_START_X, MyGame.PLAYER_START_Y));
            }
            this.player = new MyGame.Player(this, playerPosition, stateTransfer.health === -1 ? 100 : stateTransfer.health);
            this.projectileDisplay = new MyGame.HoldableDisplay(this);
            if (stateTransfer.heldItems) {
                this.player.itemCount = stateTransfer.heldItems.amount;
                this.player.itemType = stateTransfer.heldItems.type;
                this.projectileDisplay.updateIcon(this.player.itemType + "_" + MyGame.ICON);
                this.projectileDisplay.updateCount(this.player.itemCount);
            }
            this.setDepths();
        };
        Main.prototype.setDepths = function () {
            var _this = this;
            this.groups.grounds.forEach(function (gr) { this.game.world.bringToTop(gr); }, this);
            this.groups.portals.forEach(function (p) { this.game.world.bringToTop(p.sprite); }, this);
            this.groups.barriers.forEach(function (b) {
                if (b.sprite.key !== "blackness") {
                    _this.game.world.bringToTop(b.sprite);
                }
            }, this);
            this.groups.creatures.forEach(function (c) { _this.game.world.bringToTop(c.sprite); }, this);
            this.groups.houses.forEach(function (ho) { this.game.world.bringToTop(ho.sprite); }, this);
            this.groups.npcs.forEach(function (n) { this.game.world.bringToTop(n.sprite); }, this);
            this.groups.enemies.forEach(function (en) { this.game.world.bringToTop(en.worldSprite); }, this);
            this.game.world.bringToTop(this.player);
            this.groups.frontOfPlayer.forEach(function (f) { return _this.game.world.bringToTop(f.sprite); });
            this.projectileDisplay.bringToTop();
        };
        Main.prototype.paused = function () {
        };
        Main.prototype.spacebarDown = function () {
            if (this.playerStopped)
                return;
            this.game.paused = !this.game.paused;
            if (!this.game.paused) {
                this.pauseMenu.exit();
                return;
            }
            this.pauseMenu = new MyGame.PauseMenu(this);
            this.inputs.down.onDown.add(this.pauseMenu.changeSelection, this.pauseMenu);
            this.inputs.up.onDown.add(this.pauseMenu.changeSelection, this.pauseMenu);
            this.inputs.O.onDown.add(this.pauseMenu.select, this.pauseMenu);
        };
        Main.prototype.saveGame = function () {
            var gameSaver = MyGame.GameSaver.getInstance();
            gameSaver.saveGame(this, MyGame.WorldManager.getInstance());
        };
        Main.prototype.stopPlayer = function () {
            this.playerStopped = true;
            this.player.body.velocity.setTo(0, 0);
            this.groups.enemies.forEach(function (e) {
                if (e.movementManager) {
                    e.movementManager.pause();
                }
            });
        };
        Main.prototype.unstopPlayer = function () {
            this.playerStopped = false;
            this.groups.enemies.forEach(function (e) {
                if (e.movementManager) {
                    e.movementManager.resume();
                }
            });
        };
        Main.prototype.getTypeOfThing = function (things, x, y, thingType) {
            if (thingType === void 0) { thingType = "thing"; }
            return this.getThingAtPosition(things, x, y, thingType).type;
        };
        Main.prototype.getThingAtPosition = function (things, x, y, thingType) {
            var _this = this;
            if (thingType === void 0) { thingType = "thing"; }
            var matching = things.filter(function (t) {
                var adjusted = _this.island.getAdjustedPosition(MyGame.pof(t.x, t.y));
                return adjusted.x === x && adjusted.y === y;
            });
            if (matching.length === 0) {
                throw new Error(thingType + " information could not be found at x: " + x + ", y: " + y + ".");
            }
            return matching[0];
        };
        Main.prototype.bringGroupToTop = function (group) {
            var _this = this;
            group.forEach(function (g) { _this.world.bringToTop(g.sprite); });
            this.projectileDisplay.bringToTop();
        };
        Main.prototype.addItem = function (x, y, key) {
            var source = MyGame.Source.makeSource(this, x, y, key);
            this.groups.barriers.push(source);
            MyGame.StateTransfer.getInstance().addedItems.push({
                location: new MyGame.Location(this.island.num, x, y),
                type: key
            });
        };
        return Main;
    }(Phaser.State));
    MyGame.Main = Main;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ready = false;
            return _this;
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(300, 400, "preloadBar");
            this.load.setPreloadSprite(this.preloadBar);
            var spriteAssets = Object.getOwnPropertyNames(MyGame.Assets.Sprites);
            for (var i = 0; i < spriteAssets.length; i++) {
                var a = MyGame.Assets.Sprites[spriteAssets[i]];
                this.load.spritesheet(a.key, MyGame.VISUAL_ASSETS_PATH + "/" + a.key + "." + MyGame.PNG, a.width, a.height);
            }
            var imageAssets = Object.getOwnPropertyNames(MyGame.Assets.Images);
            for (var i = 0; i < imageAssets.length; i++) {
                var a = MyGame.Assets.Images[imageAssets[i]];
                this.load.image(a, MyGame.VISUAL_ASSETS_PATH + "/" + a + "." + MyGame.PNG);
            }
            var audioAssets = Object.getOwnPropertyNames(MyGame.Assets.Audio);
            for (var i = 0; i < audioAssets.length; i++) {
                var a = MyGame.Assets.Audio[audioAssets[i]];
                this.load.audio(a.key, MyGame.AUDIO_ASSETS_PATH + "/" + a.key + "." + MyGame.MP3);
            }
            this.load.bitmapFont("testbitmap", "assets/fonts/okeydokey_0.png", "assets/fonts/okeydokey.xml");
        };
        Preloader.prototype.create = function () {
            this.game.state.start(MyGame.States.Main);
        };
        return Preloader;
    }(Phaser.State));
    MyGame.Preloader = Preloader;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var StateTransfer = (function () {
        function StateTransfer() {
            this.enemy = null;
            this.island = -1;
            this.position = null;
            this.health = -1;
            this.reason = MyGame.TransferReason.NONE;
            this.dialogs = [];
            this.triggers = [];
            this.npcs = [];
            this.funcs = null;
            this.addedItems = [];
            this.heldItems = null;
        }
        StateTransfer.getInstance = function () {
            return StateTransfer.instance || (StateTransfer.instance = new StateTransfer);
        };
        StateTransfer.prototype.loadFromSave = function (saveState) {
            this.island = saveState.islandNum;
            this.position = MyGame.pof(saveState.playerPosition.x, saveState.playerPosition.y);
            this.health = saveState.health;
            this.addedItems = saveState.items;
            this.heldItems = saveState.heldItems;
        };
        return StateTransfer;
    }());
    MyGame.StateTransfer = StateTransfer;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Tuple = (function () {
        function Tuple(item1, item2) {
            this.item1 = item1;
            this.item2 = item2;
        }
        return Tuple;
    }());
    MyGame.Tuple = Tuple;
    function pof(x, y) {
        return new Phaser.Point(x, y);
    }
    MyGame.pof = pof;
    function pcop(point) {
        if (!point) {
            return point;
        }
        return pof(point.x, point.y);
    }
    MyGame.pcop = pcop;
    function isVertical(direction) {
        return direction === MyGame.Direction.Up || direction === MyGame.Direction.Down;
    }
    MyGame.isVertical = isVertical;
    var Utils = (function () {
        function Utils() {
        }
        Utils.fillString = function (s, len) {
            if (!s || s.length === 0) {
                throw new Error("s must be a non-empty string.");
            }
            if (len < 0) {
                throw new Error("len must be a non-negative number.");
            }
            var result = "";
            while (result.length < len) {
                result += s;
            }
            return result.substr(0, len);
        };
        Utils.snapToPixels = function (sprite) {
            if (sprite.body.velocity.x < 0) {
                sprite.body.position.x = Math.floor(sprite.body.position.x / 2) * 2;
            }
            else {
                sprite.body.position.x = Math.ceil(sprite.body.position.x / 2) * 2;
            }
            if (sprite.body.velocity.y < 0) {
                sprite.body.position.y = Math.floor(sprite.body.position.y / 2) * 2;
            }
            else {
                sprite.body.position.y = Math.ceil(sprite.body.position.y / 2) * 2;
            }
        };
        Utils.animationArray = function (start, finish) {
            if (finish < start) {
                throw new Error("finish must be greater than or equal to start.");
            }
            var result = [];
            for (var i = start; i <= finish; i++) {
                result.push(i);
            }
            return result;
        };
        Utils.isAThing = function (thing) {
            return thing !== undefined && thing !== null && thing !== NaN;
        };
        Utils.addPersonAnimations = function (sprite, speed) {
            if (speed === void 0) { speed = 5; }
            sprite.animations.add("walk_back", Utils.animationArray(1, 4), speed, true);
            sprite.animations.add("walk_forward", Utils.animationArray(6, 9), speed, true);
            sprite.animations.add("walk_right", Utils.animationArray(10, 13), speed, true);
            sprite.animations.add("walk_left", Utils.animationArray(14, 17), speed, true);
            sprite.animations.add("idle_back", [0], speed, true);
            sprite.animations.add("idle_forward", [5], speed, true);
            sprite.animations.add("idle_right", [10], speed, true);
            sprite.animations.add("idle_left", [14], speed, true);
        };
        Utils.getIdleAnimName = function (direction) {
            return "idle_" + Utils.getDirectionName(direction);
        };
        Utils.getWalkingAnimName = function (direction) {
            return "walk_" + Utils.getDirectionName(direction);
        };
        Utils.getDirectionName = function (direction) {
            switch (direction) {
                case null:
                    return null;
                case MyGame.Direction.Down:
                    return "back";
                case MyGame.Direction.Up:
                    return "forward";
                case MyGame.Direction.Right:
                    return "right";
                case MyGame.Direction.Left:
                    return "left";
                default:
                    throw new Error("Direction " + direction + " not supported.");
            }
        };
        Utils.splitTextIntoPages = function (text) {
            var lettersInRow = 17;
            var rowsInPage = 3;
            var words = text.split(" ");
            var pages = [];
            var workingPage = ["", "", ""];
            var rowCount = rowsInPage;
            for (var i = 0; i < lettersInRow; i++) {
                workingPage[rowsInPage - 1] += "a";
            }
            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                if (word.length > lettersInRow) {
                    throw new Error("Word " + word + " has more letters than allowed in row.");
                }
                if (workingPage[rowCount - 1].length + word.length + 1 > lettersInRow) {
                    if (workingPage.length === rowsInPage) {
                        pages.push(workingPage.join(" "));
                        workingPage = [word];
                        rowCount = 1;
                    }
                    else {
                        rowCount += 1;
                        workingPage[rowCount - 1] = word;
                    }
                }
                else {
                    workingPage[rowCount - 1] = workingPage[rowCount - 1] + " " + word;
                }
            }
            pages.push(workingPage.join(" "));
            pages.shift();
            return pages;
        };
        Utils.surroundedByChar = function (layout, x, y, char) {
            if (char.length !== 1) {
                throw new Error("char must be a single character.");
            }
            return (y === 0 || layout[y - 1][x] === char) &&
                (y === layout.length - 1 || layout[y + 1][x] === char) &&
                (x === 0 || layout[y][x - 1] === char) &&
                (x === layout[y].length || layout[y][x + 1] === char);
        };
        Utils.hasNeighboringChar = function (layout, x, y, char) {
            if (char.length !== 1) {
                throw new Error("char must be a single character.");
            }
            return (y > 0 && layout[y - 1][x] === char) ||
                (y < layout.length - 1 && layout[y + 1][x] === char) ||
                (x > 0 && layout[y][x - 1] === char) ||
                (x < layout[y].length && layout[y][x + 1] === char);
        };
        Utils.reverseMovementScript = function (script) {
            var result = "";
            for (var i = 0; i < script.directions.length; i++) {
                switch (script.directions[i]) {
                    case null:
                        result += " ";
                        break;
                    case MyGame.Direction.Up:
                        result += "u";
                        break;
                    case MyGame.Direction.Down:
                        result += "d";
                        break;
                    case MyGame.Direction.Right:
                        result += "r";
                        break;
                    case MyGame.Direction.Left:
                        result += "l";
                }
            }
            return result;
        };
        Utils.makeMovementScript = function (position, script) {
            if (!script) {
                return null;
            }
            if (script.indexOf("=") === -1) {
                return new MyGame.MovementScript(position, makeDirections(script));
            }
            var loop = script.indexOf("l=") !== -1;
            if (loop) {
                loop = getValue("l") === "true";
            }
            var triggerName = "";
            if (script.indexOf("t=") === -1) {
                triggerName = null;
            }
            else {
                triggerName = getValue("t");
            }
            var directions = makeDirections(getValue("d"));
            return new MyGame.MovementScript(position, directions, loop, triggerName);
            function getValue(key) {
                var entries = script.split(";");
                return entries.map(function (e) { return e.split("="); }).filter(function (e) { return e[0] === key; }).map(function (e) { return e[1]; })[0];
            }
            function makeDirections(directionsString) {
                return directionsString.toLocaleLowerCase().split("").map(function (c) { return getDirectionFromLetter(c); });
            }
            function getDirectionFromLetter(letter) {
                switch (letter) {
                    case " ":
                        return null;
                    case "u":
                        return MyGame.Direction.Up;
                    case "d":
                        return MyGame.Direction.Down;
                    case "l":
                        return MyGame.Direction.Left;
                    case "r":
                        return MyGame.Direction.Right;
                }
                throw new Error(letter + " is not a valid direction char.");
            }
        };
        Utils.getEndPosition = function (start, directions) {
            var end = start.clone();
            for (var i = 0; i < directions.length; i++) {
                switch (directions[i]) {
                    case MyGame.Direction.Up:
                        end.y -= 1;
                        break;
                    case MyGame.Direction.Down:
                        end.y += 1;
                        break;
                    case MyGame.Direction.Left:
                        end.x -= 1;
                        break;
                    case MyGame.Direction.Right:
                        end.x += 1;
                        break;
                }
            }
            if (end.x < 0 || end.y < 0) {
                throw new Error("End point of script would have negative value.");
            }
            return end;
        };
        Utils.bpmToMilliseconds = function (bpm) {
            return 60000 / bpm;
        };
        Utils.roundToClosestTile = function (point) {
            var divided = point.clone().divide(MyGame.TILE_WIDTH, MyGame.TILE_HEIGHT);
            return pof(Math.round(divided.x), Math.round(divided.y));
        };
        Utils.tileisClear = function (x, y, main) {
            var layout = main.island.layout;
            var width = layout[0].length;
            if (layout.some(function (r) { return r.length !== width; })) {
                throw new Error("All rows of layout must have same length.");
            }
            if (x > width - 1 || y > layout.length) {
                return false;
            }
            var tile = layout[y].charAt(x);
            if (tile === " ") {
                return true;
            }
            if (tile === "x") {
                var matching = main.groups.barriers.filter(function (b) { return b.position.x === x && b.position.y === y; })[0];
                return !matching.playerCollides;
            }
            return false;
        };
        Utils.sees = function (position, obj, visionRange, blockers) {
            var seesHorizontal = true;
            var seesVertical = true;
            var distance = obj.clone().subtract(position.x, position.y);
            var absDistance = pof(Math.abs(distance.x), Math.abs(distance.y));
            var lineOfSight = new Phaser.Line(position.x, position.y, obj.x, obj.y);
            if (this.isAThing(blockers) && blockers.some(function (b) { return b.intersects(lineOfSight, true) !== null; })) {
                seesHorizontal = false;
                seesVertical = false;
            }
            if (this.isAThing(visionRange)) {
                var transformedRange = pof(MyGame.TILE_WIDTH, MyGame.TILE_HEIGHT).multiply(visionRange, visionRange);
                seesHorizontal = seesHorizontal && absDistance.y <= transformedRange.y;
                seesVertical = seesVertical && absDistance.x <= transformedRange.x;
            }
            return new Tuple(seesHorizontal, seesVertical);
        };
        Utils.moveToTarget = function (body, target, speed, cutoff, sees) {
            var distance = target.clone().subtract(body.x, body.y);
            var absDistance = pof(Math.abs(distance.x), Math.abs(distance.y));
            if (absDistance.x < cutoff) {
                body.position.x = target.x;
                body.velocity.x = 0;
                sees.item1 = false;
            }
            if (absDistance.y < cutoff) {
                body.position.y = target.y;
                body.velocity.y = 0;
                sees.item2 = false;
            }
            body.velocity.x = sees.item1 ? this.signOf(distance.x) * speed : 0;
            body.velocity.y = sees.item2 && !sees.item1 ? this.signOf(distance.y) * speed : 0;
        };
        Utils.accelerateToTarget = function (target, currentPosition, currentVelocity, acceleration, maxSpeed) {
            var multiplier = 1;
            if (maxSpeed !== undefined && maxSpeed <= 0) {
                throw new Error("maxSpeed must be positive. Given value: " + maxSpeed + ".");
            }
            if (isNaN(currentVelocity)) {
                currentVelocity = 0;
            }
            if (target < currentPosition) {
                multiplier = -1;
                currentPosition *= -1;
                currentVelocity *= -1;
            }
            var distance = Math.abs(target - currentPosition);
            if (distance < maxSpeed) {
                var calculated_1 = multiplier * distance;
                return maxSpeed === undefined ? calculated_1
                    : multiplier === 1 ? Math.min(calculated_1, currentVelocity) : Math.max(calculated_1, currentVelocity);
            }
            var calculated = multiplier * (currentVelocity + acceleration);
            return maxSpeed === undefined ? calculated
                : multiplier === 1 ? Math.min(calculated, maxSpeed) : Math.max(calculated, maxSpeed * -1);
        };
        Utils.signOf = function (num) {
            return num < 0 ? -1 : num > 0 ? 1 : 0;
        };
        Utils.moveInDirection = function (body, direction, speed) {
            switch (direction) {
                case MyGame.Direction.Up:
                    body.velocity.setTo(0, speed * -1);
                    break;
                case MyGame.Direction.Right:
                    body.velocity.setTo(speed, 0);
                    break;
                case MyGame.Direction.Down:
                    body.velocity.setTo(0, speed);
                    break;
                case MyGame.Direction.Left:
                    body.velocity.setTo(speed * -1, 0);
                    break;
            }
        };
        Utils.fadeToBlack = function (state, time, nextState) {
            if (time === void 0) { time = 1000; }
            var spr = state.add.image(state.camera.x, state.camera.y, MyGame.Assets.Images.BlackScreen);
            state.world.bringToTop(spr);
            spr.alpha = 0;
            var tween = state.add.tween(spr).to({ alpha: 1 }, time, Phaser.Easing.Linear.None, true);
            if (nextState) {
                tween.onComplete.add(function () {
                    state.state.start(nextState);
                }, this);
            }
        };
        Utils.centerInScreen = function (text) {
            text.x = (MyGame.SCREEN_WIDTH - text.width) / 2;
            text.y = (MyGame.SCREEN_HEIGHT - text.height) / 2;
        };
        Utils.fadeInFromBlack = function (state, time, onComplete, onCompleteContext) {
            var spr = state.add.image(state.camera.x, state.camera.y, MyGame.Assets.Images.BlackScreen);
            state.world.bringToTop(spr);
            spr.alpha = 1;
            var tween = state.add.tween(spr).to({ alpha: 0 }, time, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(onComplete, onCompleteContext);
        };
        Utils.getEdgeDistance = function (sp1, sp2) {
            function haveOverlap(begin1, end1, begin2, end2) {
                return (begin2 <= begin1 && begin1 <= end2) || (begin1 <= begin2 && begin2 <= end1);
            }
            if (haveOverlap(sp1.left, sp1.right, sp2.left, sp2.right)) {
                if (haveOverlap(sp1.top, sp1.bottom, sp2.top, sp2.bottom)) {
                    return 0;
                }
                if (sp1.top < sp2.top) {
                    return sp2.top - sp1.bottom;
                }
                return sp1.top - sp2.bottom;
            }
            if (haveOverlap(sp1.top, sp1.bottom, sp2.top, sp2.bottom)) {
                if (sp1.left < sp2.left) {
                    return sp2.left - sp1.right;
                }
                return sp1.left - sp2.right;
            }
            if (sp1.left < sp2.left) {
                if (sp1.top < sp2.top) {
                    return Math.max(sp2.top - sp1.bottom, sp2.left - sp1.right);
                }
                return Math.max(sp1.top - sp2.bottom, sp2.left - sp1.right);
            }
            if (sp1.top < sp2.top) {
                return Math.max(sp2.top - sp1.bottom, sp1.left - sp2.right);
            }
            return Math.max(sp1.top - sp2.bottom, sp1.left - sp2.right);
        };
        Utils.getHouseStart = function (x, y) {
            return pof(x + 4, y + 7);
        };
        return Utils;
    }());
    MyGame.Utils = Utils;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Battle = (function (_super) {
        __extends(Battle, _super);
        function Battle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Battle.prototype.create = function () {
            this.inputs = new MyGame.Inputs(this);
            if (MyGame.DEVELOPER_MODE) {
                this.inputs.spacebar.onUp.add(this.enemyDeath, this);
            }
            this.time.reset();
            this.time.events.removeAll();
            this.stage.backgroundColor = 0xEAEAEA;
            var stateTransfer = MyGame.StateTransfer.getInstance();
            this.playerHealth = stateTransfer.health === -1 ? 100 : stateTransfer.health;
            var playerKey = MyGame.WorldManager.getInstance().getIsland(stateTransfer.island).type === MyGame.IslandType.INSIDE ? MyGame.Frames.PlayerBattle.INSIDE : MyGame.Frames.PlayerBattle.OUTSIDE;
            this.playerDisplay = new CharacterDisplay(this, 10, MyGame.SCREEN_HEIGHT - 146, MyGame.Assets.Sprites.PlayerBattle.key, playerKey);
            this.playerHealthDisplay = new HealthDisplay(this, 146, MyGame.SCREEN_HEIGHT - 50, "You", MyGame.Player.STARTING_HEALTH);
            this.playerHealthDisplay.updateHitPoints(this.playerHealth);
            if (!MyGame.Utils.isAThing(stateTransfer.enemy)) {
                throw new Error("enemy is not set for battle.");
            }
            this.enemy = stateTransfer.enemy;
            var topY = MyGame.Assets.Sprites.RhythmSymbols.height * 2 + 20;
            this.enemyDisplay = new CharacterDisplay(this, MyGame.SCREEN_WIDTH - 146, topY, this.enemy.battleSpriteKey);
            this.enemyHealthDisplay = new HealthDisplay(this, 10, topY, this.enemy.name, this.enemy.hitPoints);
            this.patternDisplayer = new MyGame.PatternDisplayer(this, this.enemy);
            this.patternChecker = new MyGame.PatternMatcher(this, this.enemy);
            this.passedMeasures = -2;
            MyGame.Utils.fadeInFromBlack(this, 500, this.startCountdown, this);
        };
        Battle.prototype.startCountdown = function () {
            var _this = this;
            this.music = this.sound.play(MyGame.Assets.Audio.JamBot.key);
            var count = this.enemy.beatLength === 2 ? 3 : this.enemy.beatLength - 1;
            var display = this.add.bitmapText(0, 22, MyGame.Assets.FontName, count.toString(), MyGame.Assets.FontSize);
            this.updateCount(count, display);
            var millis = MyGame.Utils.bpmToMilliseconds(this.enemy.tempo);
            var introLength = ((count + 1) * millis) / 1000;
            this.music.addMarker("hi", introLength, this.music.totalDuration - introLength);
            var _loop_5 = function (i) {
                this_3.time.events.add(millis * (count - i), function () {
                    _this.updateCount(i, display);
                    if (i === 3) {
                        _this.playerDisplay.slideIn(true, millis);
                    }
                    else if (i === 2) {
                        _this.enemyDisplay.slideIn(false, millis);
                    }
                }, this_3);
            };
            var this_3 = this;
            for (var i = 0; i <= count; i++) {
                _loop_5(i);
            }
            this.time.events.add(millis * (count + 1), function () {
                _this.startBattle();
                display.visible = false;
            }, this);
            this.time.events.start();
        };
        Battle.prototype.updateCount = function (count, display) {
            display.text = count === 0 ? "GO!!!" : count.toString();
            MyGame.Utils.centerInScreen(display);
        };
        Battle.prototype.startBattle = function () {
            this.startPattern();
            this.time.events.loop(this.patternDisplayer.tempo * this.enemy.patternLength * 2, this.startPattern, this);
            this.time.events.start();
        };
        Battle.prototype.startChecker = function () {
            this.patternChecker.begin(this.currentPattern);
        };
        Battle.prototype.startPattern = function () {
            this.passedMeasures = (this.passedMeasures + 2) % MyGame.Assets.Audio.JamBot.measures;
            if (this.passedMeasures === 0) {
                this.music.play("hi");
            }
            if (MyGame.Utils.isAThing(this.patternChecker.notesPressed)) {
                this.afterRound();
            }
            this.patternDisplayer.reset();
            this.patternChecker.reset();
            this.currentPattern = this.patternDisplayer.display();
            this.time.events.add((this.enemy.patternLength - 1) * this.patternDisplayer.tempo, this.startChecker, this);
        };
        Battle.prototype.afterRound = function () {
            var damage = this.enemy.calculateDamage(this.currentPattern, this.patternChecker.notesPressed);
            if (damage === 0) {
                var playerDamage = this.playerHealth - this.enemy.getAttackPoints(this.currentPattern);
                this.playerHealth = Math.max(playerDamage, 0);
                this.playerHealthDisplay.updateHitPoints(this.playerHealth);
                if (this.playerHealth === 0) {
                    MyGame.StateTransfer.getInstance().reason = MyGame.TransferReason.DEATH;
                    MyGame.StateTransfer.getInstance().health = -1;
                    this.game.state.start(MyGame.States.Main);
                }
                return;
            }
            this.enemy.health = Math.max(this.enemy.health - damage, 0);
            this.enemyHealthDisplay.updateHitPoints(this.enemy.health);
            if (this.enemy.health === 0) {
                this.enemyDeath();
            }
        };
        Battle.prototype.enemyDeath = function () {
            this.game.time.events.stop(true);
            var stateTransfer = MyGame.StateTransfer.getInstance();
            stateTransfer.enemy = null;
            this.enemy.die();
            if (MyGame.Utils.isAThing(this.enemy.transferPosition)) {
                stateTransfer.position = this.enemy.transferPosition;
            }
            else {
                stateTransfer.position = new Phaser.Point(Math.floor(this.enemy.worldSprite.position.x / MyGame.TILE_WIDTH), Math.floor(this.enemy.worldSprite.position.y / MyGame.TILE_HEIGHT));
            }
            stateTransfer.funcs = this.enemy.afterDeath;
            stateTransfer.reason = MyGame.TransferReason.VICTORY;
            stateTransfer.health = this.playerHealth;
            this.state.start(MyGame.States.Main);
        };
        return Battle;
    }(Phaser.State));
    MyGame.Battle = Battle;
    var MOVEMENT_AMOUNT = 6;
    var CharacterDisplay = (function () {
        function CharacterDisplay(battle, x, y, key, frame) {
            if (frame === void 0) { frame = 0; }
            this.battle = battle;
            this.image = battle.add.image(x, y, key, frame);
            this.image.anchor.setTo(0.5, 0.5);
            this.image.position.setTo(x + this.image.width / 2, y + this.image.height / 2);
            this.startX = this.image.position.x;
            this.startY = this.image.position.y;
            this.image.visible = false;
        }
        CharacterDisplay.prototype.slideIn = function (fromLeft, millis) {
            this.image.visible = true;
            var startPos = fromLeft ? this.image.width * -1 : MyGame.SCREEN_WIDTH + this.image.width;
            this.battle.add.tween(this.image.position).from({ x: startPos }, millis / 2, Phaser.Easing.Linear.None, true, millis / 2);
        };
        CharacterDisplay.prototype.reset = function () {
            this.image.position.setTo(this.startX, this.startY);
            this.image.scale.setTo(1, 1);
        };
        CharacterDisplay.prototype.moveUp = function () {
            this.image.position.y -= MOVEMENT_AMOUNT;
        };
        CharacterDisplay.prototype.moveDown = function () {
            this.image.position.y += MOVEMENT_AMOUNT;
        };
        CharacterDisplay.prototype.moveLeft = function () {
            this.image.position.x -= MOVEMENT_AMOUNT;
        };
        CharacterDisplay.prototype.moveRight = function () {
            this.image.position.x += MOVEMENT_AMOUNT;
        };
        CharacterDisplay.prototype.pressO = function () {
            this.image.scale.setTo(1.1, 1.1);
        };
        CharacterDisplay.prototype.pressK = function () {
            this.image.scale.setTo(0.9, 0.9);
        };
        return CharacterDisplay;
    }());
    var HealthDisplay = (function () {
        function HealthDisplay(battle, x, y, name, hitPoints) {
            this.battle = battle;
            this.x = x;
            this.y = y;
            this.hitPoints = hitPoints;
            this.text = battle.add.bitmapText(x, y, MyGame.Assets.FontName, name, MyGame.Assets.FontSize);
            this.healthBarContainer = battle.add.image(x, y + 18, MyGame.Assets.Images.HealthBarContainer);
            this.healthBar = null;
            this.updateHitPoints(hitPoints);
        }
        HealthDisplay.prototype.updateHitPoints = function (hp) {
            if (hp > this.hitPoints || hp < 0) {
                throw new Error("Hit points not in valid range: " + hp + ".");
            }
            if (this.healthBar !== null) {
                this.healthBar.destroy();
                this.healthBar = null;
            }
            var width = Math.round((hp / this.hitPoints) * ((this.healthBarContainer.width - 4) / 2)) * 2;
            var bmd = this.battle.add.bitmapData(width, this.healthBarContainer.height - 4);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, width, this.healthBarContainer.height - 4);
            bmd.ctx.fillStyle = "#606060";
            bmd.ctx.fill();
            this.healthBar = this.battle.add.sprite(this.healthBarContainer.x + 2, this.healthBarContainer.y + 2, bmd);
        };
        return HealthDisplay;
    }());
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var TextOption = (function () {
        function TextOption(text, response) {
            if (response === void 0) { response = null; }
            var maxLength = 19;
            if (text.length > maxLength) {
                throw new Error("Option '" + text + "' has more than " + maxLength + " characters.");
            }
            this.text = text;
            this.response = response;
        }
        return TextOption;
    }());
    MyGame.TextOption = TextOption;
    var TextPrompt = (function () {
        function TextPrompt(text, options) {
            this.text = MyGame.Utils.splitTextIntoPages(text);
            if (options.length < 1) {
                throw Error("Must be at least 1 option.");
            }
            this.hasOptions = true;
            this.options = options;
        }
        return TextPrompt;
    }());
    MyGame.TextPrompt = TextPrompt;
    var TextDump = (function () {
        function TextDump(text, next) {
            if (next === void 0) { next = null; }
            this.text = MyGame.Utils.splitTextIntoPages(text);
            this.hasOptions = false;
            this.next = next;
        }
        return TextDump;
    }());
    MyGame.TextDump = TextDump;
    var TextEncounter = (function () {
        function TextEncounter(startPage, autoStart, onFinish) {
            if (autoStart === void 0) { autoStart = false; }
            if (onFinish === void 0) { onFinish = function (main, parent, result) { }; }
            this.currentPage = startPage;
            this.startPage = startPage;
            this.autoStart = autoStart;
            this.onFinish = onFinish.bind(this);
        }
        TextEncounter.prototype.getCurrentPage = function () {
            return this.currentPage;
        };
        TextEncounter.prototype.getResponse = function (selected) {
            if (!this.currentPage.hasOptions) {
                return (this.currentPage = this.currentPage.next);
            }
            return (this.currentPage = this.currentPage.options[selected].response);
        };
        TextEncounter.prototype.isFinished = function () {
            return this.currentPage === null;
        };
        TextEncounter.prototype.reset = function () {
            this.currentPage = this.startPage;
        };
        return TextEncounter;
    }());
    MyGame.TextEncounter = TextEncounter;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var TextManager = (function () {
        function TextManager(textEncounters, decisionFunction) {
            if (decisionFunction === void 0) { decisionFunction = null; }
            this.textEncounters = textEncounters;
            this.lastViewed = -1;
            if (!decisionFunction) {
                this.decisionFunction = function (lastViewed, main, parent, lastResult) {
                    if (lastViewed < this.textEncounters.length - 1) {
                        return lastViewed + 1;
                    }
                    return lastViewed;
                };
            }
            else {
                this.decisionFunction = decisionFunction;
            }
        }
        TextManager.prototype.getNext = function (main, parent) {
            var current = this.textEncounters[this.lastViewed];
            return this.textEncounters[this.decisionFunction(this.lastViewed, main, parent, current ? current.lastResult : undefined)];
        };
        TextManager.prototype.useNext = function (main, parent) {
            var current = this.textEncounters[this.lastViewed];
            this.lastViewed = this.decisionFunction(this.lastViewed, main, parent, current ? current.lastResult : undefined);
            main.island.saveDialogState(parent.position.x, parent.position.y, this.lastViewed);
            return this.textEncounters[this.lastViewed];
        };
        TextManager.prototype.setLastViewed = function (lastViewed) {
            this.lastViewed = lastViewed;
        };
        return TextManager;
    }());
    MyGame.TextManager = TextManager;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    function getAlbertText() {
        function danceDance() {
            return new MyGame.TextPrompt("For each measure that appears on the screen, you have to repeat the pattern in order. "
                + "You don't even have to hit the moves on the same beats, but if you do it should hurt them more. "
                + "Just remember that if you see an up arrow it is really the W key, the down arrow is the S key, etcetera. "
                + "Go give it a shot.", [
                new MyGame.TextOption("Sounds good!"),
                new MyGame.TextOption("... I'll try.")
            ]);
        }
        function getJambotExplanation() {
            return new MyGame.TextPrompt("It's just that some weird interference has caused them to act up and start acting a little aggressive. "
                + "My idea for them was that they could be robots you could practice dancing with. Pretty fun, right? They're called JamBots. "
                + "Originally, if you made a wrong move they would emit a little beep. But now they let out a supersonic sound blast that can really hurt you.", [
                new MyGame.TextOption("You can fix this.", new MyGame.TextDump("You know I can't dance, Rosie! That's why I made these to practice with. Just let me explain what to do and I know you can get past them.", danceDance())),
                new MyGame.TextOption("How can I help?", new MyGame.TextDump("Thank you, Rosie. You know I can't dance.", danceDance()))
            ]);
        }
        var dumpy = new MyGame.TextDump("If you want to do any damage to them, you'll have to hit the notes on the same beat as them. Try it out.");
        function getJamBugExplanation() {
            return new MyGame.TextPrompt("The JamBots were supposed to be the beginner's version. The hard version is called JamBugs. And they also started acting up. I managed to trap them behind this gate, but you'll have to go through them to get to town.", [
                new MyGame.TextOption("Anything else?", dumpy)
            ]);
        }
        function getToTown() {
            return new MyGame.TextPrompt("Well I know Stacy can get... strange in her routines. But anyway, you should get into town. Also, can you stop by Professor Dorfusk's house? "
                + "I was supposed to help him fix the Thumpotron but I should probably stay here and clean up this mess. I think he's just missing some parts or something.", [
                new MyGame.TextOption("Okay."),
                new MyGame.TextOption("I'll see.")
            ]);
        }
        function decision(lastViewed, main, parent) {
            if (lastViewed < 0) {
                return 0;
            }
            if (lastViewed < 2) {
                var jambotsLeft = main.groups.enemies.filter(function (e) { return e instanceof MyGame.JamBot; }).length > 0;
                return jambotsLeft ? 1 : 2;
            }
            var jambugsLeft = main.groups.enemies.some(function (e) { return e instanceof MyGame.JamBug; });
            return jambugsLeft ? 3 : 4;
        }
        return new MyGame.TextManager([
            new MyGame.TextEncounter(new MyGame.TextPrompt("Hello Rosie.", [
                new MyGame.TextOption("Oh hey Albert.", new MyGame.TextPrompt("Do you want to hear about my latest invention?", [
                    new MyGame.TextOption("Sure!", new MyGame.TextDump("That's good, because your survival might depend on it! Just kidding, I think.", getJambotExplanation())),
                    new MyGame.TextOption("Not really...", new MyGame.TextDump("Well, I think you had better listen anyway, if you want to survive. Um, just kidding!", getJambotExplanation()))
                ]))
            ])),
            new MyGame.TextEncounter(danceDance()),
            new MyGame.TextEncounter(new MyGame.TextPrompt("Wow, thanks! I knew you could do it. But uh...", [
                new MyGame.TextOption("What?", getJamBugExplanation()),
                new MyGame.TextOption("*Sigh*", getJamBugExplanation())
            ]), true),
            new MyGame.TextEncounter(dumpy),
            new MyGame.TextEncounter(new MyGame.TextPrompt("What a relief, now I don't have to worry about my little experiments killing anyone. Thanks again!", [
                new MyGame.TextOption("Are there more?", new MyGame.TextPrompt("This should be all of the ones that escaped, but don't think you're done dancing. I know Stacy and Ralph were very eager to try your skills before the Feast.", [
                    new MyGame.TextOption("Cool!", getToTown()),
                    new MyGame.TextOption("Oh no...", getToTown())
                ])),
                new MyGame.TextOption("I enjoyed it.", new MyGame.TextPrompt("Uhh... That's good I guess. It was probably good practice at least. I know Stacy and Ralph were very eager to try your skills before the Feast.", [
                    new MyGame.TextOption("Cool!", getToTown()),
                    new MyGame.TextOption("Oh no...", getToTown())
                ]))
            ]))
        ], decision);
    }
    MyGame.getAlbertText = getAlbertText;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Texts;
    (function (Texts) {
        Texts[Texts["GRANDPA"] = 0] = "GRANDPA";
        Texts[Texts["SIGHING"] = 1] = "SIGHING";
        Texts[Texts["ALBERT_FIRST"] = 2] = "ALBERT_FIRST";
        Texts[Texts["MEEP_GROWL"] = 3] = "MEEP_GROWL";
        Texts[Texts["STANLEY"] = 4] = "STANLEY";
    })(Texts = MyGame.Texts || (MyGame.Texts = {}));
    function getSignText(info) {
        return new MyGame.TextManager([new MyGame.TextEncounter(new MyGame.TextDump(info))]);
    }
    MyGame.getSignText = getSignText;
    function getDialog(key) {
        switch (key) {
            case Texts.ALBERT_FIRST:
                return MyGame.getAlbertText();
            case Texts.GRANDPA:
                return MyGame.getGrandpaText();
            case Texts.SIGHING:
                return new MyGame.TextManager([new MyGame.TextEncounter(new MyGame.TextDump("Sigh...", new MyGame.TextDump("This time of year always reminds me of when Sarah left.")))]);
            case Texts.MEEP_GROWL:
                return MyGame.getTheMeepText();
            case Texts.STANLEY:
                return MyGame.getStanleyText();
            default:
                throw new Error("Cannot find dialog for key '" + key + "'.");
        }
    }
    MyGame.getDialog = getDialog;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    function getGrandpaText() {
        function getAfterNap() {
            return new MyGame.TextDump("When you see the first Beast block out the sun, you'll really get a sense of how massive they are. And the noises they make really are bizarre. " +
                "In school they had given us a sheet of all the different kinds people have seen in the past centuries, and we were supposed to check them off as they passed above. " +
                "I was so in awe that I couldn't even look down at the list. I got an F on the assignment! " +
                "Apparently there was a new Beast that year that had never been seen before. My mom had to work late hours studying its sounds. " +
                "But anyway, I've been blabbing long enough. You had better get back into town to help out your brother.");
        }
        function getDreamResponse() {
            return new MyGame.TextPrompt("What happened in your dream?", [
                new MyGame.TextOption("Giants attacked!", new MyGame.TextDump("I was a little scared before my first Feast too.", getAfterNap())),
                new MyGame.TextOption("Food wasn't ready.", new MyGame.TextDump("I see. You are feeling guilty because you are napping instead of helping your brother prepare your family's portion. " +
                    "But there is nothing wrong with resting so you can really enjoy your first Feast.", getAfterNap()))
            ]);
        }
        return new MyGame.TextManager([
            new MyGame.TextEncounter(new MyGame.TextPrompt("Hello Rosie. Did you enjoy your nap?", [
                new MyGame.TextOption("Yes.", new MyGame.TextPrompt("That's good. I hope you are well rested for your first Feast of the Giants.", [
                    new MyGame.TextOption("I'm pretty excited.", new MyGame.TextDump("Well, you are braver than I was at your age.", getAfterNap())),
                    new MyGame.TextOption("I'm kinda nervous.", new MyGame.TextDump("I was a little scared at my first Feast too.", getAfterNap()))
                ])),
                new MyGame.TextOption("Not really.", new MyGame.TextPrompt("Oh... Why not?", [
                    new MyGame.TextOption("I had bad dreams.", new MyGame.TextPrompt("About what? The Feast of the Giants?", [
                        new MyGame.TextOption("Yeah...", getDreamResponse()),
                        new MyGame.TextOption("More or less.", getDreamResponse())
                    ])),
                    new MyGame.TextOption("Should be working.", new MyGame.TextDump("I see. You are feeling guilty because you are napping instead of helping your brother prepare your family's portion. " +
                        "But there is nothing wrong with resting so you can really enjoy your first Feast.", getAfterNap()))
                ]))
            ]), true),
            new MyGame.TextEncounter(new MyGame.TextPrompt("You should really get into town now.", [
                new MyGame.TextOption("Okay Grandpa")
            ]))
        ]);
    }
    MyGame.getGrandpaText = getGrandpaText;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    function getStanleyText() {
        function getInstruction() {
            return new MyGame.TextPrompt("Well, it seems like to get it to cook evenly, you have to press the buttons that it says on the screen in tempo. "
                + "But the crazy thing is you have to press them in the reverse order of how it displays them. Do you think you can handle that?", [
                new MyGame.TextOption("Sure!", new MyGame.TextDump("Okay, go for it.")),
                new MyGame.TextOption("I dunno...", new MyGame.TextDump("Alright, think about it, but please come back soon."))
            ]);
        }
        function getOven() {
            return new MyGame.TextPrompt("Meanwhile, I've been stuck here cooking without you. Mom has even been making snarky comments about how I could stand to learn to cook by myself." +
                " Anyways I'm actually doing pretty good with this Blish and Blerry pie, but I can't figure out how to work the oven.", [
                new MyGame.TextOption("Too bad", new MyGame.TextDump("You know what? I hate you too. Goodbye.")),
                new MyGame.TextOption("Let me try", getInstruction())
            ]);
        }
        function startOven(main, parent, result) {
            if (result === "Okay, go for it.") {
                var enemy = new MyGame.OvenEncounter(main);
                enemy.startBattle(main);
            }
        }
        function giveGrodule(main, parent, result) {
            var stanley = parent;
            stanley.setSpeed(1000);
            stanley.doScript("du", MyGame.pof(18 + main.island.paddingOffset.x, 4 + main.island.paddingOffset.y), true);
            main.addItem(17 + main.island.paddingOffset.x, 2 + main.island.paddingOffset.y, MyGame.Assets.Sprites.Grodule.key);
        }
        function decision(lastViewed, main, parent, lastResult) {
            if (lastViewed === -1) {
                return 0;
            }
            if (lastViewed === 0 || lastViewed === 1 || lastViewed === 2) {
                if (MyGame.StateTransfer.getInstance().reason === MyGame.TransferReason.VICTORY) {
                    return 3;
                }
                switch (lastResult) {
                    case "Arrrgggghhh!!!":
                    case "You know what? I hate you too. Goodbye.":
                        return 1;
                    case "soon.":
                    case "comes.":
                        return 2;
                    case "Okay, go for it.":
                        return 3;
                    default:
                        return lastViewed;
                }
            }
            if (lastViewed === 3) {
                return 4;
            }
            return lastViewed;
        }
        return new MyGame.TextManager([
            new MyGame.TextEncounter(new MyGame.TextPrompt("Hi Rosie. I see you could finally be bothered to come home.", [
                new MyGame.TextOption("I was busy", new MyGame.TextPrompt("I don't want to hear your excuses because I know you can only say like three words a time.", [
                    new MyGame.TextOption("That makes sense", getOven())
                ])),
                new MyGame.TextOption("Whatever", getOven()),
                new MyGame.TextOption("Sorry, Stanley", new MyGame.TextPrompt("I don't want to hear your excuses because I know you can only say like three words a time.", [
                    new MyGame.TextOption("That makes sense", getOven())
                ]))
            ]), false, startOven),
            new MyGame.TextEncounter(new MyGame.TextPrompt("Hmm. Looks like you've come crawling back after having some fun on the town. Ready to help me with the oven?", [
                new MyGame.TextOption("Soon, I promise.", new MyGame.TextDump("Please, it has to be ready before the first Beast comes.")),
                new MyGame.TextOption("Yup.", getInstruction()),
                new MyGame.TextOption("Hahaha... No.", new MyGame.TextDump("Arrrgggghhh!!!"))
            ]), false, startOven),
            new MyGame.TextEncounter(new MyGame.TextPrompt("Do you think you can help me with this? I still can't quite get it.", [
                new MyGame.TextOption("Soon, I promise.", new MyGame.TextDump("Please, it has to be ready before the first Beast comes.")),
                new MyGame.TextOption("Yup.", getInstruction()),
                new MyGame.TextOption("Hahaha... No.", new MyGame.TextDump("Arrrgggghhh!!!"))
            ]), false, startOven),
            new MyGame.TextEncounter(new MyGame.TextDump("Wow, thanks Rosie! The pie should be ready in about an hour. Oh, by the way, I found this thing lying around the toofball field. You can take it if you want it."), true, giveGrodule),
            new MyGame.TextEncounter(new MyGame.TextDump("I can smell it already. MMmm... Blish and Blerry..."))
        ], decision);
    }
    MyGame.getStanleyText = getStanleyText;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    function getTheMeepText() {
        function onFinish(main, parent) {
            main.player.position.setTo(MyGame.TILE_WIDTH, MyGame.TILE_HEIGHT);
            main.add.tween(main.player).from({ tint: 0xff0000 }, 1000, Phaser.Easing.Linear.None, true);
        }
        return new MyGame.TextManager([new MyGame.TextEncounter(new MyGame.TextDump("Grr...", new MyGame.TextDump("..rrrRRRrrr...")), true, onFinish)]);
    }
    MyGame.getTheMeepText = getTheMeepText;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var BottomTextDisplay = (function () {
        function BottomTextDisplay(game, parent) {
            this.spriteHeight = 80;
            this.fontStyle = { font: "14px okeydokey", fill: "#000000" };
            this.game = game;
            this.parent = parent;
            this.name = name;
        }
        BottomTextDisplay.prototype.scrollPage = function (direction) {
            switch (direction) {
                case MyGame.Direction.Up:
                    this.scrollUp();
                    break;
                case MyGame.Direction.Down:
                    this.scrollDown();
                    break;
                case MyGame.Direction.Right:
                    this.scrollRight();
                    break;
                case MyGame.Direction.Left:
                    this.scrollLeft();
            }
        };
        BottomTextDisplay.prototype.scrollUp = function () {
            if (this.upArrow.visible) {
                this.pageNumber -= 1;
                this.text.text = this.textEncounter.getCurrentPage().text[this.pageNumber];
                this.setDownArrowFrame(true);
                this.upArrow.visible = this.pageNumber > 0;
            }
        };
        BottomTextDisplay.prototype.scrollDown = function () {
            if (this.downArrow.frame === MyGame.Frames.Arrow.DOWN) {
                this.pageNumber += 1;
                this.text.text = this.textEncounter.getCurrentPage().text[this.pageNumber];
                this.upArrow.visible = true;
                this.setDownArrowFrame(this.pageNumber < this.textEncounter.getCurrentPage().text.length - 1);
                this.currentRead = this.downArrow.frame === MyGame.Frames.Arrow.O;
                if (this.currentRead && this.optionsDisplay.getCurrentOption() !== -1) {
                    this.optionsDisplay.show();
                }
            }
        };
        BottomTextDisplay.prototype.scrollRight = function () {
            this.optionsDisplay.scrollRight();
        };
        BottomTextDisplay.prototype.scrollLeft = function () {
            this.optionsDisplay.scrollLeft();
        };
        BottomTextDisplay.prototype.makeChoice = function () {
            if (!this.currentRead) {
                return;
            }
            var next = this.textEncounter.getResponse(this.optionsDisplay.getCurrentOption());
            if (!next) {
                this.textBackground.destroy();
                this.text.destroy();
                var result = this.optionsDisplay.isVisible() ? this.optionsDisplay.getCurrentText() : this.text.text;
                this.optionsDisplay.destroy();
                if (this.downArrow)
                    this.downArrow.destroy();
                if (this.upArrow)
                    this.upArrow.destroy();
                this.game.unstopPlayer();
                this.textEncounter.lastResult = result;
                this.textEncounter.onFinish(this.game, this.parent, result);
                this.textEncounter.reset();
                this.game.inputs.O.onUp.remove(this.addOnDownListener, this);
                this.game.inputs.O.onDown.remove(this.makeChoice, this);
                this.game.inputs.down.onDown.remove(this.scrollDown, this);
                this.game.inputs.up.onDown.remove(this.scrollUp, this);
                this.game.inputs.O.onUp.addOnce(function () { this.isDisplaying = false; }, this);
                return;
            }
            if (!next.hasOptions) {
                this.optionsDisplay.setOptions(null);
                this.optionsDisplay.hide();
                this.game.inputs.right.onDown.remove(this.scrollRight, this);
                this.game.inputs.left.onDown.remove(this.scrollLeft, this);
                this.text.text = next.text[0];
                this.pageNumber = 0;
                this.upArrow.visible = false;
                this.setDownArrowFrame(this.textEncounter.getCurrentPage().text.length > 1);
                this.currentRead = this.downArrow.frame === MyGame.Frames.Arrow.O;
                this.game.inputs.O.onUp.add(this.addOnDownListener, this);
                return;
            }
            var nextPrompt = next;
            this.optionsDisplay.setOptions(nextPrompt.options);
            this.optionsDisplay.hide();
            this.pageNumber = 0;
            this.text.text = next.text[0];
            this.upArrow.visible = false;
            this.setDownArrowFrame(nextPrompt.text.length > 1);
            this.currentRead = this.downArrow.frame === MyGame.Frames.Arrow.O;
            this.game.inputs.left.onDown.add(this.scrollLeft, this);
            this.game.inputs.right.onDown.add(this.scrollRight, this);
            this.game.inputs.O.onUp.add(this.addOnDownListener, this);
        };
        BottomTextDisplay.prototype.addOnDownListener = function () {
            this.game.inputs.O.onDown.add(this.makeChoice, this);
        };
        BottomTextDisplay.prototype.start = function (textEncounter) {
            if (this.isDisplaying) {
                return;
            }
            this.textEncounter = textEncounter;
            this.game.stopPlayer();
            this.textBackground = this.game.add.image(0, 0, MyGame.Assets.Images.BottomTextBackground);
            this.upArrow = this.game.add.image(MyGame.SCREEN_WIDTH - 22, 8, MyGame.Assets.Sprites.Arrow.key, MyGame.Frames.Arrow.UP);
            this.textBackground.fixedToCamera = true;
            this.upArrow.visible = false;
            this.downArrow = this.game.add.image(MyGame.SCREEN_WIDTH - 22, this.textBackground.height - 20, MyGame.Assets.Sprites.Arrow.key);
            this.setDownArrowFrame(this.textEncounter.getCurrentPage().text.length > 1);
            this.currentRead = this.downArrow.frame === MyGame.Frames.Arrow.O;
            this.upArrow.fixedToCamera = true;
            this.downArrow.fixedToCamera = true;
            this.text = this.game.add.bitmapText(8, this.textBackground.y + 8, MyGame.Assets.FontName, this.textEncounter.getCurrentPage().text[0], 14);
            this.text.maxWidth = MyGame.SCREEN_WIDTH - 24;
            this.text.fixedToCamera = true;
            this.pageNumber = 0;
            this.isDisplaying = true;
            this.game.inputs.down.onDown.add(this.scrollDown, this);
            this.game.inputs.up.onDown.add(this.scrollUp, this);
            this.optionsDisplay = new OptionsDisplay(this.game, this.textBackground.height);
            this.game.inputs.O.onDown.add(this.makeChoice, this);
            if (this.textEncounter.getCurrentPage().hasOptions) {
                var textPrompt = this.textEncounter.getCurrentPage();
                this.optionsDisplay.setOptions(textPrompt.options);
                this.game.inputs.left.onDown.add(this.scrollLeft, this);
                this.game.inputs.right.onDown.add(this.scrollRight, this);
            }
            else {
                this.optionsDisplay.setOptions(null);
            }
            this.optionsDisplay.hide();
        };
        BottomTextDisplay.prototype.setDownArrowFrame = function (showDownArrow) {
            this.downArrow.frame = showDownArrow ? MyGame.Frames.Arrow.DOWN : MyGame.Frames.Arrow.O;
        };
        return BottomTextDisplay;
    }());
    MyGame.BottomTextDisplay = BottomTextDisplay;
    var OptionsDisplay = (function () {
        function OptionsDisplay(main, baseY) {
            this.main = main;
            this.background = this.main.add.image(0, baseY, MyGame.Assets.Images.OptionsBackground);
            this.background.fixedToCamera = true;
            this.leftArrow = this.main.add.image(6, baseY + 12, MyGame.Assets.Sprites.Arrow.key, MyGame.Frames.Arrow.LEFT);
            this.leftArrow.fixedToCamera = true;
            this.rightArrow = this.main.add.image(MyGame.SCREEN_WIDTH - 18, baseY + 12, MyGame.Assets.Sprites.Arrow.key, MyGame.Frames.Arrow.RIGHT);
            this.rightArrow.fixedToCamera = true;
            this.text = this.main.add.bitmapText(18, baseY + 8, MyGame.Assets.FontName, "", 14);
            this.text.fixedToCamera = true;
            this.displayGroup = main.add.group();
            this.displayGroup.addMultiple([this.background, this.leftArrow, this.rightArrow, this.text]);
            this.options = [];
            this.currentOption = -1;
            this.showing = true;
            this.hide();
        }
        OptionsDisplay.prototype.setOptions = function (options) {
            this.options = options;
            if (MyGame.Utils.isAThing(options)) {
                this.currentOption = 0;
                this.text.text = options[0].text;
            }
            else {
                this.currentOption = -1;
            }
        };
        OptionsDisplay.prototype.show = function () {
            if (this.showing)
                return;
            if (!MyGame.Utils.isAThing(this.options) || this.currentOption === -1) {
                throw new Error("Cannot show display with no options.");
            }
            this.displayGroup.visible = true;
            this.text.text = this.options[this.currentOption].text;
            this.setArrowVisibility();
            this.bringToTop();
            this.showing = true;
        };
        OptionsDisplay.prototype.hide = function () {
            if (!this.showing)
                return;
            this.displayGroup.visible = false;
            this.showing = false;
        };
        OptionsDisplay.prototype.bringToTop = function () {
            this.main.world.bringToTop(this.displayGroup);
            this.displayGroup.bringToTop(this.text);
            this.displayGroup.bringToTop(this.leftArrow);
            this.displayGroup.bringToTop(this.rightArrow);
        };
        OptionsDisplay.prototype.scrollRight = function () {
            if (this.rightArrow.visible) {
                this.currentOption += 1;
                this.text.text = this.options[this.currentOption].text;
                this.setArrowVisibility();
            }
        };
        OptionsDisplay.prototype.scrollLeft = function () {
            if (this.leftArrow.visible) {
                this.currentOption -= 1;
                this.text.text = this.options[this.currentOption].text;
                this.setArrowVisibility();
            }
        };
        OptionsDisplay.prototype.getCurrentOption = function () {
            return this.currentOption;
        };
        OptionsDisplay.prototype.getCurrentText = function () {
            return this.options[this.currentOption].text;
        };
        OptionsDisplay.prototype.isVisible = function () {
            return this.showing;
        };
        OptionsDisplay.prototype.destroy = function () {
            this.displayGroup.destroy();
        };
        OptionsDisplay.prototype.setArrowVisibility = function () {
            this.leftArrow.visible = this.currentOption !== 0;
            this.rightArrow.visible = this.currentOption !== this.options.length - 1;
        };
        return OptionsDisplay;
    }());
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var WIDTH = 56;
    var PADDING = 4;
    var TEXT_PADDING = 6;
    var HoldableDisplay = (function () {
        function HoldableDisplay(main, iconKey, startingCount) {
            if (startingCount === void 0) { startingCount = 0; }
            this.main = main;
            this.background = main.add.image(MyGame.SCREEN_WIDTH - WIDTH - PADDING, PADDING, MyGame.Assets.Images.ProjectileDisplay);
            this.text = main.add.bitmapText(this.background.x + TEXT_PADDING, this.background.y + TEXT_PADDING, MyGame.Assets.FontName, startingCount.toString(), MyGame.Assets.FontSize);
            this.icon = this.main.add.image(this.background.x + (WIDTH / 2) + TEXT_PADDING, this.background.y + TEXT_PADDING, iconKey);
            this.background.fixedToCamera = true;
            this.text.fixedToCamera = true;
            this.icon.fixedToCamera = true;
            this.displayGroup = main.add.group();
            this.displayGroup.addMultiple([this.background, this.icon, this.text]);
            this.updateCount(startingCount);
            this.showing = true;
            this.hide();
        }
        HoldableDisplay.prototype.updateCount = function (num) {
            this.text.text = num.toString();
            this.text.x = this.background.x + 28 - (this.text.width / 2);
            this.text.y = this.background.y + 28 - (this.text.height / 2);
            if (num === 0) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        HoldableDisplay.prototype.updateIcon = function (key) {
            if (this.icon && this.icon.key !== key) {
                this.icon.loadTexture(key);
            }
        };
        HoldableDisplay.prototype.bringToTop = function () {
            this.main.world.bringToTop(this.displayGroup);
            this.displayGroup.bringToTop(this.icon);
            this.displayGroup.bringToTop(this.text);
        };
        HoldableDisplay.prototype.hide = function () {
            if (!this.showing)
                return;
            this.displayGroup.visible = false;
            this.showing = false;
        };
        HoldableDisplay.prototype.show = function () {
            if (this.showing)
                return;
            this.displayGroup.visible = true;
            this.showing = true;
        };
        return HoldableDisplay;
    }());
    MyGame.HoldableDisplay = HoldableDisplay;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var OPTION_SPACING = 40;
    var LEFT_INDENT = 12;
    var TOP_PADDING = 30;
    var POINTER_PADDING = 2;
    var LEFT_PADDING = 20;
    var Option = (function () {
        function Option() {
        }
        return Option;
    }());
    var PauseMenu = (function () {
        function PauseMenu(main) {
            this.main = main;
            this.background = this.main.add.image(main.camera.x, main.camera.y, MyGame.Assets.Images.MenuBackground);
            this.background.fixedToCamera = true;
            this.pointer = this.main.add.image(LEFT_PADDING, 0, MyGame.Assets.Sprites.Arrow.key);
            this.pointer.frame = 2;
            this.options = [
                {
                    text: "Save",
                    options: null
                },
                {
                    text: "Exit",
                    options: null
                }
            ];
            this.texts = [];
            this.displayOptions(this.options);
            this.infoText = this.main.add.bitmapText(0, this.main.camera.y + MyGame.SCREEN_HEIGHT - 38, MyGame.Assets.FontName, "", 14);
        }
        PauseMenu.prototype.changeSelection = function (key) {
            this.infoText.text = "";
            switch (key.keyCode) {
                case Phaser.KeyCode.W:
                    if (this.cursor !== 0) {
                        this.texts[this.cursor].x -= LEFT_INDENT;
                        this.cursor -= 1;
                        this.texts[this.cursor].x += LEFT_INDENT;
                        this.pointer.y = OPTION_SPACING * this.cursor + TOP_PADDING + POINTER_PADDING;
                    }
                    break;
                case Phaser.KeyCode.S:
                    if (this.cursor !== this.texts.length - 1) {
                        this.texts[this.cursor].x -= LEFT_INDENT;
                        this.cursor += 1;
                        this.texts[this.cursor].x += LEFT_INDENT;
                        this.pointer.y = OPTION_SPACING * this.cursor + TOP_PADDING + POINTER_PADDING;
                    }
            }
        };
        PauseMenu.prototype.select = function () {
            switch (this.options[this.cursor].text) {
                case "Exit":
                    this.exit();
                    this.main.game.paused = false;
                    break;
                case "Save":
                    this.showInfo("Saving game...");
                    this.main.saveGame();
                    this.showInfo("Game saved");
                    break;
            }
        };
        PauseMenu.prototype.goBack = function () { };
        PauseMenu.prototype.exit = function () {
            this.background.destroy();
            this.pointer.destroy();
            this.texts.forEach(function (t) { return t.destroy(); });
            this.infoText.text = "";
            this.main.inputs.down.onDown.remove(this.changeSelection, this);
            this.main.inputs.up.onDown.remove(this.changeSelection, this);
            this.main.inputs.O.onDown.remove(this.select, this);
        };
        PauseMenu.prototype.displayOptions = function (options) {
            this.texts.forEach(function (t) { return t.destroy(); });
            for (var i = 0; i < options.length; i++) {
                this.texts.push(this.main.add.bitmapText(LEFT_PADDING, OPTION_SPACING * i + TOP_PADDING, MyGame.Assets.FontName, options[i].text, 14));
                this.texts[i].position.add(this.main.camera.x, this.main.camera.y);
            }
            this.texts[0].x += LEFT_INDENT;
            this.pointer.y = TOP_PADDING;
            this.cursor = 0;
        };
        PauseMenu.prototype.showInfo = function (text) {
            this.infoText.text = text;
            this.infoText.x = this.main.camera.x + (MyGame.SCREEN_WIDTH - this.infoText.width) / 2;
        };
        return PauseMenu;
    }());
    MyGame.PauseMenu = PauseMenu;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Enemy = (function () {
        function Enemy() {
        }
        Enemy.prototype.startBattle = function (main) {
            var stateTransfer = MyGame.StateTransfer.getInstance();
            stateTransfer.island = main.island.num;
            stateTransfer.enemy = this;
            stateTransfer.dialogs = MyGame.WorldManager.getInstance().exportDialogs();
            stateTransfer.triggers = main.triggers.filter(function (t) { return !t.active; })
                .map(function (t) { return new MyGame.Location(main.island.num, t.x, t.y); });
            main.groups.npcs.filter(function (n) { return n.hasSaveInfo(); }).forEach(function (n) {
                var info = n.unloadSaveInfo();
                var matches = stateTransfer.npcs.filter(function (t) { return t.old.equals(info.old); });
                if (matches.length > 0) {
                    var match = matches[0];
                    match.now = info.now;
                    match.script = info.script;
                    match.speed = info.speed;
                }
                else {
                    stateTransfer.npcs.push(info);
                }
            });
            stateTransfer.health = main.player.health;
            main.stopPlayer();
            MyGame.Utils.fadeToBlack(main, 500, MyGame.States.Battle);
        };
        return Enemy;
    }());
    MyGame.Enemy = Enemy;
    var AdhocEncounter = (function (_super) {
        __extends(AdhocEncounter, _super);
        function AdhocEncounter() {
            var _this = _super.call(this) || this;
            _this.worldSpriteKey = null;
            _this.worldSprite = null;
            _this.movementManager = null;
            return _this;
        }
        return AdhocEncounter;
    }(Enemy));
    var OvenEncounter = (function (_super) {
        __extends(OvenEncounter, _super);
        function OvenEncounter(main) {
            var _this = _super.call(this) || this;
            _this.name = "Oven";
            _this.battleSpriteKey = MyGame.Assets.Images.OvenBattle;
            _this.minNumNotes = 4;
            _this.maxNumNotes = 6;
            _this.patternLength = 9;
            _this.beatLength = 3;
            _this.tempo = 140;
            _this.hitPoints = 300;
            _this.health = 300;
            _this.main = main;
            _this.transferPosition = MyGame.pof(17, 5);
            return _this;
        }
        OvenEncounter.prototype.calculateDamage = function (pattern, notePresses) {
            if (pattern.length !== notePresses.length) {
                return 0;
            }
            var sortedPattern = pattern.sort(function (a, b) { return a.position - b.position; });
            var sortedPresses = notePresses.sort(function (a, b) { return b.position - a.position; });
            var damage = 0;
            for (var i = 0; i < sortedPattern.length; i++) {
                if (sortedPattern[i].key !== sortedPresses[i].note) {
                    return 0;
                }
                damage += Math.round((500 - sortedPresses[i].distance) / 33);
            }
            return damage;
        };
        OvenEncounter.prototype.getAttackPoints = function (pattern) {
            return Math.floor((pattern.length * 25) / 2);
        };
        OvenEncounter.prototype.noteComparer = function (pattern, pressed, pressedCount) {
            var noNulls = pattern.filter(function (p) { return MyGame.Utils.isAThing(p); });
            if (pressedCount > noNulls.length) {
                return false;
            }
            return noNulls[noNulls.length - 1 - pressedCount] === pressed;
        };
        OvenEncounter.prototype.die = function () {
            this.alive = false;
        };
        return OvenEncounter;
    }(AdhocEncounter));
    MyGame.OvenEncounter = OvenEncounter;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Jammer = (function (_super) {
        __extends(Jammer, _super);
        function Jammer(main, position, movementScript, hitPoints, worldSprite) {
            var _this = _super.call(this) || this;
            _this.hitPoints = 100;
            _this.noteComparer = null;
            _this.alive = true;
            _this.main = main;
            _this.position = position;
            _this.health = hitPoints;
            _this.worldSprite = _this.main.add.sprite(position.x * MyGame.TILE_WIDTH, position.y * MyGame.TILE_HEIGHT, worldSprite);
            _this.worldSprite.anchor.setTo(0.5, 0.5);
            _this.main.physics.arcade.enable(_this.worldSprite);
            _this.worldSprite.animations.add("walk", MyGame.Utils.animationArray(0, 7), 5, true);
            _this.worldSprite.play("walk");
            _this.sprite = _this.worldSprite;
            _this.movementManager = new MyGame.MovementManager(_this.main.game, movementScript, _this);
            return _this;
        }
        Jammer.prototype.onStageBuilt = function () {
            this.movementManager.start();
        };
        Jammer.prototype.getAttackPoints = function (pattern) {
            return Math.floor((pattern.length * 25) / 2);
        };
        Jammer.prototype.playerOverlap = function (sp, pl) {
            this.startBattle(this.main);
        };
        Jammer.prototype.update = function () {
            if (!this.alive) {
                return;
            }
            this.movementManager.playNext();
            this.main.physics.arcade.overlap(this.worldSprite, this.main.player, this.playerOverlap, null, this);
            if (MyGame.Utils.isAThing(this.specificUpdate)) {
                this.specificUpdate();
            }
        };
        Jammer.prototype.die = function () {
            this.alive = false;
            MyGame.WorldManager.getInstance().changeLayout(MyGame.StateTransfer.getInstance().island, this.position, "J");
        };
        return Jammer;
    }(MyGame.Enemy));
    var JamBot = (function (_super) {
        __extends(JamBot, _super);
        function JamBot(main, position, movementScript) {
            var _this = _super.call(this, main, position, movementScript, 100, MyGame.Assets.Sprites.JamBotWorld.key) || this;
            _this.battleSpriteKey = MyGame.Assets.Images.JamBotBattle;
            _this.name = "JamBot";
            _this.minNumNotes = 4;
            _this.maxNumNotes = 4;
            _this.patternLength = 8;
            _this.beatLength = 2;
            _this.tempo = 125;
            _this.worldSpriteKey = MyGame.Assets.Sprites.JamBotWorld.key;
            _this.hitPoints = 100;
            _this.speed = 1000;
            _this.calculateDamage = function (pattern, notePresses) {
                if (pattern.length !== notePresses.length) {
                    return 0;
                }
                var sortedPattern = pattern.sort(function (a, b) { return a.position - b.position; });
                var sortedPresses = notePresses.sort(function (a, b) { return a.position - b.position; });
                var damage = 0;
                for (var i = 0; i < sortedPattern.length; i++) {
                    if (sortedPattern[i].key !== sortedPresses[i].note) {
                        return 0;
                    }
                    var amount = Math.max(Math.round((500 - sortedPresses[i].distance) / 60), 0);
                    if (sortedPattern[i].position === sortedPresses[i].position) {
                        amount = Math.floor(amount * 2);
                    }
                    damage += amount;
                }
                return damage;
            };
            return _this;
        }
        return JamBot;
    }(Jammer));
    MyGame.JamBot = JamBot;
    var JamBug = (function (_super) {
        __extends(JamBug, _super);
        function JamBug(main, position, movementScript) {
            var _this = _super.call(this, main, position, movementScript, 100, MyGame.Assets.Sprites.JamBugWorld.key) || this;
            _this.battleSpriteKey = MyGame.Assets.Images.JamBotBattle;
            _this.name = "JamBug";
            _this.minNumNotes = 4;
            _this.maxNumNotes = 6;
            _this.patternLength = 8;
            _this.beatLength = 2;
            _this.tempo = 150;
            _this.worldSpriteKey = MyGame.Assets.Sprites.JamBugWorld.key;
            _this.hitPoints = 100;
            _this.speed = 500;
            _this.specificUpdate = function () {
                if (_this.direction === MyGame.Direction.Up && _this.sprite.rotation !== Math.PI) {
                    _this.sprite.rotation = Math.PI;
                }
                else if (_this.direction === MyGame.Direction.Down && _this.sprite.rotation !== 0) {
                    _this.sprite.rotation = 0;
                }
                else if (_this.direction === MyGame.Direction.Right && _this.sprite.rotation !== Math.PI * 1.5) {
                    _this.sprite.rotation = Math.PI * 1.5;
                }
                else if (_this.direction === MyGame.Direction.Left && _this.sprite.rotation !== Math.PI * 0.5) {
                    _this.sprite.rotation = Math.PI * 0.5;
                }
            };
            _this.calculateDamage = function (pattern, notePresses) {
                if (pattern.length !== notePresses.length) {
                    return 0;
                }
                var sortedPattern = pattern.sort(function (a, b) { return a.position - b.position; });
                var sortedPresses = notePresses.sort(function (a, b) { return a.position - b.position; });
                var damage = 0;
                for (var i = 0; i < sortedPattern.length; i++) {
                    if (sortedPattern[i].key !== sortedPresses[i].note || sortedPattern[i].position !== sortedPresses[i].position) {
                        return 0;
                    }
                    damage += Math.round((500 - sortedPresses[i].distance) / 33);
                }
                return damage;
            };
            return _this;
        }
        return JamBug;
    }(Jammer));
    MyGame.JamBug = JamBug;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var MovementScript = (function () {
        function MovementScript(start, directions, loop, triggerName) {
            if (loop === void 0) { loop = true; }
            this.start = start;
            this.directions = directions;
            this.loop = loop;
            this.triggerName = triggerName;
        }
        return MovementScript;
    }());
    MyGame.MovementScript = MovementScript;
    var MovementManager = (function () {
        function MovementManager(game, script, obj) {
            this.game = game;
            this.script = script;
            this.obj = obj;
            this.sprite = obj.sprite;
            this.readyForNext = false;
            this.paused = false;
            this.triggerName = script.triggerName;
            this.hasTrigger = this.triggerName && this.triggerName !== "";
            this.currentNum = -1;
            this.interruptable = true;
        }
        MovementManager.prototype.start = function (resetToOriginalPosition) {
            if (resetToOriginalPosition === void 0) { resetToOriginalPosition = false; }
            if (resetToOriginalPosition) {
                this.sprite.position.setTo(this.script.start.x * MyGame.TILE_WIDTH, this.script.start.y * MyGame.TILE_HEIGHT);
                if (this.sprite.body) {
                    this.sprite.body.position.setTo(this.script.start.x * MyGame.TILE_WIDTH, this.script.start.y * MyGame.TILE_HEIGHT);
                }
            }
            var destinations = [];
            for (var i = 0; i < this.script.directions.length; i++) {
                var lastPosition = i === 0 ? this.sprite.position : destinations[i - 1];
                switch (this.script.directions[i]) {
                    case null:
                        destinations.push(MyGame.pof(lastPosition.x, lastPosition.y));
                        break;
                    case MyGame.Direction.Left:
                        destinations.push(MyGame.pof(lastPosition.x - MyGame.TILE_WIDTH, lastPosition.y));
                        break;
                    case MyGame.Direction.Right:
                        destinations.push(MyGame.pof(lastPosition.x + MyGame.TILE_WIDTH, lastPosition.y));
                        break;
                    case MyGame.Direction.Up:
                        destinations.push(MyGame.pof(lastPosition.x, lastPosition.y - MyGame.TILE_HEIGHT));
                        break;
                    case MyGame.Direction.Down:
                        destinations.push(MyGame.pof(lastPosition.x, lastPosition.y + MyGame.TILE_HEIGHT));
                        break;
                }
            }
            this.destinations = destinations;
            this.currentNum = 0;
            this.playNext(true);
        };
        MovementManager.prototype.playNext = function (overrideCurrentTween) {
            if (overrideCurrentTween === void 0) { overrideCurrentTween = false; }
            if (!overrideCurrentTween && !this.readyForNext) {
                return;
            }
            this.readyForNext = false;
            if (this.currentNum === this.destinations.length) {
                this.currentNum = 0;
                if (!this.script.loop) {
                    this.currentNum = -1;
                    this.interruptable = true;
                    if (this.onComplete) {
                        this.onComplete.call(this.onCompleteContext, this.onCompleteArgs);
                    }
                    return;
                }
            }
            this.obj.direction = MyGame.Utils.isAThing(this.script.directions[this.currentNum]) ? this.script.directions[this.currentNum] : this.obj.direction;
            var nextDest = this.destinations[this.currentNum];
            var speed = MyGame.isVertical(this.script.directions[this.currentNum]) ? this.obj.speed * (MyGame.TILE_WIDTH / MyGame.TILE_HEIGHT) : this.obj.speed;
            this.currentTween = this.game.add.tween(this.sprite.body.position).to({ x: nextDest.x, y: nextDest.y }, speed, Phaser.Easing.Linear.None, true);
            this.currentTween.onComplete.add(this.onTweenComplete, this);
        };
        MovementManager.prototype.setOnComplete = function (onComplete, onCompleteContext) {
            var onCompletArgs = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                onCompletArgs[_i - 2] = arguments[_i];
            }
            this.onComplete = onComplete;
            this.onCompleteContext = onCompleteContext;
            this.onCompleteArgs = onCompletArgs;
        };
        MovementManager.prototype.onTweenComplete = function () {
            this.readyForNext = true;
            this.currentNum++;
            this.playNext(true);
        };
        MovementManager.prototype.pause = function () {
            if (this.paused || this.currentNum === -1) {
                return;
            }
            this.currentTween.pause();
            this.paused = true;
        };
        MovementManager.prototype.resume = function () {
            if (!this.paused || this.currentNum === -1) {
                return;
            }
            this.obj.direction = MyGame.Utils.isAThing(this.script.directions[this.currentNum]) ? this.script.directions[this.currentNum] : this.obj.direction;
            this.currentTween.resume();
            this.paused = false;
        };
        MovementManager.prototype.currentlyStationary = function () {
            return this.currentNum === -1 || this.script.directions[this.currentNum] === null;
        };
        return MovementManager;
    }());
    MyGame.MovementManager = MovementManager;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Barrier = (function () {
        function Barrier(main, position, key, char, playerCollides) {
            if (playerCollides === void 0) { playerCollides = true; }
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * MyGame.TILE_WIDTH, position.y * MyGame.TILE_HEIGHT, key);
            if (!MyGame.Utils.surroundedByChar(main.island.layout, position.x, position.y, char)) {
                main.physics.arcade.enable(this.sprite);
                this.sprite.body.moves = false;
                this.sprite.body.immovable = true;
                this.hasBody = true;
            }
            else {
                this.hasBody = false;
            }
            this.playerCollides = playerCollides;
            this.island = main.island.num;
        }
        return Barrier;
    }());
    MyGame.Barrier = Barrier;
    var Blackness = (function (_super) {
        __extends(Blackness, _super);
        function Blackness(main, position) {
            return _super.call(this, main, position, MyGame.Assets.Sprites.Blackness.key, "b") || this;
        }
        return Blackness;
    }(Barrier));
    MyGame.Blackness = Blackness;
    var Water = (function (_super) {
        __extends(Water, _super);
        function Water(main, position) {
            var _this = _super.call(this, main, position, MyGame.Assets.Sprites.Water.key, "o") || this;
            _this.sprite.animations.add("wave", MyGame.Utils.animationArray(0, 4), 2, true);
            _this.sprite.play("wave");
            return _this;
        }
        return Water;
    }(Barrier));
    MyGame.Water = Water;
    var StoneWall = (function (_super) {
        __extends(StoneWall, _super);
        function StoneWall(main, position, neighborhood) {
            var _this = _super.call(this, main, position, MyGame.Assets.Sprites.StoneWall.key, "w") || this;
            var frameString = "";
            frameString += neighborhood.above === "w" ? "w" : "n";
            frameString += neighborhood.left === "w" ? "w" : "n";
            frameString += neighborhood.right === "w" ? "w" : "n";
            frameString += neighborhood.below === "w" ? "w" : "n";
            _this.sprite.frame = StoneWall.frames.indexOf(frameString);
            return _this;
        }
        StoneWall.frames = [
            "wnnw", "nnnw", "wnnn", "nnnn",
            "nnwn", "nwnn", "nwwn", "nnww",
            "nwnw", "wnwn", "wwnn", "nnnw",
            "wwnw", "wnww", "nwww", "wwww"
        ];
        return StoneWall;
    }(Barrier));
    MyGame.StoneWall = StoneWall;
    var Tree = (function (_super) {
        __extends(Tree, _super);
        function Tree(main, position) {
            var _this = _super.call(this, main, position, MyGame.Assets.Sprites.Tree.key, "t") || this;
            _this.sprite.body.setSize(MyGame.Assets.Sprites.Tree.width, MyGame.Assets.Sprites.Tree.height * 0.5, 0, MyGame.Assets.Sprites.Tree.height * 0.5);
            return _this;
        }
        return Tree;
    }(Barrier));
    MyGame.Tree = Tree;
    var Bush = (function (_super) {
        __extends(Bush, _super);
        function Bush(main, position) {
            var _this = _super.call(this, main, position, MyGame.Assets.Sprites.Bush.key, "*") || this;
            var row = main.island.layout[position.y];
            var connectLeft = position.x === 0 || row[position.x - 1] === "*";
            var connectRight = position.x === row.length - 1 || row[position.x + 1] === "*";
            if (connectLeft) {
                if (connectRight) {
                    _this.sprite.frame = 2;
                }
                else {
                    _this.sprite.frame = 3;
                }
            }
            else if (connectRight) {
                _this.sprite.frame = 1;
            }
            else {
                _this.sprite.frame = 0;
            }
            return _this;
        }
        return Bush;
    }(Barrier));
    MyGame.Bush = Bush;
    var Gate = (function (_super) {
        __extends(Gate, _super);
        function Gate(main, position) {
            return _super.call(this, main, position, MyGame.Assets.Images.Gate, "g") || this;
        }
        return Gate;
    }(Barrier));
    MyGame.Gate = Gate;
    var Lillypad = (function (_super) {
        __extends(Lillypad, _super);
        function Lillypad(main, position) {
            return _super.call(this, main, position, MyGame.Assets.Images.Lillypad, "p", false) || this;
        }
        return Lillypad;
    }(Barrier));
    MyGame.Lillypad = Lillypad;
    var CustomBarrier = (function (_super) {
        __extends(CustomBarrier, _super);
        function CustomBarrier(main, position, spriteKey, playerCollides) {
            return _super.call(this, main, position, spriteKey, "x", playerCollides) || this;
        }
        return CustomBarrier;
    }(Barrier));
    MyGame.CustomBarrier = CustomBarrier;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var ButtonPrompt = (function () {
        function ButtonPrompt(parent, input, leftOffset) {
            if (leftOffset === void 0) { leftOffset = 0; }
            this.PADDING = 6;
            this.parent = parent;
            this.bubbleImage = parent.main.add.image(0, 0, MyGame.Assets.Images.ButtonPrompt);
            this.sprite = this.bubbleImage;
            var parentPosition = parent.position.clone().multiply(MyGame.TILE_WIDTH, MyGame.TILE_HEIGHT);
            this.input = input;
            this.buttonImage = parent.main.add.image(0, 0, MyGame.Assets.Sprites.RhythmSymbols.key);
            this.buttonImage.frame = MyGame.NoteDisplay.getKeyFrame(input.keyCode);
            this.position = new Phaser.Point(0, 0);
            this.reposition(parentPosition.x, parentPosition.y, leftOffset);
            this.displayed = true;
            this.hide();
        }
        ButtonPrompt.prototype.reposition = function (x, y, leftOffset) {
            if (leftOffset === void 0) { leftOffset = 0; }
            this.position.set(x + leftOffset, y - this.bubbleImage.height - 2);
            this.bubbleImage.position.setTo(this.position.x, this.position.y);
            this.buttonImage.position.setTo(this.position.x + this.PADDING, this.position.y + this.PADDING);
        };
        ButtonPrompt.prototype.show = function () {
            if (this.displayed)
                return;
            this.displayed = true;
            this.bubbleImage.visible = true;
            this.buttonImage.visible = true;
            this.parent.main.world.bringToTop(this.bubbleImage);
            this.parent.main.world.bringToTop(this.buttonImage);
        };
        ButtonPrompt.prototype.hide = function () {
            if (!this.displayed)
                return;
            this.displayed = false;
            this.bubbleImage.visible = false;
            this.buttonImage.visible = false;
        };
        ButtonPrompt.prototype.buttonIsDown = function () {
            return this.displayed && this.input.isDown;
        };
        ButtonPrompt.prototype.isShowing = function () {
            return this.displayed;
        };
        return ButtonPrompt;
    }());
    MyGame.ButtonPrompt = ButtonPrompt;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Creature = (function () {
        function Creature(main, position, spriteKey, collidesWith) {
            this.MOVE = "move";
            this.main = main;
            this.position = position.clone();
            this.sprite = main.add.sprite(position.x * MyGame.TILE_WIDTH, position.y * MyGame.TILE_HEIGHT, spriteKey);
            this.sprite.animations.add(this.MOVE, null, 10, true);
            this.main.physics.arcade.enableBody(this.sprite);
            this.sprite.play(this.MOVE);
            this.collidesWith = collidesWith;
        }
        Creature.prototype.onStageBuilt = function () {
            var _this = this;
            if (this.collidesWith !== undefined) {
                this.barriers = this.main.groups.barriers
                    .filter(function (b) { return _this.collidesWith.indexOf(b.sprite.key) !== -1; })
                    .map(function (b) { return b.sprite; });
            }
            else {
                this.barriers = this.main.groups.barriers.map(function (b) { return b.sprite; });
            }
            this.uniqueOnStageBuilt();
        };
        Creature.prototype.update = function () {
            this.main.physics.arcade.collide(this.sprite, this.barriers);
            this.uniqueUpdate();
        };
        return Creature;
    }());
    MyGame.Creature = Creature;
    var Blish = (function (_super) {
        __extends(Blish, _super);
        function Blish(main, position) {
            var _this = _super.call(this, main, position, MyGame.Assets.Sprites.Blish.key, [MyGame.Assets.Images.Lillypad, MyGame.Assets.Sprites.Grounds.key]) || this;
            _this.type = MyGame.Assets.Sprites.Blish.key;
            main.groups.barriers.push(new MyGame.Water(main, position));
            _this.sprite.body.velocity.setTo(0, 0);
            _this.sprite.anchor.setTo(0.5, 0.5);
            _this.sprite.position.add(MyGame.TILE_WIDTH / 2, MyGame.TILE_HEIGHT / 2);
            _this.uniqueUpdate = function () {
                _this.main.groups.grounds.filter(function (g) { return g.hasBody; }).forEach(function (g) {
                    _this.main.physics.arcade.collide(_this.sprite, g.sprite);
                });
                _this.main.groups.projectiles.filter(function (p) { return p instanceof MyGame.Crumbs; }).forEach(function (c) {
                    var sees = MyGame.Utils.sees(_this.sprite.position, c.sprite.position, Infinity, _this.lines);
                    if (sees.item1 || sees.item2) {
                        MyGame.Utils.moveToTarget(_this.sprite.body, c.sprite.body.position, Blish.MAX_SPEED, Blish.CUTOFF, sees);
                    }
                    var crumbs = c;
                    _this.main.physics.arcade.overlap(_this.sprite, c.sprite, function (blishSprite, crumbSprite) {
                        if (crumbs.landed) {
                            crumbs.dissolve();
                        }
                    });
                });
                if (_this.sprite.body.velocity.y < 0 && _this.sprite.rotation !== 0) {
                    _this.sprite.rotation = 0;
                }
                else if (_this.sprite.body.velocity.y > 0 && _this.sprite.rotation !== Math.PI) {
                    _this.sprite.rotation = Math.PI;
                }
                else if (_this.sprite.body.velocity.x > 0 && _this.sprite.rotation !== Math.PI * 0.5) {
                    _this.sprite.rotation = Math.PI * 0.5;
                }
                else if (_this.sprite.body.velocity.x < 0 && _this.sprite.rotation !== Math.PI * 1.5) {
                    _this.sprite.rotation = Math.PI * 1.5;
                }
            };
            _this.uniqueOnStageBuilt = function () {
                var leftSides = _this.barriers.map(function (b) { return new Phaser.Line(b.left, b.top, b.left, b.bottom); });
                var topSides = _this.barriers.map(function (b) { return new Phaser.Line(b.left, b.top, b.right, b.top); });
                _this.lines = leftSides.concat(topSides);
            };
            return _this;
        }
        Blish.MAX_SPEED = 100;
        Blish.CUTOFF = 2;
        return Blish;
    }(Creature));
    MyGame.Blish = Blish;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Ground = (function () {
        function Ground(main, position, imageKey) {
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * MyGame.TILE_WIDTH, position.y * MyGame.TILE_HEIGHT, imageKey);
            if (MyGame.Utils.hasNeighboringChar(main.island.layout, position.x, position.y, "o")) {
                main.physics.arcade.enable(this.sprite);
                this.sprite.body.moves = false;
                this.sprite.body.immovable = true;
                this.hasBody = true;
            }
            else {
                this.hasBody = false;
            }
        }
        Ground.makeGround = function (main, islandType, position, fromDoor) {
            if (fromDoor === void 0) { fromDoor = false; }
            switch (islandType) {
                case MyGame.IslandType.INSIDE:
                    return new TileFloor(main, position, fromDoor);
                case MyGame.IslandType.WATER:
                case MyGame.IslandType.OUTSIDE:
                    return new Grass(main, position);
            }
        };
        return Ground;
    }());
    MyGame.Ground = Ground;
    var Grass = (function (_super) {
        __extends(Grass, _super);
        function Grass(main, position) {
            var _this = _super.call(this, main, position, MyGame.Assets.Sprites.Grounds.key) || this;
            _this.sprite.frame = Grass.frames[Math.floor(Math.random() * Grass.frames.length)];
            return _this;
        }
        Grass.frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5];
        return Grass;
    }(Ground));
    MyGame.Grass = Grass;
    var TileFloor = (function (_super) {
        __extends(TileFloor, _super);
        function TileFloor(main, position, fromDoor) {
            if (fromDoor === void 0) { fromDoor = false; }
            var _this = _super.call(this, main, position, MyGame.Assets.Images.TileFloor) || this;
            if (!fromDoor && position.y > 0 && main.island.layout[position.y - 1][position.x] === "b") {
                _this.wall = main.add.image(position.x * MyGame.TILE_WIDTH, (position.y - 1) * MyGame.TILE_HEIGHT, MyGame.Assets.Images.Wall);
            }
            return _this;
        }
        return TileFloor;
    }(Ground));
    MyGame.TileFloor = TileFloor;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var House = (function () {
        function House(main, position) {
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * MyGame.TILE_WIDTH, position.y * MyGame.TILE_HEIGHT, MyGame.Assets.Sprites.House.key);
            this.sprite.scale.setTo(2, 2);
            main.physics.arcade.enable(this.sprite);
            this.sprite.body.moves = true;
            this.sprite.body.immovable = true;
            this.sprite.smoothed = false;
            this.sprite.body.setSize(MyGame.Assets.Sprites.House.width, MyGame.Assets.Sprites.House.height * (2 / 3), 0, MyGame.Assets.Sprites.House.height * (1 / 3));
        }
        House.prototype.update = function () {
            this.main.physics.arcade.collide(this.sprite, this.main.player);
        };
        return House;
    }());
    MyGame.House = House;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var NPCInfo = (function () {
        function NPCInfo(npc) {
            this.old = new MyGame.Location(npc.main.island.num, npc.startX, npc.startY);
        }
        return NPCInfo;
    }());
    MyGame.NPCInfo = NPCInfo;
    var NPC = (function () {
        function NPC(main, position, textManager, movementScript, speed, animationSpeed, spriteKey, notDefaultAnims) {
            if (notDefaultAnims === void 0) { notDefaultAnims = false; }
            this.main = main;
            this.startX = position.x;
            this.startY = position.y;
            this.position = position.clone();
            this.speed = speed;
            this.sprite = main.add.sprite(position.x * MyGame.TILE_WIDTH, position.y * MyGame.TILE_HEIGHT, spriteKey);
            main.physics.arcade.enable(this.sprite);
            if (spriteKey !== MyGame.Assets.Images.Sign || notDefaultAnims) {
                MyGame.Utils.addPersonAnimations(this.sprite, animationSpeed);
            }
            this.notDefaultAnims = notDefaultAnims;
            this.textManager = textManager;
            this.textDisplay = new MyGame.BottomTextDisplay(main, this);
            this.buttonPrompt = new MyGame.ButtonPrompt(this, main.inputs.O, -4);
            if (movementScript) {
                this.movementManager = new MyGame.MovementManager(main.game, movementScript, this);
            }
            else {
                this.sprite.body.moves = false;
            }
            this.sprite.body.immovable = true;
            this.direction = MyGame.Direction.Down;
            this.textShowing = false;
            this.saveInfo = new NPCInfo(this);
        }
        NPC.prototype.onStageBuilt = function () {
            if (this.movementManager && !this.movementManager.hasTrigger && !this.doingScript) {
                this.movementManager.start();
            }
        };
        NPC.prototype.playerStoppedUpdate = function () {
            if (this.movementManager && !this.movementManager.paused) {
                var anim = this.movementManager.currentlyStationary() ? MyGame.Utils.getIdleAnimName(this.direction) : MyGame.Utils.getWalkingAnimName(this.direction);
                if (anim && anim !== this.sprite.animations.currentAnim.name) {
                    this.sprite.play(anim);
                }
            }
        };
        NPC.prototype.update = function () {
            var player = this.main.player;
            if ((!this.movementManager || this.movementManager.interruptable)
                && MyGame.Utils.getEdgeDistance(this.sprite, this.main.player) < MyGame.TILE_HEIGHT / 2) {
                if (this.movementManager) {
                    this.buttonPrompt.reposition(this.sprite.x, this.sprite.y, -4);
                    this.movementManager.pause();
                }
                this.buttonPrompt.show();
                if (player.centerY < this.sprite.y) {
                    this.direction = MyGame.Direction.Up;
                }
                else if (player.centerY > this.sprite.bottom) {
                    this.direction = MyGame.Direction.Down;
                }
                else if (player.centerX < this.sprite.left) {
                    this.direction = MyGame.Direction.Left;
                }
                else {
                    this.direction = MyGame.Direction.Right;
                }
                if (!(this instanceof Sign) && !this.notDefaultAnims) {
                    this.sprite.play(MyGame.Utils.getIdleAnimName(this.direction));
                }
            }
            else {
                this.buttonPrompt.hide();
                if (this.movementManager) {
                    this.movementManager.resume();
                }
            }
            if (this.movementManager && !this.movementManager.paused) {
                var anim = this.movementManager.currentlyStationary() ? MyGame.Utils.getIdleAnimName(this.direction) : MyGame.Utils.getWalkingAnimName(this.direction);
                if (anim && anim !== this.sprite.animations.currentAnim.name) {
                    this.sprite.play(anim);
                }
            }
            this.showText();
            this.main.physics.arcade.collide(this.sprite, this.main.player);
        };
        NPC.prototype.showText = function (override) {
            if (override === void 0) { override = false; }
            if (override || this.shouldShowText()) {
                this.buttonPrompt.hide();
                if (!this.notDefaultAnims) {
                    var anim = MyGame.Utils.getIdleAnimName(this.direction);
                    if (this.sprite.animations.currentAnim && anim !== this.sprite.animations.currentAnim.name) {
                        this.sprite.play(anim);
                    }
                }
                this.textDisplay.start(this.textManager.useNext(this.main, this));
                this.textShowing = true;
            }
        };
        NPC.prototype.setDialogState = function (lastViewed) {
            this.textManager.setLastViewed(lastViewed);
        };
        NPC.prototype.matchesTrigger = function (name) {
            return this.movementManager && this.movementManager.hasTrigger && this.movementManager.triggerName === name;
        };
        NPC.prototype.doTrigger = function (name) {
            if (this.movementManager && this.movementManager.hasTrigger && this.movementManager.triggerName === name) {
                this.saveInfo.old.setXY(MyGame.Utils.getEndPosition(MyGame.pof(this.startX, this.startY), this.movementManager.script.directions));
                this.movementManager.start();
                if (!this.movementManager.loop) {
                    this.movementManager.setOnComplete(this.showText, this, true);
                }
            }
        };
        NPC.prototype.doScript = function (directions, start, interruptable) {
            if (interruptable === void 0) { interruptable = false; }
            if (this.movementManager) {
                this.movementManager.pause();
            }
            start = start ? start : MyGame.pof(Math.floor(this.sprite.x / MyGame.TILE_WIDTH), Math.floor(this.sprite.y / MyGame.TILE_WIDTH));
            var script = MyGame.Utils.makeMovementScript(start, directions);
            this.movementManager = new MyGame.MovementManager(this.main.game, script, this);
            this.movementManager.interruptable = interruptable;
            this.doingScript = true;
            if (interruptable) {
                this.saveInfo.script = script;
            }
            this.movementManager.start(true);
        };
        NPC.prototype.setSpeed = function (speed) {
            this.speed = speed;
            this.saveInfo.speed = speed;
        };
        NPC.prototype.savePosition = function (x, y) {
            if (!MyGame.Utils.isAThing(this.saveInfo.now)) {
                this.saveInfo.now = new MyGame.Location(this.main.island.num, 0, 0);
            }
            if (x === undefined && y === undefined) {
                this.saveInfo.now.setXY(MyGame.pof(Math.floor(this.sprite.x / MyGame.TILE_WIDTH), Math.floor(this.sprite.y / MyGame.TILE_WIDTH)));
                return;
            }
            this.saveInfo.now.setXY(MyGame.pof(x ? x : 0, y ? y : 0));
        };
        NPC.prototype.unloadSaveInfo = function () {
            var temp = this.saveInfo;
            this.saveInfo = new NPCInfo(this);
            return temp;
        };
        NPC.prototype.hasSaveInfo = function () {
            return this.saveInfo.now !== undefined || this.saveInfo.script !== undefined || this.saveInfo.speed !== undefined;
        };
        NPC.prototype.setPosition = function (location) {
            this.sprite.x = location.x * MyGame.TILE_WIDTH;
            this.sprite.y = location.y * MyGame.TILE_HEIGHT;
        };
        NPC.prototype.shouldShowText = function () {
            if (this.textShowing) {
                if (!this.buttonPrompt.input.isDown) {
                    this.textShowing = false;
                }
                return false;
            }
            return this.buttonPrompt.isShowing() && (this.textManager.getNext(this.main, this).autoStart || this.buttonPrompt.buttonIsDown());
        };
        return NPC;
    }());
    MyGame.NPC = NPC;
    var Albert = (function (_super) {
        __extends(Albert, _super);
        function Albert(main, position, textManager, movementScript) {
            return _super.call(this, main, position, textManager, movementScript, 750, 5, MyGame.Assets.Sprites.Albert.key) || this;
        }
        return Albert;
    }(NPC));
    MyGame.Albert = Albert;
    var OldMan = (function (_super) {
        __extends(OldMan, _super);
        function OldMan(main, position, textManager, movementScript) {
            return _super.call(this, main, position, textManager, movementScript, 1000, 3, MyGame.Assets.Sprites.OldMan.key) || this;
        }
        return OldMan;
    }(NPC));
    MyGame.OldMan = OldMan;
    var Sign = (function (_super) {
        __extends(Sign, _super);
        function Sign(main, position, textManager) {
            return _super.call(this, main, position, textManager, null, 0, 0, MyGame.Assets.Images.Sign) || this;
        }
        return Sign;
    }(NPC));
    MyGame.Sign = Sign;
    var Stanley = (function (_super) {
        __extends(Stanley, _super);
        function Stanley(main, position, textManager, movementScript) {
            return _super.call(this, main, position, textManager, movementScript, 500, 7, MyGame.Assets.Sprites.Stanley.key) || this;
        }
        return Stanley;
    }(NPC));
    MyGame.Stanley = Stanley;
    var TheMeep = (function (_super) {
        __extends(TheMeep, _super);
        function TheMeep(main, position, textManager) {
            var _this = _super.call(this, main, position, textManager, null, 0, 0, MyGame.Assets.Sprites.TheMeep.key, true) || this;
            _this.sprite.animations.add("plop", MyGame.Utils.animationArray(0, 3), 5, true);
            _this.sprite.animations.play("plop");
            return _this;
        }
        return TheMeep;
    }(NPC));
    MyGame.TheMeep = TheMeep;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(state, position, health) {
            var _this = _super.call(this, state.game, position.x * MyGame.TILE_WIDTH, position.y * MyGame.TILE_HEIGHT, MyGame.Assets.Sprites.Player.key, 0) || this;
            state.game.physics.arcade.enableBody(_this);
            MyGame.Utils.addPersonAnimations(_this);
            _this.inputs = state.inputs;
            _this.direction = MyGame.Direction.Down;
            state.add.existing(_this);
            _this.state = state;
            _this.health = MyGame.Utils.isAThing(health) ? health : Player.STARTING_HEALTH;
            _this.inputs.K.onUp.add(_this.throwProjectile, _this);
            _this.itemCount = 0;
            return _this;
        }
        Player.prototype.onStageBuilt = function () {
            this.play("idle_back");
        };
        Player.prototype.update = function () {
            if (this.state.playerStopped) {
                this.play(MyGame.Utils.getIdleAnimName(this.direction));
                return;
            }
            var player = this;
            var game = this.game;
            this.hasCollided = false;
            this.state.groups.barriers.filter(function (b) { return b.playerCollides && b.hasBody; }).forEach(function (barrier) {
                game.physics.arcade.collide(player, barrier.sprite, barrier.onCollision, null, barrier);
            });
            var directionDown = 1;
            if (this.inputs.up.isDown) {
                directionDown *= 2;
            }
            if (this.inputs.left.isDown) {
                directionDown *= 3;
            }
            if (this.inputs.down.isDown) {
                directionDown *= 5;
            }
            if (this.inputs.right.isDown) {
                directionDown *= 7;
            }
            var animName = "";
            switch (directionDown) {
                case 2:
                    this.direction = MyGame.Direction.Up;
                    animName = "walk_forward";
                    this.body.velocity.setTo(0, -Player.WALKING_SPEED);
                    break;
                case 3:
                    this.direction = MyGame.Direction.Left;
                    animName = "walk_left";
                    this.body.velocity.setTo(-Player.WALKING_SPEED, 0);
                    break;
                case 5:
                    this.direction = MyGame.Direction.Down;
                    animName = "walk_back";
                    this.body.velocity.setTo(0, Player.WALKING_SPEED);
                    break;
                case 7:
                    this.direction = MyGame.Direction.Right;
                    animName = "walk_right";
                    this.body.velocity.setTo(Player.WALKING_SPEED, 0);
                    break;
                default:
                    this.body.velocity.setTo(0, 0);
                    break;
            }
            if (directionDown === 1) {
                animName = MyGame.Utils.getIdleAnimName(this.direction);
            }
            if (this.animations.currentAnim.name !== animName) {
                this.play(animName);
            }
            MyGame.Utils.snapToPixels(this);
        };
        Player.prototype.throwProjectile = function () {
            if (this.itemCount > 0) {
                this.itemCount -= MyGame.useItem(this.itemType, this.state, this.x, this.y, this.direction);
                this.state.projectileDisplay.updateCount(this.itemCount);
                MyGame.StateTransfer.getInstance().heldItems.amount = this.itemCount;
            }
        };
        Player.WALKING_SPEED = 100;
        Player.STARTING_HEALTH = 100;
        return Player;
    }(Phaser.Sprite));
    MyGame.Player = Player;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Portal = (function () {
        function Portal(main, position, key, link, playerStart) {
            this.main = main;
            this.position = MyGame.pcop(position);
            this.playerStart = MyGame.pcop(playerStart);
            this.link = link;
            this.sprite = main.add.sprite(position.x * MyGame.TILE_WIDTH, position.y * MyGame.TILE_HEIGHT, key);
            this.main.physics.arcade.enable(this.sprite);
            this.sprite.body.moves = false;
            this.sprite.body.immovable = true;
        }
        Portal.prototype.update = function () {
            this.main.physics.arcade.collide(this.sprite, this.main.player, this.onCollide, null, this);
        };
        Portal.prototype.onCollide = function (portalSprite, playerSprite) {
            this.main.stopPlayer();
            var tween = this.main.add.tween(this.main.game.world).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.changeIsland, this);
        };
        Portal.prototype.changeIsland = function () {
            var stateTransfer = MyGame.StateTransfer.getInstance();
            stateTransfer.island = this.link;
            stateTransfer.position = this.playerStart;
            stateTransfer.reason = MyGame.TransferReason.LINK;
            stateTransfer.dialogs = MyGame.WorldManager.getInstance().exportDialogs();
            this.main.groups.npcs.filter(function (n) { return n.hasSaveInfo(); }).forEach(function (n) {
                var info = n.unloadSaveInfo();
                var matches = stateTransfer.npcs.filter(function (t) { return t.old.equals(info.old); });
                if (matches.length > 0) {
                    var match = matches[0];
                    match.now = info.now;
                    match.script = info.script;
                    match.speed = info.speed;
                }
                else {
                    stateTransfer.npcs.push(info);
                }
            });
            this.main.state.restart();
        };
        return Portal;
    }());
    MyGame.Portal = Portal;
    var OutsideBoundsPortal = (function (_super) {
        __extends(OutsideBoundsPortal, _super);
        function OutsideBoundsPortal(main, position, link, playerStart) {
            return _super.call(this, main, position, MyGame.Assets.Sprites.Blackness.key, link, playerStart) || this;
        }
        return OutsideBoundsPortal;
    }(Portal));
    MyGame.OutsideBoundsPortal = OutsideBoundsPortal;
    var Doorway = (function (_super) {
        __extends(Doorway, _super);
        function Doorway(main, position, link, direction, playerStart) {
            var _this = _super.call(this, main, position, direction === MyGame.Direction.Down ? MyGame.Assets.Sprites.DoorWay.key : MyGame.Assets.Images.Door, link, playerStart) || this;
            if (direction === MyGame.Direction.Down) {
                _this.sprite.y += (MyGame.TILE_HEIGHT - (MyGame.Assets.Sprites.DoorWay.height / 2));
                _this.sprite.x -= (MyGame.Assets.Sprites.DoorWay.width - MyGame.TILE_WIDTH) / 2;
            }
            else {
                _this.sprite.y -= MyGame.TILE_HEIGHT;
            }
            return _this;
        }
        return Doorway;
    }(Portal));
    MyGame.Doorway = Doorway;
    var AdhocPortal = (function (_super) {
        __extends(AdhocPortal, _super);
        function AdhocPortal(main, position, link, playerStart) {
            var _this = _super.call(this, main, position, MyGame.Assets.Sprites.Blackness.key, link, playerStart) || this;
            _this.sprite.alpha = 0;
            return _this;
        }
        return AdhocPortal;
    }(Portal));
    MyGame.AdhocPortal = AdhocPortal;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Source = (function (_super) {
        __extends(Source, _super);
        function Source(type, main, x, y, renewing, amount, typeAsSource) {
            if (typeAsSource === void 0) { typeAsSource = false; }
            var _this = this;
            var sourceKey = typeAsSource ? type : type + "_" + MyGame.SOURCE;
            _this = _super.call(this, main, MyGame.pof(x, y), sourceKey, "s", true) || this;
            _this.type = type;
            _this.renewing = renewing;
            _this.amount = amount;
            _this.onCollision = function (playerSprite, barrierSprite) {
                var stateTransfer = MyGame.StateTransfer.getInstance();
                _this.main.player.itemType = _this.type;
                _this.main.player.itemCount = _this.amount;
                _this.main.projectileDisplay.updateCount(_this.amount);
                _this.main.projectileDisplay.updateIcon(_this.type + "_" + MyGame.ICON);
                stateTransfer.heldItems = { type: _this.type, amount: _this.amount };
                if (!_this.renewing) {
                    _this.sprite.destroy();
                    _this.main.groups.barriers = _this.main.groups.barriers.filter(function (b) { return b !== _this; });
                    stateTransfer.addedItems = stateTransfer.addedItems.filter(function (i) { return !i.location.equals(new MyGame.Location(_this.main.island.num, _this.position.x, _this.position.y)); });
                }
            };
            return _this;
        }
        Source.makeSource = function (main, x, y, type) {
            switch (type) {
                case MyGame.Assets.Images.CrumbsSource:
                    return new CrumbSource(main, x, y);
                case MyGame.Assets.Sprites.Grodule.key:
                    return new SingleSource(main, x, y, type);
            }
            throw new Error("Source type " + type + " is invalid.");
        };
        return Source;
    }(MyGame.Barrier));
    MyGame.Source = Source;
    var CrumbSource = (function (_super) {
        __extends(CrumbSource, _super);
        function CrumbSource(main, x, y) {
            return _super.call(this, MyGame.Assets.Sprites.Crumbs.key, main, x, y, true, 10) || this;
        }
        return CrumbSource;
    }(Source));
    MyGame.CrumbSource = CrumbSource;
    var SingleSource = (function (_super) {
        __extends(SingleSource, _super);
        function SingleSource(main, x, y, key) {
            var _this = _super.call(this, key, main, x, y, false, 1, true) || this;
            _this.sprite.animations.add("anim", null, 5, true);
            _this.sprite.play("anim");
            return _this;
        }
        return SingleSource;
    }(Source));
    MyGame.SingleSource = SingleSource;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Trigger = (function () {
        function Trigger(main, x, y, width, height, action, name) {
            this.x = x;
            this.y = y;
            this.main = main;
            this.area = main.add.sprite(x * MyGame.TILE_WIDTH, y * MyGame.TILE_HEIGHT, null);
            main.physics.arcade.enable(this.area);
            this.area.body.setSize(width * MyGame.TILE_WIDTH, height * MyGame.TILE_HEIGHT, 0, 0);
            this.action = action;
            this.active = true;
            this.name = name;
        }
        Trigger.prototype.checkPlayerOverlap = function () {
            if (!this.active) {
                return;
            }
            this.main.physics.arcade.overlap(this.area, this.main.player, this.performAction, null, this);
        };
        Trigger.prototype.performAction = function () {
            this.action(this.main, this);
            this.active = false;
        };
        return Trigger;
    }());
    MyGame.Trigger = Trigger;
    var NPCMoveTrigger = (function (_super) {
        __extends(NPCMoveTrigger, _super);
        function NPCMoveTrigger(main, x, y, width, height, name) {
            var _this = _super.call(this, main, x, y, width, height, null, name) || this;
            _this.action = _this.moveNPCAction;
            return _this;
        }
        NPCMoveTrigger.prototype.moveNPCAction = function (main, trigger) {
            var matchingNPCs = main.groups.npcs.filter(function (n) { return n.matchesTrigger(trigger.name); });
            if (matchingNPCs.length !== 1) {
                throw new Error("Expected exactly one NPC with trigger name \"" + trigger.name + "\". Found " + matchingNPCs.length + ".");
            }
            var matchingNPC = matchingNPCs[0];
            main.stopPlayer();
            matchingNPC.doTrigger(trigger.name);
        };
        return NPCMoveTrigger;
    }(Trigger));
    MyGame.NPCMoveTrigger = NPCMoveTrigger;
    var TriggerType;
    (function (TriggerType) {
        TriggerType[TriggerType["MOVE_NPC"] = 0] = "MOVE_NPC";
        TriggerType[TriggerType["REGULAR"] = 1] = "REGULAR";
    })(TriggerType = MyGame.TriggerType || (MyGame.TriggerType = {}));
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    MyGame.islandGetters = [];
    var Islands;
    (function (Islands) {
        Islands[Islands["START"] = 0] = "START";
        Islands[Islands["SADMAN"] = 1] = "SADMAN";
        Islands[Islands["THEMEEP"] = 2] = "THEMEEP";
        Islands[Islands["ALBERT"] = 3] = "ALBERT";
        Islands[Islands["TOWN"] = 4] = "TOWN";
        Islands[Islands["BLISH"] = 5] = "BLISH";
        Islands[Islands["BROTHER"] = 6] = "BROTHER";
    })(Islands = MyGame.Islands || (MyGame.Islands = {}));
    MyGame.islandGetters[0] = function () {
        return new MyGame.IslandBuilder(0, MyGame.IslandType.OUTSIDE)
            .setLayout([
            " wwwwwwww  ",
            " w      w  ",
            " w      w  ",
            " w    * w  ",
            " w*     w  ",
            " w      w  ",
            " w   n  w  ",
            " www  www  ",
            "   w  w    ",
            "   w  w    ",
            "   w  w    "
        ])
            .setPlayerStart(MyGame.pof(3, 1))
            .setNPCs([
            { position: MyGame.pof(5, 6), type: MyGame.Assets.Sprites.OldMan.key, script: "", textKey: MyGame.Texts.GRANDPA }
        ])
            .setOutsideBoundsPortals([
            { side: MyGame.Direction.Down, start: 3, end: 6, link: Islands.SADMAN, playerStart: undefined }
        ])
            .build();
    };
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    MyGame.islandGetters[1] = function () {
        return new MyGame.IslandBuilder(1, MyGame.IslandType.OUTSIDE)
            .setLayout([
            "w  w                    ",
            "w  wwwwwwwwwwwwwwwwwwwww",
            "wn                     w",
            "w    t  n       t       ",
            "w                       ",
            "w        ooooo        nw",
            "w    t   ooooo  t      w",
            "w        ooooo        nw",
            "w                      w",
            "wwwwwwwwwwwwwwwwwwww   w",
        ])
            .setPlayerStart(MyGame.pof(1, 0))
            .setOutsideBoundsPortals([
            { side: MyGame.Direction.Up, start: 1, end: 4, playerStart: MyGame.pof(4, 9), link: 0 },
            { side: MyGame.Direction.Right, start: 3, end: 6, playerStart: MyGame.pof(1, 1), link: MyGame.Islands.THEMEEP },
            { side: MyGame.Direction.Down, start: 20, end: 24, playerStart: MyGame.pof(5, 0), link: MyGame.Islands.ALBERT }
        ])
            .setNPCs([
            { position: MyGame.pof(8, 3), textKey: MyGame.Texts.SIGHING, type: MyGame.Assets.Sprites.Albert.key, script: "rrrrrrdllllllu" },
            { position: MyGame.pof(22, 5), text: "The Meep", type: MyGame.Assets.Images.Sign, script: "" },
            { position: MyGame.pof(22, 7), text: "Path to Tuttle Village", type: MyGame.Assets.Images.Sign, script: "" },
            { position: MyGame.pof(1, 2), text: "It's good to save often. You can save by pressing the SPACEBAR to pause, then pressing O when you have the Save option selected. If you die, you will be sent back to your last save.", type: MyGame.Assets.Images.Sign, script: "" }
        ])
            .build();
    };
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    MyGame.islandGetters[2] = function () {
        return new MyGame.IslandBuilder(2, MyGame.IslandType.OUTSIDE)
            .setLayout([
            "wwwwwwwwwwwwwwww",
            "               w",
            "   n           w",
            "w              w",
            "w              w",
            "w              w",
            "w              w",
            "w              w",
            "w              w",
            "w              w",
            "w              w",
            "w              w",
            "w              w",
            "wwwwwwwwwwwwwwww",
        ])
            .setOutsideBoundsPortals([
            { side: MyGame.Direction.Left, start: 1, end: 4, playerStart: MyGame.pof(21, 3), link: MyGame.Islands.SADMAN }
        ])
            .setNPCs([
            { position: MyGame.pof(3, 2), textKey: MyGame.Texts.MEEP_GROWL, type: MyGame.Assets.Sprites.TheMeep.key, script: null }
        ])
            .setPlayerStart(MyGame.pof(1, 1))
            .build();
    };
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    MyGame.islandGetters[3] = function () {
        function jambotDead(main) {
            var albert = main.groups.npcs.filter(function (n) { return n instanceof MyGame.Albert; })[0];
            albert.sprite.position.setTo(5 * MyGame.TILE_WIDTH, 2 * MyGame.TILE_HEIGHT);
            if (main.groups.enemies.filter(function (e) { return e instanceof MyGame.JamBot && e.alive; }).length === 0) {
                main.stopPlayer();
                main.player.position.setTo(5 * MyGame.TILE_WIDTH, 7 * MyGame.TILE_HEIGHT);
                albert.setDialogState(0);
                albert.doScript("d=lddddddddrrr;l=false", MyGame.pof(5, 2));
                albert.movementManager.setOnComplete(function () {
                    this.playerStopped = false;
                    main.groups.barriers.filter(function (b) { return b instanceof MyGame.Gate; })[0].sprite.destroy();
                    MyGame.WorldManager.getInstance().changeLayout(3, MyGame.pof(8, 11), " ");
                }, main);
                albert.savePosition(7, 10);
            }
        }
        function jambugDead(main) {
            var albert = main.groups.npcs.filter(function (n) { return n instanceof MyGame.Albert; })[0];
            albert.sprite.position.setTo(7 * MyGame.TILE_WIDTH, 10 * MyGame.TILE_HEIGHT);
            if (main.groups.enemies.filter(function (e) { return e instanceof MyGame.JamBug && e.alive; }).length === 0) {
                main.stopPlayer();
                main.player.position.setTo(19 * MyGame.TILE_WIDTH, 10 * MyGame.TILE_HEIGHT);
                albert.setDialogState(2);
                albert.doScript("d=rrrrrru;l=false", MyGame.pof(19, 11));
                albert.movementManager.setOnComplete(function () {
                    this.playerStopped = false;
                    main.groups.barriers.filter(function (b) { return b instanceof MyGame.Gate; })[0].sprite.destroy();
                    MyGame.WorldManager.getInstance().changeLayout(3, MyGame.pof(26, 11), " ");
                }, main);
                albert.savePosition(25, 10);
            }
        }
        return new MyGame.IslandBuilder(3, MyGame.IslandType.OUTSIDE)
            .setLayout([
            "   w   w**********************",
            "  ww   ww  ooooo             *",
            "  w     w  opopo             *",
            "  w     w  ooooo           n**",
            "  w  n  w  oopoo              ",
            "  w     w  oooop              ",
            "  w  *  w                     ",
            "  w    ew                   **",
            "  w  *  w        *   *       *",
            "  we    wwwwwwwwww   wwwwwwwww",
            "  w     w    e   *   * e  w  w",
            "  w     g      e          g  w",
            "  w     w                 w  w",
            "  wwwwwwwwwwwwwwwwwwwwwwwww  w"
        ])
            .setPlayerStart(MyGame.pof(5, 0))
            .setOutsideBoundsPortals([
            { side: MyGame.Direction.Up, start: 4, end: 8, link: MyGame.Islands.SADMAN, playerStart: MyGame.pof(21, 8) },
            { side: MyGame.Direction.Right, start: 3, end: 7, link: MyGame.Islands.BLISH, playerStart: MyGame.pof(1, 6) },
            { side: MyGame.Direction.Down, start: 27, end: 30, link: MyGame.Islands.TOWN, playerStart: MyGame.pof(17, 1) }
        ])
            .setTriggers([
            { type: MyGame.TriggerType.MOVE_NPC, name: "albertfirst", x: 3, y: 2, width: 5, height: 1 }
        ])
            .setNPCs([
            { position: MyGame.pof(5, 4), type: MyGame.Assets.Sprites.Albert.key, textKey: MyGame.Texts.ALBERT_FIRST, script: "d=uu;t=albertfirst;l=false" },
            { position: MyGame.pof(27, 3), type: MyGame.Assets.Images.Sign, text: "Lully Pond", script: null }
        ])
            .setEnemies([
            {
                position: MyGame.pof(7, 7),
                type: MyGame.Assets.Sprites.JamBotWorld.key,
                script: "llllrrrr",
                afterDeath: jambotDead
            },
            {
                position: MyGame.pof(3, 9),
                type: MyGame.Assets.Sprites.JamBotWorld.key,
                script: "rrrrllll",
                afterDeath: jambotDead
            },
            {
                position: MyGame.pof(13, 10),
                type: MyGame.Assets.Sprites.JamBugWorld.key,
                script: "ddlluurr",
                afterDeath: jambugDead
            },
            {
                position: MyGame.pof(15, 11),
                type: MyGame.Assets.Sprites.JamBugWorld.key,
                script: "rdlu",
                afterDeath: jambugDead
            },
            {
                position: MyGame.pof(23, 10),
                type: MyGame.Assets.Sprites.JamBugWorld.key,
                script: "dduulrrl",
                afterDeath: jambugDead
            }
        ])
            .build();
    };
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    MyGame.islandGetters[MyGame.Islands.TOWN] = function () {
        return new MyGame.IslandBuilder(MyGame.Islands.TOWN, MyGame.IslandType.OUTSIDE)
            .setLayout([
            "             w     w             ",
            "**************     **************",
            "*    h-------       h-------    *",
            "*    --------       --------    *",
            "*    --------       --------    *",
            "*    --------       --------    *",
            "*    --------       --------    *",
            "*    --------       --------    *",
            "*                               *",
            "*          n                    *",
            "*                               *",
            "*                               *",
            "*                               *",
            "*                               *",
            "*    h-------       h-------    *",
            "*    --------       --------    *",
            "*    --------       --------    *",
            "*    --------       --------    *",
            "*    --------       --------    *",
            "*    --------       --------    *",
            "*                               *",
            "*                               *",
            "*                               *",
            "*                               *",
            "*                               *",
            "*                               *",
            "*                               *",
            "*                               *",
            "*                               *",
            "*********************************"
        ])
            .setOutsideBoundsPortals([
            { side: MyGame.Direction.Up, start: 14, end: 20, playerStart: MyGame.pof(27, 12), link: MyGame.Islands.ALBERT }
        ])
            .setHouseLinks([
            { pos: MyGame.pof(5, 2), playerStart: MyGame.pof(11, 4), link: MyGame.Islands.BROTHER }
        ])
            .setNPCs([
            { position: MyGame.pof(11, 9), type: MyGame.Assets.Images.Sign, text: "The Sploofers", script: null }
        ])
            .setCustomBarriers([
            { x: 22, y: 4, type: MyGame.Assets.Images.FruitStand, playerCollides: true }
        ])
            .setPlayerStart(MyGame.pof(17, 1))
            .build();
    };
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    MyGame.islandGetters[5] = function () {
        return new MyGame.IslandBuilder(5, MyGame.IslandType.OUTSIDE)
            .setLayout([
            "*t t t t t t t t t t t t ",
            "*                        ",
            "*           s            ",
            "*       oooooooo         ",
            "**n    oooooooooo        ",
            "        oooooooo         ",
            "           oo            ",
            "           oo            ",
            "**         oo            ",
            "*         oooo           ",
            "*         oooo           ",
            "w          oo            ",
            "w          oo            ",
            "w       oooooooooo       ",
            "w      ooooooooooo       ",
            "w     oooooooooooo       ",
            "w     oooooooooooo       ",
            "w     oooooooooooo       ",
            "w     oocoooooooo        ",
            "w     oooooooooo         ",
            "w          s             ",
            "w                        ",
            "w                        ",
            "w                        ",
            "w                        ",
            "w                        ",
            "w                        "
        ])
            .setOutsideBoundsPortals([
            { side: MyGame.Direction.Left, start: 4, end: 7, link: 3, playerStart: MyGame.pof(28, 4) }
        ])
            .setCreatures([
            { type: MyGame.Assets.Sprites.Blish.key, x: 8, y: 18 }
        ])
            .setSources([
            { type: MyGame.Assets.Images.CrumbsSource, x: 12, y: 2 },
            { type: MyGame.Assets.Images.CrumbsSource, x: 11, y: 20 }
        ])
            .setNPCs([
            { position: MyGame.pof(2, 4), type: MyGame.Assets.Images.Sign, text: "Path to Tuttle Village", script: null }
        ])
            .build();
    };
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    MyGame.islandGetters[MyGame.Islands.BROTHER] = function () {
        return new MyGame.IslandBuilder(MyGame.Islands.BROTHER, MyGame.IslandType.INSIDE)
            .setLayout([
            "bbbbbbbbbbbbbbbbbbbbbb",
            "b                    b",
            "bx- x    b   b       b",
            "b--      b   b       b",
            "b--      b   b    nx b",
            "b        b d b       b",
            "bbbbbbbbbbbbbbbbbbbbbb"
        ])
            .setNPCs([
            { position: MyGame.pof(18, 4), type: MyGame.Assets.Sprites.Stanley.key, script: "lllldrurrr", textKey: MyGame.Texts.STANLEY }
        ])
            .setCustomBarriers([
            { x: 19, y: 4, type: MyGame.Assets.Images.Oven, playerCollides: true },
            { x: 1, y: 2, type: MyGame.Assets.Images.Couch, playerCollides: true },
            { x: 4, y: 2, type: MyGame.Assets.Images.Rug, playerCollides: false }
        ])
            .setLinks([
            { pos: MyGame.pof(11, 5), link: MyGame.Islands.TOWN, playerStart: MyGame.Utils.getHouseStart(5, 2) }
        ])
            .build();
    };
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var IslandType;
    (function (IslandType) {
        IslandType[IslandType["WATER"] = 0] = "WATER";
        IslandType[IslandType["INSIDE"] = 1] = "INSIDE";
        IslandType[IslandType["OUTSIDE"] = 2] = "OUTSIDE";
    })(IslandType = MyGame.IslandType || (MyGame.IslandType = {}));
    var MapNPC = (function () {
        function MapNPC() {
        }
        return MapNPC;
    }());
    var MapEnemy = (function () {
        function MapEnemy() {
        }
        return MapEnemy;
    }());
    var MapOutsideBoundsPortal = (function () {
        function MapOutsideBoundsPortal() {
        }
        return MapOutsideBoundsPortal;
    }());
    var MapLink = (function () {
        function MapLink() {
        }
        return MapLink;
    }());
    var MapTrigger = (function () {
        function MapTrigger() {
        }
        return MapTrigger;
    }());
    var StringPos = (function () {
        function StringPos() {
        }
        return StringPos;
    }());
    MyGame.StringPos = StringPos;
    var MapCustomBarrier = (function (_super) {
        __extends(MapCustomBarrier, _super);
        function MapCustomBarrier() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MapCustomBarrier;
    }(StringPos));
    MyGame.MapCustomBarrier = MapCustomBarrier;
    var DialogState = (function () {
        function DialogState() {
        }
        return DialogState;
    }());
    MyGame.DialogState = DialogState;
    var IslandBuilder = (function () {
        function IslandBuilder(num, type) {
            this.num = num;
            this.type = type;
            this.layout = [""];
            this.additions = [];
            this.enemies = [];
            this.npcs = [];
            this.outsideBoundsPortals = [];
            this.playerStart = MyGame.pof(0, 0);
            this.links = [];
            this.triggers = [];
            this.otherLinks = [];
            this.houseLinks = [];
            this.creatures = [];
        }
        IslandBuilder.prototype.setLayout = function (layout) {
            this.layout = layout;
            return this;
        };
        IslandBuilder.prototype.setAdditions = function (additions) {
            this.additions = additions;
            return this;
        };
        IslandBuilder.prototype.setEnemies = function (enemies) {
            this.enemies = enemies;
            return this;
        };
        IslandBuilder.prototype.setNPCs = function (npcs) {
            this.npcs = npcs;
            return this;
        };
        IslandBuilder.prototype.setOutsideBoundsPortals = function (portals) {
            this.outsideBoundsPortals = portals;
            return this;
        };
        IslandBuilder.prototype.setPlayerStart = function (playerStart) {
            this.playerStart = playerStart;
            return this;
        };
        IslandBuilder.prototype.setLinks = function (links) {
            this.links = links;
            return this;
        };
        IslandBuilder.prototype.setTriggers = function (triggers) {
            this.triggers = triggers;
            return this;
        };
        IslandBuilder.prototype.setOtherLinks = function (otherLinks) {
            this.otherLinks = this.otherLinks.concat(otherLinks);
            return this;
        };
        IslandBuilder.prototype.setHouseLinks = function (houseLinks) {
            this.houseLinks = this.houseLinks.concat(houseLinks);
            return this;
        };
        IslandBuilder.prototype.setCreatures = function (creatures) {
            this.creatures = creatures;
            return this;
        };
        IslandBuilder.prototype.setSources = function (sources) {
            this.sources = sources;
            return this;
        };
        IslandBuilder.prototype.setCustomBarriers = function (customBarriers) {
            this.customBarriers = customBarriers;
            return this;
        };
        IslandBuilder.prototype.build = function () {
            var island = new Island(this.num, this.type, this.layout, this.additions, this.enemies, this.npcs, this.playerStart, this.outsideBoundsPortals, this.links, this.triggers, this.otherLinks, this.creatures);
            island.sources = this.sources;
            island.houseLinks = this.houseLinks;
            island.customBarriers = this.customBarriers;
            return island;
        };
        return IslandBuilder;
    }());
    MyGame.IslandBuilder = IslandBuilder;
    var Island = (function () {
        function Island(num, type, layout, additions, enemies, npcs, playerStart, outsideBoundsPortals, links, triggers, otherLinks, creatures) {
            this.num = num;
            this.type = type;
            this.layout = layout;
            this.additions = additions;
            this.enemies = enemies;
            this.npcs = npcs;
            this.playerStart = playerStart;
            this.outsideBoundsPortals = outsideBoundsPortals;
            this.links = links;
            this.triggers = triggers;
            this.creatures = [];
            this.dialogStates = [];
            this.creatures = creatures;
            this.otherLinks = otherLinks;
            if (this.type !== IslandType.OUTSIDE) {
                var paddingOffset_1 = MyGame.pof(0, 0);
                var padChar = this.getPadChar(type);
                var minWidth = MyGame.SCREEN_WIDTH / MyGame.TILE_WIDTH + 1;
                for (var i = 0; i < this.layout.length; i++) {
                    for (var j = 0; j < minWidth; j++) {
                        this.layout[i] = padChar + this.layout[i] + padChar;
                        if (i === 0) {
                            paddingOffset_1.x += 1;
                        }
                    }
                }
                var minHeight = MyGame.SCREEN_HEIGHT / MyGame.TILE_HEIGHT + 1;
                var padRow = MyGame.Utils.fillString(padChar, this.layout[0].length);
                for (var i = 0; i < minHeight; i++) {
                    this.layout.push(padRow);
                    this.layout.unshift(padRow);
                    paddingOffset_1.y += 1;
                }
                enemies.forEach(function (e) { e.position.add(paddingOffset_1.x, paddingOffset_1.y); });
                npcs.forEach(function (n) { n.position.add(paddingOffset_1.x, paddingOffset_1.y); });
                links.forEach(function (l) { l.pos.add(paddingOffset_1.x, paddingOffset_1.y); });
                outsideBoundsPortals.forEach(function (o) {
                    if (o.side === MyGame.Direction.Up || o.side === MyGame.Direction.Down) {
                        o.start += paddingOffset_1.x;
                        o.end += paddingOffset_1.x;
                    }
                    else {
                        o.start += paddingOffset_1.y;
                        o.end += paddingOffset_1.y;
                    }
                });
                this.paddingOffset = paddingOffset_1;
            }
        }
        Island.prototype.getNeighborhood = function (position) {
            return {
                above: position.y === 0 ? null : this.layout[position.y - 1][position.x],
                left: position.x === 0 ? null : this.layout[position.y][position.x - 1],
                right: position.x === this.layout[0].length - 1 ? null : this.layout[position.y][position.x + 1],
                below: position.y === this.layout.length - 1 ? null : this.layout[position.y + 1][position.x]
            };
        };
        Island.prototype.makeDoorway = function (main, pos) {
            if (this.type !== IslandType.INSIDE) {
                throw new Error("Doorways can only exist inside.");
            }
            var matching = this.links.filter(function (key) { return key.pos.equals(pos); });
            if (matching.length === 0) {
                throw new Error("Could not find link information at x: " + pos.x + ", y: " + pos.y + ".");
            }
            var direction = this.layout[pos.y + 1][pos.x] === "b" ? MyGame.Direction.Down : MyGame.Direction.Up;
            return new MyGame.Doorway(main, pos.clone(), matching[0].link, direction, matching[0].playerStart);
        };
        Island.prototype.makeOtherLinks = function (main) {
            var housePortals = [];
            this.houseLinks.forEach(function (h) {
                var matching = main.groups.houses.filter(function (ho) { return ho.position.equals(h.pos); });
                if (matching.length === 0) {
                    throw new Error("No house found at x: " + h.pos.x + ", y: " + h.pos.y + ".");
                }
                matching[0].sprite.frame = 1;
                var portal = new MyGame.AdhocPortal(main, h.pos.clone().add(3.5, 5.1), h.link, h.playerStart);
                matching[0].link = portal;
                housePortals.push(portal);
            });
            return this.otherLinks.map(function (l) { return new MyGame.AdhocPortal(main, l.pos, l.link, l.playerStart); }).concat(housePortals);
        };
        Island.prototype.getEnemy = function (main, pos) {
            var matching = this.enemies.filter(function (key) { return key.position.equals(pos); });
            if (matching.length === 0) {
                throw new Error("Could not find enemy information at x: " + pos.x + ", y: " + pos.y + ".");
            }
            var enemy = matching[0];
            switch (enemy.type) {
                case MyGame.Assets.Sprites.JamBotWorld.key:
                    var jambot = new MyGame.JamBot(main, MyGame.pcop(enemy.position), MyGame.Utils.makeMovementScript(enemy.position, enemy.script));
                    jambot.afterDeath = enemy.afterDeath;
                    return jambot;
                case MyGame.Assets.Sprites.JamBugWorld.key:
                    var jambug = new MyGame.JamBug(main, MyGame.pcop(enemy.position), MyGame.Utils.makeMovementScript(enemy.position, enemy.script));
                    jambug.afterDeath = enemy.afterDeath;
                    return jambug;
            }
            throw new Error(enemy.type + " is not a valid enemy type.");
        };
        Island.prototype.getNPC = function (main, pos) {
            var matching = this.npcs.filter(function (n) { return n.position.equals(pos); });
            if (matching.length === 0) {
                throw new Error("Could not find NPC information at x: " + pos.x + ", y: " + pos.y + ".");
            }
            var mapNPC = matching[0];
            var npc = null;
            var textManager = mapNPC.textKey !== undefined ? MyGame.getDialog(mapNPC.textKey) : MyGame.getSignText(mapNPC.text);
            switch (mapNPC.type) {
                case MyGame.Assets.Sprites.Albert.key:
                    npc = new MyGame.Albert(main, MyGame.pcop(mapNPC.position), textManager, MyGame.Utils.makeMovementScript(mapNPC.position, mapNPC.script));
                    break;
                case MyGame.Assets.Sprites.OldMan.key:
                    npc = new MyGame.OldMan(main, MyGame.pcop(mapNPC.position), textManager, MyGame.Utils.makeMovementScript(mapNPC.position, mapNPC.script));
                    break;
                case MyGame.Assets.Images.Sign:
                    npc = new MyGame.Sign(main, MyGame.pcop(mapNPC.position), textManager);
                    break;
                case MyGame.Assets.Sprites.Stanley.key:
                    npc = new MyGame.Stanley(main, MyGame.pcop(mapNPC.position), textManager, MyGame.Utils.makeMovementScript(mapNPC.position, mapNPC.script));
                    break;
                case MyGame.Assets.Sprites.TheMeep.key:
                    npc = new MyGame.TheMeep(main, MyGame.pcop(mapNPC.position), textManager);
                    break;
                default:
                    throw new Error(mapNPC.type + " is not a valid NPC type.");
            }
            var matchingStates = this.dialogStates.filter(function (d) { return d.x === pos.x && d.y === pos.y; });
            if (matchingStates.length === 0) {
                this.dialogStates.push({ x: pos.x, y: pos.y, lastViewed: -1 });
            }
            else {
                npc.setDialogState(matchingStates[0].lastViewed);
            }
            return npc;
        };
        Island.prototype.getCreature = function (main, x, y) {
            var matching = this.creatures.filter(function (c) { return c.x == x && c.y == y; });
            if (matching.length === 0) {
                throw new Error("Could not find Creature information at x: " + x + ", y: " + y + ".");
            }
            var mapCreature = matching[0];
            switch (mapCreature.type) {
                case MyGame.Assets.Sprites.Blish.key:
                    return new MyGame.Blish(main, MyGame.pof(x, y));
                default:
                    throw new Error(mapCreature.type + " is not a valid Creature type.");
            }
        };
        Island.prototype.getPortals = function (main) {
            var portals = [];
            for (var _i = 0, _a = this.outsideBoundsPortals; _i < _a.length; _i++) {
                var portalGroup = _a[_i];
                if (portalGroup.end < portalGroup.start) {
                    throw new Error("Portal group end " + portalGroup.end + " is less than start " + portalGroup.start + ".");
                }
                for (var i = portalGroup.start; i < portalGroup.end; i++) {
                    switch (portalGroup.side) {
                        case MyGame.Direction.Up:
                            portals.push(new MyGame.OutsideBoundsPortal(main, MyGame.pof(i, -1), portalGroup.link, MyGame.pcop(portalGroup.playerStart)));
                            break;
                        case MyGame.Direction.Left:
                            portals.push(new MyGame.OutsideBoundsPortal(main, MyGame.pof(-1, i), portalGroup.link, MyGame.pcop(portalGroup.playerStart)));
                            break;
                        case MyGame.Direction.Right:
                            portals.push(new MyGame.OutsideBoundsPortal(main, MyGame.pof(this.layout[0].length, i), portalGroup.link, MyGame.pcop(portalGroup.playerStart)));
                            break;
                        case MyGame.Direction.Down:
                            portals.push(new MyGame.OutsideBoundsPortal(main, MyGame.pof(i, this.layout.length), portalGroup.link, MyGame.pcop(portalGroup.playerStart)));
                    }
                }
            }
            return portals;
        };
        Island.prototype.getAdjustedPosition = function (point) {
            if (!this.paddingOffset) {
                return point.clone();
            }
            return point.add(this.paddingOffset.x, this.paddingOffset.y);
        };
        Island.prototype.getDialogStates = function () {
            return this.dialogStates.slice();
        };
        Island.prototype.saveDialogState = function (x, y, lastViewed) {
            var matching = this.dialogStates.filter(function (d) { return d.x === x && d.y === y; });
            if (matching.length > 0) {
                matching[0].lastViewed = lastViewed;
            }
            else {
                this.dialogStates.push({ x: x, y: y, lastViewed: lastViewed });
            }
        };
        Island.prototype.makeTriggers = function (main) {
            return this.triggers.map(function (t) {
                switch (t.type) {
                    case MyGame.TriggerType.REGULAR:
                        return new MyGame.Trigger(main, t.x, t.y, t.width, t.height, t.action);
                    case MyGame.TriggerType.MOVE_NPC:
                        return new MyGame.NPCMoveTrigger(main, t.x, t.y, t.width, t.height, t.name);
                }
            });
        };
        Island.prototype.getPadChar = function (type) {
            switch (type) {
                case IslandType.INSIDE:
                    return "b";
                case IslandType.OUTSIDE:
                    return " ";
                case IslandType.WATER:
                    return "o";
            }
        };
        return Island;
    }());
    MyGame.Island = Island;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    function loadIsland(num) {
        if (!MyGame.islandGetters[num]) {
            throw new Error("No island defined for number " + num + ".");
        }
        return MyGame.islandGetters[num]();
    }
    var Location = (function () {
        function Location(island, x, y) {
            this.island = island;
            this.x = x;
            this.y = y;
        }
        Location.prototype.equals = function (other) {
            return other.island === this.island
                && other.x === this.x
                && other.y === this.y;
        };
        Location.prototype.setXY = function (point) {
            this.x = point.x;
            this.y = point.y;
        };
        return Location;
    }());
    MyGame.Location = Location;
    var Dialogs = (function () {
        function Dialogs() {
        }
        return Dialogs;
    }());
    MyGame.Dialogs = Dialogs;
    var Layout = (function () {
        function Layout() {
        }
        return Layout;
    }());
    MyGame.Layout = Layout;
    var WorldManager = (function () {
        function WorldManager() {
            this.islands = [];
        }
        WorldManager.getInstance = function () {
            return this.instance || (this.instance = new WorldManager());
        };
        WorldManager.prototype.getIsland = function (num) {
            if (num < 0) {
                throw new Error("num must be non-negative.");
            }
            while (this.islands.length < num - 1) {
                this.islands.push(null);
            }
            return this.islands[num] || (this.islands[num] = loadIsland(num));
        };
        WorldManager.prototype.changeLayout = function (islandNum, position, symbol) {
            this.getIsland(islandNum);
            if (symbol.length > 1) {
                throw new Error("symbol must be a single character.");
            }
            var oldRow = this.islands[islandNum].layout[position.y];
            this.islands[islandNum].layout[position.y] = "" + oldRow.substring(0, position.x) + symbol + oldRow.substring(position.x + 1);
        };
        WorldManager.prototype.exportLayouts = function () {
            var layouts = [];
            for (var i = 0; i < this.islands.length; i++) {
                if (this.islands[i]) {
                    var copy = this.islands[i].layout.slice();
                    layouts.push({ num: i, layout: copy });
                }
            }
            return layouts;
        };
        WorldManager.prototype.importLayouts = function (layouts) {
            var _this = this;
            layouts.forEach(function (l) {
                _this.getIsland(l.num).layout = l.layout;
            });
        };
        WorldManager.prototype.exportDialogs = function () {
            var dialogs = [];
            for (var i = 0; i < this.islands.length; i++) {
                if (this.islands[i]) {
                    dialogs.push({ num: i, dialogs: this.islands[i].getDialogStates() });
                }
            }
            return dialogs;
        };
        WorldManager.prototype.importDialogs = function (main, dialogs) {
            var _this = this;
            dialogs.forEach(function (ds) {
                var island = _this.getIsland(ds.num);
                ds.dialogs.forEach(function (d) {
                    island.saveDialogState(d.x, d.y, d.lastViewed);
                });
            });
        };
        return WorldManager;
    }());
    MyGame.WorldManager = WorldManager;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var PatternDisplayer = (function () {
        function PatternDisplayer(game, enemy) {
            this.fontStyle = { font: "14px okeydokey", fill: "#000000" };
            this.game = game;
            this.isDisplaying = false;
            this.tempo = MyGame.Utils.bpmToMilliseconds(enemy.tempo);
            this.minNumNotes = enemy.minNumNotes;
            this.maxNumNotes = enemy.maxNumNotes;
            var allowedNotes = [Phaser.KeyCode.W, Phaser.KeyCode.A,
                Phaser.KeyCode.S, Phaser.KeyCode.D, Phaser.KeyCode.O, Phaser.KeyCode.K];
            this.generator = new MyGame.PatternGenerator(enemy.patternLength, enemy.beatLength, allowedNotes);
        }
        PatternDisplayer.prototype.display = function () {
            if (this.isDisplaying) {
                return;
            }
            this.isDisplaying = true;
            this.noteDisplays = [];
            var numNotes = Math.floor(Math.random() + (this.maxNumNotes - this.minNumNotes)) + this.minNumNotes;
            this.currentPattern = this.generator.generate(numNotes);
            for (var i = 0; i < this.generator.length; i++) {
                this.game.time.events.add(this.tempo * i, this.showNote, this, i);
            }
            this.game.time.events.add((this.generator.length + 1) * this.tempo, function () {
                this.isDisplaying = false;
            }, this);
            return this.currentPattern;
        };
        PatternDisplayer.prototype.reset = function () {
            this.currentPattern = null;
            this.isDisplaying = false;
            if (this.noteDisplays !== undefined) {
                this.noteDisplays.forEach(function (disp) {
                    disp.destroy();
                });
            }
        };
        PatternDisplayer.prototype.showNote = function (position) {
            var notes = this.currentPattern.filter(function (value) {
                return value.position === position;
            });
            var noteOrNull = notes.length > 0 ? notes[0].key : null;
            this.noteDisplays.push(new NoteDisplay(this.game, noteOrNull, position % this.generator.beatLength === 0, true, position, this.generator.length));
            switch (noteOrNull) {
                case this.game.inputs.down.keyCode:
                    this.game.enemyDisplay.moveDown();
                    break;
                case this.game.inputs.up.keyCode:
                    this.game.enemyDisplay.moveUp();
                    break;
                case this.game.inputs.left.keyCode:
                    this.game.enemyDisplay.moveLeft();
                    break;
                case this.game.inputs.right.keyCode:
                    this.game.enemyDisplay.moveRight();
                    break;
                case this.game.inputs.O.keyCode:
                    this.game.enemyDisplay.pressO();
                    break;
                case this.game.inputs.K.keyCode:
                    this.game.enemyDisplay.pressK();
            }
            this.game.time.events.add(this.tempo / 2, this.game.enemyDisplay.reset, this.game.enemyDisplay);
        };
        return PatternDisplayer;
    }());
    MyGame.PatternDisplayer = PatternDisplayer;
    var NoteDisplay = (function (_super) {
        __extends(NoteDisplay, _super);
        function NoteDisplay(state, note, isBeat, isTop, position, patternLength) {
            var _this = this;
            var frame = NoteDisplay.getKeyFrame(note, isBeat);
            var width = MyGame.SCREEN_WIDTH - 44;
            var xPosition = (width / (patternLength - 1)) * position + 22;
            var yPosition = isTop ? 22 : 56;
            _this = _super.call(this, state.game, xPosition, yPosition, MyGame.Assets.Sprites.RhythmSymbols.key, frame) || this;
            _this.anchor.set(0.5, 0.5);
            state.add.existing(_this);
            return _this;
        }
        NoteDisplay.prototype.updateFrame = function (key, isBeat) {
            this.frame = NoteDisplay.getKeyFrame(key, isBeat);
        };
        NoteDisplay.getKeyFrame = function (key, isBeat) {
            if (isBeat === void 0) { isBeat = false; }
            switch (key) {
                case Phaser.KeyCode.W:
                    return 0;
                case Phaser.KeyCode.A:
                    return 1;
                case Phaser.KeyCode.S:
                    return 2;
                case Phaser.KeyCode.D:
                    return 3;
                case Phaser.KeyCode.O:
                    return 4;
                case Phaser.KeyCode.K:
                    return 5;
            }
            return isBeat ? 7 : 6;
        };
        return NoteDisplay;
    }(Phaser.Image));
    MyGame.NoteDisplay = NoteDisplay;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var PatternMatcher = (function () {
        function PatternMatcher(game, enemy) {
            this.game = game;
            this.tempo = MyGame.Utils.bpmToMilliseconds(enemy.tempo);
            this.patternLength = enemy.patternLength;
            this.beatLength = enemy.beatLength;
            this.active = false;
            this.inputAllowed = false;
            this.numMils = enemy.patternLength * this.tempo;
            if (enemy.noteComparer) {
                this.comparer = enemy.noteComparer;
            }
            else {
                this.comparer = function (pattern, pressed, pressedCount) {
                    return MyGame.PatternUtil.getNthNote(pattern, pressedCount) === pressed;
                };
            }
        }
        PatternMatcher.prototype.begin = function (pattern) {
            this.pressCount = 0;
            this.currentPattern = MyGame.PatternUtil.convertPatternNotesToArray(pattern, this.patternLength);
            this.active = true;
            this.getFirstNote();
            this.startTime = this.game.time.now + this.tempo;
            this.noteDisplays = [];
            this.notesPressed = [];
            this.inputAllowed = true;
            for (var i = 0; i < this.patternLength; i++)
                this.noteDisplays.push(null);
            var inputs = this.game.inputs.asArray();
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].onDown.add(this.recordKeyPress, this, 0, inputs[i]);
            }
            for (var i = 0; i < this.patternLength; i++) {
                this.game.time.events.add(this.tempo * (i + 1), this.checkOnSubBeat, this, i);
            }
        };
        PatternMatcher.prototype.reset = function () {
            this.active = false;
            this.inputAllowed = false;
            this.currentPattern = null;
            this.notesPressed = null;
            this.pressCount = 0;
            var inputs = this.game.inputs.asArray();
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].onDown.removeAll();
            }
            if (this.noteDisplays !== undefined) {
                this.noteDisplays.forEach(function (disp) { disp.destroy(); });
            }
        };
        PatternMatcher.prototype.checkOnSubBeat = function (position) {
            if (this.noteDisplays[position] === null) {
                var isBeat = position % this.beatLength === 0;
                var noteDisplay = new MyGame.NoteDisplay(this.game, null, isBeat, false, position, this.patternLength);
                this.noteDisplays[position] = noteDisplay;
            }
        };
        PatternMatcher.prototype.recordKeyPress = function (key) {
            var keyCode = key.keyCode;
            if (!this.inputAllowed)
                return;
            var timePressed = this.game.time.now;
            var timeElapsed = timePressed - this.startTime;
            var position = Math.round(timeElapsed / this.tempo);
            var isBeat = position % this.beatLength === 0;
            if (this.noteDisplays[position] === null) {
                var noteDisplay = new MyGame.NoteDisplay(this.game, keyCode, isBeat, false, position, this.patternLength);
                this.noteDisplays[position] = noteDisplay;
            }
            else {
                this.noteDisplays[position].updateFrame(keyCode, isBeat);
            }
            if (!this.comparer(this.currentPattern, keyCode, this.pressCount)) {
                this.inputAllowed = false;
                this.noteDisplays[position].tint = 0xFF0000;
                return;
            }
            this.getNextNote();
            var distance = Math.round(Math.abs(timePressed - (position * this.tempo + this.startTime)));
            distance = distance < 10 ? 0 : distance;
            this.noteDisplays[position].alpha = (this.tempo / 2 - distance) / (this.tempo / 2);
            this.notesPressed.push({ note: keyCode, position: position, distance: distance });
            this.pressCount += 1;
            switch (keyCode) {
                case this.game.inputs.down.keyCode:
                    this.game.playerDisplay.moveDown();
                    break;
                case this.game.inputs.up.keyCode:
                    this.game.playerDisplay.moveUp();
                    break;
                case this.game.inputs.left.keyCode:
                    this.game.playerDisplay.moveLeft();
                    break;
                case this.game.inputs.right.keyCode:
                    this.game.playerDisplay.moveRight();
                    break;
                case this.game.inputs.O.keyCode:
                    this.game.playerDisplay.pressO();
                    break;
                case this.game.inputs.K.keyCode:
                    this.game.playerDisplay.pressK();
            }
            this.game.time.events.add(this.tempo / 2, this.game.playerDisplay.reset, this.game.playerDisplay);
        };
        PatternMatcher.prototype.getFirstNote = function () {
            this.nextNote = 0;
            while (this.currentPattern[this.nextNote] === null && this.nextNote < this.currentPattern.length) {
                this.nextNote++;
            }
        };
        PatternMatcher.prototype.getNextNote = function () {
            this.nextNote++;
            while (this.currentPattern[this.nextNote] === null && this.nextNote < this.currentPattern.length) {
                this.nextNote++;
            }
        };
        return PatternMatcher;
    }());
    MyGame.PatternMatcher = PatternMatcher;
    var NotePress = (function () {
        function NotePress() {
        }
        return NotePress;
    }());
    MyGame.NotePress = NotePress;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var PatternUtil = (function () {
        function PatternUtil() {
        }
        PatternUtil.convertPatternNotesToArray = function (notes, length) {
            var arr = [];
            for (var i = 0; i < length; i++) {
                arr.push(null);
            }
            notes.forEach(function (value) {
                if (value.position > length) {
                    throw new Error("Note position is greater than pattern length");
                }
                arr[value.position] = value.key;
            });
            return arr;
        };
        PatternUtil.getNthNote = function (pattern, position) {
            return pattern.filter(function (p) { return MyGame.Utils.isAThing(p); })[position];
        };
        return PatternUtil;
    }());
    MyGame.PatternUtil = PatternUtil;
    var PatternGenerator = (function () {
        function PatternGenerator(length, beatLength, allowedNotes) {
            if (length <= 0 || beatLength <= 0) {
                throw new Error("length and beatLength must be > 0");
            }
            if (length % beatLength !== 0) {
                throw new Error("beatLength must evenly divide length");
            }
            if (allowedNotes.length === 0) {
                throw new Error("Must be at least one allowed note.");
            }
            this.length = length;
            this.beatLength = beatLength;
            this.allowedNotes = allowedNotes;
        }
        PatternGenerator.prototype.generate = function (numNotes) {
            var usedPositions = [];
            var pattern = [];
            for (var i = 0; i < numNotes; i++) {
                var position = Math.floor(Math.random() * this.length);
                while (usedPositions.indexOf(position) !== -1) {
                    position = Math.floor(Math.random() * this.length);
                }
                usedPositions.push(position);
                pattern.push({
                    position: position,
                    key: this.allowedNotes[Math.floor(Math.random() * this.allowedNotes.length)]
                });
            }
            return pattern;
        };
        return PatternGenerator;
    }());
    MyGame.PatternGenerator = PatternGenerator;
    var PatternNote = (function () {
        function PatternNote() {
        }
        return PatternNote;
    }());
    MyGame.PatternNote = PatternNote;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var TILE_DISTANCE = 2;
    var Droppable = (function () {
        function Droppable(main, startPosition, worldKey) {
            this.main = main;
            this.startPosition = startPosition.clone();
            this.worldKey = worldKey;
        }
        Droppable.prototype.use = function () {
            var player = this.main.player;
            var rounded = MyGame.Utils.roundToClosestTile(player.position);
            var x = player.direction === MyGame.Direction.Left ? rounded.x - TILE_DISTANCE : player.direction === MyGame.Direction.Right ? rounded.x + TILE_DISTANCE : rounded.x;
            var y = player.direction === MyGame.Direction.Up ? rounded.y - TILE_DISTANCE : player.direction === MyGame.Direction.Down ? rounded.y + TILE_DISTANCE : rounded.y;
            if (MyGame.Utils.tileisClear(x, y, this.main)) {
                this.main.addItem(x, y, this.worldKey);
                return 1;
            }
            return 0;
        };
        return Droppable;
    }());
    MyGame.Droppable = Droppable;
    var Grodule = (function (_super) {
        __extends(Grodule, _super);
        function Grodule(main, startPosition) {
            var _this = _super.call(this, main, startPosition, MyGame.Assets.Sprites.Grodule.key) || this;
            _this.iconKey = MyGame.Assets.Images.GroduleIcon;
            return _this;
        }
        return Grodule;
    }(Droppable));
    MyGame.Grodule = Grodule;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    MyGame.useItem = function (type, main, x, y, direction) {
        switch (type) {
            case MyGame.Crumbs.type:
                return new MyGame.Crumbs(main, x, y, direction).use();
            case MyGame.Assets.Sprites.Grodule.key:
                return new MyGame.Grodule(main, MyGame.pof(x, y)).use();
            default:
                throw new Error("Item type " + type + " is invalid.");
        }
    };
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Projectile = (function () {
        function Projectile(main, x, y, key, direction, speed, range) {
            if (range === void 0) { range = Infinity; }
            this.main = main;
            this.sprite = main.add.sprite(x, y, key);
            main.physics.arcade.enable(this.sprite);
            this.startPosition = MyGame.pof(x, y);
            this.direction = direction;
            this.range = MyGame.isVertical(direction) ? range * MyGame.TILE_HEIGHT : range * MyGame.TILE_WIDTH;
            this.speed = speed;
            this.animations = {
                start: null,
                moving: null,
                end: null
            };
            this.state = MyGame.ProjectileState.WAITING;
            this.main.groups.projectiles.push(this);
        }
        Projectile.prototype.update = function () {
            switch (this.state) {
                case MyGame.ProjectileState.WAITING:
                    this.wait();
                    break;
                case MyGame.ProjectileState.FLYING:
                    this.fly();
                    break;
                case MyGame.ProjectileState.AFTER_FLYING:
                    this.afterFly();
                    break;
                case MyGame.ProjectileState.DONE:
                    this.remove();
            }
        };
        Projectile.prototype.use = function () {
            MyGame.Utils.moveInDirection(this.sprite.body, this.direction, this.speed);
            if (this.animations.start) {
                this.sprite.play(this.animations.start);
            }
            this.state = MyGame.ProjectileState.FLYING;
            return 1;
        };
        Projectile.prototype.fly = function () {
            if (this.sprite.position.distance(this.startPosition) > this.range) {
                this.state = MyGame.ProjectileState.AFTER_FLYING;
                return;
            }
            if (this.animations.moving) {
                this.sprite.play(this.animations.moving);
            }
        };
        Projectile.prototype.remove = function () {
            var _this = this;
            this.main.groups.projectiles = this.main.groups.projectiles.filter(function (p) { return p !== _this; });
            this.sprite.destroy();
        };
        return Projectile;
    }());
    MyGame.Projectile = Projectile;
    var Crumbs = (function (_super) {
        __extends(Crumbs, _super);
        function Crumbs(main, x, y, direction) {
            var _this = _super.call(this, main, x, y, Crumbs.type, direction, 150, 3) || this;
            _this.iconKey = MyGame.Assets.Images.CrumbsIcon;
            _this.sprite.animations.add("start", MyGame.Utils.animationArray(0, 3), 8, false);
            _this.animations.start = "start";
            _this.sprite.animations.add("end", MyGame.Utils.animationArray(4, 6), 2, false);
            _this.animations.end = "end";
            _this.main.bringGroupToTop(_this.main.groups.barriers.filter(function (b) {
                return b instanceof MyGame.Tree || b instanceof MyGame.Bush || b instanceof MyGame.StoneWall;
            }));
            _this.landed = false;
            _this.dissolved = false;
            return _this;
        }
        Crumbs.prototype.dissolve = function () {
            var _this = this;
            if (!this.dissolved) {
                this.dissolved = true;
                this.sprite.play("end");
                this.main.time.events.add(2000, function () {
                    _this.state = MyGame.ProjectileState.DONE;
                }, this);
            }
        };
        Crumbs.prototype.wait = function () { };
        Crumbs.prototype.afterFly = function () {
            if (!this.landed) {
                this.sprite.body.velocity.setTo(0, 0);
                this.landed = true;
                this.main.time.events.add(5000, this.dissolve, this);
            }
        };
        Crumbs.type = MyGame.Assets.Sprites.Crumbs.key;
        return Crumbs;
    }(Projectile));
    MyGame.Crumbs = Crumbs;
})(MyGame || (MyGame = {}));
//# sourceMappingURL=game.js.map