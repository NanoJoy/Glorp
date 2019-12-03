module MyGame {
    islandGetters[Islands.DEATH] = () => {
        let openGate = (main: Main, button: Button) => {
            main.removeBarrier(pof(7, 32), IslandType.OUTSIDE);
        }

        return new IslandBuilder(Islands.DEATH, IslandType.OUTSIDE)
            .setLayout([
                "wwwwwwwwwwwwwwwwwwwwwwww           w",
                "w                                  w",
                "w?                                 w",
                "wwwwwwww                           w",
                "       w                           w",
                "       wn                          w",
                "       g                           w",
                "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
            ])
            .setButtons([
                { type: Assets.Sprites.Button.key, x: 1, y: 2, direction: Direction.Right, action: openGate, backgroundType: IslandType.OUTSIDE }
            ])
            .setNPCs([
                { type: Assets.Images.Sign, position: pof(8, 27), script: null, text: "Tuttle Village" }
            ])
            .build();
    } 
}