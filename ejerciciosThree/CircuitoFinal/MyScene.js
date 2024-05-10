
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'
import * as TWEEN from '../libs/tween.esm.js'


// Clases de mi proyecto
import {Coche} from '../coche/Coche.js'
import {Rueda} from '../rueda/Rueda.js'

/* import { CircuitoFinal } from './CircuitoFinal.js' */
import { Circuito } from '../Circuito/Circuito.js'

/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();

    this.initStats();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    /* this.createCamera (); */

    //ejes
    this.createAxes();

    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    this.circuito = new Circuito(this.gui, "barrido");
    this.coche = new Coche(this.gui,"coche", '../coche/10600_RC_ Car_SG_v2_L3.mtl', '../coche/10600_RC_ Car_SG_v2_L3.obj');
    
    this.coche.translateZ(0.2);
    this.animacionCoche();

    ////////////////////////////////////////////
    //Animacion de la rueda
    ///////////////////////////////////////////

    /* this.rueda = new Rueda(this.gui, "Rueda");

    this.rueda.scale.set(0.1,0.1,0.1);

    this.spline2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.5,1,0),
        new THREE.Vector3(-1.2,1.5,0.5),
        new THREE.Vector3(-1.2,1.0,0.5),
        new THREE.Vector3(-1.5,1.5,0),
        new THREE.Vector3(-1.5,1,0)]);

        this.segmentos1 = 100;
        this.binormales1 = this.spline2.computeFrenetFrames(this.segmentos1,true).binormals;
        var origen1={t : 0};
        var fin1={t : 1};
        var tiempoDeRecorrido1 = 3000;

    var animacion1 = new TWEEN.Tween(origen1).to(fin1, tiempoDeRecorrido1)
    .onUpdate(() => {
        var posicion1 = this.spline2.getPointAt(origen1.t);
        this.rueda.position.copy(posicion1);
        var tangent1 = this.spline2.getTangentAt(origen1.t);
        posicion1.add(tangent1); 
        this.rueda.up = this.binormales1[Math.floor(origen.t * this.segmentos1)];
        this.rueda.lookAt(posicion1); 
    })
    .onComplete(() => {origen1.t=0.1;
        var time1 = tiempoDeRecorrido1*0.5;
        animacion1.duration(time1);
        animacion1.start();
    })
    .repeat(Infinity)
    .start();

    function animate1() {
        requestAnimationFrame(animate1);
        TWEEN.update();
    }
    animate1();

    this.add(this.rueda); */

    /* window.addEventListener("keydown", (event) => this.onKeyDown(event));
    window.addEventListener("keyup", (event) => this.onKeyUp(event)); */
  
    /* this.createCamaraSubjetiva(this.nodo); */

    this.createCameras();

    this.nodo.add(this.coche);
    this.add(this.circuito); 
    this.add(this.nodo);

    
  }

  createAxes() {
    // Crear ejes con una longitud de 1 metro
    this.axis = new THREE.AxesHelper(4);
    this.add(this.axis);
  }

  initStats() {
  
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;
  }

  createCamaraSubjetiva(/* nodo */) {

    this.camara = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50);
    /* nodo.add(this.camara); */
    this.camara.position.set(0, 0.5, -1.5);

    var puntoDeMiraRelativo = new THREE.Vector3(0, 0.5, 0);

    var target = new THREE.Vector3();
    this.camara.getWorldPosition(target);

    target.add(puntoDeMiraRelativo);

    this.camara.lookAt(target);
    return this.camara;
  }

  createCameraGeneral () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 50);
    // Recuerda: Todas las unidades están en metros
    // También se indica dónde se coloca
    this.camera.position.set (4, 2, 4);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    /* this.add (this.camera); */
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;

    return this.camera;
  }

  createCameras(){

    this.camaraSubjetiva = this.createCamaraSubjetiva();
    this.camaraGeneral = this.createCameraGeneral();

    this.camaraActiva = this.camaraGeneral;
    this.add(this.camaraActiva);
  }
  
  cambiarCamara(event){
    if(event.which === 32){
      if(this.camaraActiva === this.camaraSubjetiva){
        this.nodo.remove(this.camaraSubjetiva);
        this.camaraActiva = this.camaraGeneral;
        this.add(this.camaraGeneral);
      }
      else if(this.camaraActiva === this.camaraGeneral){
        this.remove(this.camaraGeneral);
        this.camaraActiva = this.camaraSubjetiva;
        this.nodo.add(this.camaraSubjetiva);
      }
    }
  }

  animacionCoche(){

    var geometriaTubo = this.circuito.getGeometria();
    this.tubo = geometriaTubo;
    this.path = geometriaTubo.parameters.path;
    this.radio = geometriaTubo.parameters.radius;
    this.segmentos = geometriaTubo.parameters.tubularSegments;
    
    this.nodo = new THREE.Object3D();
    
    var t = 1;
    var posTmp = this.path.getPointAt(t);
    this.nodo.position.copy(posTmp);

    var tangente = this.path.getTangentAt(t);
    posTmp.add(tangente);
    var segmentoActual = Math.floor(t*this.segmentos);
    this.nodo.up = this.tubo.binormals[segmentoActual];
    this.nodo.lookAt(posTmp);

    this.spline = new THREE.CatmullRomCurve3([
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
      new THREE.Vector3(-1.5, 0.75, 1.2),
      new THREE.Vector3(-1.5, 0, 0)
    ]);

    this.segmentos = 100;
    this.binormales = this.spline.computeFrenetFrames(this.segmentos,true).binormals;
    var origen={t : 0};
    var fin={t : 1};
    var tiempoDeRecorrido = 30000;

    var animacion = new TWEEN.Tween(origen).to(fin, tiempoDeRecorrido)
        .onUpdate(() => {
            var posicion = this.spline.getPointAt(origen.t);
            this.nodo.position.copy(posicion);
            var tangente = this.spline.getTangentAt(origen.t);
            posicion.add(tangente); 
            this.nodo.up = this.binormales[Math.floor(origen.t * this.segmentos)];
            this.nodo.lookAt(posicion); 
        })
        .onComplete(() => {origen.t=0.1;
            var time = tiempoDeRecorrido*0.5;
            animacion.duration(time);
            animacion.start();
        })
        .repeat(Infinity)
        .start();

        function animate() {
            requestAnimationFrame(animate);
            TWEEN.update();
        }
        animate();
  }

  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightPower : 500.0,  // La potencia de esta fuente de luz se mide en lúmenes
      ambientIntensity : 10,   
      axisOnOff : true
    }

    

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la potencia de la luz puntual
    folder.add (this.guiControls, 'lightPower', 0, 1000, 20)
      .name('Luz puntual : ')
      .onChange ( (value) => this.setLightPower(value) );
    
    // Otro para la intensidad de la luz ambiental
    folder.add (this.guiControls, 'ambientIntensity', 0, 1, 0.05)
      .name('Luz ambiental: ')
      .onChange ( (value) => this.setAmbientIntensity(value) );
      
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    this.ambientLight = new THREE.AmbientLight('white', this.guiControls.ambientIntensity);
    // La añadimos a la escena
    this.add (this.ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.pointLight = new THREE.PointLight( 0xff0000 );
    this.pointLight.power = this.guiControls.lightPower;
    this.pointLight.position.set( 0, 3, 0 );
    this.add (this.pointLight);

    this.pointLight = new THREE.PointLight( 0x00ff00 );
    this.pointLight.power = this.guiControls.lightPower;
    this.pointLight.position.set( 3, 3, 0.5 );
    this.add (this.pointLight);

    this.pointLight = new THREE.PointLight( 0x0000ff );
    this.pointLight.power = this.guiControls.lightPower;
    this.pointLight.position.set( -3, 3, 0.5 );
    this.add (this.pointLight);


  }
  
  setLightPower (valor) {
    this.pointLight.power = valor;
  }

  setAmbientIntensity (valor) {
    this.ambientLight.intensity = valor;
  }  
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camaraActiva;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camaraActiva.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camaraActiva.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    
    if (this.stats) this.stats.update();
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Se actualiza la posición de la cámara según su controlador
    if(this.camaraActiva === this.camaraGeneral){
      this.cameraControl.update();
    }
    
    // Se actualiza el resto del modelo
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
}

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener("keydown", (event) => scene.cambiarCamara(event));
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
