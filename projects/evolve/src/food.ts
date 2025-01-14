import { SphereGeometry, MeshBasicMaterial, Mesh, Scene, Vector3 } from "three";

const particles: Mesh[] = [];
const colors = [0x00ffff, 0xff00ff, 0xffff00];
const velocities = new Map<Mesh, Vector3>();

const createFood = (zoom: number) => {
    const geometry = new SphereGeometry(0.2, 16, 16);
    const material = new MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
    });

    const mesh = new Mesh(geometry, material);

    // set starting position
    mesh.position.set(
        (Math.random() - 0.5) * 20, // Random X position
        (Math.random() - 0.5) * 20, // Random Y position
        zoom // Fixed Z position
    );

    velocities.set(mesh, new Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        0
    ))

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

const moveFood = () => {
    particles.forEach((food) => {
        const velocity = velocities.get(food);

        if (velocity) {
            food.position.add(velocity);

            // Reverse direction if food hits boundaries
            if (food.position.x < -10 || food.position.x > 10) velocity.x *= -1;
            if (food.position.y < -10 || food.position.y > 10) velocity.y *= -1;
        }
    });
};


export default createFoodParticles;
export { moveFood };