const bodyParser = require('body-parser')
const express = require('express')
const client = require('./connection')

const app = express()

app.use(bodyParser.json()) 
app.listen(5000,()=>{
    console.log("Server runnig on 5000 port")
})

client.connect();


app.get('/users',(req,res)=>{
    client.query(`SELECT id, firstname, lastname, location
	FROM public."user"`,(err,result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end
})

app.get('/users/:id',(req,res)=>{
    client.query(`SELECT id, firstname, lastname, location
	FROM public."user" where id=${req.params.id}`,(err,result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end
})


app.post('/users',(req,res)=>{
    const user = req.body;
    let insertQuery = `INSERT INTO public."user"(
        id, firstname, lastname, location)
        VALUES (${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}');`
    client.query(insertQuery,(err,result)=>{
        if(!err){
            res.send('Insertion was Successful')
        }
        else{
            console.log(err.message)
        }
    })
    client.end
})

app.put('/users/:id',(req,res)=>{
    const user = req.body;
    let updateQuery = `UPDATE public."user"
	SET
    firstname='${user.firstname}', 
    lastname='${user.lastname}', 
    location='${user.location}'
	WHERE id=${user.id};`
    client.query(updateQuery,(err,result)=>{
        if(!err){
            res.send('Record Updated Successful')
        }
        else{
            console.log(err.message)
        }
    })
    client.end
})


app.delete('/users/:id',(req,res)=>{
    let deleteQuery = `delete from public."user"
	WHERE id=${req.params.id};`
    client.query(deleteQuery,(err,result)=>{
        if(!err){
            res.send('Record deleted Successful')
        }
        else{
            console.log(err.message)
        }
    })
    client.end
})