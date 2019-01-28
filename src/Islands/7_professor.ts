module MyGame {
    islandGetters[Islands.PROFESSOR] = () => {
        return new IslandBuilder(Islands.PROFESSOR, IslandType.INSIDE)
            .setLayout([
                "bbbbbbbbb",
                "b       b",
                "b  n    b",
                "b       b",
                "b       b",
                "b       b",
                "b       b",
                "b   d   b",
                "bbbbbbbbb"
            ])
            .setLinks([
                { pos: pof(4, 7), link: Islands.TOWN, playerStart: Utils.getHouseStart(26, 21) }
            ])
            .setNPCs([
                { position: pof(3, 2), type: Assets.Sprites.OldMan.key, script: "rrll", textKey: Texts.PROFESSOR }
            ])
            .build();
    }
}