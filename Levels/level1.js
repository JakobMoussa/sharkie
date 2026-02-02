function randomY() {
    return 100 + Math.random() * 400;
}
const Level1 = new Level(
        [
        new PufferFish(1800, randomY(), 'green'),
        new PufferFish(1400, randomY(), 'red'),
        new PufferFish(1550, randomY(), 'green'),
        new PufferFish(1900, randomY(), 'red'),
        new PufferFish(1250, randomY(), 'green'),
        new PufferFish(1000, randomY(), 'red'),
        new PufferFish(1600, randomY(), 'green'),
        new PufferFish(1500, randomY(), 'red'),
        new PufferFish(1700, randomY(), 'green'),
        new JellyFish(750, randomY()),
        new JellyFish(900, randomY()),
        new JellyFish(800, randomY()),
        new JellyFish(900, randomY()),
        new JellyFish(1300, randomY()),
        new JellyFish(2000, randomY()),
        new Endboss(2500)
        ],

        [
        new Background('img/Grafiken - Sharkie/3. Background/Dark/1.png', 0, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/1.png', 0, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/2.png', 900, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/2.png', 900, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/1.png', 1800, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/1.png', 1800, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/2.png', 2700, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/2.png', 2700, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/1.png', 3600, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/1.png', 3600, 0),
        ],
        

);