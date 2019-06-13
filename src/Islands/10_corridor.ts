module MyGame {
    islandGetters[10] = function (): Island {
        return new IslandBuilder(10, IslandType.OUTSIDE)
            .setLayout([
                "wwwwwwwwwwwwwwwwwwwwww",
                "    vvvvvvvvvvvvvv    ",
                "    vvvvvvvvvvvvvv    ",
                "    vvvvvvvvvvvvvv    ",
                "wwwwwwwwwwwwwwwwwwwwww"
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Right, start: 0, end: 3, link: Islands.BLISH, playerStart: pof(1, 22) }
            ])
            .build();
    }
}