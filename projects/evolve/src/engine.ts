import { Scene, PerspectiveCamera, WebGLRenderer } from "three";

const gameLoop = ({ controls, renderer, scene, camera }: { controls(): void, renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera }) => () => {
    requestAnimationFrame(gameLoop({ controls, renderer, scene, camera }));

    controls();

    renderer.render(scene, camera);
}

export default gameLoop;