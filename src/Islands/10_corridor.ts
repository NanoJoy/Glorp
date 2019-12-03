module MyGame {
    islandGetters[10] = function (): Island {
        function openUpperGate(main: Main, button: Button) {
            main.removeBarrier(pof(12, 14), IslandType.OUTSIDE);
            main.removeBarrier(pof(12, 15), IslandType.OUTSIDE);
        }

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
                "w             n* * ##  *v##v* ##   w",
                "wvvv        vvv* *  #  *v#######   w",
                "wvevvvvvvvvvvev*       *v#######   w",
                "wvvvvvvvvvvvvvv*a  #  n*vv         w",
                "w  wwwwwww  wwwwwwwwwwwwwwwwwwwwwwww",
                "w   e       wa                evvvvw",
                "w  wwwwwww  w           c      vvvsw",
                "w           g  ##  w           vvvvw",
                "w    www    g  ##  w  ######  *****w",
                "w   e       w  ##  w    ###      esw",
                "w    ###    w  ##  w         ******w",
                "w    ###e   w  ##  w  ###          w",
                "w****###****w  ##  w               w",
                "we   ###   ?w  ##  w               w",
                "w         e w    s wa              w",
                "wwwwwwwwwwwwwwwwwwwwwwww           w",
            ])
            .setNPCs([
                { type: Assets.Images.Sign, position: pof(34, 4), script: null, text: "Lully Pond" },
                { type: Assets.Images.Book, position: pof(22, 10), script: null, textKey: Texts.PARK_BOOK },
                { type: Assets.Images.Book, position: pof(14, 7), script: null, textKey: Texts.WARNING_BOOK }
            ])
            .setEnemies([
                { type: Assets.Sprites.Croller.key, position: pof(26, 1), script: null },
                { type: Assets.Sprites.Croller.key, position: pof(2, 2), script: null },
                { type: Assets.Sprites.Croller.key, position: pof(15, 2), script: null },
                { type: Assets.Sprites.Croller.key, position: pof(2, 9), script: null },
                { type: Assets.Sprites.Croller.key, position: pof(13, 9), script: null },
                { type: Assets.Sprites.Croller.key, position: pof(33, 16), script: null },
                { type: Assets.Sprites.Foller.key, position: pof(4, 12), script: "rrrrrrddlllllllluur"},
                { type: Assets.Sprites.Foller.key, position: pof(30, 12), script: "dduu"},
                { type: Assets.Sprites.Foller.key, position: pof(4, 16), script: "rrrrrr  lllllllll  rr"},
                { type: Assets.Sprites.Foller.key, position: pof(8, 18), script: "llllll  rrrrrrrrr  ll"},
                { type: Assets.Sprites.JamBugWorld.key, position: pof(1, 20), script: "rrrrrrrrrdlllllllllu"},
                { type: Assets.Sprites.JamBugWorld.key, position: pof(10, 21), script: "lllllllllurrrrrrrrrd"},
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Right, start: 0, end: 4, link: Islands.BLISH, playerStart: pof(1, 22) },
                { side: Direction.Left, start: 29, end: 33, link: Islands.TOWN, playerStart: pof(31, 24) },
                { side: Direction.Down, start: 24, end: 36, link: Islands.DEATH, playerStart: pof(26, 1)}
            ])
            .setButtons([
                { type: Assets.Sprites.Button.key, x: 11, y: 20, direction: Direction.Left, action: openUpperGate, backgroundType: IslandType.OUTSIDE },
                { type: Assets.Sprites.Button.key, x: 1, y: 24, direction: Direction.Right, action: openGate, backgroundType: IslandType.OUTSIDE }
            ])
            .setSources([
                { type: Assets.Images.Batteries, x: 17, y: 21 },
                { type: Assets.Images.Batteries, x: 34, y: 16 },
                { type: Assets.Images.Batteries, x: 34, y: 13 }
            ])
            .setCreatures([
                { type: Assets.Sprites.Instrument.key, x: 24, y: 13 }
            ])
            .build();
    }
}