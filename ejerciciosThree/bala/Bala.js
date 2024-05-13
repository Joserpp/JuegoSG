import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Bala extends THREE.Object3D{
    constructor(gui, titleGui,x,y,z,rotacionX,rotacionY,rotacionZ){
        super();

        /* var material = new THREE.MeshNormalMaterial();
        material.flatShading = true;
        material.needsUpdate = true; */

        var material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 0.5,
            envMapIntensity: 1,
        });

        this.perfil = [
            new THREE.Vector2(0.0, 0.0),
            new THREE.Vector2(0.16, 0),
            new THREE.Vector2(0.16, 0.02),
            new THREE.Vector2(0.15, 0.02),
            new THREE.Vector2(0.15, 0.03),
            new THREE.Vector2(0.13, 0.03),
            new THREE.Vector2(0.13, 0.08),
            new THREE.Vector2(0.14, 0.09),
            new THREE.Vector2(0.15, 0.1),
            new THREE.Vector2(0.15, 0.11),
            new THREE.Vector2(0.15, 0.13),
            new THREE.Vector2(0.15, 1.2),
            new THREE.Vector2(0.11, 1.3),
            new THREE.Vector2(0.11, 1.45),
            new THREE.Vector2(0, 2),
        ];

        var segments = 50;

        var geometry = new THREE.LatheGeometry(this.perfil, segments, 0, 2*Math.PI);
        geometry.scale(0.5, 0.5, 0.5);

        var figure = new THREE.Mesh(geometry, material);
        figure.scale.set(0.1,0.1,0.1);
        figure.position.set(x,y,z);

        figure.rotateX(rotacionX);
        figure.rotateY(rotacionY);
        figure.rotateZ(rotacionZ);

        
        var figure2 = new THREE.Mesh(geometry, material);
        figure2.scale.set(0.1,0.1,0.1);
        figure2.position.set(x,y,z);

        figure2.rotateX(rotacionX);
        figure2.rotateY(rotacionY);
        figure2.rotateZ(rotacionZ);
        figure2.translateX(0.015);
        
        this.add(figure);
        /* this.add(figure2); */
        
        /* var csg = new CSG();
        csg.union([figure, figure2]);
        var result = csg.toMesh();
        
        this.add(result); */

        this.createGUI(gui, titleGui);
    }

    createGUI(gui, titleGui){}
    update () {}
}

export{ Bala };