import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Coche extends THREE.Object3D{
    constructor(gui, titleGui, material, obj){
        super();

        this.crearCoche(material, obj);
        this.rotateX(-Math.PI/2);
        this.createGUI(gui, titleGui);
    }

    crearCoche( material, obj){
        
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();

        materialLoader.load(material,
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load(obj,
                    (object) => {
                        object.scale.set(0.005,0.005,0.005);
                        this.add(object);
                    }, null, null
                );
            }
        );
    }

    createGUI(gui, titleGui){}
    update () {}
}

export{ Coche };
