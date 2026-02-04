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


    TRANSITION_GREEN = [        
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
    ];

    TRANSITION_RED = [        
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/Grafiken - Sharkie/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png'
    ];

    constructor(x, y, color = 'green') {
        super();
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.25;
        this.swimImgs = (color === 'red') ? this.FISHES_SWIMING_RED : this.FISHES_SWIMING_GREEN;
        this.transImgs = (color === 'red') ? this.TRANSITION_RED : this.TRANSITION_GREEN;
        this.isNear = false;

        this.loadImage(this.swimImgs[0]);
        this.loadImages(this.swimImgs);
        this.loadImages(this.transImgs);
        this.animate();
    }

    setNear(value) {
        this.isNear = value;
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            const now = Date.now();
            if (this.isNear) {
                this.fishAnimation(this.transImgs);
            } else {
                this.fishAnimation(this.swimImgs);
            }
        }, 250);
    }
}