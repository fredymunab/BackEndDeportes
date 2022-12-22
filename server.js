
//se inicializan o se crean las variables, los paquetes u objetos
const express=require('express') // const express es para subir servidores
const mysql=require('mysql')  // const mysql es para hacer la conexion a una base de datos
const myconn=require('express-myconnection') //const myconn es para hacer la conexion a una coleccion de datos
                                            //es para que cree el objeto que se va conectar en node con mysql
const routes=require('./routes')
const cors=require('cors')

const app=express()

app.use(cors())

app.set('port',9000)
// se crean las optiones de conexion a la base de datos
const dbOptions={
    host:'localhost',
    port:'3306',
    user:'fredym',
    password:'admin',
    database:'marcadores'
}
// se hace la conexion a la base de datos
//haciendo las solicitudes

/// middlewares ---------------------
// que son procesos intermedios que se hacen entre una solicitud y una respuesta

app.use(myconn(mysql,dbOptions,'single'))// se usa la variable app con la funcion use y luego la variable myconn y se le dan como parametros conquien se va a conectar en este caso mysql
                                        //luego se le dan las opciones de la base de datos con dbOptions y finalmente el tipo de conexion en este caso 'single' en la cual se manda una peticion y si contesta bien y sino para 
                                        //pero tambien puede ser persistente en la cual sino conteste vuelve e insiste hasta que le conteste
app.use(express.json()) /// formato de entrega y de recepción que va ha ser de tipo json

/// routes o rutas 
//ruta1 --------------------------- 
// verbos ej get post

app.get('/',(req,res)=>{
   res.send('Welcome to my APP')
})


app.use('/api',routes)
 
app.listen(app.get('port'),()=>{
    console.log(`El puerto corre en: ${app.get('port')}`)
})