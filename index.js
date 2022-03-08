const express = require('express');
const app = express();

const client = require('./database.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.post('/login', function (req, res){
  const body = req.body;
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return  res.status(403).json({ response: 'A token is required for authentication' });
    }
  
  client.query("select * from users where username='"+body.username+"' and password='"+body.password+"';", (err, result)=>{
      if(!err){
        if(result.rowCount == 1){
          res.status(200).json({ response: 'success' });
        }else{
          res.status(200).json({ response: 'Invalid Credentials' });
        }
      }else{
        res.status(200).json({ response: 'error in database conection' });
      }
  });
  client.end;
})
//obtener nueva palabra// cuando pasen los 5 minutos
app.get('/newWord', (req, res)=>{
  const body = req.body;

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

  client.query("select * from dictionary where length(word) = 5 and word Not IN('"+body.words+"') limit 1;", (err, result)=>{
      if(!err){
          res.status(200).send(result.rows);
      }else{
        res.status(200).json({ response: 'error in database conection' });
      }
  });
  client.end;
})

//estadisticas por usuario (vista) //punto no. 7
app.get('/historyPerUser', (req, res)=>{
  const body = req.body;

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
  client.query("select count(*) as total,(select count(*) from vstHistory where username = '"+body.username+"' and password = '"+body.password+"' and winner = true ) as ganadas from vstHistory where username = '"+body.username+"' and password = '"+body.password+"'", (err, result)=>{
      if(!err){
          res.status(200).send(result.rows);
      }else{
        res.status(200).json({ response: 'error in database conection' });
      }
  });
  client.end;
})

//obtener los 10 mejores //punto 8
app.get('/topTenPlayers', (req, res)=>{
  const body = req.body;

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

  client.query("select * from vstTopTenPlayers;", (err, result)=>{
      if(!err){
          res.status(200).send(result.rows);
      }else{
        res.status(200).json({ response: 'error in database conection' });
      }
  });
  client.end;
})

//punto 9 palabra acertada mas acertada
app.get('/mostCorrectWord', (req, res)=>{
  const body = req.body;

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

  client.query("select word, count(*) as total from vstHistory where winner = true group by word limit '"+body.limit+"'", (err, result)=>{
      if(!err){
          res.status(200).send(result.rows);
      }else{
        res.status(200).json({ response: 'error in database conection' });
      }
  });
  client.end;
})

app.post('/compareWord', (req, res)=>{
  const body = req.body;

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    
    //palabra reservada, palabra introducida, id_usuario
    if(body.word === body.wordUser){
      
    }//else palabra acertada
    else{
      res.status(200).json({ response: 'the word does not exist in the database.' });
    }
  client.end;
 
})

//si existe la letra, no existe, posicion diferente
app.post('/compareWords', (req, res)=>{
  const body = req.body;

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    //palabra escondida (word), palabra usuario (word)
    //comparamos si es la misma, si es asi entonces todas las letras estan en la misma posicion
    if(body.word === body.wordUser){
      //insertamos la palabra en la bd, buscamos el id de la palabra
      client.query("select id_word from dictionary where word = '"+body.word+"'", (err, result)=>{
        if(!err){
            //le atino a todas las letras
            client.query(`insert into history (id_userFk, id_wordFk, winner) values ('${body.id_user}',${result.rows[0].id_word},${true})`, (err, result)=>{
              if(!err){
                  res.status(200).send(result.rows);
              }else{
                res.status(200).json({ response: 'error in database conection' });
              }
            });
        }else{
          res.status(200).json({ response: 'error in database conection' });
        }
      });

    }else{
      //convertimos el dowrUser en array (W,O,R,D)
      let letters = Array.from(body.wordUser)
      //recorremos la palabra con cada una de las letras
      for (let i = 0; i < body.wordUser.length ; i++) {
        //revisamos si la letra introducida existe en la palabra a escondida
        let letter = letters[i];
        if(body.word.includes(letter)){
          for (let i = 0; i < body.word.length; i++) {
            if(body.word.indexOf(letter) == i){
              //letra exacta en cada posicion de la palabra
              return res.status(200).send(
              {
                "letter": letter,
                "value": 1
              }
            );
          }//end letra en la posicion correcta
          else{
            //letra en posicion incorrecta
            res.status(200).send(
              {
                "letter": letter,
                "value": 2
              }
            );
          }
          }//end recorrer palabra
        }else{
          //si la letra no se encuentra en la palabra
          if(body.word.indexOf(letter) == -1){
            let _res = {
              "letter": letter,
              "value": 3
            };
            if(i == body.wordUser.length-1){
              return res.status(200).send(_res);
            }
          }//end letra no encontrada
        }
      }//end comparar letra por letra de la palabra
    }



    
  client.end;
 
})

client.connect();



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(' listening on port', port);
});

module.exports = app;