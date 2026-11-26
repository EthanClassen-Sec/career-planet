import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const SWOOSHES = [
  { color: 0x7ed321, radius: 1.2, tube: 0.045, arc: 2.5, rot: [1.15, 0.2, 0.4], speed: 0.0032 },
  { color: 0x1f8fff, radius: 1.36, tube: 0.045, arc: 2.2, rot: [1.8, 0.65, -0.35], speed: -0.0024 },
  { color: 0xffd000, radius: 1.52, tube: 0.048, arc: 2.35, rot: [0.4, -0.5, 1.05], speed: 0.002 },
];

const BOUND = 1.62;

export default function Planet() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0.18, 6);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.rotateSpeed = 0.65;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.45;
    controls.minPolarAngle = 0.25;
    controls.maxPolarAngle = Math.PI - 0.25;
    controls.target.set(0, 0, 0);

    const map = new THREE.TextureLoader().load("/earth-day.jpg");
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshBasicMaterial({ map })
    );
    earth.rotation.y = -Math.PI / 2;
    scene.add(earth);

    const pivots = SWOOSHES.map((swoosh) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(swoosh.radius, swoosh.tube, 24, 100, swoosh.arc),
        new THREE.MeshStandardMaterial({
          color: swoosh.color,
          roughness: 0.35,
          metalness: 0.05,
          emissive: swoosh.color,
          emissiveIntensity: 0.16,
        })
      );
      mesh.rotation.set(swoosh.rot[0], swoosh.rot[1], swoosh.rot[2]);
      const pivot = new THREE.Group();
      pivot.add(mesh);
      pivot.userData.speed = swoosh.speed;
      scene.add(pivot);
      return pivot;
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(4, 3, 5);
    scene.add(key);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: { glowColor: { value: new THREE.Color("#9ecbff") } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 glowColor;
          void main() {
            float rim = pow(clamp(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 2.4);
            gl_FragColor = vec4(glowColor, rim);
          }
        `,
      })
    );
    scene.add(glow);

    const frameCamera = () => {
      const width = Math.max(wrap.clientWidth, 1);
      const height = Math.max(wrap.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const vFov = (camera.fov * Math.PI) / 180;
      const distForHeight = BOUND / Math.tan(vFov / 2);
      const distForWidth = distForHeight / camera.aspect;
      const distance = Math.max(distForHeight, distForWidth) * 1.14;

      const offset = camera.position.clone().sub(controls.target);
      if (offset.lengthSq() < 0.001) offset.set(0, 0.18, 1);
      offset.setLength(distance);
      camera.position.copy(controls.target).add(offset);
      controls.minDistance = distance;
      controls.maxDistance = distance;
      controls.update();
    };

    frameCamera();
    const observer = new ResizeObserver(frameCamera);
    observer.observe(wrap);

    const stopSpin = () => {
      controls.autoRotate = false;
    };
    const resumeSpin = () => {
      controls.autoRotate = !reduced;
    };
    renderer.domElement.addEventListener("pointerdown", stopSpin);
    window.addEventListener("pointerup", resumeSpin);

    let frame = 0;
    const tick = () => {
      if (!reduced) {
        pivots.forEach((pivot) => {
          pivot.rotation.y += pivot.userData.speed;
        });
      }
      controls.update();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointerdown", stopSpin);
      window.removeEventListener("pointerup", resumeSpin);
      controls.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          [].concat(object.material).forEach((material) => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="planet"
      role="img"
      aria-label="Career Planet globe. Drag to turn it."
    />
  );
}
