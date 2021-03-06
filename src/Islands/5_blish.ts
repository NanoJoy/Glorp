module MyGame {
    let pressed = -1;
    let lastPressedY = -1;
    let bottomBridgeAdded = false;
    let lillypadsToLeft = false;
    let innerGateOpen = false;

    function checkOrder(main: Main, button: Button) {
        if (pressed === -2) return;
        if (lastPressedY !== button.position.y) {
            pressed++;
            lastPressedY = button.position.y;
        }
        let correctOrder = [3, 5, 4, 2];
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
        if ((lillypadsToLeft && button.position.y === 10) || (!lillypadsToLeft && button.position.y === 9)) {
            return;
        }
        main.sound.play(Assets.Audio.Right.key);
        let worldManager = WorldManager.getInstance();
        let positions = [pof(11, 8), pof(11, 9), pof(12, 12), pof(13, 12)];
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
        lillypadsToLeft = !lillypadsToLeft;
        main.setDepths();
        let waters = main.groups.barriers.filter(b => b instanceof Water).map(w => w as Water);
        waters.forEach(w => w.onStageBuilt());
    }

    function addBottomBridge(main: Main, button: Button) {
        if (bottomBridgeAdded) return;
        bottomBridgeAdded = true;
        main.sound.play(Assets.Audio.Right.key);
        let waters = main.groups.barriers.filter(b => b instanceof Water).map(w => w as Water);
        [pof(15, 20), pof(16, 20), pof(15, 21), pof(16, 21)].forEach(pos => {
            let water = Utils.firstOrDefault(waters, w => w.position.equals(pos));
            water.sprite.destroy();
            main.groups.barriers = main.groups.barriers.filter(b => b !== water);
            main.groups.barriers.push(new Bridge(main, pos));
            WorldManager.getInstance().changeLayout(Islands.BLISH, pos, "|");
        });
        main.setDepths();
    }

    function openGates(main: Main, button: Button) {
        let topY = 22;
        let x = button.position.x === 16 ? 17 : 8;
        if (x === 17 && (main.island.layout[topY][x] === "s" || main.island.layout[topY + 1][x] === "s")) {
            return;
        }
        for (let i = 0; i < 2; i++) {
            if (x === 17) {
                let leftX = 12;
                if (innerGateOpen) {
                    main.removeBarrier(pof(leftX, topY + i), IslandType.OUTSIDE);
                    main.addBarrier(new Gate(main, pof(x, topY + i)));

                } else {
                    main.removeBarrier(pof(x, topY + i), IslandType.OUTSIDE);
                    main.addBarrier(new Gate(main, pof(leftX, topY + i)));
                }
            } else {
                main.removeBarrier(pof(x, topY + i), IslandType.OUTSIDE);
            }
        }

        if (x === 17) {
            innerGateOpen = !innerGateOpen;
        }
    }

    islandGetters[5] = () => {
        return new IslandBuilder(5, IslandType.OUTSIDE)
            .setLayout([
                "wt t t t t t t t t t t t ",
                "w                       w",
                "w xxxx         cooo?    w",
                "w       x      ?oooo    w",
                "wwww     xxx   oooo?    w",
                "   wwn xx      ?oooo    w",
                "   c             s      w",
                "  nww                   w",
                "wwww    ?oopoooooooo    w",
                "w       ooopooo?oooo    w",
                "w       w   ooo?oooo    w",
                "w       w   oo s  oo    w",
                "w       w   ||    ##    w",
                "w       w   oo    ##    w",
                "w       w   oo    oo****w",
                "w       w   oo    oo    w",
                "w       w   oooooooo    w",
                "w       w   ooppppoo    w",
                "w       w   oop ?poo    w",
                "w       w   oop  pooooo?w",
                "w*******w   oooooooooooow",
                "        ws  oooooooooooow",
                "        g        gs     w",
                "        g        g      w",
                "wwwwwwwwwwwwwwwwwwwwwwwww"
            ])
            .setOutsideBoundsPortals([
                { side: Direction.Left, start: 4, end: 7, link: Islands.ALBERT, playerStart: pof(28, 4) },
                { side: Direction.Left, start: 20, end: 23, link: Islands.CORRIDOR, playerStart: pof(33, 2) }
            ])
            .setCreatures([
                { type: Assets.Sprites.Blish.key, x: 15, y: 2 },
                { type: Assets.Sprites.Blumpus.key, x: 3, y: 6 }
            ])
            .setSources([
                { type: Assets.Images.CrumbsSource, x: 17, y: 6 },
                { type: Assets.Images.CrumbsSource, x: 15, y: 11 },
                { type: Assets.Images.CrumbsSource, x: 9, y: 21 },
                { type: Assets.Sprites.Plorpus.key, x: 18, y: 22 }
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
                { type: Assets.Sprites.Button.key, x: 15, y: 9, action: swapThings, direction: Direction.Right, backgroundType: IslandType.WATER, resetTime: 2000 },
                { type: Assets.Sprites.Button.key, x: 15, y: 10, action: swapThings, direction: Direction.Right, backgroundType: IslandType.WATER, resetTime: 2000 },
                { type: Assets.Sprites.Button.key, x: 8, y: 8, action: addBottomBridge, direction: Direction.Right, backgroundType: IslandType.WATER },
                { type: Assets.Sprites.Button.key, x: 16, y: 18, action: openGates, direction: Direction.Left, backgroundType: IslandType.OUTSIDE, resetTime: 2000 },
                { type: Assets.Sprites.Button.key, x: 23, y: 19, action: openGates, direction: Direction.Left, backgroundType: IslandType.WATER }
            ])
            .setCustomBarriers([
                { x: 2, y: 2, type: Assets.Images.Fruit, playerCollides: true },
                { x: 3, y: 2, type: Assets.Images.Fruit, playerCollides: true },
                { x: 4, y: 2, type: Assets.Images.Fruit, playerCollides: true },
                { x: 5, y: 2, type: Assets.Images.Fruit, playerCollides: true },
                { x: 8, y: 3, type: Assets.Images.Fruit, playerCollides: true },
                { x: 9, y: 4, type: Assets.Images.Fruit, playerCollides: true },
                { x: 10, y: 4, type: Assets.Images.Fruit, playerCollides: true },
                { x: 11, y: 4, type: Assets.Images.Fruit, playerCollides: true },
                { x: 7, y: 5, type: Assets.Images.Fruit, playerCollides: true },
                { x: 8, y: 5, type: Assets.Images.Fruit, playerCollides: true }
            ])
            .build();
    };
}