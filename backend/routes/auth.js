// const express = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const user = require('../models/User');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET = "harryis goodBo$y";


router.use(express.json());
//create a user using Post "api/auth/createuser".no login required 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 chracters').isLength({ min: 5 })

], async (req, resp) => {
    //if there are errors, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }
    try {

        //check whether the user with this email exist already 
        let User = await user.findOne({ email: req.body.email });
        if (User) {
            return resp.status(400).json({ error: "sorry user with this email already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        User = await user.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email
        })
        const data = {
            User: {
                id: User.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtdata);


        resp.json({ authtoken });
    } catch (error) {
        console.error(error.message);
        resp.status(500).send("some Error occured")
    }
    //     .then(user=>resp.json(user)).
    //    catch(err=>{console.log(err)
    // resp.json({error:"please enter a unique email",message:err.message})});

    // console.log(req.body); 
    // const User=user(req.body);
    // User.save();
    // resp.send(req.body);
})



//route2 Authenticate auser using :post "api/auth/login"

router.post('/login', [
    body('email', "enter avalid email").isEmail(),
    body('password', "password can not be blank").exists()
],
    async (req, resp) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let User = await user.findOne({ email });
            if (!User) {
                success = false;
                return resp.status(400).json({ error: "please try to login with correct" });
            }

            const passwordcompare = await bcrypt.compare(password, User.password);
            if (!passwordcompare) {
                return resp.status(400).json({ error: "please try to login with correct" });
            }
            const data = {
                User: {
                    id: User.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            // console.log(jwtdata);
            success = true;
   

            resp.json({success, authtoken });
        }
 
 catch(error) {
    console.error(error.message);
    resp.status(500).send("Internal server error")
}

})

//rote 3: loged in user details using post "api/auth/getuser",login required})

router.post('/getuser',fetchuser,async (req,resp)=>{
 try {
    userId=req.User.id;
    const User=await user.findById(userId).select("-password");
    resp.send(User);
 } catch (error) {
    console.error(error.message);
    resp.status(500).send("Internal server error");
 }

})

module.exports = router;