module MyGame {
    islandGetters[1] = function () {
        return new IslandBuilder(1, IslandType.OUTSIDE)
                    .setLayout([
                        "w  w                    ",
                        "w  wwwwwwwwwwwwwwwwwwwww",
                        "w                      w",
                        "w                       ",
                        "w                       ",
                        "w                      w",
                        "w                      w",
                        "w                      w",
                        "w                      w",
                        "wwwwwwwwwwwwwwwwwwwww  w",
                    ])
                    .setPlayerStart(pof(1, 0))
                    .setOutsideBoundsPortals([
                        { side: Direction.Up, start: 1, end: 4, playerStart: undefined, link: 0 }
                    ])
                    .build();
    }
}