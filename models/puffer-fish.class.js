class PufferFish extends MovableObject {

    width = 100;
    height = 100;
    images = [];
    currentImage = 0;
    deadDone = false;

    FISHES_SWIMING_GREEN = [        
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    FISHES_SWIMING_RED = [        
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png'
    ];


    TRANSITION_GREEN = [        
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
    ];

    TRANSITION_RED = [        
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png'
    ];

    GREEN_FISHES_DEAD= [        
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
    ];

    RED_FISHES_DEAD= [        
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png',
        'img/Grafiken/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',
    ];

    constructor(x, y, color = 'green') {
        super();
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.25;
        this.swimImgs = (color === 'red') ? this.FISHES_SWIMING_RED : this.FISHES_SWIMING_GREEN;
        this.transImgs = (color === 'red') ? this.TRANSITION_RED : this.TRANSITION_GREEN;
        this.isNear = false;
        this.dead = false;
        this.deadImgs = (color === 'red') ? this.RED_FISHES_DEAD : this.GREEN_FISHES_DEAD;
        
        this.loadImages(this.deadImgs);
        this.loadImage(this.swimImgs[0]);
        this.loadImages(this.swimImgs);
        this.loadImages(this.transImgs);
        this.loadImages(this.deadImgs);
        this.animate();
    }

    setNear(value) {
        if(this.dead) return;
        this.isNear = value;
    }

    die() {
        this.dead = true;
        this.deadDone = false;
        this.currentImage = 0;
    }

    animate() {
        this.moveLeft();
        setInterval(() => this.updateAnimation(), 250);
    }

    updateAnimation() {
        if (this.dead) {
            this.playDeadAnimation();
            return;
        }

        this.playSwimAnimation();
    }

    playDeadAnimation() {
        if (this.currentImage >= this.deadImgs.length) {
            this.deadDone = true;
            this.currentImage = this.deadImgs.length - 1;
        }

        this.img = this.imageCache[this.deadImgs[this.currentImage]];
        this.currentImage++;
    }

    playSwimAnimation() {
        const imgs = this.isNear ? this.transImgs : this.swimImgs;
        this.fishAnimation(imgs);
    }
}