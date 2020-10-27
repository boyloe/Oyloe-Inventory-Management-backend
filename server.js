const express = require('express')
const app = express()

const port = process.env.PORT||4000


app.get('/', (request, response) => {
    response.send('hello')
})

app.post('/products', (request, response) => {
    console.log('this is the products page')
})

app.listen(port)