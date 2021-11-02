const express = require('express');
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "HelenaBegum";


//ROUTE 1: Create a User using : Post  "/api/auth/createuser". Dosen't require Auth

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be 5 charecters').isLength({ min: 5 }),

], async (req, res) => {
    let success=false;
    console.log(req.body);
    // res.send(req.body);
    // const user = User(req.body);
    // user.save();

    //If there are errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }

    //Check whether the user with this email exists already

    try {
        let success = false;

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ success,error: "Sorry with this email user already exists" })
        }


        //Hashing passWord With salt.

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        //   .then(user => res.json(user))
        //  .catch(err=>{console.log(err)
        //   res.json({error:'Please enter a unique value for email', message:err.message})   })


        const data = {//With the help of authtoken we can convert into a data
            user: {
                id: user.id
            }
        }


        //With the JWT_SECRET we can identify if anybody wants top tamper with the data
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);

        //Sending auth token instead of user
        success=true;
        res.json({ success,authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})

//ROUTE 2 :Authenticate a User using : Post  "/api/auth/login". Dosen't require Login

router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank ').exists()
], async (req, res) => {
    
     let success=false;
    //If there are errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;//It is nessesary for sending request at BOdy of a POST request

    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ error: "Please login with correct credentials" });

        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({ success , error: "Please login with correct credentials" });
        }



        const data = {
            user: {
                id: user.id
            }
        }
        //With the JWT_SECRET we can identify if anybody wants top tamper with the data
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({ success, authToken });
        // console.log(authToken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }
}
)



//ROUTE  3 : Get loggedin User Details using: POST "/api/auth/getuser".Login Required


router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }




})

module.exports = router
