class Poison extends MovableObject {
    imageCache = {};
    currentImage = 0;
    world;
    img;
    width = 40;
    height = 50;


    IMAGES_POSION = [
        'img/Grafiken/4. Marcadores/Posiขn/Animada/1.png',
        'img/Grafiken/4. Marcadores/Posiขn/Animada/2.png',
        'img/Grafiken/4. Marcadores/Posiขn/Animada/3.png',
        'img/Grafiken/4. Marcadores/Posiขn/Animada/4.png',
        'img/Grafiken/4. Marcadores/Posiขn/Animada/5.png',
        'img/Grafiken/4. Marcadores/Posiขn/Animada/6.png',
        'img/Grafiken/4. Marcadores/Posiขn/Animada/7.png',
        'img/Grafiken/4. Marcadores/Posiขn/Animada/8.png'
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;

        this.loadImage(this.IMAGES_POSION[0]);
        this.loadImages(this.IMAGES_POSION);
        this.animate();
    }

    /**
     * Loops through poison bottle frames to create a pulsing animation.
     * Uses a simple modulo increment over the preloaded image cache.
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            const i = this.currentImage % this.IMAGES_POSION.length;
            const path = this.IMAGES_POSION[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }


}
