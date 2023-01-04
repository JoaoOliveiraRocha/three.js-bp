import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

// Viewport
const canvas = document.getElementById('webgl');
const viewport = {
	height: window.innerHeight,
	width: window.innerWidth
};

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(viewport.width, viewport.height);

const scene = new THREE.Scene();

// Axis helper
const axh = new THREE.AxesHelper();
scene.add(axh);

// Asset Loading
const loadingManager = new THREE.LoadingManager();

const DRACO_LOADER = new DRACOLoader(loadingManager);
const KTX2_LOADER = new KTX2Loader(loadingManager);
loadingManager.onStart = () => { console.log('Starting'); };
loadingManager.onLoaded = () => { console.log('Loaded'); };
loadingManager.onProgress = () => { console.log('Progress'); };
loadingManager.onError = () => { console.log('ERROR'); };

// const gltfLoader = new GLTFLoader(loadingManager).setDRACOLoader(DRACO_LOADER)
// 	.setKTX2Loader(KTX2_LOADER.detectSupport(renderer))
// 	.setMeshoptDecoder(MeshoptDecoder);

const cube = new THREE.Mesh(
	new THREE.BoxGeometry(1,1,1),
	new THREE.MeshBasicMaterial({color: 0xFF0000})
);
scene.add(cube);

// Camera
const camera = new THREE.PerspectiveCamera(60,
	viewport.width/viewport.height, 0.1, 500);

camera.position.set(2.75, 1, 1.75);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Animations now:
const tick = () => {
	cube.rotation.x += 0.01;
	cube.rotation.z += 0.003;

	renderer.render(scene, camera);
	window.requestAnimationFrame(tick); // always at the end
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
