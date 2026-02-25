class SoundEffects {
 
    constructor () {

        this.background = new Audio('Sound effects/Background Sound.mp3');
        this.bubble = new Audio('Sound effects/Bubble.mp3');
        this.endboss = new Audio('Sound effects/endboss Sound.mp3');
        this.endbossEntry = new Audio('Sound effects/endboss_entry Sound.mp3');
        this.sharkHurt = new Audio('Sound effects/Shark_Hurt Sound.mp3');
        this.sharkSlap = new Audio('Sound effects/Slap_Effect.mp3');
        this.coin = new Audio('Sound effects/coin_Sound.mp3');
        this.poison = new Audio('Sound effects/Collect poison Sound.mp3');
        this.lose = new Audio('Sound effects/Lose Sound.mp3');
        this.win = new Audio('Sound effects/Win Sound.mp3');

        this.background.loop = true;
        this.muted = false;
    }

    play(sound) {
        if (this[sound]) {
            this[sound].currentTime = 0;
            this[sound].play();
        }
    }

    stop(sound) {
        if (this[sound]) {
            this[sound].pause();
            this[sound].currentTime = 0;
        }
    }

    muteAllSounds() {
        this.muted = true;

        Object.keys(this).forEach((key) => {
            const value = this[key];
            if (value instanceof Audio) {
                value.muted = true;
            }
        });
    }

    unmuteAllSounds() {
        this.muted = false;

        Object.keys(this).forEach((key) => {
            const value = this[key];
            if (value instanceof Audio) {
                value.muted = false;
            }
        });
    }

}