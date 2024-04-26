import * as THREE from '../libs/three.module.js'

class MyBox extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.crearObstaculo();  

    }
    crearObstaculo() {

        var muro = new THREE.BoxGeometry(1.5,1.5,0.25);
        var texture = new THREE.TextureLoader().load('../imgs/ladrillo-difuso.png');
        var materialmuro = new THREE.MeshStandardMaterial ({map: texture});        
        var muromesh= new THREE.Mesh(muro,materialmuro);
        
        this.add(muromesh);

    }
    
}

export { MyBox };
