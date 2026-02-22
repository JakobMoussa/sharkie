let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new SoundEffects();

/**
 * Initializes the start overlay.
 * Hides canvas and attaches start button listener.
 *
 * @returns {void}
 */
function initStartOverlay() {
    canvas = document.getElementById('canvas');
    canvas.style.display = "none";

    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", startGame);
}

/**
 * Starts the game.
 * Hides overlay, shows canvas, creates world instance.
 *
 * @returns {void}
 */
function startGame() {
    document.getElementById("startOverlay").style.display = "none";
    canvas.style.display = "block";

    world = new World(canvas, keyboard);
    initRetryButton();
    startMusicOnce();
}

/**
 * Initializes retry button click handler.
 *
 * @returns {void}
 */
function initRetryButton() {
    canvas.addEventListener("click", handleRetryClick);
}

/**
 * Handles click on retry button.
 *
 * @param {MouseEvent} e - Mouse click event.
 * @returns {void}
 */
function handleRetryClick(e) {
    if (world.gameState === "play") return;

    const { mx, my } = getMousePos(e);
    if (isInsideRetryBtn(mx, my)) location.reload();
}

/**
 * Calculates mouse position relative to canvas.
 *
 * @param {MouseEvent} e - Mouse event.
 * @returns {{mx: number, my: number}} Mouse coordinates.
 */
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return { mx: e.clientX - rect.left, my: e.clientY - rect.top };
}

/**
 * Checks if mouse click is inside retry button area.
 *
 * @param {number} mx - Mouse X position.
 * @param {number} my - Mouse Y position.
 * @returns {boolean} True if inside button.
 */
function isInsideRetryBtn(mx, my) {
    const { x, y, w, h } = world.retryBtn;
    const inX = mx >= x && mx <= x + w;
    const inY = my >= y && my <= y + h;
    return inX && inY;
}
/**
 * Starts background music once.
 *
 * @returns {void}
 */
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