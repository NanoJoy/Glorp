module MyGame {
    export class SaveState {
        islandNum: number;
        layouts: Layout[];
        playerPosition: { x: number, y: number };
        dialogs: Dialogs[];
        triggers: Location[];
        npcs: { old: Location, now: Location }[];
        health: number;
    }

    export interface IGameSaver {
        saveGame: (main: Main, worldManager: WorldManager) => void;
        loadGame: () => SaveState;
        clearData: () => void;
    }

    export class GameSaver implements IGameSaver {
        private static instance: IGameSaver;
        private cached: SaveState;

        private constructor() {
        }

        static getInstance(): IGameSaver {
            return this.instance || (this.instance = new GameSaver());
        }

        saveGame(main: Main, worldManager: WorldManager) {
            let npcs = this.loadGame() ? this.loadGame().npcs : [] as { old: Location, now: Location }[];
            for (let npc of main.groups.npcs) {
                let position = npc.unloadPositionToSave();
                if (position) {
                    let old = new Location(main.island.num, npc.startX, npc.startY);
                    let matching = npcs.filter(n => n.old.equals(old));
                    if (matching.length > 0) {
                        let match = matching[0];
                        match.now = new Location(main.island.num, position.x, position.y)
                    } else {
                        npcs.push({
                            old: old,
                            now: new Location(main.island.num, position.x, position.y)
                        });
                    }
                }
            }
            let triggers = this.loadGame() ? this.loadGame().triggers : [] as Location[];
            let triggerLocations = main.triggers
                .filter(t => !t.active)
                .map(t => new Location(main.island.num, t.x, t.y));
            for (let trigger of triggerLocations) {
                let matching = triggers.filter(t => t.equals(trigger));
                if (matching.length === 0) {
                    triggers.push(trigger);
                }
            }
            let saveState = {
                islandNum: main.island.num,
                layouts: worldManager.exportLayouts(),
                playerPosition: {
                    x: Math.round(main.player.x / TILE_WIDTH),
                    y: Math.round(main.player.y / TILE_HEIGHT)
                },
                dialogs: worldManager.exportDialogs(),
                triggers: triggers,
                npcs: npcs,
                health: StateTransfer.getInstance().health
            } as SaveState
            localStorage.setItem(SAVE_FILE_NAME, JSON.stringify(saveState));
            this.cached = saveState;
        }

        loadGame() {
            if (this.cached) {
                return this.cached;
            }
            let file = localStorage.getItem(SAVE_FILE_NAME);
            if (!file) {
                return null;
            }
            this.cached = JSON.parse(file) as SaveState;
            this.cached.triggers = this.cached.triggers.map(t => new Location(t.island, t.x, t.y));
            this.cached.npcs = this.cached.npcs.map(n => {
                return {
                    old: new Location(n.old.island, n.old.x, n.old.y),
                    now: new Location(n.now.island, n.now.x, n.now.y)
                }
            });
            return this.cached;
        }

        clearData() {
            localStorage.removeItem(SAVE_FILE_NAME);
            this.cached = null;
        }
    }
}