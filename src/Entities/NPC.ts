module MyGame {
    export class NPCInfo {
        old: Location;
        now: Location;
        script?: MovementScript;
        speed?: number;

        constructor(npc: NPC) {
            this.old = new Location(npc.main.island.num, npc.startX, npc.startY);
        }
    }

    export abstract class NPC implements Entity, Moveable {
        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        direction: Direction;
        speed: number;
        startX: number;
        startY: number;
        movementManager: MovementManager;
        private textManager: ITextManager;
        private textDisplay: TextDisplay;
        private buttonPrompt: ButtonPrompt;
        private doingScript: boolean;
        private textShowing: boolean;
        private notDefaultAnims: boolean;
        private saveInfo: NPCInfo;

        constructor(main: Main, position: Phaser.Point, textManager: ITextManager, movementScript: MovementScript,
        speed: number, animationSpeed: number, spriteKey: string, notDefaultAnims = false) {
            this.main = main;
            this.startX = position.x;
            this.startY = position.y;
            this.position = position.clone();
            this.speed = speed;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, spriteKey);
            main.physics.arcade.enable(this.sprite);
            if (spriteKey !== Assets.Images.Sign || notDefaultAnims) {
                Utils.addPersonAnimations(this.sprite, animationSpeed);
            }

            this.notDefaultAnims = notDefaultAnims;
            this.textManager = textManager;
            this.textDisplay = new BottomTextDisplay(main, this);
            this.buttonPrompt = new ButtonPrompt(this, main.inputs.O, -4);

            if (movementScript) {
                this.movementManager = new MovementManager(main.game, movementScript, this);
            } else {
                this.sprite.body.moves = false;
            }
            this.sprite.body.immovable = true;
            this.direction = Direction.Down;
            this.textShowing = false;

            this.saveInfo = new NPCInfo(this);
        }

        onStageBuilt() {
            if (this.movementManager && !this.movementManager.hasTrigger && !this.doingScript) {
                this.movementManager.start();
            }
        }

        playerStoppedUpdate() {
            if (this.movementManager && !this.movementManager.paused) {
                
                let anim = this.movementManager.currentlyStationary() ? Utils.getIdleAnimName(this.direction) : Utils.getWalkingAnimName(this.direction);
                if (anim && anim !== this.sprite.animations.currentAnim.name) {
                    this.sprite.play(anim);
                }
            }
        }

        update() {
            let player = this.main.player;
            if ((!this.movementManager || this.movementManager.interruptable)
                && Utils.getEdgeDistance(this.sprite, this.main.player) < TILE_HEIGHT / 2) {
                if (this.movementManager) {
                    this.buttonPrompt.reposition(this.sprite.x, this.sprite.y, -4);
                    this.movementManager.pause();
                }
                this.buttonPrompt.show();
                if (player.centerY < this.sprite.y) {
                    this.direction = Direction.Up;
                } else if (player.centerY > this.sprite.bottom) {
                    this.direction = Direction.Down;
                } else if (player.centerX < this.sprite.left) {
                    this.direction = Direction.Left;
                } else {
                    this.direction = Direction.Right;
                }
                if (!(this instanceof Sign) && !this.notDefaultAnims) {
                    this.sprite.play(Utils.getIdleAnimName(this.direction));
                }
            } else {
                this.buttonPrompt.hide();
                if (this.movementManager) {
                    this.movementManager.resume();
                }
            }

            if (this.movementManager && !this.movementManager.paused) {
                
                let anim = this.movementManager.currentlyStationary() ? Utils.getIdleAnimName(this.direction) : Utils.getWalkingAnimName(this.direction);
                if (anim && anim !== this.sprite.animations.currentAnim.name) {
                    this.sprite.play(anim);
                }
            }

            this.showText();
            this.main.physics.arcade.collide(this.sprite, this.main.player);
        }

        showText(override = false) {
            if (override || this.shouldShowText()) {
                this.buttonPrompt.hide();
                if (!this.notDefaultAnims) {
                    let anim = Utils.getIdleAnimName(this.direction);
                    if (this.sprite.animations.currentAnim && anim !== this.sprite.animations.currentAnim.name) {
                        this.sprite.play(anim);
                    }
                }
                this.textDisplay.start(this.textManager.useNext(this.main, this));
                this.textShowing = true;
            }
        }

        setDialogState(lastViewed: number) {
            this.textManager.setLastViewed(lastViewed);
        }

        matchesTrigger(name: string): boolean {
            return this.movementManager && this.movementManager.hasTrigger && this.movementManager.triggerName === name;
        }

        doTrigger(name: string): void {
            if (this.movementManager && this.movementManager.hasTrigger && this.movementManager.triggerName === name) {
                this.saveInfo.old.setXY(Utils.getEndPosition(pof(this.startX, this.startY), this.movementManager.script.directions));
                this.movementManager.start();
                if (!this.movementManager.loop) {
                    this.movementManager.setOnComplete(this.showText, this, true);
                }
            }
        }

        doScript(directions: string, start?: Phaser.Point, interruptable = false) {
            if (this.movementManager) {
                this.movementManager.pause();
            }
            start = start ? start : pof(Math.floor(this.sprite.x / TILE_WIDTH), Math.floor(this.sprite.y / TILE_WIDTH));

            let script = Utils.makeMovementScript(start, directions);
            this.movementManager = new MovementManager(this.main.game, script, this);
            this.movementManager.interruptable = interruptable;
            this.doingScript = true;
            if (interruptable) {
                this.saveInfo.script = script;
            }
            this.movementManager.start(true);
        }

        setSpeed(speed: number) {
            this.speed = speed;
            this.saveInfo.speed = speed;
        }

        savePosition(x?: number, y?: number): void {
            if (!Utils.isAThing(this.saveInfo.now)) {
                this.saveInfo.now = new Location(this.main.island.num, 0, 0);
            }
            if (x === undefined && y === undefined) {
                this.saveInfo.now.setXY(pof(Math.floor(this.sprite.x / TILE_WIDTH), Math.floor(this.sprite.y / TILE_WIDTH)));
                return;
            }
            this.saveInfo.now.setXY(pof(x ? x : 0, y ? y : 0));
        }

        unloadSaveInfo(): NPCInfo {
            var temp = this.saveInfo;
            this.saveInfo = new NPCInfo(this);
            return temp;
        }

        hasSaveInfo(): boolean {
            return this.saveInfo.now !== undefined || this.saveInfo.script !== undefined || this.saveInfo.speed !== undefined;
        }

        setPosition(location: Location) {
            this.sprite.x = location.x * TILE_WIDTH;
            this.sprite.y = location.y * TILE_HEIGHT;
        }

        private shouldShowText(): boolean {
            if (this.textShowing) {
                if (!this.buttonPrompt.input.isDown) {
                    this.textShowing = false;
                }
                return false;
            }
            return this.buttonPrompt.isShowing() && (this.textManager.getNext(this.main, this).autoStart || this.buttonPrompt.buttonIsDown());
        }
    }

    export class Albert extends NPC {
        constructor(main: Main, position: Phaser.Point, textManager: ITextManager, movementScript: MovementScript) {
            super(main, position, textManager, movementScript, 750, 5, Assets.Sprites.Albert.key);
        }
    }

    export class OldMan extends NPC {
        constructor(main: Main, position: Phaser.Point, textManager: ITextManager, movementScript: MovementScript) {
            super(main, position, textManager, movementScript, 1000, 3, Assets.Sprites.OldMan.key);
        }
    }

    export class Sign extends NPC {
        constructor(main: Main, position: Phaser.Point, textManager: ITextManager) {
            super (main, position, textManager, null, 0, 0, Assets.Images.Sign);
        }
    }

    export class Stanley extends NPC {
        constructor(main: Main, position: Phaser.Point, textManager: ITextManager, movementScript: MovementScript) {
            super(main, position, textManager, movementScript, 500, 7, Assets.Sprites.Stanley.key);
        }
    }

    export class TheMeep extends NPC {
        constructor(main: Main, position: Phaser.Point, textManager: ITextManager) {
            super(main, position, textManager, null, 0, 0, Assets.Sprites.TheMeep.key, true);
            this.sprite.animations.add("plop", Utils.animationArray(0, 3), 5, true);
            this.sprite.animations.play("plop");
        }
    }
}