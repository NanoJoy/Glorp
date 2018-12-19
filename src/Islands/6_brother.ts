module MyGame {
    islandGetters[Islands.BROTHER] = () => {
        return new IslandBuilder(Islands.BROTHER, IslandType.INSIDE)
            .setLayout([
                "bbbbbbbbbbbbbbbbbbbbbb",
                "b                    b",
                "b            b       b",
                "b            b       b",
                "b            b    nx b",
                "b          d b       b",
                "bbbbbbbbbbbbbbbbbbbbbb"
            ])
            .setNPCs([
                { position: pof(18, 4), type: Assets.Sprites.Stanley.key, script: "lllldrurrr", textKey: Texts.BROTHER}
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