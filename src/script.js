import './style.css';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { wooble } from './animations';
import { GUI } from 'dat.gui';
import * as THREE from 'three';

// Viewport:
const canvas = document.getElementById('webgl');
const viewport = {
	height: window.innerHeight,
	width: window.innerWidth
};

// Plane Debug example
const planeProps = {
	color: 0x22AA22,
	metalness: 0.1,
	roughness: 0.25
};

const gui = new GUI();

// Renderer and Scene:
const renderer = new THREE.WebGLRenderer({canvas});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(viewport.width, viewport.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio)); // check Mobile

const scene = new THREE.Scene();

// Axis helper:
const axh = new THREE.AxesHelper();
scene.add(axh);

// Asset(s) Loader:
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => { console.log('Starting'); };
loadingManager.onLoaded = () => { console.log('Loaded'); };
loadingManager.onProgress = () => { console.log('Progress'); };
loadingManager.onError = () => { console.log('ERROR'); };

const DRACO_LOADER = new DRACOLoader(loadingManager);
const KTX2_LOADER = new KTX2Loader(loadingManager);

const gltfLoader = new GLTFLoader(loadingManager).setDRACOLoader(DRACO_LOADER)
	.setKTX2Loader(KTX2_LOADER.detectSupport(renderer))
	.setMeshoptDecoder(MeshoptDecoder);

// Objects
let object;
gltfLoader.load('/models/poop_full_res.glb', (gltf) => {
	const poop = gltf.scene;

	gltf.scene.scale.set(0.025, 0.025, 0.025);
	poop.castShadow = true;

	poop.children.forEach(mesh => { // must add to each Mesh individually
		mesh.castShadow = true;
	});

	object = poop;
	scene.add(poop);

	// "object"
	const poopFolder = gui.addFolder('Object');
	poopFolder.add(object.position, 'x', -2, 2, 0.005);
	poopFolder.add(object.position, 'y', -2, 2, 0.005);
	poopFolder.add(object.position, 'z', -2, 2, 0.005);
});

const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(8,8),
	new THREE.MeshStandardMaterial({ ...planeProps })
);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
scene.add(plane);

const planeFolder = gui.addFolder('Plane');

planeFolder.addColor(planeProps, 'color').name('Plane Color')
	.onChange(() => {
		plane.material.color.set(planeProps.color);
	});

planeFolder.add(planeProps, 'roughness', 0, 1, 0.01).name('Plane Roughness')
	.onChange(() => {
		plane.material.roughness = planeProps.roughness;
	});

planeFolder.add(planeProps, 'metalness', 0, 1, 0.01).name('Plane metalness')
	.onChange(() => {
		plane.material.metalness = planeProps.metalness;
	});

// Light:
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
const sunLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
sunLight.position.x = 1;
sunLight.position.y = 3;
sunLight.position.z = 0.25;
sunLight.shadow.camera.top = 5;
sunLight.shadow.camera.far = 12;
sunLight.shadow.camera.near = 0.05;

const lightsFolder = gui.addFolder('Lights');
lightsFolder.add(ambientLight, 'intensity', 0, 1, 0.001).name('Ambient');
lightsFolder.add(sunLight, 'intensity', 0, 1, 0.001);

lightsFolder.add(sunLight.position, 'x', -3, 3, 0.005);
lightsFolder.add(sunLight.position, 'y', 0, 5, 0.005);
lightsFolder.add(sunLight.position, 'z', -3, 3, 0.005);

lightsFolder.addColor(sunLight, 'color').name('Light Color')
	.onChange((value) => {
		sunLight.color.r = value.r / 256;
		sunLight.color.g = value.g / 256;
		sunLight.color.b = value.b / 256;
	});

// Shadows
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;

const sunLightHelper = new THREE.DirectionalLightHelper(sunLight); // Helper
const shadowsHelper = new THREE.CameraHelper(sunLight.shadow.camera); // Helper

scene.add(ambientLight);
scene.add(sunLight);
scene.add(sunLightHelper);
scene.add(shadowsHelper);

// Camera:
const camera = new THREE.PerspectiveCamera(60,
	viewport.width/viewport.height, 0.1, 500);

camera.position.set(2.75, 2, 2.25);

// Acti... Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Render Cycle:
const tick = (elapsed) => {
	if(object) {
		wooble(object, elapsed);
	}

	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};

window.addEventListener('resize', () => {
	viewport.height = window.innerHeight,
	viewport.width = window.innerWidth;
	camera.aspect = viewport.width / viewport.height;
	camera.updateProjectionMatrix();
	renderer.setSize(viewport.width, viewport.height);
	renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});

tick();

// Extras
// Mipmapping / Textures
// default is: THREE.LinearMipMapLinearFilter

// cubeColorTexture.magFilter = THREE.NearestFilter; // this allows for Minecrafty results;
// Great when using low-res textures on big meshes.

// IF WE ARE USING NearestFilter on minFilter -> do: cubeColorTexture.generateMipmaps = false;
// boosts Performances.
