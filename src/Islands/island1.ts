module MyGame {
    islandGetters[1] = function () {
        return new IslandBuilder(1, IslandType.OUTSIDE)
            .setLayout([
                "w  w                    ",
                "w  wwwwwwwwwwwwwwwwwwwww",
                "w                      w",
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
                { side: Direction.Right, start: 3, end: 6, playerStart: undefined, link: 2 },
                { side: Direction.Down, start: 20, end: 24, playerStart: pof(5, 0), link: 3 }
            ])
            .setNPCs([
                { position: pof(8, 3), textKey: Texts.SIGHING, type: Assets.Sprites.Albert.key, script: "rrrrrrdllllllu" },
                { position: pof(22, 5), textKey: Texts.THE_MEEP, type: Assets.Images.Sign, script: "" },
                { position: pof(22, 7), textKey: Texts.TUTTLE_VILLAGE, type: Assets.Images.Sign, script: ""}
            ])
            .build();
    }
}