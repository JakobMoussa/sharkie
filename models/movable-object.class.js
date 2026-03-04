class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    offset = 50;

    /**
     * Moves the object continuously to the left at the defined speed.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    /**
     * Advances the animation by one frame using the given image array.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        if (!images || images.length === 0) return;

        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Advances the fish animation by one frame, falling back to the current image if not cached.
     * @param {string[]} images - Array of image paths for the animation.
     */
    fishAnimation(images) {
        if (!images || images.length === 0) return;

        this.currentImage = (this.currentImage + 1) % images.length;
        const path = images[this.currentImage];
        this.img = this.imageCache[path] || this.img;
    }

    /**
     * Checks whether this object overlaps with another object using optional padding.
     * @param {MovableObject} other - The other object to check against.
     * @param {number} [padThis=0] - Padding applied to this object's hitbox.
     * @param {number} [padOther=0] - Padding applied to the other object's hitbox.
     * @returns {boolean} True if the objects are colliding.
     */
    isColliding(other, padThis = 0, padOther = 0) {
        return (
            this.x + this.width - padThis > other.x + padOther &&
            this.x + padThis < other.x + other.width - padOther &&
            this.y + this.height - padThis > other.y + padOther &&
            this.y + padThis < other.y + other.height - padOther
        );
    }

    /**
     * Checks collision with a regular enemy using a tighter hitbox.
     * @param {MovableObject} other - The enemy object to check against.
     * @returns {boolean} True if colliding with the enemy.
     */
    isCollidingEnemy(other) {
        const sharkLeft = 45;
        const sharkRight = 30;
        const sharkTop = 55;
        const sharkBottom = 34;

        const enemyLeft = 40;
        const enemyRight = 40;
        const enemyTop = 40;
        const enemyBottom = 80;

        return (
            this.x + this.width - sharkRight > other.x + enemyLeft &&
            this.x + sharkLeft < other.x + other.width - enemyRight &&
            this.y + this.height - sharkBottom > other.y + enemyTop &&
            this.y + sharkTop < other.y + other.height - enemyBottom
        );
    }

    /**
     * Checks collision with the endboss using reduced hitboxes on both sides.
     * @param {MovableObject} other - The endboss object to check against.
     * @returns {boolean} True if colliding with the endboss.
     */
    isCollidingBoss(other) {
        const sharkLeft = 30;
        const sharkRight = 30;
        const sharkTop = 60;
        const sharkBottom = 30;

        const bossLeft = 120;
        const bossRight = 120;
        const bossTop = 220;
        const bossBottom = 220;

        return (
            this.x + this.width - sharkRight > other.x + bossLeft &&
            this.x + sharkLeft < other.x + other.width - bossRight &&
            this.y + this.height - sharkBottom > other.y + bossTop &&
            this.y + sharkTop < other.y + other.height - bossBottom
        );
    }

    /**
     * Checks collision with a collectible item using a tighter hitbox.
     * @param {MovableObject} other - The item object to check against.
     * @returns {boolean} True if colliding with the item.
     */
    isCollidingItem(other) {
        const shrinkX = this.width * 0.15;
        const shrinkTop = this.height * 0.45;
        const shrinkBottom = this.height * 0.25;

        const itemPad = 10;

        return (
            this.x + this.width - shrinkX > other.x + itemPad &&
            this.x + shrinkX < other.x + other.width - itemPad &&
            this.y + this.height - shrinkBottom > other.y + itemPad &&
            this.y + shrinkTop < other.y + other.height - itemPad
        );
    }

}
