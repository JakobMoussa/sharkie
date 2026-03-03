let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new SoundEffects();
let muteButton = new Image();
let isMuted = false;
let retryListenerBound = false;

muteButton.src = "img/Grafiken/6.Botones/sound-on.png";

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
 * Toggles global audio state and updates the mute icon.
 * @returns {void}
 */
function toggleMute() {
    if (!world?.sounds) return;

    if (!isMuted) {
        world.sounds.muteAllSounds();
        muteButton.src = "img/Grafiken/6.Botones/sound-off.png";
        isMuted = true;
    } else {
        world.sounds.unmuteAllSounds();
        muteButton.src = "img/Grafiken/6.Botones/sound-on.png";
        isMuted = false;
    }
}

/**
 * Renders the mute button onto the HUD.
 * @param {CanvasRenderingContext2D} context - Canvas 2D context.
 * @returns {void}
 */
function drawMuteButton(context) {
    const x = 800;
    const y = 40;
    const width = 40;
    const height = 40;

    context.fillStyle = "white";
    context.fillRect(x - 5, y - 5, width + 10, height + 10);

    context.strokeStyle = "#007BFF";
    context.lineWidth = 3;
    context.strokeRect(x - 5, y - 5, width + 10, height + 10);

    context.drawImage(muteButton, x, y, width, height);
}

/**
 * Starts the game.
 * Hides overlay, shows canvas, creates world instance.
 *
 * @returns {void}
 */
function startGame() {
    showGameCanvas();
    createWorldAndInit();
    markGameRunning();
    watchGameEnd();
    attachMuteClick();
}

/**
 * Hides start overlay and reveals the canvas.
 * @returns {void}
 */
function showGameCanvas() {
    document.getElementById("startOverlay").style.display = "none";
    canvas.style.display = "block";
}

/**
 * Instantiates world and sets up inputs/UI helpers.
 * @returns {void}
 */
function createWorldAndInit() {
    world = new World(canvas, keyboard);
    initMobileControls();
    initRetryButton();
    startMusicOnce();
}

/**
 * Flags the document as running to trigger UI states.
 * @returns {void}
 */
function markGameRunning() {
    document.body.classList.add("gameRunning");
}

/**
 * Observes world state to remove running flag when finished.
 * @returns {void}
 */
function watchGameEnd() {
    const endWatcher = setInterval(() => {
        if (!world) return;
        if (world.gameState !== "play") {
            document.body.classList.remove("gameRunning");
            clearInterval(endWatcher);
        }
    }, 200);
}

/**
 * Hooks canvas clicks to toggle mute when hitting the mute icon box.
 * @returns {void}
 */
function attachMuteClick() {
    canvas?.addEventListener("click", function (e) {
        const { mx, my } = getMousePos(e);

        if (mx >= 800 && mx <= 840 && my >= 40 && my <= 80) {
            toggleMute();
        }
    });
}

/**
 * Resets all keyboard flags to false.
 * @returns {void}
 */
function resetKeyboard() {
  keyboard.RIGHT = false;
  keyboard.LEFT  = false;
  keyboard.UP    = false;
  keyboard.DOWN  = false;
  keyboard.SPACE = false;
  keyboard.F     = false;
}

/**
 * Destroys current world and starts a fresh run.
 * @returns {void}
 */
function restartGame() {
  if (world) world.destroy();
  resetKeyboard();
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world = new World(canvas, keyboard);
  document.body.classList.add("gameRunning");
}

/**
 * Initializes retry button click handler.
 *
 * @returns {void}
 */
function initRetryButton() {
    if (retryListenerBound) return;
    retryListenerBound = true;
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
    if (isInsideRetryBtn(mx, my)) restartGame();
}

/**
 * Calculates mouse position relative to canvas.
 *
 * @param {MouseEvent} e - Mouse event.
 * @returns {{mx: number, my: number}} Mouse coordinates.
 */
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        mx: (clientX - rect.left) * scaleX,
        my: (clientY - rect.top) * scaleY
    };
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

/**
 * Wires on-screen buttons to keyboard flags (touch/mobile).
 * @returns {void}
 */
function initMobileControls() {
  const kb = world.keyboard;

  const map = [
    { id: "btnLeft", key: "LEFT" },
    { id: "btnRight", key: "RIGHT" },
    { id: "btnUp", key: "UP" },
    { id: "btnDown", key: "DOWN" },
    { id: "btnSlap", key: "SPACE" },
    { id: "btnPoison", key: "F" }
  ];

  map.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("pointerdown", (e) => { e.preventDefault(); kb[key] = true; });
    el.addEventListener("pointerup", () => kb[key] = false);
    el.addEventListener("pointercancel", () => kb[key] = false);
    el.addEventListener("pointerleave", () => kb[key] = false);
  });
}

window.addEventListener("load", initStartOverlay);

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("privacyBtn");
  const modal = document.getElementById("privacyModal");
  const close = document.getElementById("closePrivacy");

  btn.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  close.addEventListener("click", function () {
    modal.style.display = "none";
  });

    modal.addEventListener("click", function (remove) {
        if (remove.target === modal) {
            modal.style.display = "none";
        }
    });

});
