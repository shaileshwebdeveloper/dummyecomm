const express = require("express");
const cors =  require('cors')
const { connection } = require("./config/db");
const { UserModel } = require("./models/UserModel");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const ProductModel = require("./models/ProductModel");
const { authentication } = require("./middlewares/authentication");

require("dotenv").config();

const app = express();
app.use(cors())

// Syntax: app.use([path,],callback[,callback…])
// app.use((req, res, next)
app.use(express.json()); // THIS WILL PARSE THE RESPONSE

app.post("/signup", async (req, res) => {
  
  const { firstname,lastname,email, password } = req.body;   // destructure the response received

  const isUser =  await UserModel.findOne({email})
 
  if(isUser){
    res.send({'msg':'User already exists, try logging in'})
  }
else{

  bcrypt.hash(password, 5, async function(err, hash) {
   // Store hash in your password DB.

    if(err){
      res.send("Something went wrong please try again");
      console.log('err', err)
    }
    else{

      const new_user = new UserModel({
         firstname,
         lastname,
         email,
         password : hash
       });
     
       try {
         await new_user.save(); // if dont want to use insertMany u can use this.
         res.send("Signup Successful");
       } catch (error) {
         res.send("Something went wrong please try again");
         console.log('error', error)
       }
    }  

  });

}
 
});


app.post('/signin', async(req, res) => {


    const {email, password} = req.body

    console.log(email, password)

    const user = await UserModel.findOne({email}) // await is important here so it will give the result
    

    if(user === null){
      res.send({'msg' : 'please check the email & password'})
    }
    else{
          const hashed_password = user.password
    


    bcrypt.compare(password, hashed_password, function(err, result) {
      
      if(err){
        console.log("err", err)
         res.send({'msg':'Something went wrong, try again later'})
      }


      if(result){

         const user_id = user._id;

        // Making token here passing user ID
         var token = jwt.sign({ user_id }, process.env.SECRET_KEY, {
            expiresIn : 10
         });
         res.send({message : 'Login Successful', token : token})

         console.log(user_id)
      }
      else{

         res.send('Login Failed')

      }
    });
    }
})


app.post("/products", async(req,res)=>{
 
  try{
      
      const products = await ProductModel.create(req.body)
      return res.json({ status: 'ok', data: products})
      
  }catch(err){
      return res.status(500).send(err)
  }
})


app.get("/products", async(req, res) => {
  try{
    
    const products = await ProductModel.find()
    res.send(products[0].Products)

  }
  catch(err){
      res.send(err)
  }


})


app.get('/profile', authentication, async(req, res) => {

  const {user_id} = req.body
  const user = await UserModel.findOne({_id : user_id})

  const {name, email} = user

  res.send({name, email})

})
// app.listen([port[, host[, backlog]]][, callback])

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connection to DB successfully");
  } catch (error) {
    console.log("Error connecting to DB");
    console.log(error);
  }

  console.log("Listening Port 3001");
});

