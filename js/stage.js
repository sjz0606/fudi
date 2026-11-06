// 3D stol: likopcha (haqiqiy taom fotosi), salat yoki kefir, kompot, non.
// Bitta fixed canvas; guruh sahifadagi [data-slot] joylarini kuzatib boradi.
import * as THREE from '../vendor/three.module.min.js';

const canvas = document.getElementById('gl');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch (e) { document.documentElement.classList.add('no-gl'); }

export const stage = { ready: false, setDish() {}, onReady: null };

if (renderer) build();

function build() {
  const mobile = matchMedia('(max-width: 760px)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.75 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);
  camera.position.set(0, 15, 11.5);
  camera.lookAt(0, 0, 0);

  // --- Yorug'lik muhiti (studiya softbokslari) ---
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();
  const sky = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true }));
  { const g = sky.geometry, p = g.attributes.position, c = [];
    for (let i = 0; i < p.count; i++) { const t = (p.getY(i) / 20 + 1) / 2; c.push(0.95 * t + 0.55 * (1 - t), 0.9 * t + 0.38 * (1 - t), 0.85 * t + 0.12 * (1 - t)); }
    g.setAttribute('color', new THREE.Float32BufferAttribute(c, 3)); }
  env.add(sky);
  const box = (w, h, x, y, z, k) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(k, k, k), side: THREE.DoubleSide })); m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m); };
  box(14, 10, -6, 12, 6, 3.2); box(8, 8, 9, 7, -4, 1.6); box(20, 4, 0, 4, -12, 1.2);
  scene.environment = pmrem.fromScene(env, 0.035).texture;

  scene.add(new THREE.HemisphereLight(0xfff6e8, 0xd08a2a, 0.55));
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.1);
  sun.castShadow = true;
  sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  sun.shadow.radius = 6; sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun, sun.target);

  // Soya tushadigan "stol" (ko'rinmas, faqat soya)
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShadowMaterial({ opacity: 0.26, color: 0x7a3d00 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

  const root = new THREE.Group(); scene.add(root);
  const tilt = new THREE.Group(); root.add(tilt);

  // Yuqoriga qaragan qutb to'r, tekis (yuqoridan) UV
  function polar(R, hFn, segR = 40, segA = 96) {
    const pos = [], uv = [], idx = [];
    for (let i = 0; i <= segR; i++) {
      const r = R * i / segR;
      for (let j = 0; j <= segA; j++) {
        const a = j / segA * Math.PI * 2, x = Math.cos(a) * r, z = Math.sin(a) * r;
        pos.push(x, hFn(r), z); uv.push(0.5 + x / (2 * R), 0.5 - z / (2 * R));
      }
    }
    for (let i = 0; i < segR; i++) for (let j = 0; j < segA; j++) {
      const a = i * (segA + 1) + j, b = a + segA + 1;
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx); g.computeVertexNormals(); return g;
  }

  // --- Likopcha ---
  const topY = r => r < 0.98 ? 0.07 : r < 1.05 ? 0.07 + (r - 0.98) / 0.07 * 0.02 : r < 1.3 ? 0.09 + (r - 1.05) / 0.25 * 0.1 : r < 1.56 ? 0.19 + (r - 1.3) / 0.26 * 0.07 : 0.26;
  const prof = [[0, 0.02], [0.92, 0.02], [0.97, 0.0], [1.04, 0.0], [1.08, 0.03], [1.32, 0.13], [1.57, 0.21], [1.62, 0.235], [1.62, 0.255], [1.585, 0.265], [1.56, 0.26], [1.3, 0.19], [1.05, 0.09], [0.98, 0.07], [0, 0.07]]
    .reverse().map(([x, y]) => new THREE.Vector2(x, y));
  const ceramic = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 0.9 });
  const plate = new THREE.Mesh(new THREE.LatheGeometry(prof, 128), ceramic);
  plate.castShadow = true;
  const plateG = new THREE.Group(); plateG.add(plate); plateG.position.set(-0.05, 0, 0.25); tilt.add(plateG);

  // Taom: likopcha yuzasiga yopishgan qutb to'r + ozgina gumbaz
  const RF = 1.3;
  const foodGeo = polar(RF, r => topY(r) + 0.006 + (r < 0.95 ? 0.07 * (1 - (r / 0.95) ** 2) : 0));
  const foodMat = new THREE.MeshStandardMaterial({ transparent: true, roughness: 0.55, bumpScale: 1.6, depthWrite: false });
  const food = new THREE.Mesh(foodGeo, foodMat); food.renderOrder = 2; food.receiveShadow = true;
  plateG.add(food);

  // --- Stakan (kompot / kefir) ---
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.22, clearcoat: 1, envMapIntensity: 1.4, side: THREE.DoubleSide, depthWrite: false });
  function cup(liquidColor, fill, opaque) {
    const g = new THREE.Group();
    const h = 1.15, rt = 0.42, rb = 0.34;
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 56, 1, true), glassMat); wall.position.y = h / 2; wall.renderOrder = 4;
    const base = new THREE.Mesh(new THREE.CylinderGeometry(rb, rb * 0.97, 0.09, 56), glassMat); base.position.y = 0.045; base.renderOrder = 4;
    const rim = new THREE.Mesh(new THREE.TorusGeometry(rt, 0.012, 8, 64), glassMat); rim.rotation.x = Math.PI / 2; rim.position.y = h;
    const lh = (h - 0.12) * fill, lrt = rb + (rt - rb) * (0.09 + lh) / h;
    const liqMat = new THREE.MeshPhysicalMaterial({ color: liquidColor, roughness: opaque ? 0.35 : 0.12, transparent: !opaque, opacity: opaque ? 1 : 0.86, clearcoat: 0.6 });
    const liq = new THREE.Mesh(new THREE.CylinderGeometry(lrt - 0.02, rb - 0.025, lh, 48), liqMat); liq.position.y = 0.09 + lh / 2; liq.castShadow = true;
    g.add(liq, wall, base, rim);
    g.userData.top = 0.09 + lh;
    return g;
  }
  const compot = cup(0x8a1426, 0.78, false);
  // mevalar (olcha) kompot ichida
  const berryMat = new THREE.MeshPhysicalMaterial({ color: 0x5a0c18, roughness: 0.25, clearcoat: 1 });
  [[0.12, 0.6, 0.08], [-0.15, 0.32, -0.05], [0.05, 0.2, -0.18], [-0.08, 0.82, 0.14]].forEach(([x, y, z]) => { const b = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 14), berryMat); b.position.set(x, y, z); compot.add(b); });
  compot.position.set(2.25, 0, -1.05); tilt.add(compot);

  const kefir = cup(0xf6f2ea, 0.8, true);
  kefir.position.set(-2.4, 0, -1.15); kefir.scale.setScalar(0.0001); tilt.add(kefir);

  // --- Salat kosasi ---
  const bowlProf = [[0, 0.0], [0.34, 0.0], [0.38, 0.03], [0.62, 0.34], [0.66, 0.4], [0.64, 0.42], [0.59, 0.38], [0.36, 0.1], [0, 0.09]]
    .reverse().map(([x, y]) => new THREE.Vector2(x, y));
  const salad = new THREE.Group();
  const bowl = new THREE.Mesh(new THREE.LatheGeometry(bowlProf, 96), ceramic); bowl.castShadow = true; bowl.receiveShadow = true;
  const saladTop = new THREE.Mesh(polar(0.6, r => 0.3 + 0.13 * Math.cos(Math.min(1, r / 0.6) * Math.PI / 2) - (r > 0.55 ? (r - 0.55) * 1.2 : 0), 24, 72), new THREE.MeshStandardMaterial({ map: saladTex(), roughness: 0.5, bumpScale: 2.5 }));
  saladTop.material.bumpMap = saladTop.material.map; saladTop.receiveShadow = true;
  salad.add(bowl, saladTop); salad.position.set(-2.4, 0, -1.15); tilt.add(salad);

  // --- Non (ikki bo'lak) ---
  const bread = new THREE.Group();
  const loaf = new THREE.Shape();
  loaf.moveTo(-0.42, -0.36); loaf.lineTo(0.42, -0.36); loaf.lineTo(0.44, 0.08);
  loaf.bezierCurveTo(0.52, 0.42, 0.18, 0.46, 0, 0.42); loaf.bezierCurveTo(-0.18, 0.46, -0.52, 0.42, -0.44, 0.08); loaf.closePath();
  const sliceGeo = new THREE.ExtrudeGeometry(loaf, { depth: 0.11, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 3, curveSegments: 24 });
  { // UV: kesim yuzasi uchun shakl koordinatalari
    const uvA = sliceGeo.attributes.uv; for (let i = 0; i < uvA.count; i++) uvA.setXY(i, uvA.getX(i) * 1.05 + 0.5, uvA.getY(i) * 1.05 + 0.5);
  }
  const crumb = new THREE.MeshStandardMaterial({ map: crumbTex(), roughness: 0.92 }); crumb.bumpMap = crumb.map; crumb.bumpScale = 3;
  const crust = new THREE.MeshStandardMaterial({ color: 0xa8612a, roughness: 0.7 });
  for (let k = 0; k < 2; k++) {
    const s = new THREE.Mesh(sliceGeo, [crumb, crust]);
    s.rotation.x = -Math.PI / 2; s.rotation.z = k ? -0.28 : 0.12;
    s.position.set(k ? 0.24 : 0, 0.0 + k * 0.14, k ? -0.12 : 0.05);
    if (k) s.rotation.y = 0.05;
    s.castShadow = true; s.receiveShadow = true; bread.add(s);
  }
  bread.position.set(2.15, 0, 1.15); tilt.add(bread);

  // --- Teksturalar ---
  function noiseCanvas(w, h, fn) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; }
  function crumbTex() {
    return noiseCanvas(256, 256, (x, w, h) => {
      x.fillStyle = '#efdcb4'; x.fillRect(0, 0, w, h);
      for (let i = 0; i < 1400; i++) { const r = Math.random() * 3.2 + 0.4; x.fillStyle = `rgba(${150 + Math.random() * 40|0},${110 + Math.random() * 30|0},${60 + Math.random() * 20|0},${0.18 + Math.random() * 0.35})`; x.beginPath(); x.ellipse(Math.random() * w, Math.random() * h, r * 1.4, r, Math.random() * 3, 0, 7); x.fill(); }
      for (let i = 0; i < 600; i++) { x.fillStyle = 'rgba(255,248,230,.5)'; x.fillRect(Math.random() * w, Math.random() * h, 2, 1); }
      // qobiq cheti
      x.strokeStyle = '#9b5a24'; x.lineWidth = 9; x.strokeRect(0, 0, w, h);
    });
  }
  function saladTex() {
    return noiseCanvas(512, 512, (x, w, h) => {
      x.fillStyle = '#c6dc95'; x.fillRect(0, 0, w, h);
      const strip = (col, n, L, W) => { for (let i = 0; i < n; i++) { x.save(); x.translate(Math.random() * w, Math.random() * h); x.rotate(Math.random() * 6.3); x.fillStyle = col(); x.fillRect(-L / 2, -W / 2, L * (0.6 + Math.random() * 0.8), W); x.restore(); } };
      strip(() => `hsl(${70 + Math.random() * 30},${55 + Math.random() * 25}%,${62 + Math.random() * 16}%)`, 900, 46, 5);   // karam
      strip(() => `hsl(${24 + Math.random() * 8},90%,${52 + Math.random() * 8}%)`, 260, 34, 4);                           // sabzi
      for (let i = 0; i < 46; i++) { const cx = Math.random() * w, cy = Math.random() * h; x.fillStyle = '#3f7d2c'; x.beginPath(); x.arc(cx, cy, 15, 0, 7); x.fill(); x.fillStyle = '#b9d98a'; x.beginPath(); x.arc(cx, cy, 11, 0, 7); x.fill(); } // bodring
      for (let i = 0; i < 34; i++) { const cx = Math.random() * w, cy = Math.random() * h; x.fillStyle = '#d2302a'; x.beginPath(); x.ellipse(cx, cy, 18, 12, Math.random() * 3, 0, 7); x.fill(); x.fillStyle = '#f2836b'; x.beginPath(); x.ellipse(cx, cy, 9, 6, 0, 0, 7); x.fill(); } // pomidor
      strip(() => `hsl(${110 + Math.random() * 20},55%,${32 + Math.random() * 12}%)`, 220, 9, 3);                         // ko'katlar
    });
  }

  // --- Taom almashish ---
  const loader = new THREE.TextureLoader();
  const cache = {};
  const tex = key => cache[key] || (cache[key] = new Promise(res => loader.load(`assets/p/${key}.webp`, t => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); res(t); })));
  let spin = null, curKey = null, sideTarget = 'salad';
  stage.setDish = async (key, side = 'salad', instant = false) => {
    sideTarget = side;
    if (key === curKey) return;
    curKey = key;
    const t = await tex(key);
    if (key !== curKey) return;
    if (instant || reduce || !foodMat.map) { foodMat.map = t; foodMat.bumpMap = t; foodMat.needsUpdate = true; return; }
    spin = { t0: performance.now(), dur: 900, tex: t, swapped: false, from: plateG.rotation.y };
  };
  stage.preload = keys => keys.forEach(tex);

  // --- Slot kuzatish ---
  const slots = [...document.querySelectorAll('[data-slot]')];
  const ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit = new THREE.Vector3(), ndc = new THREE.Vector2();
  const tgt = { pos: new THREE.Vector3(), s: 0.0001 };
  let first = true;
  function track() {
    const vh = innerHeight; let best = null, bv = 0;
    for (const el of slots) {
      const r = el.getBoundingClientRect(); if (!r.height) continue;
      const vis = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)) / Math.min(r.height, vh);
      if (vis > bv) { bv = vis; best = r; }
    }
    if (!best || bv < 0.2) { tgt.s = 0.0001; return; }
    const cx = best.left + best.width / 2, cy = best.top + best.height / 2;
    ndc.set(cx / innerWidth * 2 - 1, -(cy / vh) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    if (!ray.ray.intersectPlane(plane, hit)) return;
    const dist = camera.position.distanceTo(hit);
    const unitPerPx = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / vh;
    const px = Math.min(best.width / (innerWidth < 760 ? 6.3 : 5.6), best.height / 3.9);
    tgt.pos.copy(hit); tgt.s = px * unitPerPx * Math.min(1, 0.35 + bv);
  }

  // --- Sichqoncha parallaksi ---
  const ptr = { x: 0, y: 0 };
  addEventListener('pointermove', e => { ptr.x = e.clientX / innerWidth - 0.5; ptr.y = e.clientY / innerHeight - 0.5; }, { passive: true });

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();

  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
  let last = performance.now(), idle = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    track();
    const k = first ? 1 : 1 - Math.pow(0.0008, dt);
    root.position.lerp(tgt.pos, k);
    const s = THREE.MathUtils.lerp(root.scale.x, tgt.s, first ? 1 : 1 - Math.pow(0.004, dt));
    first = false;
    if (s < 0.002 && tgt.s < 0.002) { if (idle++ > 2) return; } else idle = 0;
    root.scale.setScalar(Math.max(s, 0.0001));

    const tt = now / 1000;
    tilt.rotation.y = reduce ? 0 : Math.sin(tt * 0.25) * 0.08 + ptr.x * 0.22;
    tilt.rotation.x = reduce ? 0 : ptr.y * 0.08;

    if (spin) {
      const p = Math.min(1, (now - spin.t0) / spin.dur), e = ease(p);
      plateG.rotation.y = spin.from - e * Math.PI * 2;
      plateG.position.y = Math.sin(p * Math.PI) * 0.35;
      food.scale.setScalar(1 - Math.sin(p * Math.PI) * 0.35);
      if (p > 0.5 && !spin.swapped) { foodMat.map = spin.tex; foodMat.bumpMap = spin.tex; foodMat.needsUpdate = true; spin.swapped = true; }
      if (p >= 1) { plateG.rotation.y = spin.from - Math.PI * 2; spin = null; }
    }
    const ks = 1 - Math.pow(0.002, dt);
    const sv = sideTarget === 'kefir';
    salad.scale.setScalar(THREE.MathUtils.lerp(salad.scale.x, sv ? 0.0001 : 1, ks));
    kefir.scale.setScalar(THREE.MathUtils.lerp(kefir.scale.x, sv ? 0.85 : 0.0001, ks));

    // soya kamerasi guruh bilan yuradi
    const sc = root.scale.x;
    sun.target.position.copy(root.position);
    sun.position.set(root.position.x - 5 * sc, 11 * sc, root.position.z + 4 * sc);
    const sh = sun.shadow.camera; sh.left = sh.bottom = -4.5 * sc; sh.right = sh.top = 4.5 * sc; sh.near = 0.1; sh.far = 30 * sc + 1; sh.updateProjectionMatrix();

    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
  stage.ready = true;
  stage.onReady && stage.onReady();
}
