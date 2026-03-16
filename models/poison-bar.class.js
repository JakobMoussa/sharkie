class PoisonBar extends MovableObject {

    POISON_BAR_IMAGES = [
        'img/Grafiken/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/Grafiken/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/Grafiken/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/Grafiken/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/Grafiken/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/Grafiken/4. Marcadores/green/poisoned bubbles/100_ copia 3.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.POISON_BAR_IMAGES);
        this.loadImage(this.POISON_BAR_IMAGES[0]);
        this.setPercentage(0);

        this.x = 240;
        this.y = 20;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Sets the poison fill level and swaps to the matching bar image.
     * Value is clamped between 0 and 100 before resolving the sprite.
     * @param {number} value - New poison percentage.
     * @returns {void}
     */
    setPercentage(value) {
        this.percentage = Math.max(0, Math.min(100, value));
        const i = this.resolveImageIndex();
        this.img = this.imageCache[this.POISON_BAR_IMAGES[i]];
    }

    /**
     * Maps percentage to the corresponding bar image index.
     * @returns {number} Image index for current percentage.
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
