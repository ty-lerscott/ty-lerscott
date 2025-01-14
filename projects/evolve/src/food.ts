import { SphereGeometry, MeshBasicMaterial, Mesh, Scene } from "three";

const particles: Mesh[] = [];

const createFood = (zoom: number) => {
    const geometry = new SphereGeometry(0.2, 16, 16);
    const material = new MeshBasicMaterial({
        color: 0xffa500,
    });

    const mesh = new Mesh(geometry, material);

    // set starting position
    mesh.position.set(
        (Math.random() - 0.5) * 20, // Random X position
        (Math.random() - 0.5) * 20, // Random Y position
        zoom // Fixed Z position
    );

    return mesh;
}

const createFoodParticles = ({ total, scene, zoom }: { total: number, scene: Scene, zoom: number }): Mesh[] => {
    for (let i = 0; i < total; i++) {
        const food = createFood(zoom);
        particles.push(food);
        scene.add(food);
    }

    return particles;
}

export default createFoodParticles;