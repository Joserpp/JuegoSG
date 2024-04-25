import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Coche extends THREE.Object3D{
    constructor(gui, titleGui){
        super();

        /* const material = new THREE.MeshNormalMaterial();
        material.flatShading = true;
        material.needsUpdate = true;

        const extrudeSettings = {
            steps: 30,
            depth: 1.25, // Grosor de la rueda
            bevelEnabled: true,
            bevelThickness: 0.15,
			bevelSize: 0.1,
            bevelSegments: 30
        };

        // const caja = new THREE.BoxGeometry(1.5, 0.5, 2.7);
        var caja = new THREE.Shape();
        caja.moveTo(0, 0);
        caja.lineTo(3.0, 0);
        caja.quadraticCurveTo(2.5, 0.5, 2, 0.5);
        caja.lineTo(0, 0.5);
        const cajafigura = new THREE.ExtrudeGeometry(caja, extrudeSettings);
        const cajaMesh = new THREE.Mesh(cajafigura, material);
        cajaMesh.rotateY(Math.PI/2);
        cajaMesh.translateZ(-0.65);
        cajaMesh.translateX(-1.3);
        cajaMesh.translateY(-0.2);

        var cabina = new THREE.Shape();
        cabina.moveTo(0, 0);
        cabina.lineTo(0.5, 0.5);
        cabina.lineTo(1.5, 0.5);
        cabina.lineTo(2, 0);

        const cabinafigura = new THREE.ExtrudeGeometry(cabina, extrudeSettings);
        const cabinaMesh = new THREE.Mesh(cabinafigura, material);
        cabinaMesh.rotateY(Math.PI/2);
        cabinaMesh.translateZ(-0.65);
        cabinaMesh.translateX(-1.25);
        cabinaMesh.translateY(0.30);

        this.add(cabinaMesh);
        this.add(cajaMesh); */

        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        materialLoader.load('10600_RC_ Car_SG_v2_L3.mtl',
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('10600_RC_ Car_SG_v2_L3.obj',
                    (object) => {
                        this.add(object);
                    }, null, null
                );
            }
        );
        
        this.createGUI(gui, titleGui);
    }

    createGUI(gui, titleGui){}
    update () {}
}

export{ Coche };