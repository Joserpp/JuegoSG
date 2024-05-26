import * as THREE from '../libs/three.module.js'


class Circuito extends THREE.Object3D {
    constructor() {
        super();

        var resolucion = 500;
        var radio = 0.25;
        var segmentos = 20;

        this.geometry = new THREE.TorusKnotGeometry( 2, radio, resolucion, segmentos );

        const curve = this.getPathFromTorusKnot();
        curve.curveType = 'catmullrom';
        curve.tension = 0.5; 
        
        this.geometria = new THREE.TubeGeometry(curve, resolucion, radio, segmentos, false);
        this.material = new THREE.MeshPhongMaterial({
            color: 0x333333, 
            shininess: 30,
            specular: 0x555555,
            flatShading: true
        });

        this.circuito = new THREE.Mesh(this.geometria, this.material);
        this.add(this.circuito);
    }
    
    getPathFromTorusKnot(){

        
        const p = this.geometry.parameters.p;
        const q = this.geometry.parameters.q;
        const radius = this.geometry.parameters.radius;
        const resolution = this.geometry.parameters.tubularSegments;
        var u, cu, su, quOverP, cs;
        var x,y,z;
        
        const points = [];
        for ( let i = 0; i < resolution; ++ i ) {
                u = i / resolution * p * Math.PI * 2;
        cu = Math.cos( u );
                su = Math.sin( u );
                quOverP = q / p * u;
                cs = Math.cos( quOverP );

                x = radius * ( 2 + cs ) * 0.5 * cu;
                y = radius * ( 2 + cs ) * su * 0.5;
                z = radius * Math.sin( quOverP ) * 0.5;

        points.push (new THREE.Vector3 (x,y,z));
        }
        
        return new THREE.CatmullRomCurve3 (points, true);
    }
        
    getGeometria(){
        return this.geometria;
    }
}

export { Circuito };
