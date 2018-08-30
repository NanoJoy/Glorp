module MyGame {
    islandGetters[3] = function () {
        return new IslandBuilder(3, IslandType.OUTSIDE)
            .setLayout([
                "             w     w             ",
                "**************     **************",
                "*                               *",
                "*                               *",
                "*    h                  h       *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*          h                    *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*********************************"
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Up, start: 14, end: 20, playerStart: pof(21, 8), link: 1 }
            ])
            .setPlayerStart(pof(17, 1))
            .build();
    }
}