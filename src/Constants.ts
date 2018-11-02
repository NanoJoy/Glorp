module MyGame {
    export const SCREEN_WIDTH = 288;
    export const SCREEN_HEIGHT = 320;
    export const TILE_WIDTH = 28;
    export const TILE_HEIGHT = 32;

    export const DEVELOPER_MODE = true;
    export const START_ISLAND = 3;
    export const CLEAR_SAVE = true;

    export var States = {
        Boot: "Boot",
        Preloader: "Preloader",
        Main: "Main",
        Battle: "Battle"
    };

    export class SpriteAsset {
        readonly key: string;
        readonly width: number;
        readonly height: number;

        constructor(key: string, width?: number, height?: number) {
            this.key = key;
            this.width = width === undefined ? TILE_WIDTH : width;
            this.height = height === undefined ? TILE_HEIGHT : height;
        }
    }

    class SpriteAssets {
        [key: string]: SpriteAsset;
        Albert = new SpriteAsset("albert");
        Arrow = new SpriteAsset("arrow", 12, 12);
        Blackness = new SpriteAsset("blackness");
        Bush = new SpriteAsset("bush");
        DoorWay = new SpriteAsset("doorway", 36, 8);
        Grounds = new SpriteAsset("grounds");
        JamBotWorld = new SpriteAsset("jambot_world");
        JamBugWorld = new SpriteAsset("jambug_world");
        OldMan = new SpriteAsset("old_man");
        Player = new SpriteAsset("player");
        RhythmSymbols = new SpriteAsset("rhythm_symbols", 24, 24);
        StoneWall = new SpriteAsset("stone_wall");
        Tree = new SpriteAsset("tree", 56, 64);
        Water = new SpriteAsset("water");
    }

    class ImageAssets {
        [key: string]: string;
        BottomTextBackground = "bottom_text_background";
        ButtonPrompt = "button_prompt";
        Door = "door";
        Gate = "gate";
        HealthBarContainer = "healthbar_container";
        House = "house";
        JamBotBattle = "jambot_battle";
        Lillypad = "lillypad";
        MenuBackground = "menu_background";
        OptionsBackground = "options_background";
        PlayerBattle = "player_battle";
        Sign = "sign";
        TileFloor = "tile_floor";
        Wall = "wall";
    }

    export var Assets = {
        Sprites: new SpriteAssets(),
        Images: new ImageAssets(),
        FontName: "testbitmap"
    }

    export var VISUAL_ASSETS_PATH = "assets/visual";
    export var PNG = "png";
    export var SAVE_FILE_NAME = "GlorpGlorpGlorp";
}			