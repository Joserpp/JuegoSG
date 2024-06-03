import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js';

class Cañon extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.gui = gui;
        this.titleGui = titleGui;
        this.time = 0;
        
        this.pivoteCañon = new THREE.Object3D();
        this.pivoteGeneral = new THREE.Object3D();

        this.pivoteGeneral.rotateY(-Math.PI/2);
        this.pivoteGeneral.scale.set(0.03,0.03,0.03);
        this.pivoteGeneral.position.set(0, 0.32, 0);

        this.add(this.pivoteGeneral);
        this.pivoteGeneral.add(this.pivoteCañon);

        this.crearCañon();

        /* this.createGUI(); */
    }

    
    
    crearCañon() {

        var material = new THREE.MeshPhongMaterial({
            color: 0x000000, 
            shininess: 20,
            specular: 0xffffff, 
            flatShading: false, 
            side: THREE.DoubleSide 
        });
        
                
        //base del cuerpo del cañon
        var esfera= new THREE.SphereGeometry(0.5,32,32);
        var geoesfera= new THREE.Mesh(esfera,material);
        geoesfera.translateY(1);


        //cuerpo del cañon
        var cilindro= new THREE.CylinderGeometry(0.5,0.5,2);
        var geocilindro= new THREE.Mesh(cilindro,material);
        geocilindro.translateX(1);
        geocilindro.translateY(1);
        geocilindro.rotateZ(Math.PI/2);

        var cuerpo = new CSG();
        cuerpo.union([geocilindro, geoesfera]);

        //hueco interior
        var cilindro1= new THREE.CylinderGeometry(0.3,0.3,2);
        var geocilindro1= new THREE.Mesh(cilindro1,material);
        geocilindro1.translateX(1);
        geocilindro1.translateY(1);
        geocilindro1.rotateZ(Math.PI/2);

        cuerpo.subtract([geocilindro1]);

        //base del cañon
        var base= new THREE.BoxGeometry(1,1,1);
        var geobase=new THREE.Mesh(base,material);
        geobase.translateY(0.5);
        this.pivoteGeneral.add(geobase);

        //mecha cañon
        var cilindro2= new THREE.CylinderGeometry(0.05,0.05,0.3);
        cilindro2.rotateZ(0.5);
        cilindro2.translate(-0.4,1.5,0);
        var geocilindro2=new THREE.Mesh(cilindro2,material);
        cuerpo.union([geocilindro2]);

        this.pivoteCañon.add(cuerpo.toMesh());
    }

    createGUI() {

        if (!this.gui) {
            console.error('GUI is not defined');
            return;
        }
        if (!this.titleGui) {
            console.error('Title GUI is not defined');
            return;
        }
        
        var folder = this.gui.addFolder(this.titleGui);

        // Control para la rotación Yaw (base del cañón)
        folder.add(this.pivoteGeneral.rotation, 'y', -Math.PI, Math.PI, 0.01).name('Rotación General');

        // Control para la rotación Pitch (cuerpo del cañón)
        folder.add(this.pivoteCañon.rotation, 'z', -Math.PI / 4, Math.PI / 4, 0.01).name('Elevación Cañon');
    }

    giroCañon(rotacion){
        this.pivoteGeneral.rotateY(-Math.PI/300);
        this.pivoteCañon.rotateZ(rotacion);
    }
}

export { Cañon };




