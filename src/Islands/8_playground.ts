module MyGame {
    islandGetters[8] = function (): Island {
        return new IslandBuilder(Islands.PLAYGROUND, IslandType.OUTSIDE)
            .setLayout([
                "wwwwwwwwww  ",
                "w        w  ",
                "w        w  ",
                "w        ww*",
                "w           ",
                "w n         ",
                "w        ww*",
                "w        w  ",
                "w     s  w  ",
                "wwwwwwwwww  ",
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Right, start: 4, end: 7, playerStart: pof(1, 23), link: Islands.TOWN }
            ])
            .setNPCs([
                { position: pof(2, 5), type: Assets.Sprites.ChuFeng.key, script: "uu    r   dd   l  ", text: "hello there" }
            ])
            .setSources([
                { type: Assets.Sprites.Airhorn.key, x: 6, y: 8 }
            ])
            .build();
    }
}