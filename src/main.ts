import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const loadingManager = new THREE.LoadingManager();

const loader = new THREE.TextureLoader(loadingManager);

const cubeLoader = new THREE.CubeTextureLoader(loadingManager);
const galaxyTexture = cubeLoader.load([
  "/galaxy/px.png",
  "/galaxy/nx.png",
  "/galaxy/py.png",
  "/galaxy/ny.png",
  "/galaxy/pz.png",
  "/galaxy/nz.png",
]);

// Texture cache to prevent duplicate loading
const textureCache: { [key: string]: THREE.Texture } = {};

const loadTexture = (path: string): THREE.Texture => {
  if (textureCache[path]) {
    return textureCache[path];
  }

  const texture = loader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache[path] = texture;

  return texture;
};

// Load all textures once and cache them
const getTextures = () => {
  const sunTexture = loadTexture("/sun.jpg");
  const mercuryTexture = loadTexture("/mercury.jpg");
  const venusTexture = loadTexture("/venus.jpg");
  const earthTexture = loadTexture("/earth.jpg");
  const moonTexture = loadTexture("/moon.jpg");
  const marsTexture = loadTexture("/mars.jpg");
  const jupiterTexture = loadTexture("/jupiter.jpg");
  const saturnTexture = loadTexture("/saturn.jpg");
  const saturnRingTexture = loadTexture("/saturn_ring_alpha.jpg");
  const uranusTexture = loadTexture("/uranus.jpg");
  const neptuneTexture = loadTexture("/neptune.jpg");

  // Moon textures (shared across multiple moons)
  const moonOneTexture = loadTexture("/moon_one.jpg");
  const moonTwoTexture = loadTexture("/moon_two.jpg");
  const moonThreeTexture = loadTexture("/moon_three.jpg");
  const moonFourTexture = loadTexture("/moon_four.jpg");

  return {
    sunTexture,
    mercuryTexture,
    venusTexture,
    earthTexture,
    moonTexture,
    marsTexture,
    phobosTexture: moonOneTexture,
    deimosTexture: moonTwoTexture,
    jupiterTexture,
    ioTexture: moonOneTexture,
    europaTexture: moonTwoTexture,
    ganymedeTexture: moonThreeTexture,
    callistoTexture: moonFourTexture,
    saturnTexture,
    saturnRingTexture,
    titanTexture: moonOneTexture,
    uranusTexture,
    titaniaTexture: moonTwoTexture,
    neptuneTexture,
    tritonTexture: moonThreeTexture,
  };
};

// Initialize all textures once
const textures = getTextures();

