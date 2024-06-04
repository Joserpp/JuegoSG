import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Bateria extends THREE.Object3D{
    constructor(gui, titleGui,x,y,z,rotacionX,rotacionY,rotacionZ){
        super();

        this.colisionado = false;

        var texture = new THREE.TextureLoader().load('../imgs/pila.png');
        var materialPila = new THREE.MeshPhongMaterial({
            map: texture, 
            side: THREE.FrontSide, 
            shininess: 30 
        });
        var cilindro = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 100);
        var cilindroMesh = new THREE.Mesh(cilindro, materialPila);

        cilindroMesh.scale.set(0.1,0.1,0.1);
        cilindroMesh.position.set(x,y,z);
        cilindroMesh.rotateX(rotacionX);
        cilindroMesh.rotateY(rotacionY);
        cilindroMesh.rotateZ(rotacionZ);

        this.add(cilindroMesh);

        var base = new THREE.CircleGeometry(0.5,100);
        var materialbase = new THREE.MeshStandardMaterial({
            color: 0x808080
        });
        
        var baseMesh = new THREE.Mesh(base, materialbase);
        baseMesh.rotateX(-(Math.PI/2));
        baseMesh.translateZ(0.7501);

        baseMesh.scale.set(0.1,0.1,0.1);
        baseMesh.position.set(x,y,z);
        baseMesh.rotateX(rotacionX);
        baseMesh.rotateY(rotacionY);
        baseMesh.rotateZ(rotacionZ);

        this.add(baseMesh);

        var cilindro2 = new THREE.CylinderGeometry(0.1, 0.1, 0.15);
        var cilindro2Mesh = new THREE.Mesh(cilindro2, materialbase);
        cilindro2Mesh.translateY(0.7701);

        cilindro2Mesh.scale.set(0.1,0.1,0.1);
        cilindro2Mesh.position.set(x,y,z);
        cilindro2Mesh.rotateX(rotacionX);
        cilindro2Mesh.rotateY(rotacionY);
        cilindro2Mesh.rotateZ(rotacionZ);

        this.add(cilindro2Mesh);

        this.createGUI(gui, titleGui);
    }

    createGUI(gui, titleGui){}
    update () {}
}

export{ Bateria };