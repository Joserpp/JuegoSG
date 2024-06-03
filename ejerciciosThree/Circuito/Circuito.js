
import * as THREE from '../libs/three.module.js'


class Circuito extends THREE.Object3D {
    constructor() {
        super();

        var resolucion = 500;
        var radio = 0.25;
        var segmentos = 20;

        this.geometry = new THREE.TorusKnotGeometry( 10, radio, resolucion, segmentos, 3, 4);

        const curve = this.getPathFromTorusKnot();
        curve.curveType = 'catmullrom';
        curve.tension = 0.5; 
        
        this.geometria = new THREE.TubeGeometry(curve, resolucion, radio, segmentos, false);
        /* this.material = new THREE.MeshPhongMaterial({
            color: 0x333333, 
            shininess: 30,
            specular: 0x555555,
            flatShading: true
        }); */

        
        /* const textureLoader = new THREE.TextureLoader();
        const stoneTexture = textureLoader.load('../imagenes/TCom_Sand_Muddy2_2x2_512_albedo.tif');
        this.material = new THREE.MeshPhysicalMaterial({
            map: stoneTexture, // Textura base
            clearcoat: 1.0, // Máximo clearcoat para un acabado brillante
            clearcoatRoughness: 0.1, // Ajusta la rugosidad del clearcoat
            roughness: 0.9, // Ajusta la rugosidad del material base (más rugoso para apariencia de piedra)
            metalness: 0.0 // Piedra no tiene propiedades metálicas
        }); */

        const noiseTexture = this.generateNoiseTexture(256);
            this.material = new THREE.MeshPhysicalMaterial({
            map: noiseTexture, // Textura de ruido como base
            clearcoat: 1.0, // Máximo clearcoat para un acabado brillante
            clearcoatRoughness: 0.5, // Ajusta la rugosidad del clearcoat
            roughness: 0.9, // Ajusta la rugosidad del material base (más rugoso para apariencia de piedra)
            metalness: 0.0, // Piedra no tiene propiedades metálicas
            color: new THREE.Color(0x888888) // Color base de la piedra
        });

        this.circuito = new THREE.Mesh(this.geometria, this.material);
        this.add(this.circuito);
    }

    generateNoiseTexture(size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');
    
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const value = Math.floor(Math.random() * 255);
                context.fillStyle = `rgb(${value}, ${value}, ${value})`;
                context.fillRect(x, y, 1, 1);
            }
        }
    
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);
        return texture;
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
