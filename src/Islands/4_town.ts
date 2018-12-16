module MyGame {
    islandGetters[Islands.TOWN] = function () {
        return new IslandBuilder(Islands.TOWN, IslandType.OUTSIDE)
            .setLayout([
                "             w     w             ",
                "**************     **************",
                "*    h                          *",
                "*                               *",
                "*                       h       *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*                               *",
                "*          n                    *",
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
                { side: Direction.Up, start: 14, end: 20, playerStart: pof(27, 12), link: Islands.ALBERT }
            ])
            .setHouseLinks([
                { pos: pof(5, 2), playerStart: pof(3, 4), link: Islands.BROTHER }
            ])
            .setNPCs([
                { position: pof(11, 9), type: Assets.Images.Sign, text: "The Sploofers", script: null }
            ])
            .setPlayerStart(pof(17, 1))
            .build();
    }
}