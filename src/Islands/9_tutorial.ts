module MyGame {
    islandGetters[9] = function (): Island {
        return new IslandBuilder(Islands.TUTORIAL, IslandType.WATER)
            .setLayout([
                "oocoooooooooooo",
                "           oooo",
                "s          oooo",
                "        ooooooo",
                "oooogoooooooooo",
                "ooo  nooooooooo",
                "oo    ooooooooo",
                "oo    ooooooooo",
                "oo   nooooooooo"
            ])
            .setPlayerStart(pof(4, 8))
            .setNPCs([
                { position: pof(5, 5), script: null, textKey: Texts.TUTORIAL_PERSON, type: Assets.Sprites.ChuFeng.key },
                { position: pof(5, 8), script: null, textKey: Texts.TUTORIAL_SIGN, type: Assets.Images.Sign }
            ])
            .setCreatures([
                { type: Assets.Sprites.Blish.key, x: 2, y: 0 }
            ])
            .setSources([
                { type: Assets.Images.CrumbsSource, x: 0, y: 2 }
            ])
            .build();
    }
}