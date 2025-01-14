import render from "./renderer";
import listen from "./listeners";
import gameEngine from './engine';
import createPlayer, { eatFood } from "./player";
import movePlayer from "./controls";
import createFoodParticles, { moveFood } from "./food";

const CONFIG = {
  zoom: -8
}

// Step 1: Setup the Scene, Camera and Renderer
const { scene, camera, renderer } = render({
  fieldOfView: 75,
  aspectRatio: window.innerWidth / window.innerHeight,
  nearClippingPlane: 0.1,
  farClippingPlane: 1000,
  canvasSelector: document.querySelector<HTMLCanvasElement>("#gameCanvas")!,
});

// Step 2: Create the Player
const player = createPlayer({ zoom: CONFIG.zoom, scene });

// Step 3: Create the Food
const food = createFoodParticles({ total: 50, scene, zoom: CONFIG.zoom });

// Step 4: Add Listeners
listen({ camera, renderer });

// Step 5: Game Loop
gameEngine({
  controls: () => {
    movePlayer(player)
    moveFood();
    eatFood({ player, food, scene })
  }, renderer, scene, camera
})();


