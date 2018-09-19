module MyGame {
    islandGetters[3] = function () {
        return new IslandBuilder(3, IslandType.OUTSIDE)
            .setLayout([
                "   w   w   ",
                "  ww   ww  ",
                "  w     w  ",
                "  w     w  ",
                " ww  n  ww ",
                " w       w ",
                " w      ew ",
                "           ",
                "           ",
                "           ",
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Up, start: 4, end: 8, link: 1, playerStart: pof(21, 8) }
            ])
            .setTriggers([
                { type: TriggerType.MOVE_NPC, name: "albertfirst", x: 3, y: 2, width: 5, height: 1 }
            ])
            .setNPCs([
                { position: pof(5, 4), type: Assets.Sprites.Albert.key, textKey: Texts.ALBERT_FIRST, script: "d=uu;t=albertfirst;l=false" }
            ])
            .setEnemies([
                { position: pof(8, 6), type: Assets.Sprites.JamBotWorld.key, script: "llllllrrrrrr"}
            ])
            .build();
    }
}