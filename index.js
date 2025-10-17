const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

// middleware
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://my_db:my_db1122@cluster0.etjzxzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri)

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("usersDb")
    const usersCollection = database.collection("users")

    app.get('/users',async(req,res)=>{
        const cursor = usersCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.post('/users',async(req,res)=>{
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser)
        res.send(result)
        console.log("Get data from :",req.body);
    })
    app.delete('/users/:id',async(req,res)=>{
        console.log(req.params.id);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`My App is Running from ${port}`)
})