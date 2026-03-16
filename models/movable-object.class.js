class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    offset = 50;
    hitbox = { left: 0, right: 0, top: 0, bottom: 0 };

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
     * Returns an axis-aligned bounding box with optional inner padding.
     * @param {{left?:number,right?:number,top?:number,bottom?:number}|null} pad - Insets applied inside the box.
     * @returns {{x:number,y:number,w:number,h:number}} Rectangle describing the hitbox.
     */
    getBounds(pad) {
        const p = pad ?? { left: 0, right: 0, top: 0, bottom: 0 };
        return {
            x: this.x + (p.left || 0),
            y: this.y + (p.top || 0),
            w: this.width - (p.left || 0) - (p.right || 0),
            h: this.height - (p.top || 0) - (p.bottom || 0),
        };
    }

    /**
     * Checks overlap between this object and another movable object.
     * Uses this.hitbox and other.hitbox unless overrides are provided.
     * @param {MovableObject} other - Target object.
     * @param {{left?:number,right?:number,top?:number,bottom?:number}|null} [padThis=null] - Optional padding for this object.
     * @param {{left?:number,right?:number,top?:number,bottom?:number}|null} [padOther=null] - Optional padding for the other object.
     * @returns {boolean} True if rectangles overlap.
     */
    isColliding(other, padThis = null, padOther = null) {
        const a = this.getBounds(padThis ?? this.hitbox);
        const b = other.getBounds ? other.getBounds(padOther ?? other.hitbox) : {
            x: other.x,
            y: other.y,
            w: other.width,
            h: other.height,
        };

        return (
            a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y
        );
    }

    /**
     * Collision helper for regular enemies.
     * @param {MovableObject} other - Enemy object.
     * @returns {boolean} True if overlapping.
     */
    isCollidingEnemy(other) {
        return this.isColliding(other);
    }

    /**
     * Collision helper for the endboss.
     * @param {MovableObject} other - Endboss object.
     * @returns {boolean} True if overlapping.
     */
    isCollidingBoss(other) {
        return this.isColliding(other);
    }

    /**
     * Collision helper for collectible items.
     * @param {MovableObject} other - Item object.
     * @returns {boolean} True if overlapping.
     */
    isCollidingItem(other) {
        return this.isColliding(other);
    }

    /**
     * Sets padding for this object's hitbox.
     * @param {number} left - Padding on the left.
     * @param {number} right - Padding on the right.
     * @param {number} top - Padding on the top.
     * @param {number} bottom - Padding on the bottom.
     * @returns {void}
     */
    setHitbox(left, right, top, bottom) {
        this.hitbox = { left, right, top, bottom };
    }

}
