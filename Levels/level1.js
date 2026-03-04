function randomY() {
    return 100 + Math.random() * 400;
}

/**
 * Level 1, so that enemies are only generated at the start of the game.
 */
function createLevel1() {
    return new Level(
        [
            new PufferFish(1000, randomY(), 'green'),
            new PufferFish(1400, randomY(), 'red'),
            new PufferFish(2500, randomY(), 'green'),
            new PufferFish(2800, randomY(), 'red'),
            new PufferFish(1550, randomY(), 'green'),
            new PufferFish(1800, randomY(), 'red'),
            new PufferFish(1250, randomY(), 'green'),
            new PufferFish(2700, randomY(), 'red'),
            new PufferFish(1200, randomY(), 'green'),
            new PufferFish(1400, randomY(), 'red'),
            new PufferFish(1600, randomY(), 'green'),
            new PufferFish(2000, randomY(), 'green'),
            new PufferFish(2400, randomY(), 'red'),
            new JellyFish(750, randomY()),
            new JellyFish(900, randomY()),
            new JellyFish(600, randomY()),
            new JellyFish(900, randomY()),
            new JellyFish(1300, randomY()),
            new JellyFish(2000, randomY()),
            new JellyFish(2400, randomY()),
            new JellyFish(2600, randomY())
        ],

        [
            new Background('img/Grafiken/3. Background/Dark/1.png', 0, 0),
            new Background('img/Grafiken/3. Background/Dark/1.png', 0, 0),
            new Background('img/Grafiken/3. Background/Dark/2.png', 900, 0),
            new Background('img/Grafiken/3. Background/Dark/2.png', 900, 0),
            new Background('img/Grafiken/3. Background/Dark/1.png', 1800, 0),
            new Background('img/Grafiken/3. Background/Dark/1.png', 1800, 0),
            new Background('img/Grafiken/3. Background/Dark/2.png', 2700, 0),
            new Background('img/Grafiken/3. Background/Dark/2.png', 2700, 0),
            new Background('img/Grafiken/3. Background/Dark/1.png', 3600, 0),
            new Background('img/Grafiken/3. Background/Dark/1.png', 3600, 0),
        ]
    );
}
