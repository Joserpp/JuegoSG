import * as THREE from '../libs/three.module.js'


class Circuito extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        const points = [
            new THREE.Vector3(-1.5, 0, 0),
            new THREE.Vector3(-1.8, 0, -0.75),
            new THREE.Vector3(0, 0.3, -1.5),
            new THREE.Vector3(0.3, 0.3, -2.25),
            new THREE.Vector3(0.75, 0.3, -2.7),
            new THREE.Vector3(1.5, 0.3, -2.4),
            new THREE.Vector3(2.1, 0.45, -2.1),
            new THREE.Vector3(2.85, 0.45, -2.7),
            new THREE.Vector3(3.3, 0.75, -5.1),
            new THREE.Vector3(3.6, 0.45, -5.55),
            new THREE.Vector3(3.9, 0.3, -6),
            new THREE.Vector3(5.1, 0.45, -6.15),
            new THREE.Vector3(6, 0.45, -6.15),
            new THREE.Vector3(6.45, 0.45, -5.7),
            new THREE.Vector3(7.2, 0.6, -5.25),
            new THREE.Vector3(7.95, 0.75, -6.75),
            new THREE.Vector3(8.85, 1.05, -8.25),
            new THREE.Vector3(7.5, 1.35, -9.75),
            new THREE.Vector3(6.75, 2.25, -8.25),
            new THREE.Vector3(5.25, 2.25, -6.75),
            new THREE.Vector3(3.75, 2.25, -5.25),
            new THREE.Vector3(3.75, 2.25, -3.75),
            new THREE.Vector3(3.75, 0, 0),
            new THREE.Vector3(2.25, 1.5, 1.2),
            new THREE.Vector3(0.75, 2.25, 2.4),
            new THREE.Vector3(-1.5, 0.75, 1.2)
        ];
        

        const curve = new THREE.CatmullRomCurve3(points, true);
        curve.curveType = 'catmullrom';
        curve.tension = 0.5; 

        var resolucion=500;
        var radio=0.2;
        var segmentos=20;

        this.geometria = new THREE.TubeGeometry(curve, resolucion, radio, segmentos, false);
        this.material = new THREE.MeshNormalMaterial();
        this.circuito = new THREE.Mesh(this.geometria, this.material);
        this.add(this.circuito);
    }
        
    getGeometria(){
        return this.geometria;
    }
}

export { Circuito };
