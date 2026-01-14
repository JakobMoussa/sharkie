class PufferFish extends MovableObject {

    width = 100;
    height = 100;
    images = [];
    currentImage = 0;

    FISHES_SWIMING_GREEN = [        
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    FISHES_SWIMING_RED = [        
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png'
    ];

    constructor(x, y, color = 'green') {
        super();

        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.25;
        this.images =
        color === 'red'
            ? this.FISHES_SWIMING_RED
            : this.FISHES_SWIMING_GREEN;

        this.loadImage(this.images[0]);
        this.loadImages(this.images);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.images.length;
        const path = this.images[this.currentImage];
        this.img = this.imageCache[path] || this.img;
        }, 250);
    }

    moveUp() {

    }

}