import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js';

class MyBox extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.crearCañon();  

    }

    
    
    crearCañon() {

        var material = new THREE.MeshPhongMaterial({
            color: 0x000000, 
            shininess: 20,
            specular: 0xffffff, 
            flatShading: false, 
            side: THREE.DoubleSide 
        });
        
                
        //base del cañon
        var esfera= new THREE.SphereGeometry(0.5,32,32);
        var geoesfera= new THREE.Mesh(esfera,material);
        geoesfera.translateY(1);


        //cuerpo del cañon
        var cilindro= new THREE.CylinderGeometry(0.5,0.5,2);
        var geocilindro= new THREE.Mesh(cilindro,material);
        geocilindro.translateX(1);
        geocilindro.translateY(1);
        geocilindro.rotateZ(Math.PI/2);

        //hueco interior
        var cilindro1= new THREE.CylinderGeometry(0.3,0.3,2);
        var geocilindro1= new THREE.Mesh(cilindro1,material);
        geocilindro1.translateX(1);
        geocilindro1.translateY(1);
        geocilindro1.rotateZ(Math.PI/2);

        //base del cañon
        var base= new THREE.BoxGeometry(1,1,1);
        var geobase=new THREE.Mesh(base,material);
        geobase.translateY(0.5);

        //mecha cañon
        var cilindro2= new THREE.CylinderGeometry(0.05,0.05,0.3);
        cilindro2.rotateZ(0.5);
        cilindro2.translate(-0.4,1.5,0);
        var geocilindro2=new THREE.Mesh(cilindro2,material);

        var csg=new CSG();

        csg.union([geocilindro,geoesfera]);
        csg.union([geobase]);
        csg.subtract([geocilindro1]);
        csg.union([geocilindro2]);


        var resultado=csg.toMesh();

        this.add(resultado);
    }
    
}

export { MyBox };
