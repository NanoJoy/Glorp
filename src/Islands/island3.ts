module MyGame {
    islandGetters[3] = function () {
        function jambotDead (main: Main) {
            let albert = main.groups.npcs[0];
            albert.sprite.position.setTo(5 * TILE_WIDTH, 2 * TILE_HEIGHT);
            if (main.groups.enemies.filter(e => e instanceof JamBot && e.alive).length === 0) {
                main.stopPlayer();
                main.player.position.setTo(5 * TILE_WIDTH, 7 * TILE_HEIGHT);
                albert.setDialogState(0);
                albert.doScript("d=lddddddrrr;l=false", pof(5, 2));
                albert.movementManager.setOnComplete(function() {
                    this.playerStopped = false;
                    main.groups.barriers.filter(b => b instanceof Gate)[0].sprite.destroy();
                    WorldManager.getInstance().changeLayout(3, pof(8, 9), " ");
                }, main);
                albert.savePosition(7, 8);
            }
        }

        return new IslandBuilder(3, IslandType.OUTSIDE)
            .setLayout([
                "   w   w**********************",
                "  ww   ww                    t",
                "  w     w                     ",
                "  w     w                    t",
                "  w  n  w                     ",
                "  w    ew                    t",
                "  w  *  w        *   *        ",
                "  we    wwwwwwwwww   wwwwwwwww",
                "  w     w    e   *   * e  w   ",
                "  w     g      e          g   ",
                "  w     w                 w   ",
                "  wwwwwwwwwwwwwwwwwwwwwwwww   "
            ])
            .setPlayerStart(pof(5, 0))
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
                { 
                    position: pof(7, 5),
                    type: Assets.Sprites.JamBotWorld.key,
                    script: "llllrrrr",
                    afterDeath: jambotDead
                },
                { 
                    position: pof(3, 7),
                    type: Assets.Sprites.JamBotWorld.key,
                    script: "rrrrllll",
                    afterDeath: jambotDead
                },
                {
                    position: pof(13, 8),
                    type: Assets.Sprites.JamBugWorld.key,
                    script: "ddlluurr"
                },
                {
                    position: pof(15, 9),
                    type: Assets.Sprites.JamBugWorld.key,
                    script: "rdlu"
                },
                {
                    position: pof(23, 8),
                    type: Assets.Sprites.JamBugWorld.key,
                    script: "dduulrrl"
                }
            ])
            .build();
    }
}