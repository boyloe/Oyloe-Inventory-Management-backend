const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const dbName = 'siteInventory'
const dbURL = 'mongodb+srv://BryLow:bryan123@cluster0.fffht.mongodb.net/siteInventory?retryWrites=true&w=majority'
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
        const newProduct = request.body
        db.collection('products').insertOne(newProduct)
        response.json(`${newProduct.name} was created`)
    })

    //app.patch/put to products to update quantities, figure out how to keep existing data and only update quantity. 

    app.get('/deliveries', (request, response) => {
        db.collection('deliveries').find().toArray((err, result) => {
            if (err) throw err
            response.json(result)
            })   
    })

    app.post('/deliveries', (request, response) => {
        const newDelivery = request.body
        db.collection('deliveries').insertOne(newDelivery)
        response.json(`${newDelivery} was created with ${newDelivery.productsDelivered}`)
    })

    //Need to create get/post for dailyUsage(maybe a better name)

})



app.listen(port)