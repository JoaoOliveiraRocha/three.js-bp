export const circle = (mesh, elapsed, factor = 1) => {
	mesh.position.x = Math.sin(elapsed * 0.0025) * factor;
	mesh.position.z = Math.cos(elapsed * 0.0025) * factor;
};
