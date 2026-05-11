'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function BendText({ textStr = 'Aether Café' }: { textStr?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const sceneRef = useRef<{
        scene?: THREE.Scene;
        camera?: THREE.OrthographicCamera;
        renderer?: THREE.WebGLRenderer;
        animationId?: number;
        cleanup?: () => void;
    }>({});

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!containerRef.current || !mounted) return;

        // Default to dark mode for our cinematic cafe feel
        const isDark = true; 

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000);
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);

        const createTextTexture = (text: string, blur = false) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = 1024;
            canvas.height = 1024;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            ctx.fillStyle = 'transparent';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const textColor = isDark ? '#D4AF37' : '#000000'; // Gold text
            const shadowColor = isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(0, 0, 0, 0.3)';

            if (blur) {
                ctx.fillStyle = shadowColor;
                ctx.filter = 'blur(15px)';
                ctx.font = 'bold 120px system-ui, -apple-system, sans-serif';
            } else {
                ctx.fillStyle = textColor;
                ctx.font = 'bold 120px system-ui, -apple-system, sans-serif';
            }

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.needsUpdate = true;
            return texture;
        };

        const textTexture = createTextTexture(textStr);
        const shadowTexture = createTextTexture(textStr, true);

        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: textTexture },
                uDisplacement: { value: new THREE.Vector3(999, 999, 999) }
            },
            vertexShader: `
        varying vec2 vUv;
        uniform vec3 uDisplacement;
        
        float easeInOutCubic(float x) {
          return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
        }

        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
          vUv = uv;
          vec3 newPosition = position;
          
          vec4 localPosition = vec4(position, 1.0);
          vec4 worldPosition = modelMatrix * localPosition;
          
          float dist = length(uDisplacement - worldPosition.xyz);
          float minDistance = 2.5; 
          
          if (dist < minDistance) {
            float distanceMapped = map(dist, 0.0, minDistance, 1.0, 0.0);
            float val = easeInOutCubic(distanceMapped) * 1.5; 
            newPosition.z += val;
          }
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
            fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        
        void main() {
          vec4 color = texture2D(uTexture, vUv);
          gl_FragColor = vec4(color);
        }
      `,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        const shadowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: shadowTexture },
                uDisplacement: { value: new THREE.Vector3(999, 999, 999) }
            },
            vertexShader: `
        varying vec2 vUv;
        varying float dist;
        uniform vec3 uDisplacement;

        void main() {
          vUv = uv;
          
          vec4 localPosition = vec4(position, 1.0);
          vec4 worldPosition = modelMatrix * localPosition;
          dist = length(uDisplacement - worldPosition.xyz);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec2 vUv;
        varying float dist;
        uniform sampler2D uTexture;
        
        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }
        
        float easeOutQuad(float x) {
          return 1.0 - (1.0 - x) * (1.0 - x);
        }

        void main() {
          vec4 color = texture2D(uTexture, vUv);
          float minDistance = 2.5; 
          
          if (dist < minDistance) {
            float normalizedDist = map(dist, 0.0, minDistance, 1.0, 0.0);
            float easedDist = easeOutQuad(normalizedDist);
            float alpha = easedDist * color.a * 0.8; 
            color.a = alpha;
          } else {
            color.a = 0.0; 
          }
          
          gl_FragColor = vec4(color);
        }
      `,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        const geometry = new THREE.PlaneGeometry(15, 15, 150, 150);

        const textMesh = new THREE.Mesh(geometry, shaderMaterial);
        const shadowMesh = new THREE.Mesh(geometry, shadowMaterial);
        shadowMesh.position.z = -0.05; 

        scene.add(textMesh);
        scene.add(shadowMesh);

        const hitGeometry = new THREE.PlaneGeometry(20, 20);
        const hitMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0
        });
        const hitPlane = new THREE.Mesh(hitGeometry, hitMaterial);
        hitPlane.name = 'hit';
        scene.add(hitPlane);

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        const onPointerMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObject(hitPlane);

            if (intersects.length > 0) {
                const point = intersects[0].point;
                shaderMaterial.uniforms.uDisplacement.value.copy(point);
                shadowMaterial.uniforms.uDisplacement.value.copy(point);
            }
        };

        const onPointerLeave = () => {
            const farPoint = new THREE.Vector3(999, 999, 999);
            shaderMaterial.uniforms.uDisplacement.value.copy(farPoint);
            shadowMaterial.uniforms.uDisplacement.value.copy(farPoint);
        };

        const animate = () => {
            sceneRef.current.animationId = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        const container = containerRef.current;
        container.addEventListener('pointermove', onPointerMove);
        container.addEventListener('pointerleave', onPointerLeave);

        const handleResize = () => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const aspect = rect.width / rect.height;
            camera.left = -10 * aspect;
            camera.right = 10 * aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(rect.width, rect.height);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial resize to fit container

        sceneRef.current = {
            scene,
            camera,
            renderer,
            cleanup: () => {
                container.removeEventListener('pointermove', onPointerMove);
                container.removeEventListener('pointerleave', onPointerLeave);
                window.removeEventListener('resize', handleResize);
                if (sceneRef.current.animationId) {
                    cancelAnimationFrame(sceneRef.current.animationId);
                }
                renderer.dispose();
                textTexture.dispose();
                shadowTexture.dispose();
                geometry.dispose();
                hitGeometry.dispose();
                shaderMaterial.dispose();
                shadowMaterial.dispose();
                hitMaterial.dispose();
                // Avoid leaving old canvas
                if (container.contains(renderer.domElement)) {
                    container.removeChild(renderer.domElement);
                }
            }
        };

        animate();

        return () => {
            sceneRef.current.cleanup?.();
        };
    }, [mounted, textStr]);

    if (!mounted) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center">
                <div className="text-[#D4AF37]">Loading Canvas...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[600px] overflow-hidden">
            <div ref={containerRef} className="absolute inset-0" />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
                <p className="text-white/40 text-sm font-mono tracking-wider">
                    Interact with the text
                </p>
            </div>
        </div>
    );
}
