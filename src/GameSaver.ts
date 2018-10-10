module MyGame {
    export class SaveState {
        islandNum: number;
        layouts: Layout[];
        playerPosition: { x: number, y: number };
        dialogs: Dialogs[];
        triggers: Location[];
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
            let saveState = {
                islandNum: main.island.num,
                layouts: worldManager.exportLayouts(),
                playerPosition: {
                    x: Math.round(main.player.x / TILE_WIDTH),
                    y: Math.round(main.player.y / TILE_HEIGHT)
                },
                dialogs: worldManager.exportDialogs(),
                triggers: main.triggers.filter(t => !t.active)
                    .map(t => { return { island: main.island.num, x: t.x, y: t.y } })
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
            return this.cached;
        }

        clearData() {
            localStorage.removeItem(SAVE_FILE_NAME);
            this.cached = null;
        }
    }
}