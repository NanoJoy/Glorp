module MyGame {
    islandGetters[Islands.BROTHER] = () => {
        return new IslandBuilder(Islands.BROTHER, IslandType.INSIDE)
            .setLayout([
                "bbbbbb",
                "b    b",
                "b    b",
                "b    b",
                "b    b",
                "b  d b",
                "bbbbbb"
            ])
            .setLinks([
                { pos: pof(3, 5), link: Islands.TOWN, playerStart: pof(11, 7) }
            ])
            .build();
    };
}