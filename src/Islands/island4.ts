module MyGame {
    islandGetters[4] = function () {
        return new IslandBuilder(4, IslandType.OUTSIDE)
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
            .setHouseLinks([
                { pos: pof(5, 4), playerStart: pof(0, 0), link: 6 }
            ])
            .setPlayerStart(pof(17, 1))
            .build();
    }
}