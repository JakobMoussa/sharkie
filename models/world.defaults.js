/**
 * Factory that returns the default property set for a World instance.
 * Splitting these keeps world.class.js shorter without changing logic.
 * @returns {object}
 */
function createWorldDefaults() {
  return {
    shark: new Shark(),
    enemies: [],
    backgroundObjects: [],

    canvas: null,
    ctx: null,
    keyboard: null,
    endboss: null,
    x_camera: 0,
    statusBar: null,
    poisonBar: null,
    poisons: [],
    poisonCount: 0,
    maxPoison: 10,
    coinsBar: null,
    coins: [],
    coinCount: 0,
    maxCoins: 20,
    poisonShots: [],
    endbossBar: null,
    showEndbossBar: false,
    gameState: "play",
    overlayImg: new Image(),
    collisionInterval: null,
  };
}
