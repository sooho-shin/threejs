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
  scene.background = new THREE.Color("black");

  const camera = new THREE.PerspectiveCamera(
    75, //시야각
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );
  // camera.position.x = 2;
  // camera.position.y = 2;
  camera.position.z = 5;

  scene.add(camera);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // console.log(clock.getElapsedTime());
    // 각도는 radian 을 사용
    // 360도는 2파이
    // mesh.rotation.y += 0.1;
    const time = clock.getElapsedTime();
    // Three js 는 1초에 60회 정도 Frame 을 목표로 한다.
    // mesh.rotation.y += THREE.MathUtils.degToRad();
    mesh.rotation.y = 2 * time;
    mesh.position.y = time;

    if (mesh.position.y > 2) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

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
