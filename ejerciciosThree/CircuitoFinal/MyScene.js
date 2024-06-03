
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { Stats } from '../libs/stats.module.js'
import * as TWEEN from '../libs/tween.esm.js'


// Clases de mi proyecto
import {Coche} from '../coche/Coche.js'
import {Rueda} from '../rueda/Rueda.js'
import {Bala} from '../bala/Bala.js'
import {Bateria} from '../bateria/Bateria.js'
import {Cañon} from '../cañon/cañon.js'
import {Corazon} from '../corazon/corazon.js'
import {Bombilla} from '../bombilla/bombilla.js'
import {Obstaculo} from '../obstaculo/obstaculo.js'


/* import { CircuitoFinal } from './CircuitoFinal.js' */
import { Circuito } from '../Circuito/Circuito.js'

/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    this.renderer = this.createRenderer(myCanvas);
    
    this.gui = this.createGUI ();

    this.initStats();
    
    this.createLights ();

    // Variables para el giro del coche
    this.left = false;
    this.right = false;

    // Variables para el picking
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    /***************************/
    /* Creación de los objetos */
    /***************************/
    this.circuito = new Circuito();
    this.splineCoche = this.circuito.getPathFromTorusKnot();
    this.cañon = new Cañon(this.gui, "cañon");
    
    this.coche = new Coche(this.gui, "coche", '../coche/10600_RC_ Car_SG_v2_L3.mtl', '../coche/10600_RC_ Car_SG_v2_L3.obj');

    // Varriables para la velocidad del coche
    this.reloj = new THREE.Clock();
    this.velocidad = 1/30;
    this.t = 0;
    this.rotacion = 0;
    this.sentido = 1;
    this.velocidadRot = Math.PI / 300;
    this.limiteSup = Math.PI / 4;
    this.limiteInf = -Math.PI / 4;

    this.puntuacion = 0;
    this.balas = 5;
    this.vidas = 3;

    var geometriaTubo = this.circuito.getGeometria();
    this.tubo = geometriaTubo;
    this.path = geometriaTubo.parameters.path;
    this.radio = geometriaTubo.parameters.radius;
    this.segmentos = geometriaTubo.parameters.tubularSegments;
    
    this.nodo = new THREE.Object3D();
    
    this.muro  = new Obstaculo(this.gui, "muro", 0, 0.3, 0);
    this.muro1 = new Obstaculo(this.gui, "muro1", 0, -0.3, 0);
    this.muro2 = new Obstaculo(this.gui, "muro2", 0.3, 0, 0);

    this.bateria  = new Bateria(this.gui, "bateria", -0.3, 0, 0, 0, 0, Math.PI/2);
    this.bateria1 = new Bateria(this.gui, "bateria1", 0, 0.3, 0, 0, 0, 0);
    this.bateria2 = new Bateria(this.gui, "bateria2", 0, 0.3, 0, 0, 0, 0);

    this.bala  = new Bala(this.gui, "bala", 0, 0.25, 0, 0, 0, 0);
    this.bala1 = new Bala(this.gui, "bala1", 0, 0.25, 0, 0, 0, 0);
    this.bala2 = new Bala(this.gui, "bala2", 0, 0.25, 0 ,0, 0, 0);

    this.bombilla = new Bombilla(this.gui, "bombilla", "../bombilla/Lamp.mtl", "../bombilla/Lamp.obj", 0, 0.25, 0, 0, 0, 0);
    this.bombilla1 = new Bombilla(this.gui, "bombilla1", "../bombilla/Lamp.mtl", "../bombilla/Lamp.obj", 0, 0.25, 0, 0, 0, 0);
    this.bombilla2 = new Bombilla(this.gui, "bombilla2", "../bombilla/Lamp.mtl", "../bombilla/Lamp.obj", 0, 0.25, 0, 0, 0, 0);

    this.corazon = new Corazon(this.gui, "corazon", "../corazon/Love.mtl", "../corazon/Love.obj", 0, 0.25, 0, 0, 0, 0);
    this.corazon1 = new Corazon(this.gui, "corazon1", "../corazon/Love.mtl", "../corazon/Love.obj", 0, 0.25, 0, 0, 0, 0);
    this.corazon2 = new Corazon(this.gui, "corazon2", "../corazon/Love.mtl", "../corazon/Love.obj", 0, 0.25, 0, 0, 0, 0);
    
    /********************************************/
    /* Colocacion de los objetos en el circuito */
    /********************************************/

    this.pickableObjects = [];
    this.rueda  = this.animacionRueda(this.gui, 5000, 0, 0, -1.4);
    this.rueda2 = this.animacionRueda(this.gui, 5000, 2, 0, 0);
    this.rueda3 = this.animacionRueda(this.gui, 5000, 0, 2, -0.3);
    this.rueda4 = this.animacionRueda(this.gui, 5000, 2, -2.6, 0.2);

    this.animacionCoche();

    this.createCameras();
    
    this.colocarEnCircuito(this.muro, 0.45);
    this.colocarEnCircuito(this.muro1, 0.8);
    this.colocarEnCircuito(this.muro2, 0.2);

    this.colocarEnCircuito(this.bateria, 0.1);
    this.colocarEnCircuito(this.bateria1, 0.4);
    this.colocarEnCircuito(this.bateria2, 0.7);

    this.colocarEnCircuito(this.bala, 0.3);
    this.colocarEnCircuito(this.bala1, 0.6);
    this.colocarEnCircuito(this.bala2, 0.9);

    this.colocarEnCircuito(this.bombilla, 0.2);
    this.colocarEnCircuito(this.bombilla1, 0.3);
    this.colocarEnCircuito(this.bombilla2, 0.5);

    this.colocarEnCircuito(this.corazon, 0.25);
    this.colocarEnCircuito(this.corazon1, 0.68);
    this.colocarEnCircuito(this.corazon2, 0.99);

    /*********************************************/
    /* Creación de las cajas para las colisiones */
    /*********************************************/

    this.cajaMuro  = this.crearCaja(this.muro);
    this.cajaMuro1 = this.crearCaja(this.muro1);
    this.cajaMuro2 = this.crearCaja(this.muro2);

    this.cajaBateria  = this.crearCaja(this.bateria);
    this.cajaBateria1 = this.crearCaja(this.bateria1);
    this.cajaBateria2 = this.crearCaja(this.bateria2);

    this.cajaBala  = this.crearCaja(this.bala);
    this.cajaBala1 = this.crearCaja(this.bala1);
    this.cajaBala2 = this.crearCaja(this.bala2);

    this.cajaBombilla = this.crearCaja(this.bombilla);
    this.cajaBombilla1 = this.crearCaja(this.bombilla1);
    this.cajaBombilla2 = this.crearCaja(this.bombilla2);

    this.cajaCorazon = this.crearCaja(this.corazon);
    this.cajaCorazon1 = this.crearCaja(this.corazon1);
    this.cajaCorazon2 = this.crearCaja(this.corazon2);

    
    /************************************/
    /* Añadimos los objetos a la escena */
    /************************************/
    this.add(this.bateria);
    this.add(this.bateria1);
    this.add(this.bateria2);

    this.add(this.muro);
    this.add(this.muro1);
    this.add(this.muro2);
    
    this.add(this.bala);
    this.add(this.bala1);
    this.add(this.bala2);

    this.add(this.corazon);
    this.add(this.corazon1);
    this.add(this.corazon2);

    this.add(this.bombilla);
    this.add(this.bombilla1);
    this.add(this.bombilla2);
    
    this.add(this.rueda);
    this.add(this.rueda2);
    this.add(this.rueda3);
    this.add(this.rueda4);
    
    this.add(this.circuito); 
    this.add(this.nodo); 
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

  /***************************/
  /* Actualizar la velocidad */
  /***************************/

  setVelocidad(){
    this.velocidad=this.velocidad*(1/0.9);
    /* this.velocidad *= 1.1;*/
  }
  
  /***********/
  /* Picking */
  /***********/

  onDocumentMouseDown(event){

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

    this.raycaster.setFromCamera(this.mouse, this.getCamera());

    var pickedObjects = this.raycaster.intersectObjects(this.pickableObjects, true);

    if(pickedObjects.length > 0){

      this.puntuacion += 1;
      this.balas -= 1;
      console.log('Le he dao con picking');
      console.log('Balas: ' + this.balas + ' Punrtuacion: ' + this.puntuacion);
    }
    else{
      this.balas -= 1;
      console.log('No le he dao con picking');
      console.log('Balas: ' + this.balas + ' Punrtuacion: ' + this.puntuacion);
    }
  }

  /*************************/
  /* Colisiones de objetos */
  /*************************/

  crearCaja(objeto){

    var caja = new THREE.Box3();
    caja.setFromObject(objeto);

    /* var caja2=new THREE.Box3Helper(caja, 0x000000);
    this.add(caja2);
    caja2.visible=true; */

    return caja;
  }

  choqueMuros(cajaMuro,cajaCoche){
    
    if(cajaMuro.intersectsBox(cajaCoche)){

        console.log("choca muro");
        this.apagarLuces();    
    }
  }

  choqueBaterias(cajaBateria,cajaCoche){
    
    if(cajaBateria.intersectsBox(cajaCoche)){

      console.log("choca bateria");
      this.encenderLuces();
    }
  }

  choqueBalas(cajaBala,cajaCoche){ 

    if(cajaBala.intersectsBox(cajaCoche)){
      this.balas += 2;
      console.log("+2 balas, Balas totales: " + this.balas);
    }
  }

  /******************************/
  /* Funciones para las cámaras */
  /******************************/

  createCamaraSubjetiva(){
    
    const camara = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50);
    
    const distanciaDetras = 0.8;
    const altura = 0.7;
    camara.position.set(this.coche.position.x, this.coche.position.y + altura, this.coche.position.z - distanciaDetras);
    
    const puntoDeMiraRelativo = new THREE.Vector3(0, 0.5, 0);

    const target = new THREE.Vector3();
    target.add(puntoDeMiraRelativo);
    camara.lookAt(target);

    return camara;
  }

  createCameraGeneral(){
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
        this.coche.remove(this.camaraSubjetiva);
        this.camaraActiva = this.camaraGeneral;
        this.add(this.camaraGeneral);
      }
      else if(this.camaraActiva === this.camaraGeneral){
        this.remove(this.camaraGeneral);
        this.camaraActiva = this.camaraSubjetiva;
        this.coche.add(this.camaraSubjetiva);
      }
    }
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

  /*************************************/
  /* Colocación y animación de objetos */
  /*************************************/

  colocarEnCircuito(objeto , t){
    
    var posTmp = this.path.getPointAt(t);
    objeto.position.copy(posTmp);

    var tangente = this.path.getTangentAt(t);
    posTmp.add(tangente);
    var segmentoActual = Math.floor(t*this.segmentos);
    objeto.up = this.tubo.binormals[segmentoActual];
    objeto.lookAt(posTmp);

  }

  animacionCoche(){
    
    var posTmp = this.path.getPointAt(this.t);
    this.nodo.position.copy(posTmp);

    var tangente = this.path.getTangentAt(this.t);
    posTmp.add(tangente);
    var segmentoActual = Math.floor(this.t*this.segmentos);
    this.nodo.up = this.tubo.binormals[segmentoActual];
    this.nodo.lookAt(posTmp);

    this.segmentos = 100;
    this.binormales = this.splineCoche.computeFrenetFrames(this.segmentos,true).binormals;

    var segundosTrancurridos = this.reloj.getDelta();
    
    if(this.t === 0){
      console.log('aumento velocidad');
      this.setVelocidad();
    }
    
    this.t += this.velocidad * segundosTrancurridos;

    if(this.t >= 1){
      this.t = 0;
    }

    this.coche.actualizarCaja();

    this.nodo.add(this.coche);
    this.nodo.add(this.cañon);

   /*  var origen = {t : 0};
    var fin = {t : 1};
    
    var tiempoDeRecorrido = 40000;
    
    var animacion = new TWEEN.Tween(origen).to(fin, tiempoDeRecorrido)
        .onUpdate(() => {
            var posicion = this.splineCoche.getPointAt(origen.t);
            this.nodo.position.copy(posicion);
            var tangente = this.splineCoche.getTangentAt(origen.t);
            posicion.add(tangente); 
            this.nodo.up = this.binormales[Math.floor(origen.t * this.segmentos)];
            this.nodo.lookAt(posicion); 
        })
        .onComplete(() => {
            tiempoDeRecorrido*0.5;
            animacion.stop();
            origen.t = 0; 
            animacion.to(fin, tiempoDeRecorrido).start();
        })
        .repeat(Infinity)
        .start(); 

        function animate() {
            requestAnimationFrame(animate);
            TWEEN.update();
        }
        animate();   */     
  }
  
  animacionRueda(gui, tiempoDeRecorrido1, x, y, z){

    var rueda = new Rueda(gui, "Rueda");

    this.pickableObjects.push(rueda);

    rueda.scale.set(0.1,0.1,0.1);

    var spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.5 + x, 1 + y, 0 + z),
      new THREE.Vector3(-1.2 + x, 1.5 + y, 0.5 + z),
      new THREE.Vector3(-1.2 + x, 1.0 + y, 0.5 + z),
      new THREE.Vector3(-1.5 + x, 1.5 + y, 0 + z),
      new THREE.Vector3(-1.5 + x, 1 + y, 0 + z)
    ]);

    var segmentos1 = 100;
    var binormales1 = spline.computeFrenetFrames(segmentos1,true).binormals;
    var origen1={t : 0};
    var fin1={t : 1};

    var animacion1 = new TWEEN.Tween(origen1).to(fin1, tiempoDeRecorrido1)
    .onUpdate(() => {
        var posicion1 = spline.getPointAt(origen1.t);
        rueda.position.copy(posicion1);
        var tangent1 = spline.getTangentAt(origen1.t);
        posicion1.add(tangent1); 
        rueda.up = binormales1[Math.floor(origen1.t * segmentos1)];
        rueda.lookAt(posicion1); 
    })
    .onComplete(() => {origen1.t=0.1;
        animacion1.start();
    })
    .repeat(Infinity)
    .start();

    function animate1() {
        requestAnimationFrame(animate1);
        TWEEN.update();
    }
    animate1();

    return rueda;
  }

  /*******************/
  /* Giros del coche */
  /*******************/

  giroCocheDown(event){
    if (event.which === 37) {
      this.left = true;
    } else if (event.which === 39) {
        this.right = true;
    }
  }

  giroCocheUp(event){
    if (event.which === 37) {
      this.left = false;
    } else if (event.which === 39) {
        this.right = false;
    }
  }
  
  updateMovimientoCoche(){
    if(this.left){
      this.moverIzquierda();
    }
    if(this.right){
      this.moverDerecha();
    }
  }

  moverIzquierda(){
    this.coche.rotation.z -= 0.3 * this.velocidad;
    this.cañon.rotateZ(-0.3 * this.velocidad);
  }
  
  moverDerecha(){
    this.coche.rotation.z += 0.3 * this.velocidad;
    this.cañon.rotateZ(0.3 * this.velocidad);
  }

  /******************/

  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightPower : 100.0,  // La potencia de esta fuente de luz se mide en lúmenes
      ambientIntensity : 2,   
      axisOnOff : true
    }

    

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la potencia de la luz puntual
    folder.add (this.guiControls, 'lightPower', 0, 1000, 20)
      .name('Luz puntual : ')
      .onChange ( (value) => this.setLightPower(value) );
    
    // Otro para la intensidad de la luz ambiental
    folder.add (this.guiControls, 'ambientIntensity', 0, 10, 0.05)
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

    this.redLight = new THREE.AmbientLight('red', 1);
    this.blueLight = new THREE.AmbientLight('blue', 1);
    this.greenLight = new THREE.AmbientLight('green', 1);

    this.specularLight = new THREE.DirectionalLight(0xffffb3);

    this.specularLight.position.set(-4,5,0);
    this.specularLight.rotateZ(Math.PI/4);
    this.add(this.specularLight);
  
  }
  
  /* setLightPower (valor) {
    this.pointLight.power = valor;
  } */

  setAmbientIntensity (valor) {
    this.ambientLight.intensity = valor;
  }  

  setAmbientIntensity1 (valor) {
    if (valor === 0) {
      this.add(this.redLight);
      this.add(this.blueLight);
      this.add(this.greenLight);
      this.specularLight.intensity = 1;
    } else {
      this.remove(this.redLight);
      this.remove(this.blueLight);
      this.remove(this.greenLight);
      this.specularLight.intensity = 0;
    }
  } 

  apagarLuces() {
    this.setAmbientIntensity(0);
    this.setAmbientIntensity1(0);
    this.loader.load('../imagenes/noche.jpg', (texture) => {
      this.background = texture;
    });
  }

  encenderLuces() {
    this.setAmbientIntensity(2);
    this.setAmbientIntensity1(1);
    this.loader.load('../imagenes/dia.jpg', (texture) => {
      this.background = texture;
    });
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

    this.loader = new THREE.TextureLoader();
      this.loader.load('../imagenes/dia.jpg', (texture) => {
        this.background = texture;
      });
    
    return renderer;  
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
    
    this.updateMovimientoCoche();

    this.renderer.render (this, this.getCamera());

    this.rotacion += this.velocidadRot * this.sentido;

    if (this.rotacion >= this.limiteSup || this.rotacion <= this.limiteInf) {
      this.sentido *= -1;
    }
    var rotacion = this.velocidadRot * this.sentido;
    this.cañon.giroCañon(rotacion);

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update());
    this.animacionCoche();

    this.choqueMuros( this.cajaMuro,this.coche.getCaja());
    this.choqueMuros( this.cajaMuro1,this.coche.getCaja());
    this.choqueMuros( this.cajaMuro2,this.coche.getCaja());

    this.choqueBalas( this.cajaBala,this.coche.getCaja());
    this.choqueBalas( this.cajaBala1,this.coche.getCaja());
    this.choqueBalas( this.cajaBala2,this.coche.getCaja());

    this.choqueBaterias( this.cajaBateria,this.coche.getCaja());
    this.choqueBaterias( this.cajaBateria1,this.coche.getCaja());
    this.choqueBaterias( this.cajaBateria2,this.coche.getCaja());
  }
}

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener("keydown", (event) => scene.cambiarCamara(event));
  window.addEventListener("keydown", (event) => scene.giroCocheDown(event));
  window.addEventListener("keyup", (event) => scene.giroCocheUp(event));
  window.addEventListener("mousedown", (event) => scene.onDocumentMouseDown(event));
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
