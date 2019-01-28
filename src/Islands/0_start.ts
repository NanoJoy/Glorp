module MyGame {
    export var islandGetters = [] as { (): Island; }[];

    export enum Islands {
        START, SADMAN, THEMEEP, ALBERT, TOWN, BLISH, BROTHER, PROFESSOR
    }

    islandGetters[0] = function () {
        return new IslandBuilder(0, IslandType.OUTSIDE)
            .setLayout([
                " wwwwwwww  ",
                " w      w  ",
                " w      w  ",
                " w    * w  ",
                " w*     w  ",
                " w      w  ",
                " w   n  w  ",
                " www  www  ",
                "   w  w    ",
                "   w  w    ",
                "   w  w    "
            ])
            .setPlayerStart(pof(3, 1))
            .setNPCs([
                { position: pof(5, 6), type: Assets.Sprites.OldMan.key, script: "", textKey: Texts.GRANDPA }
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Down, start: 3, end: 6, link: Islands.SADMAN, playerStart: undefined }
            ])
            .build();
    }
}