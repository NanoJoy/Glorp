module MyGame {
    export var SCREEN_WIDTH = 288;
    export var SCREEN_HEIGHT = 320;
    export var TILE_WIDTH = 28;
    export var TILE_HEIGHT = 32;

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
        Arrow = new SpriteAsset("arrow", 12, 12);
        Blackness = new SpriteAsset("blackness");
        DoorWay = new SpriteAsset("doorway", 26, 8);
        Grounds = new SpriteAsset("grounds");
        JamBotWorld = new SpriteAsset("jambot_world");
        OldMan = new SpriteAsset("old_man");
        Player = new SpriteAsset("player");
        RhythmSymbols = new SpriteAsset("rhythm_symbols", 24, 24);
        StoneWall = new SpriteAsset("stone_wall");
        Water = new SpriteAsset("water");
    }

    class ImageAssets {
        [key: string]: string;
        BottomTextBackground = "bottom_text_background";
        ButtonPrompt = "button_prompt";
        HealthBarContainer = "healthbar_container";
        House = "house";
        JamBotBattle = "jambot_battle";
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