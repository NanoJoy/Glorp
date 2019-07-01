module MyGame {
    islandGetters[10] = function (): Island {
        function openGate(main: Main, button: Button) {
            main.removeBarrier(pof(7, 32), IslandType.OUTSIDE);
        }

        return new IslandBuilder(10, IslandType.OUTSIDE)
            .setLayout([
                "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                "w                              n    ",
                "w                                   ",
                "w                                   ",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w           wwwwwwwwwwwwwwwwwwwwwwww",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "wwwwwwwwwwwwwwwwwwwwwwww           w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w                                  w",
                "w?                                 w",
                "wwwwwwww                           w",
                "       w                           w",
                "       wn                          w",
                "       g                           w",
                "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
            ])
            .setNPCs([
                { type: Assets.Images.Sign, position: pof(8, 31), script: null, text: "Tuttle Village" },
                { type: Assets.Images.Sign, position: pof(31, 1), script: null, text: "Tuttle Village" }
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Right, start: 0, end: 4, link: Islands.BLISH, playerStart: pof(1, 22) },
                { side: Direction.Left, start: 29, end: 33, link: Islands.TOWN, playerStart: pof(31, 24) }
            ])
            .setButtons([
                { type: Assets.Sprites.Button.key, x: 1, y: 28, direction: Direction.Right, action: openGate, backgroundType: IslandType.OUTSIDE }
            ])
            .build();
    }
}