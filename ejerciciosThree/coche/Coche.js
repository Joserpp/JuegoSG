import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Coche extends THREE.Object3D{
    constructor(gui, titleGui, material, obj){
        super();

        this.crearCoche(material, obj);
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
                        object.position.set(0, 0.25,0);
                        object.rotateX(-Math.PI/2);
                        this.cajaCoche = new THREE.Box3();
                        this.cajaCoche.setFromObject(object);
                        var caja = new THREE.Box3Helper(this.cajaCoche,0x000000);
                        this.add(caja);
                        caja.visible = true;
                        this.add(object);
                    }, null, null
                );
            }
        );
    }

    getCaja(){
        return this.cajaCoche;
    }

    createGUI(gui, titleGui){}
    update () {}
}

export{ Coche };
