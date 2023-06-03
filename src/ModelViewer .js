import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const ModelViewer = () => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(window.innerWidth, window.innerHeight);
  
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
  
      const loader = new GLTFLoader();
      loader.load('/C:/Users/BOUGRINE/Desktop/logo.glb', (gltf) => {
        scene.add(gltf.scene);
      });
  
      camera.position.z = 5;
  
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
  
      animate();
    }, []);
  
    return <canvas ref={canvasRef} />;
  };
  