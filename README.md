# Requisitos 
Node v14.17.6
Postgres
Postman
Jest
Express

# agregar diccionario de palabras y querys 
en la carpeta querys vienen los querys para crear las tablas y vistas que se utilizan

# agregar diccionario de palabras
Se debe de mover el archivo wordDictionary.txt a la ruta C:/Word para poder ejecutar el insert de los datos a la tabla correspondiente.

# Instalación de dependencias
npm install

# Iniciar proyecto
npm run start --watch

# Ejecutar Test
npm test

# Consumo de Endpoints

# ############ POST Login ###############
url:
http://localhost:8080/login
headers:
x-access-token: xxxxxx
Body:
{
    "username": "jorge",
    "password": "1234"
}
Ejemplo de salida:
{
    "response": "success"
}

# Error de Credenciales
url:
http://localhost:8080/login
headers:
x-access-token: xxxxxx
Body:
{
    "username": "jorge",
    "password": "2222"
}
Ejemplo de salida:
{
    "response": "Invalid Credentials"
}

# Falta de Token
url:
http://localhost:8080/login
headers:
x-access-token: 
Body:
{
    "username": "jorge",
    "password": "1234"
}
{
    "response": "A token is required for authentication"
}



# **************************************** GET *******************************************

# Deberá seleccionar del diccionario una palabra de 5 letras cada 5 minutos y no se deberá repetir la palabra.

url:
http://localhost:8080/newWord
headers:
x-access-token: xxxxxx
Body:
{
    "words": "dara"
}
Ejemplo de salida:
[
    {
        "id_word": 60,
        "word": "abacá"
    }
]


# falta de token
url:
http://localhost:8080/newWord
headers:
x-access-token: 
Body:
{
    "words": "dara"
}
Ejemplo de salida:
A token is required for authentication



# ############### POST ###################

# ********Permitirá comparar cada letra entre dos palabras*********

# Si la letra ingresada está en el mismo lugar
url:
http://localhost:8080/compareWords
headers:
x-access-token: xxxxx
Body:
{
    "id_user":1,
    "word":"abaje",
    "wordUser": "abrir"
}
Ejemplo de salida:
{
    "letter": "a",
    "value": 1
}

# Si la letra ingresada está en la palabra pero no en el mismo lugar
url:
http://localhost:8080/compareWords
headers:
x-access-token: xxxxx
Body:
{
    "id_user":1,
    "word":"abaje",
    "wordUser": "sbrie"
}
Ejemplo de salida:
{
    "letter": "b",
    "value": 2
}

# Si la letra ingresada no se encuentra en la palabra
url:
http://localhost:8080/compareWords
headers:
x-access-token: xxxxx
Body:
{
    "id_user":1,
    "word":"abaje",
    "wordUser": "fsdcs"
}
Ejemplo de salida:
{
    "letter": "s",
    "value": 3
}

# Si acertó en todas las letras
url:
http://localhost:8080/compareWords
headers:
x-access-token: xxxxx
Body:
{
    "id_user":1,
    "word":"abaje",
    "wordUser": "abaje"
}
Ejemplo de salida:
[]

# Falta de token
url:
http://localhost:8080/compareWords
headers:
x-access-token: 
Body:
{
    "id_user":1,
    "word":"abaje",
    "wordUser": "abaje"
}
Ejemplo de salida:
A token is required for authentication


# ############################## GET ##############################
# seleccionar una nueva palabra

# Falta de token
url:
http://localhost:8080/newWord
headers:
x-access-token: 
Body:
{
    "words": "dara"
}
Ejemplo de salida:
A token is required for authentication

# Datos correctos
url:
http://localhost:8080/newWord
headers:
x-access-token: xxxxx
Body:
{
    "words": "dara"
}
Ejemplo de salida:
[
    {
        "id_word": 60,
        "word": "abacá"
    }
]


# ############################  GET  ############################

# obtener cuantas partidas a jugado un usuario y cuantas victorias ha tenido

# Falta de token
url:
http://localhost:8080/historyPerUser
headers:
x-access-token: 
Body:
{
    "username": "jorge",
    "password": "1234"
}
Ejemplo de salida:
A token is required for authentication

# Obtener informacion
url:
http://localhost:8080/historyPerUser
headers:
x-access-token: xxxxx
Body:
{
    "username": "jorge",
    "password": "1234"
}
Ejemplo de salida:
[
    {
        "total": "9",
        "ganadas": "8"
    }
]

# ############################# GET #######################

# obtener los mejores 10 jugadores con su número de victorias

# Falta de token
url:
http://localhost:8080/topTenPlayers
headers:
x-access-token: 
Body:

Ejemplo de salida:
A token is required for authentication

# Obtener datos
url:
http://localhost:8080/topTenPlayers
headers:
x-access-token: xxxxx
Body:

Ejemplo de salida:
[
    {
        "username": "jorge",
        "winner": "8"
    },
    {
        "username": "marisol",
        "winner": "1"
    },
    {
        "username": "pedro",
        "winner": "1"
    },
    {
        "username": "diego",
        "winner": "1"
    }
]



# ##################################### GET ###################################

# obtener las palabras más acertadas

# Falta de token
url:
http://localhost:8080/mostCorrectWord
headers:
x-access-token: 
Body:
{
    "limit":1
}
Ejemplo de salida:
A token is required for authentication

# Obtener información
url:
http://localhost:8080/mostCorrectWord
headers:
x-access-token: xxxxx
Body:
{
    "limit":1
}
Ejemplo de salida:
[
    {
        "word": "abacá",
        "total": "5"
    }
]