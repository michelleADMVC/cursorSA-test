# CursorSATest

Este es un proyecto de test para postulacion a Frontend junior a CursorSa


Consideraiciones : 
Antes de correr la aplicacion con ng server, recordar instalar los paquetes con "npm install"

Dependencias : 
-Angular 10.0.8, ultima version a la fecha
-Bootstrap

Para este proyecto decidi usar Bootstrap para ahorrarme tiempo en las vistas 

Para este proyecto me centre principalmente en crear un buen diseño a nivel de codigo, separar las funcionalidades y modularizar al maximo todo lo que pudiera, aunque admito que un quedan cosas por refactorizar y que podrian quedar mejor

A continuacion explicare de manera general el uso de cada clase que hice en este proyecto : 

-Componentes : 
-Main : Por costumbre siempre creo que una clase llamada main, para evitar colocar cosas que no sean del router de angular en app, y como esta aplicacion tiene solo una vista, decidi llamar a este componente como main, aca es donde empieza a desarrollarse la interacion, este componente tiene 2 hijos, el componente Search y el Componente Results, ambos estaran conectados a traves de un servicio llamado searchService, pero de momento este componente solo sirve para mantener contener a ambos y para crear la barra superior que contendra el componente search

-Search : Search es el principal componente que tendra interaccion con el usuario, este componente contiene un hijo, que es el formulario, el cual es Search-Form, este componente padre, tiene por principal funcionalidad, establecer un puente con el servicio de busqueda, y contener el formulario

-Search-form : Este formulario fue hecho con los modulos de defecto que tiene angular para una gestion mas sencilla de los formularios, el cual es form-control, al momento de hacer click al boton, este componente controla el submit y los datos, y los comunica al componente padre, cuando el componente padre recibe el evento de submit, llama al servicio de search

-Results : Este componente es el encargado de mostrar los resultados de la busqueda en forma de tabla, ademas de inyectar el servicio de busqueda, al igual que su componente hermano "Search", y asi ambos puedan comunicarse a traves de un observable.
Results al inicializarse, se "suscribe" a un evento de search, y espera a que se realice y se termine una busqueda para actualizar sus datos, ademas valia algunos de los requerimientos que se pidieron en la prueba, el cual es verificar si el rut es correcto, y si el numero es correcto, en el momento de reenderizar los datos, esta clase comprueba si los datos son validos.
Creo que esta clase pudo haberse optimizado un poco y haber dividido las funcionalidades de comprobacion en un servicio, pero como el ejercicio es tan pequeño decidi que no era necesario

-Servicios :
-ApiServices : hay una carpeta llamada apiServices, ahi decidi colocar 2 clases cuya funcion sera interactuar con la API y realizar peticiones, usualmente, por cada modelo de datos suelo crear una clase para uno, y aunque su funcionalidad en este ejercicio no fuera mucho, esta no fue la excepcion, razon por la que hay 2 clases distintas que tienen la misma funcionalidad, pero una obtiene las regiones, y otra las personas 

-DataService : Para conectar ambos api y obtener los datos de forma centralizada, hice este servicio, cuya unico objetivo es almacenar los datos que llegan de la api, y crear un puente entre los datos y el servicio de busqueda

-SearchService : Este el el servicio principal, el cual tiene muchas funcionalidades, pero todos orientados hacia un objetivo en concreto, crear una capa de abstraccion que reciba los datos del formulario de Search, usar los recursos de la capa de Datos y almacenar los resultados
Se divide en varias funciones que se usan en funcion de los parametros que van llegando, cuando los datos llegan, primero se comprueba que datos hay y cuales no, y luego toma varias rutas para poder obtener los datos, y almacenarlos, los almacena y emite un mensaje de que la busqueda fue completada, este mensaje es interceptado por results, el cual despues pide los resultados a este mismo servicio

Consideraciones extras : No realice uno de los requermientos, el cual agregar al formulario la capacidad de buscar por comuna, pero como se puede buscar por region, en realidad me parecio un poco rebundante, ya que los datos son muy pocos como para testear esta funcionalidad de forma correcta, pero definitivamente lo tengo en consideracion