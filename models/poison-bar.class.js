class PoisonBar extends MovableObject {

    POISON_BAR_IMAGES = [
        'img/Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/poisoned bubbles/100_ copia 3.png'
    ];

    presentage = 0;

    constructor() {
        super();
        this.loadImages(this.POISON_BAR_IMAGES);
        this.loadImage(this.POISON_BAR_IMAGES[0]);

        this.x = 240;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        console.log("PoisonBar img:", this.img);
    }


}