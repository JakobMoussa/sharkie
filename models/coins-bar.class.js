class CoinsBar extends MovableObject {

    COINSBAR_IMAGES = [
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/Grafiken - Sharkie/4. Marcadores/green/Coin/100_ copia 4.png'
    ]

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.COINSBAR_IMAGES);
        this.loadImage(this.COINSBAR_IMAGES[0]);

        this.x = 460;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

/**
 * Updates the collectable status based on the current percentage.
 * Determines the correct image index and loads the corresponding image.
 *
 * @param {number} percentage - Current collected amount (0–10).
 * @returns {void}
 */
    setPercentage(value) {
        this.percentage = Math.max(0, Math.min(100, value));
        const i = this.resolveImageIndex();
        this.img = this.imageCache[this.COINSBAR_IMAGES[i]];
    }
    
/**
 * Resolves the correct image index depending on the collected percentage.
 *
 * @param {number} percentage - Current collected amount (0–10).
 * @returns {number} Index of the corresponding image in COLLECTABLE_IMAGES.
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