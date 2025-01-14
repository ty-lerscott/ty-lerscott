import { PerspectiveCamera, WebGLRenderer } from "three";

import { listenToKeyboard } from "./controls";


const listen = ({ camera, renderer }: { camera: PerspectiveCamera, renderer: WebGLRenderer }) => {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    listenToKeyboard();
}

export default listen;