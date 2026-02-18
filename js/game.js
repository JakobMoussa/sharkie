let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new SoundEffects();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
}

function startMusicOnce() {
    if (world && world.sounds) world.sounds.play("background");
    document.removeEventListener("click", startMusicOnce);
    document.removeEventListener("keydown", startMusicOnce);
}

document.addEventListener("click", startMusicOnce);
document.addEventListener("keydown", startMusicOnce);


window.addEventListener("keydown", (e) => {
    if (e.keyCode === 39) keyboard.RIGHT = true;
    if (e.keyCode === 37) keyboard.LEFT = true;
    if (e.keyCode === 38) keyboard.UP = true;
    if (e.keyCode === 40) keyboard.DOWN = true;
    if (e.keyCode === 32) keyboard.SPACE = true;
    if (e.keyCode === 70) keyboard.F = true;
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode === 39) keyboard.RIGHT = false;
    if (e.keyCode === 37) keyboard.LEFT = false;
    if (e.keyCode === 38) keyboard.UP = false;
    if (e.keyCode === 40) keyboard.DOWN = false;
    if (e.keyCode === 32) keyboard.SPACE = false;
    if (e.keyCode === 70) keyboard.F = false;
});
