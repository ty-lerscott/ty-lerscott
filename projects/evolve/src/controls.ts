import { Mesh } from "three";

// Step 4: Handle Player Movement
const keys: Record<string, boolean> = {};

const listenToKeyboard = () => {
    window.addEventListener('keydown', (e) => (keys[e.key] = true));
    window.addEventListener('keyup', (e) => (keys[e.key] = false));
}

const movePlayer = (player: Mesh) => () => {
    const speed = 0.1;
    if (keys['ArrowUp'] || keys['w']) player.position.y += speed;
    if (keys['ArrowDown'] || keys['s']) player.position.y -= speed;
    if (keys['ArrowLeft'] || keys['a']) player.position.x -= speed;
    if (keys['ArrowRight'] || keys['d']) player.position.x += speed;

    // Prevent the player from moving out of bounds
    player.position.x = Math.max(-10, Math.min(10, player.position.x));
    player.position.y = Math.max(-10, Math.min(10, player.position.y));
};

export default movePlayer;
export { listenToKeyboard };