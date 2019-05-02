module MyGame {
    islandGetters[9] = function (): Island {
        function makeBridge(main: Main, button: Button): void {
            let adjusted1 = main.island.getAdjustedPosition(pof(8, 4));
            let adjusted2 = main.island.getAdjustedPosition(pof(9, 4));
            main.groups.barriers.filter(b => b.position.equals(adjusted1))[0].sprite.destroy();
            main.groups.barriers.filter(b => b.position.equals(adjusted2))[0].sprite.destroy();
            main.groups.barriers.push(new Bridge(main, adjusted1));
            WorldManager.getInstance().changeLayout(9, adjusted1, "|");
            main.groups.barriers.push(new Bridge(main, adjusted2));
            WorldManager.getInstance().changeLayout(9, adjusted2, "|");
            main.world.bringToTop(main.player);
        }

        return new IslandBuilder(Islands.TUTORIAL, IslandType.WATER)
            .setLayout([
                "ooooooooooooooo",
                "ooooooo n  oooo",
                "oocoooo    oooo",
                "ooooooo    oooo",
                "ooooooooooooooo",
                "           oooo",
                "s         noooo",
                "        ooooooo",
                "oooog?ooooooooo",
                "ooo  nooooooooo",
                "oo    ooooooooo",
                "oo    ooooooooo",
                "oo   nooooooooo"
            ])
            .setPlayerStart(pof(4, 12))
            .setNPCs([
                { position: pof(5, 9), script: null, textKey: Texts.TUTORIAL_PERSON, type: Assets.Sprites.ChuFeng.key },
                { position: pof(5, 12), script: null, textKey: Texts.TUTORIAL_SIGN, type: Assets.Images.Sign },
                { position: pof(10, 6), script: null, text: "Press K to use something you are holding", type: Assets.Images.Sign },
                { position: pof(8, 1), script: null, textKey: Texts.MONSTER, type: Assets.Sprites.Monster.key, }
            ])
            .setCreatures([
                { type: Assets.Sprites.Blish.key, x: 2, y: 2 }
            ])
            .setSources([
                { type: Assets.Images.CrumbsSource, x: 0, y: 6 }
            ])
            .setButtons([
                { type: Assets.Sprites.Button.key, x: 5, y: 8, action: makeBridge, direction: Direction.Right, backgroundType: IslandType.WATER }
            ])
            .build();
    }
}