function randomY() {
    return 100 + Math.random() * 400;
}
const Level1 = new Level(
        [
        new PufferFish(300, randomY(), 'green'),
        new PufferFish(500, randomY(), 'red'),
        new PufferFish(850, randomY(), 'green'),
        new PufferFish(450, randomY(), 'red'),
        new PufferFish(750, randomY(), 'green'),
        new Endboss(1500)
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