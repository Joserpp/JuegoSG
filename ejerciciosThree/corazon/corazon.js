import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Corazon extends THREE.Object3D{
    constructor(gui, titleGui, material, obj, x, y, z, rotacionX, rotacionY, rotacionZ){
        super();

        this.crearBombilla(material, obj, x, y, z, rotacionX, rotacionY, rotacionZ);
        this.createGUI(gui, titleGui);
    }

    crearBombilla(material, obj, x, y, z, rotacionX, rotacionY, rotacionZ){
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        materialLoader.load(material,
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load(obj,
                    (object) => {
                        object.scale.set(0.005, 0.005, 0.005);
                        object.position.set(x, y, z);
                        object.rotateX(rotacionX);
                        object.rotateY(rotacionY);
                        object.rotateZ(rotacionZ);
                        this.add(object);
                    }, null, null
                );
            }
        );
    }

    createGUI(gui, titleGui){}
    update () {}
}

export{ Corazon };