const planets = [
  {
    name: "Mercury",
    distance: 15,
    radius: 0.5,
    rotationSpeed: 0.001,
    orbitSpeed: 0.008,
    texture: textures.mercuryTexture,
    moons: [],
  },
  {
    name: "Venus",
    distance: 22,
    radius: 0.9,
    rotationSpeed: 0.0008,
    orbitSpeed: 0.006,
    texture: textures.venusTexture,
    moons: [],
  },
  {
    name: "Earth",
    distance: 30,
    radius: 1,
    rotationSpeed: 0.005,
    orbitSpeed: 0.004,
    texture: textures.earthTexture,
    moons: [
      {
        name: "Moon",
        distance: 3.5,
        radius: 0.27,
        rotationSpeed: 0.003,
        texture: textures.moonTexture,
        orbitSpeed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    distance: 38,
    radius: 0.8,
    rotationSpeed: 0.0045,
    orbitSpeed: 0.003,
    texture: textures.marsTexture,
    moons: [
      {
        name: "Phobos",
        distance: 2.5,
        radius: 0.15,
        rotationSpeed: 0.005,
        texture: textures.phobosTexture,
        orbitSpeed: 0.02,
      },
      {
        name: "Deimos",
        distance: 3.5,
        radius: 0.1,
        rotationSpeed: 0.004,
        texture: textures.deimosTexture,
        orbitSpeed: 0.018,
      },
    ],
  },
  {
    name: "Jupiter",
    distance: 50,
    radius: 2.5,
    rotationSpeed: 0.01,
    orbitSpeed: 0.0016,
    texture: textures.jupiterTexture,
    moons: [
      {
        name: "Io",
        distance: 5,
        radius: 0.3,
        rotationSpeed: 0.005,
        texture: textures.ioTexture,
        orbitSpeed: 0.025,
      },
      {
        name: "Europa",
        distance: 6.5,
        radius: 0.28,
        rotationSpeed: 0.0045,
        texture: textures.europaTexture,
        orbitSpeed: 0.022,
      },
      {
        name: "Ganymede",
        distance: 8.5,
        radius: 0.4,
        rotationSpeed: 0.004,
        texture: textures.ganymedeTexture,
        orbitSpeed: 0.018,
      },
      {
        name: "Callisto",
        distance: 10.5,
        radius: 0.38,
        rotationSpeed: 0.003,
        texture: textures.callistoTexture,
        orbitSpeed: 0.015,
      },
    ],
  },
  {
    name: "Saturn",
    distance: 65,
    radius: 2.2,
    rotationSpeed: 0.009,
    texture: textures.saturnTexture,
    orbitSpeed: 0.0012,
    moons: [
      {
        name: "Titan",
        distance: 6,
        radius: 0.4,
        rotationSpeed: 0.004,
        texture: textures.titanTexture,
        orbitSpeed: 0.018,
      },
    ],
  },
  {
    name: "Uranus",
    distance: 80,
    radius: 1.8,
    rotationSpeed: 0.008,
    texture: textures.uranusTexture,
    orbitSpeed: 0.0008,
    moons: [
      {
        name: "Titania",
        distance: 5,
        radius: 0.25,
        rotationSpeed: 0.003,
        texture: textures.titaniaTexture,
        orbitSpeed: 0.015,
      },
    ],
  },
  {
    name: "Neptune",
    distance: 95,
    radius: 1.7,
    rotationSpeed: 0.008,
    texture: textures.neptuneTexture,
    orbitSpeed: 0.0006,
    moons: [
      {
        name: "Triton",
        distance: 5,
        radius: 0.3,
        rotationSpeed: 0.003,
        texture: textures.tritonTexture,
        orbitSpeed: 0.016,
      },
    ],
  },
];

const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
};

const getSunMesh = () => {
  const radius = 6;
  const widthSegments = 30;
  const heightSegments = 30;
  const geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );
  const material = new THREE.MeshBasicMaterial({
    map: textures.sunTexture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.setScalar(1);
  return mesh;
};

const createOrbitLine = (radius: number) => {
  const geometry = new THREE.RingGeometry(radius - 0.01, radius + 0.01, 128);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6,
  });

  const ring = new THREE.Mesh(geometry, material);
  ring.rotation.x = Math.PI / 2;
  return ring;
};

