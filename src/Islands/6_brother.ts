module MyGame {
    islandGetters[Islands.BROTHER] = () => {
        return new IslandBuilder(Islands.BROTHER, IslandType.INSIDE)
            .setLayout([
                "bbbbbbbbbbbbbbbbbbbbbb",
                "b                    b",
                "b            b       b",
                "b            b       b",
                "b            b       b",
                "b          d b    n  b",
                "bbbbbbbbbbbbbbbbbbbbbb"
            ])
            .setNPCs([
                { position: pof(18, 5), type: Assets.Sprites.OldMan.key, script: null, textKey: Texts.BROTHER}
            ])
            .setLinks([
                { pos: pof(11, 5), link: Islands.TOWN, playerStart: Utils.getHouseStart(5, 2) }
            ])
            .build();
    };
}