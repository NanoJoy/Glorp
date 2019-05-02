module MyGame {
    let pressed = 0;

    function checkOrder(main: Main, button: Button) {
        let correctOrder = [3,5,4,2];
        if (correctOrder[pressed] !== button.position.y) {
            pressed = 0;
            main.groups.buttons.forEach((button) => {
                button.turnOff();
            })
            return;
        }
        pressed++;
        if (pressed === 4) {
            main.groups.barriers.push(new Water(main, pof(19, 6)));
            WorldManager.getInstance().changeLayout(Islands.BLISH, pof(19, 6), "o");
            main.groups.barriers.push(new Water(main, pof(19, 7)));
            WorldManager.getInstance().changeLayout(Islands.BLISH, pof(19, 7), "o");
        }
    }

    islandGetters[5] = () => {return new IslandBuilder(5, IslandType.OUTSIDE)
            .setLayout([
                "wt t t t t t t t t t t t ",
                "w                       w",
                "w **     *     cooo?*   w",
                "w     *        ?oooo    w",
                "wwww    *  *   oooo?   *w",
                "   wwn  *      ?oooo *  w",
                "   c             s      w",
                "  nww                   w",
                "wwww                    w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
                "w                       w",
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
                { type: Assets.Images.CrumbsSource, x: 17, y: 6 }
            ])
            .setNPCs([
                { position: pof(5, 5), type: Assets.Images.Sign, text: "Path to Tuttle Village", script: null },
                { position: pof(2, 7), type: Assets.Sprites.OldMan.key, textKey: Texts.BLUMPUS, script: null }
            ])
            .setButtons([
                { type: Assets.Sprites.Button.key, x: 19, y: 2, action: checkOrder, direction: Direction.Left, backgroundType: IslandType.WATER },
                { type: Assets.Sprites.Button.key, x: 15, y: 3, action: checkOrder, direction: Direction.Right, backgroundType: IslandType.WATER },
                { type: Assets.Sprites.Button.key, x: 19, y: 4, action: checkOrder, direction: Direction.Left, backgroundType: IslandType.WATER },
                { type: Assets.Sprites.Button.key, x: 15, y: 5, action: checkOrder, direction: Direction.Right, backgroundType: IslandType.WATER }
            ])
            .build();
    };
}