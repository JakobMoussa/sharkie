class Coin extends MovableObject {
    
    IMAGES_COIN = [
        'img/Grafiken/4. Marcadores/1. Coins/1.png',
        'img/Grafiken/4. Marcadores/1. Coins/2.png',
        'img/Grafiken/4. Marcadores/1. Coins/3.png',
        'img/Grafiken/4. Marcadores/1. Coins/4.png',
    ];

    width = 30;
    height = 30;
    currentImage = 0;
    world;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;

        this.setHitbox(6, 6, 6, 6);
        this.loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
    }
    
}