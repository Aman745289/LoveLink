const PORT = 5000


const express = require('express')
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors= require('cors')
const {MongoClient}= require('mongodb')
const uri = 'mongodb+srv://amankhan797876:AMAN@cluster0.1hfq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const app = express()
app.use(cors());
app.use(express.json())

app.get('/',(req,res) => {
    res.json('hello to my app')
})

app.post('/signup', async(req,res) => {
    const client = new MongoClient(uri)
    console.log(req.body)
    const {email,password}= req.body

    const generateuserId = uuidv4()
    const hashedpassword = await bcrypt.hash(password, 10)
    try{
        await client.connect()
        const database = client.db('sample_mflix')
        const users= database.collection('users')
        
        const existinguser= await users.findOne({email})
        if(existinguser){
            return res.status(409).send('user already exist please login')
        } 

        
        const senitizedEmail = email.toLowerCase()
        const data = {
            user_id : generateuserId,
            email : senitizedEmail,
            hashed_password : hashedpassword
        }
        const insertUser= await users.insertOne(data)

        const token = jwt.sign(insertUser, senitizedEmail, {
        expiresIn: 60 * 24,
      })
      res.status(201).json({token, userId:generateuserId})
    }
    catch (err){
        console.log(err)
        
    }
})

app.post('/login', async (req,res) =>{
    const client = new MongoClient(uri)
    const {email, password} = req.body
    
    try{
        await client.connect()
        const database = client.db('sample_mflix')
        const users = database.collection('users')

        const user = await users.findOne({email})

        const correctPassword = await bcrypt.compare(password, user.hashed_password)
        
        if(user && (correctPassword)){
          const token = jwt.sign(user,email,{
            expiresIn : 60 * 24
          })
          res.status(201).json({token, userId:user.user_id })
        }
        res.status(400).send('invalid cred')

    } catch(err){
        console.log(err);
        
    }
    
})




app.get('/users', async(req,res) => {
    
    const client = new MongoClient(uri)
    

    try{
        
        await client.connect()
        const database = client.db('sample_mflix')
        const users = database.collection('users')
        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } finally{
        await client.close()
    }
})

app.put('/user', async(req,res) =>{
    const client = new MongoClient(uri)
    const formData = req.body.formData

    try{
        await client.connect()
        const database = client.db('sample_mflix')
        const users = database.collection('users')

        const query = {user_id: formData.user_id}
        const updateDocument ={
            $set:{
                first_name:formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender:formData.show_gender,
                gender_identity:formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            },
        }
        const insertUser = await users.updateOne(query, updateDocument)
        res.send('insertedUser')
    }
    finally{
        await client.close()
    }
})


































app.listen(PORT, () => console.log('server running on PORT ' + PORT))