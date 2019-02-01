module MyGame {
    islandGetters[Islands.TOWN] = function () {
        return new IslandBuilder(Islands.TOWN, IslandType.OUTSIDE)
            .setLayout([
                "             w     w             ",
                "**************     **************",
                "*    h-------  ###  h-------    *",
                "*    --------  ###  --------    *",
                "*    --------  ###  --------    *",
                "*    --------  ###  --------    *",
                "*    --------  ###  --------    *",
                "*    --------  ###  --------    *",
                "*       ##     ###     ##       *",
                "*       ## n   ###     ##       *",
                "*       #################       *",
                "*              #n#              *",
                "*              ###              *",
                "*              ###              *",
                "*    h-------  ###  h-------    *",
                "*    --------  ###  --------    *",
                "*    --------  ###  --------    *",
                "*    --------  ###  --------    *",
                "*    --------  ###  --------    *",
                "*    --------  ###  --------    *",
                "*       ##     ###     ##       *",
                "*       ################# n     *",
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
                { pos: pof(5, 2), playerStart: pof(11, 4), link: Islands.BROTHER },
                { pos: pof(20, 14), playerStart: pof(4, 6), link: Islands.PROFESSOR }
            ])
            .setNPCs([
                { position: pof(11, 9), type: Assets.Images.Sign, text: "The Sploofers", script: null },
                { position: pof(16, 11), type: Assets.Images.Sign, text: "If you pick something up, you can use it by pressing K or drop it by pressing SHIFT.", script: null },
                { position: pof(26, 21), type: Assets.Images.Sign, text: "Edward Dorfusk II", script: null }
            ])
            .setCustomBarriers([
                { x: 22, y: 4, type: Assets.Images.FruitStand, playerCollides: true }
            ])
            .setPlayerStart(pof(17, 1))
            .build();
    }
}