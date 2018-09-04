module MyGame {
    islandGetters[2] = function () {
        return new IslandBuilder(2, IslandType.OUTSIDE)
            .setLayout([
                "wwwwwwwwwww",
                "          w",
                "          w",
                "w         w",
                "w         w",
                "w         w",
                "w         w",
                "w         w",
                "w         w",
                "wwwwwwwwwww",
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Left, start: 1, end: 4, playerStart: pof(21, 3), link: 1 }
            ])
            .setPlayerStart(pof(1, 1))
            .build();
    }
}