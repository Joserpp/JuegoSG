import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import { color } from '../libs/dat.gui.module.js';

class Rueda extends THREE.Object3D{
    constructor(gui, titleGui){
        super();

        const radio = 1;
        const rueda = new THREE.Shape();
        rueda.absarc(0, 0, radio, 0.1, Math.PI*2, false);

        const holePath = new THREE.Path();
        const holeRadius = 0.9;
        holePath.absarc(0, 0, holeRadius, 0, Math.PI*2+0.1, true);
        rueda.holes.push(holePath);

        const extrudeSettings = {
            steps: 30,
            depth: 0.5, 
            bevelEnabled: true,
            bevelThickness: 0.15,
			bevelSize: 0.1,
            bevelSegments: 30,
            curveSegments: 50
        };

        const geometry = new THREE.ExtrudeGeometry(rueda, extrudeSettings);
        var material = new THREE.MeshStandardMaterial({
            color: 0X000000, 
        });
        const ruedaMesh = new THREE.Mesh(geometry, material);
        ruedaMesh.translateZ(-0.25);
        this.add(ruedaMesh);

        const llanta = new THREE.CylinderGeometry(0.85, 0.85, 0.7);
        var materialLlanta = new THREE.MeshStandardMaterial({
            map: texture 
        });
        var materialLlanta = new THREE.MeshBasicMaterial ({map: texture});
        this.llantaMesh = new THREE.Mesh(llanta, materialLlanta);
        this.llantaMesh.rotateX(Math.PI/2);
        this.add(this.llantaMesh);

        this.createGUI(gui, titleGui);
    }

    createGUI(gui, titleGui){}
    update () {}
}

export{ Rueda };