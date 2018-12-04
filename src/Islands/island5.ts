module MyGame {
    islandGetters[5] = () => {
        return new IslandBuilder(5, IslandType.OUTSIDE)
            .setLayout([
                "*t t t t t t t t t t t t ",
                "*                        ",
                "*           s            ",
                "*       oooooooo         ",
                "**     oooooooooo        ",
                "        oooooooo         ",
                "           oo            ",
                "           oo            ",
                "**         oo            ",
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
                { type: Assets.Sprites.Blish.key, x: 8, y: 18 }
            ])
            .setSources([
                { type: Assets.Images.CrumbsSource, x: 12, y: 2 },
                { type: Assets.Images.CrumbsSource, x: 11, y: 20 }

            ])
            .build();
    };
}