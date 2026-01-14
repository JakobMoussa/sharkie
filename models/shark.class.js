class Shark extends MovableObject {
    IMAGES_MOVING = [   
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/2.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/3.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/4.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/5.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/6.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/7.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/8.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/9.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/10.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/11.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/12.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/13.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/14.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/15.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/16.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/17.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/18.png',
    ];

    currentImage = 0;

    constructor() {
        super().loadImage("img/Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png");
        this.loadImages(this.IMAGES_MOVING);
        this.animate();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_MOVING.length;
            let path = this.IMAGES_MOVING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 250);
    }

    animate() {

    }
   
    moveUp() {

    }
}
