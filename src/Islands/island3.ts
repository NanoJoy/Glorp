module MyGame {
    islandGetters[3] = function() {
        return new IslandBuilder(3, IslandType.OUTSIDE)
            .setLayout([
                "   w   w   ",
                "  ww   ww  ",
                "  w     w  ",
                "  w     w  ",
                "           ",
                "           ",
                "           ",
                "           ",
                "           ",
                "           ",
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Up, start: 4, end: 8, link: 1, playerStart: pof(21, 8) }
            ])
            .build();
    }
}