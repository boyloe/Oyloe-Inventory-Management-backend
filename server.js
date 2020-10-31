const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const dbName = 'siteInventory'
const dbURL = process.env.dbURL
const cors = require('cors')
const port = process.env.PORT||4000

MongoClient.connect(dbURL, {useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err)
    const db = client.db(dbName)    
    
    app.use(cors())
    app.use(bodyParser.json())
    app.get('/products', (request, response) => {
        db.collection('products').find().toArray((err, result) => {
            if (err) throw err
            response.json(result)
            })   
    })

    app.post('/products', (request, response) => {
        const product = request.body
        db.collection('products').insertOne(product)
        response.json(`${product.name} was created`)
    })
})



app.listen(port)