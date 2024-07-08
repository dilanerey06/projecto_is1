# Projecto Ingenieria del Software I


PROJECT TITLE: InvBus

VERSION or DATE: *Version 1.0.0*

AUTHORS: Gabriel Antonio Chavarro Avellaneda - Dilan Esteban Rey Sepulveda


## Tools

Full Stack application made using:

1. For the backend: NodeJS, Express, MySQL and mysqljs
2. For the frontend: JavaScript, ReactJS, react-boostrap

## PURPOSE OF PROJECT: 

Lo que se busca en esta api es la ejecucion de los metodos basicos que cada usuario puede
realizar sin necesidad que se realice un login por recomendacion del profesor, se mantiene
un crud para que se pueda create, read, update, delete. en este caso para que se pueda crear
un nuevo conductor, bus, reporte, se pueda leer informacion de estos y se pueda actualizar 
estado de autobuses, en este caso casi no usaremos mucho la opcion delete, pues no vamos a eliminar
reportes, aunque cabe la posibilidad de cuando un bus ya no sirva por tiempo de uso, se deje de baja
de la base de datos de la flota.

## How to start this project (Instructions to make the project work.)

1. You have to be installed NodeJS nad MySQL.

2. Setup the database:

   2.1) First go to the following directory: ./server/config/

   2.2) You'll find a .sql file named pruebais1.sql run it in a MySQL Local instance (It's preferable that this be done with MySQL workbench).

   2.3) Then open the Conection.js file that is in the same directory and edit it changing the connection string referencing the MySQL Local instance as follow:

   
   const db = mysql.createPool({
   host: 'localhost', // Type here the host
   user: '@MySQL user', // Type here the user
   password: '@MySQL password', // Type here the pass
   database: 'pruebais1',
   multipleStatements: true,
   });
   

   2.4) Save the Conection.js file.

3. To run the server back to server directory then open a terminal and type (one by one):


npm install
npm run devStart


4. To run the frontend open other terminal and go to client directory and type (one by one):


npm install
npm start


Now the server would be running on localhost and PORT 8080 and the client is running
on localhost but in PORT 3000. Open your browser and search localhost:3000.


