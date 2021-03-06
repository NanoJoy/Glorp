module MyGame {
    export class Flags {
        [key: string]: boolean;
    }
    export class StateTransfer {
        enemy: Enemy;
        island: number;
        position: Phaser.Point;
        health: number;
        reason: TransferReason;
        dialogs: Dialogs[];
        triggers: Location[];
        npcs: NPCInfo[];
        funcs: (main: Main) => void;
        addedItems: { location: Location, type: string }[];
        heldItems: { type: string, amount: number }
        flags: Flags;
        interlude: InterludeSpec;
        private static instance: StateTransfer;

        private constructor() {
            this.enemy = null;
            this.island = -1;
            this.position = null;
            this.health = -1;
            this.reason = TransferReason.NONE;
            this.dialogs = [];
            this.triggers = [];
            this.npcs = [];
            this.funcs = null;
            this.addedItems = [];
            this.heldItems = null;
            this.flags = new Flags();
            this.interlude = null;
        }

        static getInstance() {
            return StateTransfer.instance || (StateTransfer.instance = new StateTransfer);
        }

        loadFromSave(saveState: SaveState) {
            this.island = saveState.islandNum;
            this.position = pof(saveState.playerPosition.x, saveState.playerPosition.y);
            this.health = saveState.health;
            this.addedItems = saveState.items;
            this.heldItems = saveState.heldItems;
            this.flags = saveState.flags;
            this.flags["USE_SAVE"] = true;
        }
    }
}