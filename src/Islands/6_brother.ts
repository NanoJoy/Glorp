module MyGame {
    islandGetters[Islands.BROTHER] = () => {
        return new IslandBuilder(Islands.BROTHER, IslandType.INSIDE)
            .setLayout([
                "bbbbbb",
                "b n  b",
                "b    b",
                "b    b",
                "b    b",
                "b  d b",
                "bbbbbb"
            ])
            .setNPCs([
                { position: pof(2, 1), type: Assets.Sprites.OldMan.key, script: null, textKey: Texts.BROTHER}
            ])
            .setLinks([
                { pos: pof(3, 5), link: Islands.TOWN, playerStart: Utils.getHouseStart(5, 2) }
            ])
            .build();
    };
}