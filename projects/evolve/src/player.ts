import { SphereGeometry, MeshBasicMaterial, Mesh, Scene, Color } from "three";

const stats = {
    color: new Color(0xffffff),
    intensity: 0,
    foodCount: 0
}

const createPlayer = ({ zoom, scene }: { zoom: number, scene: Scene }): Mesh => {
    const mesh = new Mesh(new SphereGeometry(1, 32, 32), new MeshBasicMaterial({
        color: stats.color,
    }));

    // set starting position
    mesh.position.set(0, 0, zoom);
    scene.add(mesh);

    return mesh;
}

const eatFood = ({ player, food, scene }: { player: Mesh, food: Mesh[], scene: Scene }) => {
    for (let i = 0; i < food.length; i++) {
        const foodItem = food[i];
        const distance = player.position.distanceTo(foodItem.position);

        if (distance < 1.2) {
            scene.remove(foodItem);
            food.splice(i, 1);

            // update the player stats
            const foodMaterial = foodItem.material as MeshBasicMaterial;
            const foodColor = new Color(foodMaterial.color.getHex());

            stats.color.add(foodColor);
            stats.intensity += 1.0;
            stats.foodCount++;

            const vibrantColor = stats.color.clone().multiplyScalar(1 / stats.intensity);
            (player.material as MeshBasicMaterial).color.set(vibrantColor);
        }
    };
}

export default createPlayer;
export { eatFood };