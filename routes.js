

const express = require('express')
const routes = express.Router()

///  route for select  ------------------------------------------
routes.get('/:table', (req, res) => {
    //res.send('Ahora si viene el sel')
    req.getConnection((err, conn) => {

        if (err) return res.send(err)
        var ssql = 'Select * from ' + req.params.table
        conn.query(ssql, (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })

})

//ruta inicio de sesion

routes.get('/:table/:email/:clave', (req, res) => {
    //res.send('Ahora si viene el sel')
    req.getConnection((err, conn) => {

        if (err) return res.send(err)
        var ssql = 'Select * from marcadores.' + req.params.table + " WHERE usu_email='" + req.params.email + "' AND usu_clave='" +req.params.clave+"'"
        conn.query(ssql, (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })

})
routes.get('/:table/:email/:clave/:adm', (req, res) => {
    //res.send('Ahora si viene el sel')
    req.getConnection((err, conn) => {

        if (err) return res.send(err)
        var ssql = 'Select * from marcadores.' + req.params.table + " WHERE usu_email='" + req.params.email + "' AND usu_clave='" +req.params.clave+ "' AND usu_administrador='" +req.params.adm+"'"
        conn.query(ssql, (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })

})

// ruta para listar registro con limite 

routes.get('/:table/:lim',(req,res)=>{ 
    //res.send('Aqui si es el select') 

    req.getConnection((err,conn)=>{ 
        if(err) return res.send(err) 

        var ssql="SELECT t1.eve_id AS sec,date_format(t1.eve_fecha, '%d-%m-%Y') AS fecha " 
        ssql+=",t2.equ_nombre AS equi1,t3.equ_nombre AS equi2,t1.eve_marca1 AS marca1,t1.eve_marca2 AS marca2 " 
        ssql+=",t4.dep_nombre AS deporte " 
        ssql+=",t1.eve_descrip AS descrip " 
        ssql+="from eventos t1 " 
        ssql+="LEFT JOIN equipos t2 ON t1.equ_equipo1=t2.equ_id " 
        ssql+="LEFT JOIN equipos t3 ON t1.equ_equipo2=t3.equ_id " 
        ssql+="LEFT JOIN deportes t4 ON t1.dep_id=t4.dep_id " 
        ssql+="ORDER BY 1 desc LIMIT "+req.params.lim 

        conn.query(ssql,(err,rows)=>{ 
            if(err) return res.send(err) 
            res.json(rows) 

        }) 

    }) 
                        
})


/// route for insert -------------------------------------------
routes.post('/:table', (req, res) => {
    //res.send('Ahora si viene el sel')
    req.getConnection((err, conn) => {

        if (err) return res.send(err)

        //var ssql='INSERT INTO '+req.params.table
        //conn.query(ssql,(err,rows)=>{
        conn.query('INSERT INTO ' + req.params.table + ' SET ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send('Datos agregados exitosamente!')
        })

    })
})
//// route for delete
routes.delete('/:table/:field/:id', (req, res) => {

    req.getConnection((err, conn) => {

        if (err) return res.send(err)
        let sql = 'DELETE FROM marcadores.' + req.params.table + ' WHERE ' + req.params.field +' = ?'

        conn.query(sql, [req.params.id], (err, rows) => {
            if (err) return res.send(err)
            res.send('Datos eliminados correctamente')
        })

    })
})

// route for update
routes.put('/:table/:field/:id', (req, res) => {

    req.getConnection((err, conn) => {

        if (err) return res.send(err)

        conn.query('UPDATE ' + req.params.table + ' SET ? WHERE ' + req.params.field + ' = ?', [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send('Datos actualizados correctamente!')
        })

    })
})


module.exports = routes // se exporta routes para que pueda ser usado en el archivo server 