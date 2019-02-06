module MyGame {
    islandGetters[5] = () => {
        return new IslandBuilder(5, IslandType.OUTSIDE)
            .setLayout([
                "*t t t t t t t t t t t t ",
                "*                        ",
                "*           s            ",
                "*       oooooooo         ",
                "****   oooooooooo        ",
                "   **n  oooooooo         ",
                "   c       oo            ",
                " sn**      oo            ",
                "****       oo            ",
                "*         oooo           ",
                "*         oooo           ",
                "w          oo            ",
                "w          oo            ",
                "w       oooooooooo       ",
                "w      ooooooooooo       ",
                "w     oooooooooooo       ",
                "w     oooooooooooo       ",
                "w     oooooooooooo       ",
                "w     oocoooooooo        ",
                "w     oooooooooo         ",
                "w          s             ",
                "w                        ",
                "w                        ",
                "w                        ",
                "w                        ",
                "w                        ",
                "w                        "
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Left, start: 4, end: 7, link: 3, playerStart: pof(28, 4) }
            ])
            .setCreatures([
                { type: Assets.Sprites.Blish.key, x: 8, y: 18 },
                { type: Assets.Sprites.Blumpus.key, x: 3, y: 6 }
            ])
            .setSources([
                { type: Assets.Sprites.Airhorn.key, x: 1, y: 7 },
                { type: Assets.Images.CrumbsSource, x: 12, y: 2 },
                { type: Assets.Images.CrumbsSource, x: 11, y: 20 }
            ])
            .setNPCs([
                { position: pof(5, 5), type: Assets.Images.Sign, text: "Path to Tuttle Village", script: null },
                { position: pof(2, 7), type: Assets.Sprites.OldMan.key, textKey: Texts.BLUMPUS, script: null }
            ])
            .build();
    };
}