module MyGame {
    islandGetters[Islands.PROFESSOR] = () => {
        return new IslandBuilder(Islands.PROFESSOR, IslandType.INSIDE)
            .setLayout([
                "bbbbbbbbbbbbbb",
                "b           nb",
                "b  n         b",
                "b            b",
                "b            b",
                "b            b",
                "b            b",
                "b   d        b",
                "bbbbbbbbbbbbbb"
            ])
            .setLinks([
                { pos: pof(4, 7), link: Islands.TOWN, playerStart: Utils.getHouseStart(20, 14) }
            ])
            .setNPCs([
                { position: pof(12, 1), type: Assets.Images.Book, script: null, textKey: Texts.ANIMAL_BEHAVIOR },
                { position: pof(3, 2), type: Assets.Sprites.OldMan.key, script: "rrll", textKey: Texts.PROFESSOR }
            ])
            .build();
    }
}