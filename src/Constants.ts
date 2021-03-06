module MyGame {
    export const SCREEN_WIDTH = 288;
    export const SCREEN_HEIGHT = 320;
    export const TILE_WIDTH = 28;
    export const TILE_HEIGHT = 32;

    export const DEVELOPER_MODE = true;
    export const START_ISLAND = 10;
    export const CLEAR_SAVE = false;
    export const PLAYER_START_X = 15;
    export const PLAYER_START_Y = 12;

    export var States = {
        Boot: "Boot",
        Preloader: "Preloader",
        Main: "Main",
        Battle: "Battle",
        MainMenu: "MainMenu",
        Interlude: "Interlude",
        Result: "Result"
    };

    export var Colors = {
        BLACK: 0x000000,
        GRAY: 0xEAEAEA,
        PURPLE: 0x648BFF,
        RED: 0xE22D2D
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
        static readonly Gate = {
            VERTICAL: 0,
            HORIZONTAL: 1
        }
        static readonly Button = {
            OFF: 0,
            ON: 1
        }
        static readonly ResultText = {
            LOSE: 0,
            WIN: 1
        }
    }

    export class SpriteAsset {
        readonly key: string;
        readonly width: number;
        readonly height: number;
        readonly frames: number;

        constructor(key: string, width?: number, height?: number) {
            this.key = key;
            this.width = width === undefined ? TILE_WIDTH : width;
            this.height = height === undefined ? TILE_HEIGHT : height;
        }
    }

    class SpriteAssets {
        [key: string]: SpriteAsset;
        Airhorn = new SpriteAsset("airhorn");
        Albert = new SpriteAsset("albert");
        Arrow = new SpriteAsset("arrow", 12, 12);
        Blackness = new SpriteAsset("blackness");
        Blish = new SpriteAsset("blish");
        Blumpus = new SpriteAsset("blumpus", 56, 32);
        Bush = new SpriteAsset("bush");
        Button = new SpriteAsset("button");
        ChuFeng = new SpriteAsset("chu_feng");
        Croller = new SpriteAsset("croller");
        CrollerBattle = new SpriteAsset("croller_battle", 136, 136);
        Crumbs = new SpriteAsset("crumbs");
        DoorWay = new SpriteAsset("doorway", 36, 8);
        Foller = new SpriteAsset("foller");
        FollerBattle = new SpriteAsset("foller_battle", 136, 136);
        Gate = new SpriteAsset("gate");
        Grodule = new SpriteAsset("grodule");
        Grounds = new SpriteAsset("grounds");
        House = new SpriteAsset("house", 112, 96);
        Instrument = new SpriteAsset("instrument", 56, 64);
        JamBugBattle = new SpriteAsset("jambug_battle", 136, 136);
        JamBotWorld = new SpriteAsset("jambot_world");
        JamBugWorld = new SpriteAsset("jambug_world");
        Monster = new SpriteAsset("monster", 40, 46);
        NoteStatus = new SpriteAsset("note_status", 24, 24);
        OldMan = new SpriteAsset("old_man");
        Player = new SpriteAsset("player");
        PlayerBattle = new SpriteAsset("player_battle", 136, 136);
        Plorpus = new SpriteAsset("plorpus");
        ProjectileDisplay = new SpriteAsset("projectile_display", 56, 32);
        ResultText = new SpriteAsset("result_text", 64, 28);
        RhythmSymbols = new SpriteAsset("rhythm_symbols", 24, 24);
        Stanley = new SpriteAsset("stanley");
        StoneWall = new SpriteAsset("stone_wall");
        TheMeep = new SpriteAsset("the_meep", 224, 320);
        TallGrass = new SpriteAsset("tall_grass", 28, 16);
        Tree = new SpriteAsset("tree", 56, 64);
        Water = new SpriteAsset("water");
    }

    class ImageAssets {
        [key: string]: string;
        AirhornIcon = "airhorn_icon";
        Banner = "banner";
        Bar = "bar";
        Batteries = "batteries";
        BatteriesIcon = "batteries_icon";
        BlackScreen = "black_screen";
        Book = "book";
        Bottle = "bottle";
        BottomTextBackground = "bottom_text_background";
        Bridge = "bridge";
        ButtonPrompt = "button_prompt";
        Couch = "couch";
        CrumbsIcon = "crumbs_icon";
        CrumbsSource = "crumbs_source";
        Door = "door";
        Fruit = "fruit";
        FruitStand = "fruit_stand";
        GroduleIcon = "grodule_icon";
        HealthBarContainer = "healthbar_container";
        JamBotBattle = "jambot_battle";
        Lillypad = "lillypad";
        LoadingBar = "loading_bar";
        MenuBackground = "menu_background";
        OptionsBackground = "options_background";
        Oven = "oven";
        OvenBattle = "oven_battle";
        Path = "path";
        PlorpusIcon = "plorpus_icon";
        RosieDead = "rosie_dead";
        Rug = "rug";
        Sign = "sign";
        TileFloor = "tile_floor";
        Title = "title";
        Wall = "wall";
    }

    export class AudioAsset {
        key: string;
        measures: number;

        constructor(key: string, measures?: number) {
            this.key = key;
            this.measures = measures;
        }
    }

    class AudioAssets {
        [key: string]: AudioAsset;
        Airhorn = new AudioAsset("airhorn");
        Beep = new AudioAsset("beep");
        Blumpus = new AudioAsset("blumpus", 8);
        Bottle = new AudioAsset("bottle");
        Collide = new AudioAsset("collide");
        Croller = new AudioAsset("croller", 12);
        Foller = new AudioAsset("foller", 8);
        DeathJingle = new AudioAsset("death_jingle");
        Doodle = new AudioAsset("doodle");
        Instrument = new AudioAsset("instrument");
        JamBot = new AudioAsset("jambot", 8);
        JamBug = new AudioAsset("jambug", 8);
        Monster = new AudioAsset("monster", 4);
        Oven = new AudioAsset("oven", 8);
        Right = new AudioAsset("right");
        VictoryJingle = new AudioAsset("victory_jingle");
        World = new AudioAsset("world");
        Wrong = new AudioAsset("wrong");
    }

    export var Assets = {
        Sprites: new SpriteAssets(),
        Images: new ImageAssets(),
        Audio: new AudioAssets(),
        FontName: "testbitmap",
        FontSize: 14
    }

    export const VISUAL_ASSETS_PATH = "assets/visual";
    export const AUDIO_ASSETS_PATH = "assets/audio";
    export const PNG = "png";
    export const MP3 = "mp3";
    export const SAVE_FILE_NAME = "GlorpGlorpGlorp";
    export const ICON = "icon";
    export const SOURCE = "source";
}			