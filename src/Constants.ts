module MyGame {
    export const SCREEN_WIDTH = 288;
    export const SCREEN_HEIGHT = 320;
    export const TILE_WIDTH = 28;
    export const TILE_HEIGHT = 32;

    export const DEVELOPER_MODE = true;
    export const START_ISLAND = 6;
    export const CLEAR_SAVE = false;
    export const PLAYER_START_X = 18;
    export const PLAYER_START_Y = 3;

    export var States = {
        Boot: "Boot",
        Preloader: "Preloader",
        Main: "Main",
        Battle: "Battle"
    };

    export class Frames {
        static readonly Arrow = {
            UP: 0,
            DOWN: 1,
            LEFT: 3,
            RIGHT: 2,
            O: 4
        }
        static readonly PlayerBattle = {
            OUTSIDE: 0,
            INSIDE: 1
        }
    }

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
        Blish = new SpriteAsset("blish");
        Bush = new SpriteAsset("bush");
        Crumbs = new SpriteAsset("crumbs");
        DoorWay = new SpriteAsset("doorway", 36, 8);
        Grodule = new SpriteAsset("grodule");
        Grounds = new SpriteAsset("grounds");
        House = new SpriteAsset("house", 112, 96);
        JamBotWorld = new SpriteAsset("jambot_world");
        JamBugWorld = new SpriteAsset("jambug_world");
        OldMan = new SpriteAsset("old_man");
        Player = new SpriteAsset("player");
        PlayerBattle = new SpriteAsset("player_battle", 136, 136)
        RhythmSymbols = new SpriteAsset("rhythm_symbols", 24, 24);
        Stanley = new SpriteAsset("stanley");
        StoneWall = new SpriteAsset("stone_wall");
        TheMeep = new SpriteAsset("the_meep", 224, 320);
        Tree = new SpriteAsset("tree", 56, 64);
        Water = new SpriteAsset("water");
    }

    class ImageAssets {
        [key: string]: string;
        BottomTextBackground = "bottom_text_background";
        ButtonPrompt = "button_prompt";
        Couch = "couch";
        CrumbsIcon = "crumbs_icon";
        CrumbsSource = "crumbs_source";
        Door = "door";
        FruitStand = "fruit_stand";
        Gate = "gate";
        GroduleIcon = "grodule_icon";
        HealthBarContainer = "healthbar_container";
        JamBotBattle = "jambot_battle";
        Lillypad = "lillypad";
        MenuBackground = "menu_background";
        OptionsBackground = "options_background";
        Oven = "oven";
        OvenBattle = "oven_battle";
        ProjectileDisplay = "projectile_display";
        Rug = "rug";
        Sign = "sign";
        TileFloor = "tile_floor";
        Wall = "wall";
    }

    export var Assets = {
        Sprites: new SpriteAssets(),
        Images: new ImageAssets(),
        FontName: "testbitmap",
        FontSize: 14
    }

    export const VISUAL_ASSETS_PATH = "assets/visual";
    export const PNG = "png";
    export const SAVE_FILE_NAME = "GlorpGlorpGlorp";
    export const ICON = "icon";
    export const SOURCE = "source";
}			