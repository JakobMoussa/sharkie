class SoundEffects {
 
    lastSharkHurtTime = 0;

    /**
     * Initializes all audio objects and sets the background music to loop.
     */
    constructor() {
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

    /**
     * Plays the specified sound by name. Skips playback if muted.
     * Applies a 1-second cooldown for the "sharkHurt" sound to prevent rapid repetition.
     * @param {string} sound - The name of the sound property to play.
     */
    play(sound) {
        if (this.muted) return;

        if (sound === "sharkHurt") {
            const now = Date.now();
            if (now - this.lastSharkHurtTime < 1000) return;
            this.lastSharkHurtTime = now;
        }
        if (this[sound]) {
            this[sound].currentTime = 0;
            this[sound].play();
        }
    }

    /**
     * Stops the specified sound and resets its playback position.
     * @param {string} sound - The name of the sound property to stop.
     */
    stop(sound) {
        if (this[sound]) {
            this[sound].pause();
            this[sound].currentTime = 0;
        }
    }

    /**
     * Mutes all audio objects and sets the global mute flag to true.
     */
    muteAllSounds() {
        this.muted = true;
        Object.keys(this).forEach((key) => {
            const value = this[key];
            if (value instanceof Audio) value.muted = true;
        });
    }

    /**
     * Unmutes all audio objects and sets the global mute flag to false.
     */
    unmuteAllSounds() {
        this.muted = false;
        Object.keys(this).forEach((key) => {
            const value = this[key];
            if (value instanceof Audio) value.muted = false;
        });
    }
}