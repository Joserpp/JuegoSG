import * as THREE from '../libs/three.module.js'

class Obstaculo extends THREE.Object3D {
    constructor(gui,titleGui,x,y,z) {
        super();

        this.colisionado = false;
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.crearObstaculo(x,y,z);  
    }

    crearObstaculo(x,y,z) {

        var muro = new THREE.BoxGeometry(1.5,1.5,0.25);
        var texture = new THREE.TextureLoader().load('../imgs/ladrillo-difuso.png');

        /* var materialmuro = new THREE.MeshPhongMaterial({
            map: texture, 
            shininess: 30 
        }); */

        const materialmuro = new THREE.MeshPhongMaterial();
        const texturemuro = new THREE.TextureLoader().load('../imgs/ladrillo-difuso.png');
        materialmuro.map = texturemuro;

        const bumpTexture = new THREE.TextureLoader().load('../imgs/ladrillo-bump.png');
        materialmuro.bumpMap = bumpTexture;
        materialmuro.bumpScale = 200.5;

        var muromesh = new THREE.Mesh(muro, materialmuro);

        muromesh.scale.set(0.1,0.1,0.1);
        muromesh.position.set(x,y,z);

        this.add(muromesh);
    }

}

export { Obstaculo };
