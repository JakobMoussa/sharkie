const MUTE_STORAGE_KEY = "sharkieMuted";
let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new SoundEffects();
let muteButton = new Image();
let isMuted = loadStoredMutePreference();
let retryListenerBound = false;

muteButton.src = isMuted
  ? "img/Grafiken/6.Botones/sound-off.png"
  : "img/Grafiken/6.Botones/sound-on.png";

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
    syncMuteIcon();
}

/**
 * Toggles global audio state and updates the mute icon.
 * @returns {void}
 */
function toggleMute() {
    isMuted = !isMuted;
    applyMuteStateToWorld();
    muteButton.src = isMuted
      ? "img/Grafiken/6.Botones/sound-off.png"
      : "img/Grafiken/6.Botones/sound-on.png";
    saveMuteState();
}

/**
 * Reads the persisted mute preference from localStorage.
 * Returns false when no preference is stored or storage is unavailable.
 * @returns {boolean}
 */
function loadStoredMutePreference() {
  if (!window.localStorage) return false;
  return localStorage.getItem(MUTE_STORAGE_KEY) === "true";
}

/**
 * Writes the current mute preference to localStorage.
 * @returns {void}
 */
function saveMuteState() {
  if (!window.localStorage) return;
  localStorage.setItem(MUTE_STORAGE_KEY, String(isMuted));
}

/**
 * Applies the current mute flag to all world sounds (noop if world not ready).
 * @returns {void}
 */
function applyMuteStateToWorld() {
  if (!world?.sounds) return;
  if (isMuted) {
    world.sounds.muteAllSounds();
  } else {
    world.sounds.unmuteAllSounds();
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
    document.body.classList.add("canvasVisible");
}

/**
 * Instantiates world and sets up inputs/UI helpers.
 * @returns {void}
 */
function createWorldAndInit() {
    world = new World(canvas, keyboard);
    applyMuteStateToWorld();
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
            showEndButtons();
            clearInterval(endWatcher);
        }
    }, 200);
}

/**
 * Hooks canvas clicks to toggle mute when hitting the mute icon box.
 * @returns {void}
 */
function attachMuteClick() {

    if (canvas) {
        canvas.addEventListener("click", handleCanvasMuteClick);
        canvas.addEventListener("mousemove", handleCanvasMuteHover);
        canvas.addEventListener("mouseleave", () => (canvas.style.cursor = "default"));
    }

    const muteBtn = document.getElementById("muteOverlay");

    if (muteBtn) {
        muteBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            toggleMute();
            syncMuteIcon();
        });
    }

}

/**
 * Handles clicks on the canvas to toggle mute when pressing the HUD icon.
 * @param {MouseEvent} e - Mouse click event.
 * @returns {void}
 */
function handleCanvasMuteClick(e) {
    const { mx, my } = getMousePos(e);
    if (mx >= 800 && mx <= 840 && my >= 40 && my <= 80) {
        toggleMute();
        syncMuteIcon();
    }
}

/**
 * Shows pointer cursor when hovering the canvas mute icon.
 * @param {MouseEvent} e - Mouse move event.
 * @returns {void}
 */
function handleCanvasMuteHover(e) {
    const { mx, my } = getMousePos(e);
    const overMute = mx >= 800 && mx <= 840 && my >= 40 && my <= 80;
    canvas.style.cursor = overMute ? "pointer" : "default";
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
  applyMuteStateToWorld();
  document.body.classList.add("gameRunning");
  syncMuteIcon();
}

/**
 * Returns to start overlay without reload.
 * @returns {void}
 */
function backToOptions() {
  document.body.classList.remove("gameRunning");
  document.body.classList.remove("canvasVisible");
  hideEndButtons();
  if (world) {
    world.destroy();
    world.gameState = "stopped";
  }
  canvas.style.display = "none";
  document.getElementById("startOverlay").style.display = "block";
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
    const retryBtn = document.getElementById("retryHitbox");
    if (retryBtn) retryBtn.addEventListener("click", () => restartGame());
    const backBtn = document.getElementById("backToOptions");
    if (backBtn) backBtn.addEventListener("click", backToOptions);

    window.addEventListener("resize", repositionEndButtons);
    window.addEventListener("orientationchange", repositionEndButtons);
}