const main = () => {
  const canvas = document.querySelector("#canvas");
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const scene = new THREE.Scene();

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selectedPlanet: THREE.Mesh | null = null;
  let resetCameraPosition = false;
  const cameraTarget = new THREE.Vector3();

  let cameraPosition = 1000;

  const fov = 50;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = cameraPosition;
  camera.position.y = 20;
  scene.add(camera);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1000);
  scene.add(pointLight);

  scene.background = galaxyTexture;

  const controls = new OrbitControls(camera, renderer.domElement);
  const originalCameraPosition = camera.position.clone();
  const originalControlsTarget = controls.target.clone();
  controls.enableDamping = true;

  const sunMesh = getSunMesh();
  scene.add(sunMesh);

  const planetMashes = planets.map((planet) => {
    const radius = planet.radius;
    const widthSegments = 30;
    const heightSegments = 30;
    const geometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );
    const material = new THREE.MeshStandardMaterial({
      map: planet.texture,
    });
    const planetMesh = new THREE.Mesh(geometry, material);
    planetMesh.position.x = planet.distance;
    scene.add(planetMesh);
    const planetOrbit = createOrbitLine(planet.distance);
    scene.add(planetOrbit);
    planetMesh.userData = {
      ...planet,
      orbitAngle: Math.random() * Math.PI * 1000, // start position
    };

    planet.moons.forEach((moon) => {
      const radius = moon.radius;
      const widthSegments = 30;
      const heightSegments = 30;
      const geometry = new THREE.SphereGeometry(
        radius,
        widthSegments,
        heightSegments
      );
      const material = new THREE.MeshStandardMaterial({
        map: moon.texture,
      });
      const moonMesh = new THREE.Mesh(geometry, material);
      moonMesh.position.x = moon.distance;
      moonMesh.userData = {
        ...moon,
        orbitAngle: Math.random() * Math.PI * 1000, // start position
      };
      planetMesh.add(moonMesh);
    });

    return planetMesh;
  });

  const handleClick = (event: MouseEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(planetMashes, false);

    if (intersects.length > 0) {
      selectedPlanet = intersects[0].object as THREE.Mesh;
      resetCameraPosition = false;
    } else {
      if (selectedPlanet) {
        resetCameraPosition = true;
      }
      selectedPlanet = null;
    }
  };

  renderer.domElement.addEventListener("dblclick", handleClick);

  const render = () => {
    if (cameraPosition > 50) {
      cameraPosition = cameraPosition - 30;
      camera.position.z = cameraPosition;
    }

    sunMesh.rotation.y += 0.002;

    planetMashes.forEach((planet, index) => {
      const currentPlanet = planets[index];

      planet.rotation.y += currentPlanet.rotationSpeed;
      planet.userData.orbitAngle += currentPlanet.orbitSpeed * 30;
      planet.position.x =
        Math.sin(planet.userData.orbitAngle / 100) * currentPlanet.distance;
      planet.position.z =
        Math.cos(planet.userData.orbitAngle / 100) * currentPlanet.distance;

      planet.children.forEach((moon, index) => {
        const currentMoon = currentPlanet.moons[index];

        moon.rotation.y += currentMoon.rotationSpeed;
        moon.userData.orbitAngle += currentMoon.orbitSpeed * 30;
        moon.position.x = Math.sin(moon.rotation.y) * currentMoon.distance;
        moon.position.z = Math.cos(moon.rotation.y) * currentMoon.distance;
      });
    });

    if (selectedPlanet) {
      const planetPosition = selectedPlanet.getWorldPosition(
        new THREE.Vector3()
      );

      cameraTarget.copy(planetPosition).add(new THREE.Vector3(0, 3, 6));

      camera.position.lerp(cameraTarget, 0.05); // smooth movement
      controls.target.lerp(planetPosition, 0.05);
    } else if (resetCameraPosition) {
      originalCameraPosition.z - cameraPosition;

      camera.position.lerp(originalCameraPosition, 0.05);
      controls.target.lerp(originalControlsTarget, 0.05);

      resetCameraPosition = false;
    }

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  loadingManager.onStart = () => {
    const loaderDiv = document.getElementById("loader");
    if (loaderDiv) {
      loaderDiv.innerText = `Loading 0%`;
    }
  };

  loadingManager.onProgress = (_, loaded, total) => {
    const loaderDiv = document.getElementById("loader");
    if (loaderDiv) {
      loaderDiv.innerText = `Loading ${Math.round((loaded / total) * 100)}%`;
    }
  };

  loadingManager.onLoad = () => {
    console.log("All textures loaded");
    const loaderDiv = document.getElementById("loader");
    if (loaderDiv) loaderDiv.style.display = "none";
    requestAnimationFrame(render);
  };
};

main();
