export const wooble = (mesh, elapsed) => {
	mesh.rotation.x = Math.sin(elapsed * 0.0025) * 0.7;
	mesh.rotation.y = Math.sin(elapsed * 0.0012) * 0.76;
};
