module MyGame {
    islandGetters[9] = function (): Island {
        return new IslandBuilder(Islands.TUTORIAL, IslandType.WATER)
            .setLayout([
                "        ",
                "        ",
                "        ",
                "        ",
                "oooogooo",
                "ooo  noo",
                "oo    oo",
                "oo    oo",
                "oo   noo"
            ])
            .setPlayerStart(pof(4, 8))
            .setNPCs([
                { position: pof(5, 5), script: null, textKey: Texts.TUTORIAL_PERSON, type: Assets.Sprites.ChuFeng.key },
                { position: pof(5, 8), script: null, textKey: Texts.TUTORIAL_SIGN, type: Assets.Images.Sign }
            ])
            .build();
    }
}