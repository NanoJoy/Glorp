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

    export enum TriggerType {
        MOVE_NPC, REGULAR
    }
}