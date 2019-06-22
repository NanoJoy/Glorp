module MyGame {
    islandGetters[10] = function (): Island {
        return new IslandBuilder(10, IslandType.OUTSIDE)
            .setLayout([
                "wwwwwwwwwwwwwwwwwwwwww",
                "    vvvvvvvvvvvvv*    ",
                "    vvvvvvvvvvvvv*    ",
                "e   vvvvvvvvvvvvv*    ",
                "    vvvvvvvvvvvvv*    ",
                "    vvv   * **** v    ",
                "    vvv   *      v    ",
                "    vvv   *      v    ",
                "    vvvvvvvvvvvvvv    ",
                "    vvvvvvvvvvvvvv    ",
                "wwwwwwwwwwwwwwwwwwwwww"
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Right, start: 0, end: 3, link: Islands.BLISH, playerStart: pof(1, 22) }
            ])
            .setEnemies([
                { position: pof(0, 3), type: Assets.Sprites.Croller.key, script: null }
            ])
            .build();
    }
}