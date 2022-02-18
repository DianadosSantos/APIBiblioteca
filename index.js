const express = require('express');
const app = express();
const conn = require('./db/conn');
const porta = process.env.PORT || 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())


conn
.sync()
.then(() =>{
    app.listen(porta)
})
.catch((err) => console.log(err))