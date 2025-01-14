import { Scene, PerspectiveCamera, WebGLRenderer } from "three";

const render = ({ fieldOfView, aspectRatio, nearClippingPlane, farClippingPlane, canvasSelector }: {
    fieldOfView: number;
    aspectRatio: number;
    nearClippingPlane: number;
    farClippingPlane: number;
    canvasSelector: HTMLCanvasElement;
}): { scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer } => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearClippingPlane, farClippingPlane);
    const renderer = new WebGLRenderer({
        canvas: canvasSelector,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    return { scene, camera, renderer };
}


export default render;