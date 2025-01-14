import { SphereGeometry, MeshBasicMaterial, Mesh, Scene } from "three";

const createPlayer = ({ zoom, scene }: { zoom: number, scene: Scene }): Mesh => {
    const geometry = new SphereGeometry(1, 32, 32);
    const material = new MeshBasicMaterial({
        color: 0x00ff00,
    });
    const mesh = new Mesh(geometry, material);

    // set starting position
    mesh.position.set(0, 0, zoom);
    scene.add(mesh);

    return mesh;
}

export default createPlayer;