import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const SWOOSHES = [
  { color: 0x7ed321, radius: 1.34, arc: 2.55, rot: [1.15, 0.25, 0.45], speed: 0.0035 },
  { color: 0x2f9bff, radius: 1.5, arc: 2.25, rot: [1.85, 0.7, -0.4], speed: -0.0028 },
  { color: 0xffd000, radius: 1.66, arc: 2.4, rot: [0.42, -0.55, 1.05], speed: 0.0022 },
];

export default function Planet() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.set(0, 0.15, 6.6);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.55;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.72;

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
        new THREE.TorusGeometry(swoosh.radius, 0.062, 24, 96, swoosh.arc),
        new THREE.MeshStandardMaterial({
          color: swoosh.color,
          roughness: 0.38,
          metalness: 0.04,
          emissive: swoosh.color,
          emissiveIntensity: 0.18,
        })
      );
      mesh.rotation.set(swoosh.rot[0], swoosh.rot[1], swoosh.rot[2]);
      const pivot = new THREE.Group();
      pivot.add(mesh);
      pivot.userData.speed = swoosh.speed;
      scene.add(pivot);
      return pivot;
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 3, 5);
    scene.add(key);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 64, 64),
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

    const resize = () => {
      const width = wrap.clientWidth || 1;
      const height = wrap.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
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
          const materials = [].concat(object.material);
          materials.forEach((material) => {
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
      tabIndex={0}
      role="img"
      aria-label="The Career Planet globe. Drag to spin it."
    />
  );
}