/**
 * Handles click on retry button.
 * @param {MouseEvent} e - Mouse click event.
 * @returns {void}
 */
function handleRetryClick(e) {
    if (world.gameState === "play") return;

    const { mx, my } = getMousePos(e);
    if (isInsideRetryBtn(mx, my)) restartGame();
}

/**
 * Repositions retry/back buttons when end overlay is visible.
 * @returns {void}
 */
function repositionEndButtons() {
    if (!world || (world.gameState !== "win" && world.gameState !== "lose")) return;
    world.positionRetryButton();
    world.positionBackButton();
}

/**
 * Hides end buttons overlay elements if present.
 * @returns {void}
 */
function hideEndButtons() {
  const retryBtn = document.getElementById("retryHitbox");
  const backBtn = document.getElementById("backToOptions");
  if (retryBtn) retryBtn.style.display = "none";
  if (backBtn) backBtn.style.display = "none";
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

/**
 * Shows retry/back buttons overlay when the game ends.
 * @returns {void}
 */
function showEndButtons() {
  const retryBtn = document.getElementById("retryHitbox");
  const backBtn = document.getElementById("backToOptions");
  if (retryBtn) retryBtn.style.display = "block";
  if (backBtn) backBtn.style.display = "block";
}

/**
 * Syncs mute overlay icon image with current mute state.
 * @returns {void}
 */
function syncMuteIcon() {
  const icon = document.getElementById("muteOverlayIcon");
  if (!icon) return;
  icon.src = isMuted ? "img/Grafiken/6.Botones/sound-off.png" : "img/Grafiken/6.Botones/sound-on.png";
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
  getControlMap().forEach((cfg) => bindMobileControl(cfg, kb));
}

/**
 * Returns mapping between on-screen control IDs and keyboard flags.
 * @returns {{id:string,key:string}[]} Control map entries.
 */
function getControlMap() {
  return [
    { id: "btnLeft", key: "LEFT" },
    { id: "btnRight", key: "RIGHT" },
    { id: "btnUp", key: "UP" },
    { id: "btnDown", key: "DOWN" },
    { id: "btnSlap", key: "SPACE" },
    { id: "btnPoison", key: "F" }
  ];
}

/**
 * Binds a touch/pointer button to a keyboard flag.
 * @param {{id:string,key:string}} param0 - Control config.
 * @param {Keyboard} kb - Keyboard state object.
 * @returns {void}
 */
function bindMobileControl({ id, key }, kb) {
  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener("pointerdown", (e) => { e.preventDefault(); kb[key] = true; });
  el.addEventListener("pointerup", () => kb[key] = false);
  el.addEventListener("pointercancel", () => kb[key] = false);
  el.addEventListener("pointerleave", () => kb[key] = false);
}

window.addEventListener("load", initStartOverlay);

document.addEventListener("DOMContentLoaded", initLegalModals);

/**
 * Initializes privacy and impressum modals by wiring their controls.
 * @returns {void}
 */
function initLegalModals() {
    const privacyBtn = document.getElementById("privacyBtn");
    const privacyModal = document.getElementById("privacyModal");
    const privacyClose = document.getElementById("closePrivacy");

    attachModalEvents(privacyBtn, privacyModal, privacyClose);

    const impressumBtn = document.getElementById("impressumBtn");
    const impressumModal = document.getElementById("impressumModal");
    const impressumClose = document.getElementById("closeImpressum");

    attachModalEvents(impressumBtn, impressumModal, impressumClose);
}

/**
 * Wires click handlers for opening/closing a modal.
 * @param {HTMLElement} btn - Button that opens the modal.
 * @param {HTMLElement} modal - Modal element.
 * @param {HTMLElement} close - Close icon/button element.
 * @returns {void}
 */
function attachModalEvents(btn, modal, close) {
    if (!btn || !modal || !close) return;

    btn.addEventListener("click", function () {
        openModal(modal);
    });

    close.addEventListener("click", function () {
        closeModal(modal);
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}

/**
 * Shows the modal.
 * @param {HTMLElement} modal - Modal element.
 * @returns {void}
 */
function openModal(modal) {
    modal.style.display = "flex";
}

/**
 * Hides the modal.
 * @param {HTMLElement} modal - Modal element.
 * @returns {void}
 */
function closeModal(modal) {
    modal.style.display = "none";
}
