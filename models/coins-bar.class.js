class CoinsBar extends MovableObject {

        COINSBAR_IMAGES = [
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/100_ copia 4.png'
    ]

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.COINSBAR_IMAGES);
        this.loadImage(this.COINSBAR_IMAGES[0]);

        this.x = 460;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        console.log("StatusBar img:", this.img);
    }
}