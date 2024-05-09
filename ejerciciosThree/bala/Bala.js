import * as THREE from '../libs/three.module.js'

class Bala extends THREE.Object3D{
    constructor(gui, titleGui){
        super();

        var material = new THREE.MeshNormalMaterial();
        material.flatShading = true;
        material.needsUpdate = true;

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

        /* this.perfil = [
            new THREE.Vector2(0.0, 0.0),
            new THREE.Vector2(0.16, 0.0),
            new THREE.Vector2(0.16, 0.03),
            new THREE.Vector2(0.14, 0.05),
            new THREE.Vector2(0.14, 0.07),
            new THREE.Vector2(0.16, 0.1),
            new THREE.Vector2(0.15, 0.64),
            new THREE.Vector2(0.15, 0.7),
            new THREE.Vector2(0.14, 0.77),
            new THREE.Vector2(0.14, 0.79),
            new THREE.Vector2(0.12, 0.86),
            new THREE.Vector2(0.09, 0.92),
            new THREE.Vector2(0.07, 0.94),
            new THREE.Vector2(0.04, 0.97),
            new THREE.Vector2(0.02, 0.98),
            new THREE.Vector2(0, 0.98),
        ]; */

        const segments = 50;

        const geometry = new THREE.LatheGeometry(this.perfil, segments, 0, 2*Math.PI);
        geometry.scale(0.5, 0.5, 0.5);
        const figure = new THREE.Mesh(geometry, material);

        this.add(figure);

        /* figure.position.y = 0.5; */

        this.createGUI(gui, titleGui);
    }

    createGUI(gui, titleGui){}
    update () {}
}

export{ Bala };