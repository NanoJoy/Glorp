module MyGame {
    export class SaveState {
        islandNum: number;
        layouts: Layout[];
        playerPosition: {
            x: number,
            y: number
        }
    }

    export interface IGameSaver {
        saveGame: (main: Main, worldManager: WorldManager) => void;
        loadGame: () => SaveState;
        clearData: () => void;
    }

    export class GameSaver implements IGameSaver {
        private static instance: IGameSaver;
        private alreadyLoaded: boolean;

        private constructor() {
            this.alreadyLoaded = false;
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
                }
            } as SaveState
            localStorage.setItem(SAVE_FILE_NAME, JSON.stringify(saveState));
        }

        loadGame() {
            if (this.alreadyLoaded) {
                return null
            }
            let file = localStorage.getItem(SAVE_FILE_NAME);
            if (!file) {
                return null;
            }
            this.alreadyLoaded = true;
            return JSON.parse(file) as SaveState;
        }

        clearData() {
            localStorage.removeItem(SAVE_FILE_NAME);
        }
    }
}