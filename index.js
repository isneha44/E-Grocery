const express = require("express");

const app = express();

const port =3000;

app.get('/admin', function(req, res){
    res.send('Hello World!');
  })

app.get('/user',function(req,res){
    res.send('I Am Imalka');
})

// console.log("Hello World");

app.listen(port, () => {console.log(`Listening on port 3000 $ {port}`)});