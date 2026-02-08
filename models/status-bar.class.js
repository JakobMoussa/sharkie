class StatusBar extends MovableObject {

    STATUSBAR_IMAGES = [
        'img/Grafiken - Sharkie/4. Marcadores/green/Life/0_  copia 3.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Life/20_ copia 4.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Life/40_  copia 3.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Life/60_  copia 3.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Life/80_  copia 3.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Life/100_  copia 2.png'
    ]

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.STATUSBAR_IMAGES);
        this.loadImage(this.STATUSBAR_IMAGES[5]);

        this.x = 20;
        this.y = 20;
        this.width = 200;
        this.height = 60;
    }
}