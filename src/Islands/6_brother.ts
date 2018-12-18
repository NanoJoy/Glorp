module MyGame {
    islandGetters[Islands.BROTHER] = () => {
        return new IslandBuilder(Islands.BROTHER, IslandType.INSIDE)
            .setLayout([
                "bbbbbbbbbbbbbbbbbbbbbb",
                "b                    b",
                "b            b       b",
                "b            b       b",
                "b            b     x b",
                "b          d b    n  b",
                "bbbbbbbbbbbbbbbbbbbbbb"
            ])
            .setNPCs([
                { position: pof(18, 5), type: Assets.Sprites.OldMan.key, script: null, textKey: Texts.BROTHER}
            ])
            .setCustomBarriers([
                { x: 19, y: 4, type: Assets.Images.Oven, playerCollides: true }
            ])
            .setLinks([
                { pos: pof(11, 5), link: Islands.TOWN, playerStart: Utils.getHouseStart(5, 2) }
            ])
            .build();
    };
}