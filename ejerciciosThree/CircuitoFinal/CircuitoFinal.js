import * as THREE from '../libs/three.module.js'
import {Coche} from '../coche/Coche.js'


class CircuitoFinal extends THREE.Object3D {
    constructor(gui, titleGui, geometriaTubo) {
        super();

        this.coche = new Coche(gui, titleGui, '../coche/10600_RC_ Car_SG_v2_L3.mtl', '../coche/10600_RC_ Car_SG_v2_L3.obj');
        this.coche.translateZ(0.2);
        this.tubo = geometriaTubo;
        this.path = geometriaTubo.parameters.path;
        this.radio = geometriaTubo.parameters.radius;
        this.segmentos = geometriaTubo.parameters.tubularSegments;
        
        this.nodo = new THREE.Object3D(); 

        var t=0.3;
        var posTmp = this.path.getPointAt(t);
        this.nodo.position.copy(posTmp);

        var tangente = this.path.getTangentAt(t);
        posTmp.add(tangente);
        var segmentoActual= Math.floor(t*this.segmentos);
        this.nodo.up=this.tubo.binormals[segmentoActual];
        this.nodo.lookAt(posTmp);

        this.nodo.add(this.coche);
        this.add(this.nodo);
    }
    
}

export { CircuitoFinal };
