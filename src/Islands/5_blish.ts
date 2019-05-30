module MyGame {
    let pressed = -1;
    let lastPressedY = -1;

    function checkOrder(main: Main, button: Button) {
        if (pressed === -2) return;
        if (lastPressedY !== button.position.y) {
            pressed++;
            lastPressedY = button.position.y;
        }
        let correctOrder = [3,5,4,2];
        if (correctOrder[pressed] !== button.position.y) {
            if (pressed > 0) {
                main.sound.play(Assets.Audio.Wrong.key);
            }
            pressed = -1;
            lastPressedY = -1;
            main.groups.buttons.forEach((b) => {
                if (b !== button) {
                    b.turnOff();
                }
            })
            return;
        } else {
            button.keepOn();
        }
        if (pressed === 3) {
            main.sound.play(Assets.Audio.Right.key);
            [pof(19, 6), pof(19, 7), pof(18, 6), pof(18, 7)].forEach(pos => {
                main.groups.barriers.push(new Water(main, pos));
                WorldManager.getInstance().changeLayout(Islands.BLISH, pos, "o");
            });
            main.setDepths();
            pressed = -2;
        }
    }

    function swapThings(main: Main, button: Button) {
        main.sound.play(Assets.Audio.Right.key);
        let worldManager = WorldManager.getInstance();
        let positions = [pof(11, 8), pof(11, 9), pof(12, 12), pof(13, 12), pof(18, 12), pof(19, 12)];
        let lillypads = main.groups.barriers.filter(b => b instanceof Lillypad).map(p => p as Lillypad);
        let bridges = main.groups.barriers.filter(b => b instanceof Bridge).map(b => b as Bridge);
        positions.forEach(pos => {
            let lillypad = Utils.firstOrDefault(lillypads, l => l.position.equals(pos));
            if (lillypad) {
                main.groups.barriers = main.groups.barriers.filter(l => l !== lillypad);
                main.groups.barriers.push(new Bridge(main, pos));
                worldManager.changeLayout(Islands.BLISH, pos, "|");
            }
            else {
                let bridge = Utils.firstOrDefault(bridges, b => b.position.equals(pos));
                if (bridge) {
                    main.groups.barriers = main.groups.barriers.filter(b => b !== bridge);
                    main.groups.barriers.push(new Lillypad(main, pos));
                    worldManager.changeLayout(Islands.BLISH, pos, "p");
                }
            }
        });
        main.setDepths();
        let waters = main.groups.barriers.filter(b => b instanceof Water).map(w => w as Water);
        waters.forEach(w => w.onStageBuilt());
    }

    function addBottomBridge(main: Main, button: Button) {
        [pof(14, 20), pof(15, 20), pof(14, 21), pof(15, 21)].forEach(pos => {
            main.groups.barriers.push(new Bridge(main, pos));
            WorldManager.getInstance().changeLayout(Islands.BLISH, pos, "|");
        });
    }

    islandGetters[5] = () => {return new IslandBuilder(5, IslandType.OUTSIDE)
            .setLayout([
                "wt t t t t t t t t t t t ",
                "w                       w",
                "w # #    #     cooo?#   w",
                "w     #        ?oooo    w",
                "wwww    #  #   oooo?   #w",
                "   wwn  #      ?oooo #  w",
                "   c             s      w",
                "  nww                   w",
                "wwww    ooopoooooooo    w",
                "w       ?oopoooo?ooo    w",
                "w           oooooooo    w",
                "w           oo s  oo    w",
                "w           ||    ||    w",
                "w           oo    oo    w",
                "w           oo    oo****w",
                "w           oo    oo    w",
                "w           oooooooo    w",
                "w           ooppppoo    w",
                "w           oop  poo    w",
                "w           oop  poo    w",
                "w           oooooooo    w",
                "w           oooooooo    w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
                "wwwwwwwwwwwwwwwwwwwwwwwww"
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Left, start: 4, end: 7, link: 3, playerStart: pof(28, 4) }
            ])
            .setCreatures([
                { type: Assets.Sprites.Blish.key, x: 15, y: 2 },
                { type: Assets.Sprites.Blumpus.key, x: 3, y: 6 }
            ])
            .setSources([
                { type: Assets.Images.CrumbsSource, x: 17, y: 6 },
                { type: Assets.Images.CrumbsSource, x: 15, y: 11}
            ])
            .setNPCs([
                { position: pof(5, 5), type: Assets.Images.Sign, text: "Path to Tuttle Village", script: null },
                { position: pof(2, 7), type: Assets.Sprites.OldMan.key, textKey: Texts.BLUMPUS, script: null }
            ])
            .setButtons([
                { type: Assets.Sprites.Button.key, x: 19, y: 2, action: checkOrder, direction: Direction.Left, backgroundType: IslandType.WATER, resetTime: 500 },
                { type: Assets.Sprites.Button.key, x: 15, y: 3, action: checkOrder, direction: Direction.Right, backgroundType: IslandType.WATER, resetTime: 500 },
                { type: Assets.Sprites.Button.key, x: 19, y: 4, action: checkOrder, direction: Direction.Left, backgroundType: IslandType.WATER, resetTime: 500 },
                { type: Assets.Sprites.Button.key, x: 15, y: 5, action: checkOrder, direction: Direction.Right, backgroundType: IslandType.WATER, resetTime: 500 },
                { type: Assets.Sprites.Button.key, x: 16, y: 9, action: swapThings, direction: Direction.Right, backgroundType: IslandType.WATER, resetTime: 2000 },
                { type: Assets.Sprites.Button.key, x: 8, y: 9, action: addBottomBridge, direction: Direction.Right, backgroundType: IslandType.WATER }
            ])
            .build();
    };
}