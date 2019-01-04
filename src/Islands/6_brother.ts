module MyGame {
    islandGetters[Islands.BROTHER] = () => {
        return new IslandBuilder(Islands.BROTHER, IslandType.INSIDE)
            .setLayout([
                "bbbbbbbbbbbbbbbbbbbbbb",
                "b                    b",
                "bx- x    b   b       b",
                "b--      b   b       b",
                "b--      b   b    nx b",
                "b        b d b       b",
                "bbbbbbbbbbbbbbbbbbbbbb"
            ])
            .setNPCs([
                { position: pof(18, 4), type: Assets.Sprites.Stanley.key, script: "lllldrurrr", textKey: Texts.STANLEY}
            ])
            .setCustomBarriers([
                { x: 19, y: 4, type: Assets.Images.Oven, playerCollides: true },
                { x: 1, y: 2, type: Assets.Images.Couch, playerCollides: true },
                { x: 4, y: 2, type: Assets.Images.Rug, playerCollides: false }
            ])
            .setLinks([
                { pos: pof(11, 5), link: Islands.TOWN, playerStart: Utils.getHouseStart(5, 2) }
            ])
            .build();
    };
}