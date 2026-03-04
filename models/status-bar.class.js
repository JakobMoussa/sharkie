class StatusBar extends MovableObject {

    STATUSBAR_IMAGES = [
        'img/Grafiken/4. Marcadores/green/Life/0_  copia 3.png',
        'img/Grafiken/4. Marcadores/green/Life/20_ copia 4.png',
        'img/Grafiken/4. Marcadores/green/Life/40_  copia 3.png',
        'img/Grafiken/4. Marcadores/green/Life/60_  copia 3.png',
        'img/Grafiken/4. Marcadores/green/Life/80_  copia 3.png',
        'img/Grafiken/4. Marcadores/green/Life/100_  copia 2.png'
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
        this.setPercentage(100);
    }

    /**
     * Updates life percentage, clamps to [0,100] and swaps the sprite.
     * @param {number} value - New health value.
     * @returns {void}
     */
    setPercentage(value) {
        this.percentage = Math.max(0, Math.min(100, value));
        const i = this.resolveImageIndex();
        this.img = this.imageCache[this.STATUSBAR_IMAGES[i]];
    }

    /**
     * Maps current percentage to the correct bar image index.
     * @returns {number} Index in STATUSBAR_IMAGES.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}
