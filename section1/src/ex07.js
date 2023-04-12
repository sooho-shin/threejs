import * as THREE from "three";

export default function example() {
  const canvas = document.getElementById("container");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setClearColor(0x00ff00);

  //Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("black", 2, 7);
  scene.background = new THREE.Color("black");

  const camera = new THREE.PerspectiveCamera(
    75, //시야각
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );
  // camera.position.x = 2;
  camera.position.y = 1;
  camera.position.z = 5;

  scene.add(camera);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 3;
  light.position.y = 5;
  light.position.z = 10;
  scene.add(light);

  // Mesh

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "red",
  });

  const meshes = [];
  let mesh;
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }
  // const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();
    renderer.render(scene, camera);

    meshes.forEach((item) => {
      // console.log(item);
      item.rotation.y += delta;
    });
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

  // 반응형
  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", setSize);

  draw();
}
