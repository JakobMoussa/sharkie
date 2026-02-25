class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    offset = 50;
    hitboxOffset = 35;

    moveLeft () {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        if (!images || images.length === 0) return;

        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    fishAnimation(images) {
        if (!images || images.length === 0) return;

        this.currentImage = (this.currentImage + 1) % images.length;
        const path = images[this.currentImage];
        this.img = this.imageCache[path] || this.img;
    }

    isColliding(other, padThis = 0, padOther = 0) {
        return (
            this.x + this.width - padThis > other.x + padOther &&
            this.x + padThis < other.x + other.width - padOther &&
            this.y + this.height - padThis > other.y + padOther &&
            this.y + padThis < other.y + other.height - padOther
        );
    }

    isCollidingEnemy(other) {
        const padThis = 55;
        const padOther = 15;

        return (
            this.x + this.width - padThis > other.x + padOther &&
            this.x + padThis < other.x + other.width - padOther &&
            this.y + this.height - padThis > other.y + padOther &&
            this.y + padThis < other.y + other.height - padOther
        );
    }

    isCollidingItem(other) {
        const padThis = 75;
        const padOther = 5;

        return (
            this.x + this.width - padThis > other.x + padOther &&
            this.x + padThis < other.x + other.width - padOther &&
            this.y + this.height - padThis > other.y + padOther &&
            this.y + padThis < other.y + other.height - padOther
        );
    }

    isCollidingEnemy(other) {
        return this.isColliding(other, 55, 15);
    }

    isCollidingItem(other) {
        return this.isColliding(other, 75, 5);
    }

}


