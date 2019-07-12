module MyGame {
    islandGetters[10] = function (): Island {
        function openGate(main: Main, button: Button) {
            main.removeBarrier(pof(7, 32), IslandType.OUTSIDE);
        }

        return new IslandBuilder(10, IslandType.OUTSIDE)
            .setLayout([
                "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                "wvvvvvvvvvvvvvvvv*  vv    ev*       ",
                "wvevvvvvvvvvvvvev*      vvvv* ##    ",
                "wvvv          vvv*  vvvvvvvv* ##    ",
                "w           ****** #   *v##v* ##  nw",
                "w                *  #  *v##v* ##   w",
                "w           **** * ##  *v##v* ##   w",
                "w              * * ##  *v##v* ##   w",
                "wvvv        vvv* *  #  *v#######   w",
                "wvevvvvvvvvvvev*       *v#######   w",
                "wvvvvvvvvvvvvvv*   #  n*vv         w",
                "w           wwwwwwwwwwwwwwwwwwwwwwww",
                "w   e       w                      w",
                "w  wwwwwww  w                      w",
                "w           w                      w",
                "w           w                      w",
                "w           w                      w",
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
                { type: Assets.Images.Sign, position: pof(34, 4), script: null, text: "Lully Pond" },
                { type: Assets.Images.Book, position: pof(22, 10), script: null, textKey: Texts.PARK_BOOK }
            ])
            .setEnemies([
                { type: Assets.Sprites.Croller.key, position: pof(26, 1), script: null },
                { type: Assets.Sprites.Croller.key, position: pof(2, 2), script: null },
                { type: Assets.Sprites.Croller.key, position: pof(15, 2), script: null },
                { type: Assets.Sprites.Croller.key, position: pof(2, 9), script: null },
                { type: Assets.Sprites.Croller.key, position: pof(13, 9), script: null },
                { type: Assets.Sprites.Croller.key, position: pof(4, 12), script: "rrrrrrddlllllllluur"}
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