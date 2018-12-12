module MyGame {
    islandGetters[1] = function () {
        return new IslandBuilder(1, IslandType.OUTSIDE)
            .setLayout([
                "w  w                    ",
                "w  wwwwwwwwwwwwwwwwwwwww",
                "wn                     w",
                "w    t  n       t       ",
                "w                       ",
                "w        ooooo        nw",
                "w    t   ooooo  t      w",
                "w        ooooo        nw",
                "w                      w",
                "wwwwwwwwwwwwwwwwwwww   w",
            ])
            .setPlayerStart(pof(1, 0))
            .setOutsideBoundsPortals([
                { side: Direction.Up, start: 1, end: 4, playerStart: pof(4, 9), link: 0 },
                { side: Direction.Right, start: 3, end: 6, playerStart: pof(1, 1), link: Islands.THEMEEP },
                { side: Direction.Down, start: 20, end: 24, playerStart: pof(5, 0), link: Islands.ALBERT }
            ])
            .setNPCs([
                { position: pof(8, 3), textKey: Texts.SIGHING, type: Assets.Sprites.Albert.key, script: "rrrrrrdllllllu" },
                { position: pof(22, 5), text: "The Meep", type: Assets.Images.Sign, script: "" },
                { position: pof(22, 7), text: "Path to Tuttle Village", type: Assets.Images.Sign, script: "" },
                { position: pof(1, 2), text: "It's good to save often. You can save by pressing the SPACEBAR to pause, then pressing O when you have the Save option selected. If you die, you will be sent back to your last save.", type: Assets.Images.Sign, script: "" }
            ])
            .build();
    }
}