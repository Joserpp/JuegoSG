import * as THREE from '../libs/three.module.js'

class MyBox extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createSweptObject();  

    }

    
    
    createSweptObject() {
        // Creamos una curva para el barrido utilizando puntos en el espacio tridimensional
        const points = [
            new THREE.Vector3(-3, 0, 0),
            new THREE.Vector3(-3.6, 0, -1.5),
            new THREE.Vector3(0, 0.6, -3),
            new THREE.Vector3(0.6, 0.6, -4.5),
            new THREE.Vector3(1.5, 0.6, -5.4),
            new THREE.Vector3(3, 0.6, -4.8),
            new THREE.Vector3(4.2, 0.9, -4.2),
            new THREE.Vector3(5.7, 0.9, -5.4),
            new THREE.Vector3(6.6, 1.5, -10.2),
            new THREE.Vector3(7.2, 0.9, -11.1),
            new THREE.Vector3(7.8, 0.6, -12),
            new THREE.Vector3(10.2, 0.9, -12.3),
            new THREE.Vector3(12, 0.9, -12.3),
            new THREE.Vector3(12.9, 0.9, -11.4),
            new THREE.Vector3(14.4, 1.2, -10.5),
            new THREE.Vector3(15.9, 1.5, -13.5),
            new THREE.Vector3(17.7, 2.1, -16.5),
            new THREE.Vector3(15, 2.7, -19.5),
            new THREE.Vector3(13.5, 4.5, -16.5),
            new THREE.Vector3(10.5, 4.5, -13.5),
            new THREE.Vector3(7.5, 4.5, -10.5),
            new THREE.Vector3(7.5, 4.5, -7.5),     
            new THREE.Vector3(7.5, 0, 0), 
            new THREE.Vector3(4.5, 3, 2.4),
            new THREE.Vector3(1.5, 4.5, 4.8),   
            new THREE.Vector3(-3, 1.5, 2.4),             
                        
        ];

        const curve = new THREE.CatmullRomCurve3(points, true); // Creamos una curva de Catmull-Rom que pasa a través de estos puntos
        curve.curveType = 'catmullrom';
        curve.tension = 0.5; // Ajustamos la tensión de la curva para suavizarla

        const sweptGeometry = new THREE.TubeGeometry(curve, 100, 0.2, 8, false); // Creamos la geometría de barrido utilizando la curva, el número de segmentos, el radio, etc.
        const sweptMaterial = new THREE.MeshNormalMaterial(); // Creamos un material normal para la geometría del barrido
        const sweptObject = new THREE.Mesh(sweptGeometry, sweptMaterial); // Creamos un objeto Mesh utilizando la geometría y el material
        this.add(sweptObject); // Añadimos el objeto de barrido a esta instancia de MyBox
        }
    
}

export { MyBox };
