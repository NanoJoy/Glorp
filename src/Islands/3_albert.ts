module MyGame {
    islandGetters[3] = function () {
        function jambotDead (main: Main) {
            let albert = main.groups.npcs.filter(n => n instanceof Albert)[0];
            albert.sprite.position.setTo(5 * TILE_WIDTH, 2 * TILE_HEIGHT);
            if (main.groups.enemies.filter(e => e instanceof JamBot && e.alive).length === 0) {
                main.startCinematic(albert.sprite);
                main.player.position.setTo(5 * TILE_WIDTH, 7 * TILE_HEIGHT);
                albert.setDialogState(0);
                albert.doScript("d=lddddddddrrr;l=false", pof(5, 2));
                albert.movementManager.setOnComplete(function() {
                    main.endCinematic();
                    main.groups.barriers.filter(b => b instanceof Gate)[0].sprite.destroy();
                    WorldManager.getInstance().changeLayout(3, pof(8, 11), " ");
                }, main);
                albert.savePosition(7, 10);
            }
        }

        function jambugDead(main: Main) {
            let albert = main.groups.npcs.filter(n => n instanceof Albert)[0];
            albert.sprite.position.setTo(7 * TILE_WIDTH, 10 * TILE_HEIGHT);
            if (main.groups.enemies.filter(e => e instanceof JamBug && e.alive).length === 0) {
                main.startCinematic(albert.sprite);
                main.player.position.setTo(19 * TILE_WIDTH, 10 * TILE_HEIGHT);
                albert.setDialogState(2);
                albert.doScript("d=drrrrrrrrrrrrrrrrrru;l=false", pof(7, 10));
                albert.movementManager.setOnComplete(function() {
                    main.endCinematic();
                    main.groups.barriers.filter(b => b instanceof Gate)[0].sprite.destroy();
                    WorldManager.getInstance().changeLayout(3, pof(26, 11), " ");
                }, main);
                albert.savePosition(25, 10);
            }
        }

        return new IslandBuilder(3, IslandType.OUTSIDE)
            .setLayout([
                "   w   w**********************",
                "  ww   ww  ooooo             *",
                "  w     w  opopo             *",
                "  w     w  ooooo           n**",
                "  w  n  w  oopoo              ",
                "  w     w  oooop              ",
                "  w  *  w                     ",
                "  w    ew                   **",
                "  w  *  w        *   *       *",
                "  we    wwwwwwwwww   wwwwwwwww",
                "  w     w    e   *   * e  wppw",
                "  w     g      e          g  w",
                "  w     ww                w  w",
                "  wwwwwwwwwwwwwwwwwwwwwwwww  w"
            ])
            .setPlayerStart(pof(5, 0))
            .setOutsideBoundsPortals([
                { side: Direction.Up, start: 4, end: 8, link: Islands.SADMAN, playerStart: pof(21, 8) },
                { side: Direction.Right, start: 3, end: 7, link: Islands.BLISH, playerStart: pof(1, 6) },
                { side: Direction.Down, start: 27, end: 30, link: Islands.TOWN, playerStart: pof(17, 1)}
            ])
            .setTriggers([
                { type: TriggerType.MOVE_NPC, name: "albertfirst", x: 3, y: 2, width: 5, height: 1 }
            ])
            .setNPCs([
                { position: pof(5, 4), type: Assets.Sprites.Albert.key, textKey: Texts.ALBERT_FIRST, script: "d=uu;t=albertfirst;l=false" },
                { position: pof(27, 3), type: Assets.Images.Sign, text: "Lully Pond", script: null }
            ])
            .setEnemies([
                { 
                    position: pof(7, 7),
                    type: Assets.Sprites.JamBotWorld.key,
                    script: "llllrrrr",
                    afterDeath: jambotDead
                },
                { 
                    position: pof(3, 9),
                    type: Assets.Sprites.JamBotWorld.key,
                    script: "rrrrllll",
                    afterDeath: jambotDead
                },
                {
                    position: pof(13, 10),
                    type: Assets.Sprites.JamBugWorld.key,
                    script: "ddlluurr",
                    afterDeath: jambugDead
                },
                {
                    position: pof(15, 11),
                    type: Assets.Sprites.JamBugWorld.key,
                    script: "rdlu",
                    afterDeath: jambugDead
                },
                {
                    position: pof(23, 10),
                    type: Assets.Sprites.JamBugWorld.key,
                    script: "dduulrrl",
                    afterDeath: jambugDead
                }
            ])
            .build();
    }
}