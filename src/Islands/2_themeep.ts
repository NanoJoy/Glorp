module MyGame {
    islandGetters[2] = function () {
        return new IslandBuilder(2, IslandType.OUTSIDE)
            .setLayout([
                "wwwwwwwwwwwwwwww",
                "               w",
                "   n           w",
                "w              w",
                "w              w",
                "w              w",
                "w              w",
                "w              w",
                "w              w",
                "w              w",
                "w              w",
                "w              w",
                "w              w",
                "wwwwwwwwwwwwwwww",
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Left, start: 1, end: 4, playerStart: pof(21, 3), link: Islands.SADMAN }
            ])
            .setNPCs([
                { position: pof(3, 2), textKey: Texts.MEEP_GROWL, type: Assets.Sprites.TheMeep.key, script: null }
            ])
            .setPlayerStart(pof(1, 1))
            .build();
    }
}