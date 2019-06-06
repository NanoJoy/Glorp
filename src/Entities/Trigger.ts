module MyGame {
    export class Trigger {
        name: string;
        main: Main;
        area: Phaser.Sprite;
        x: number;
        y: number;
        active: boolean;
        action: (main: Main, trigger: Trigger) => void;
        
        constructor(main: Main, x: number, y: number, width: number, height: number, 
            action: (main: Main, trigger: Trigger) => void, name?: string) {
            this.x = x;
            this.y = y;
            this.main = main;
            this.area = main.add.sprite(x * TILE_WIDTH, y * TILE_HEIGHT, null);
            main.physics.arcade.enable(this.area);
            this.area.body.setSize(width * TILE_WIDTH, height * TILE_HEIGHT, 0, 0);
            this.action = action;
            this.active = true;
            this.name = name;
        }

        checkPlayerOverlap() {
            if (!this.active) {
                return;
            }
            this.main.physics.arcade.overlap(this.area, this.main.player, this.performAction, null, this);
        }

        performAction() {
            this.action(this.main, this);
            this.active = false;
        }
    }

    export class NPCMoveTrigger extends Trigger {
        constructor(main: Main, x: number, y: number, width: number, height: number, name: string) {
            super(main, x, y, width, height, null, name);
            this.action = this.moveNPCAction;
        }

        moveNPCAction(main: Main, trigger: Trigger) {
            var matchingNPCs = main.groups.npcs.filter(n => n.matchesTrigger(trigger.name));
            if (matchingNPCs.length !== 1) {
                throw new Error(`Expected exactly one NPC with trigger name "${trigger.name}". Found ${matchingNPCs.length}.`);
            }
            var matchingNPC = matchingNPCs[0];
            main.stopPlayer();
            matchingNPC.doTrigger(trigger.name);
        }
    }

    export class Button implements Entity {
        sprite: Phaser.Sprite;
        main: Main;
        position: Phaser.Point;
        action: (main: Main, button: Button) => void;
        private on: boolean;
        private colliders: Phaser.Sprite[];
        private direction: Direction;
        private originalResetTime: number;
        private resetTime: number;


        constructor(main: Main, x: number, y: number, direction: Direction, action: (main: Main, button: Button) => void, backgroundType: IslandType, resetTime = -1) {
            this.main = main;
            this.position = pof(x, y);

            this.sprite = main.add.sprite((x + 0.5) * TILE_WIDTH, y * TILE_HEIGHT, Assets.Sprites.Button.key, Frames.Button.OFF);
            this.sprite.anchor.x = 0.5;
            if (direction === Direction.Left) {
                this.sprite.scale.x = -1;
            }
            main.physics.arcade.enable(this.sprite);
            this.sprite.body.moves = false;
            this.sprite.body.immovable = true;
            this.sprite.body.setSize(TILE_WIDTH * 1.2, TILE_HEIGHT, 0, direction === Direction.Right ? 0 : -(TILE_WIDTH * 0.2));
            this.action = action;
            this.direction = direction;
            this.on = false;
            this.resetTime = this.originalResetTime = resetTime;

            switch (backgroundType) {
                case IslandType.WATER:
                    main.groups.barriers.push(new Water(main, pof(x, y)));
                default:
                    main.groups.grounds.push(Ground.makeGround(main, backgroundType, pof(x, y), false));
            }
        }

        onStageBuilt() {
            this.colliders = this.main.groups.creatures.filter(c => c instanceof Blish).map(b => b.sprite);
            this.colliders.push(this.main.player);
        }

        update() {
            let collide = (sp: Phaser.Sprite, otherSp: Phaser.Sprite) => {
                if (!this.on && ((this.direction === Direction.Right && otherSp.left >= sp.right) || (this.direction === Direction.Left && otherSp.right <= sp.left))) {
                    this.turnOn();
                    this.action(this.main, this);
                    if (this.resetTime !== -1) {
                        this.main.time.events.add(this.resetTime, this.turnOff, this);
                    }
                }
            }
            this.main.physics.arcade.collide(this.sprite, this.colliders, collide, null, this);
        }

        turnOn() {
            this.on = true;
            this.sprite.frame = Frames.Button.ON;
        }

        turnOff() {
            this.on = false;
            this.sprite.frame = Frames.Button.OFF;
            this.resetTime = this.originalResetTime;
        }

        isOn(): boolean {
            return this.on;
        }

        keepOn() {
            this.turnOn();
            this.resetTime = -1;
        }
    }

    export enum TriggerType {
        MOVE_NPC, REGULAR,
    }
}