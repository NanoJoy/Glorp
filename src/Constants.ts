module MyGame {
    export var Constants = {
        SCREEN_WIDTH: 288,
        SCREEN_HEIGHT: 320,
        TILE_WIDTH: 28,
        TILE_HEIGHT: 32
    }

    export class SpriteAsset {
        readonly key: string;
        readonly width: number;
        readonly height: number;

        constructor(key: string, width?: number, height?: number) {
            this.key = key;
            this.width = width === undefined ? Constants.TILE_WIDTH : width;
            this.height = height === undefined ? Constants.TILE_HEIGHT : height;
        }
    }

    class SpriteAssets {
        [key: string]: SpriteAsset;
        Player = new SpriteAsset("player");
        Grounds = new SpriteAsset("grounds");
        Water = new SpriteAsset("water");
        Arrow = new SpriteAsset("arrow", 12, 12);
        RhythmSymbols = new SpriteAsset("rhythm_symbols", 24, 24);
    }

    class ImageAssets {
        [key: string]: string;
        Ball = "ball";
        BottomTextBackground = "bottom_text_background";
        OptionsBackground = "options_background";
    }

    export var Assets = {
        Sprites: new SpriteAssets(),
        Images: new ImageAssets()
    }

    export var VISUAL_ASSETS_PATH = "assets/visual";
    export var PNG = "png";
}			