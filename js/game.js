let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new SoundEffects();


function initStartOverlay() {
    canvas = document.getElementById('canvas');
    canvas.style.display = "none";

    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", startGame);
}

function startGame() {
    document.getElementById("startOverlay").style.display = "none";
    canvas.style.display = "block";

    world = new World(canvas, keyboard);
    initRetryButton();
    startMusicOnce();
}

function initRetryButton() {
    canvas.addEventListener("click", handleRetryClick);
}

function handleRetryClick(e) {
    if (world.gameState === "play") return;

    const { mx, my } = getMousePos(e);
    if (isInsideRetryBtn(mx, my)) location.reload();
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return { mx: e.clientX - rect.left, my: e.clientY - rect.top };
}

function isInsideRetryBtn(mx, my) {
    const { x, y, w, h } = world.retryBtn;
    const inX = mx >= x && mx <= x + w;
    const inY = my >= y && my <= y + h;
    return inX && inY;
}

function startMusicOnce() {
    if (world && world.sounds) world.sounds.play("background");
}

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

window.addEventListener("load", initStartOverlay);