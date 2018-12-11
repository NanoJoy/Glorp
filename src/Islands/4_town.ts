module MyGame {
    islandGetters[Islands.TOWN] = function () {
        return new IslandBuilder(Islands.TOWN, IslandType.OUTSIDE)
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
                "*         n                     *",
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
                { pos: pof(5, 4), playerStart: pof(3, 4), link: Islands.BROTHER }
            ])
            .setNPCs([
                { position: pof(10, 10), type: Assets.Images.Sign, textKey: Texts.THE_SPLOOFERS, script: null }
            ])
            .setPlayerStart(pof(17, 1))
            .build();
    }
}