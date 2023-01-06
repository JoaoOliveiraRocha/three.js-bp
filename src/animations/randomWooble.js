const randomSeedMap = new Map();

// Generates a seed for each mesh, so that the animations are phased-out.
export const randomWooble = (mesh, elapsed) => {
	let seed = randomSeedMap.get(mesh);
	if (!seed) {
		seed = Math.random() * 2 * Math.PI;
		randomSeedMap.set(mesh, seed);
	}

	mesh.rotation.x = Math.sin(elapsed * 0.001 + seed);
	mesh.rotation.y = Math.cos(elapsed * 0.00066 + seed);
};
