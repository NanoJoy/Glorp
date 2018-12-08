module MyGame {
    export function getTheMeepText(): ITextManager {
        function onFinish(main: Main, parent: Entity) {
            main.player.position.setTo(TILE_WIDTH, TILE_HEIGHT);
            main.add.tween(main.player).from({ tint: 0xff0000 }, 1000, Phaser.Easing.Linear.None, true);
        }
        return new TextManager([new TextEncounter(new TextDump("Grr...", new TextDump("..rrrRRRrrr...")),
            true, onFinish)]);
    }
}