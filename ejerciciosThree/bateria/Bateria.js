import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Bateria extends THREE.Object3D{
    constructor(gui, titleGui){
        super();

        var texture = new THREE.TextureLoader().load('../imgs/pila.png');
        var materialPila = new THREE.MeshStandardMaterial ({map: texture, side: THREE.FrontSide});

        var cilindro = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 100);
        var cilindroMesh = new THREE.Mesh(cilindro, materialPila);
        this.add(cilindroMesh);

        var base = new THREE.CircleGeometry(0.5,100);
        var materialbase = new THREE.MeshStandardMaterial({color: 0X808080});
        var baseMesh = new THREE.Mesh(base, materialbase);
        baseMesh.rotateX(-(Math.PI/2));
        baseMesh.translateZ(0.7501);
        this.add(baseMesh);

        var cilindro2 = new THREE.CylinderGeometry(0.1, 0.1, 0.15);
        var cilindro2Mesh = new THREE.Mesh(cilindro2, materialbase);
        cilindro2Mesh.translateY(0.7701);
        this.add(cilindro2Mesh);

        this.createGUI(gui, titleGui);
    }

    createGUI(gui, titleGui){}
    update () {}
}

export{ Bateria };