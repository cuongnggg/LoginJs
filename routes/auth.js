const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// @route POST api/auth/register
//@desc Register user
//@access Pulic 
router.post('/register', async(req,res) => {
    const {username, password} = req.body

    //simple validation
    if(!username || !password)
        return res.status(400).json({success:false, message:err.message})

        try{
            //check user exist
            const user = await User.findOne({username})
            console.log("Hello JWT")
            if(user){
                console.log("new account is existed")
                console.log("Hello JWT")
                return res.status(400).json({success: false, message:'User already existed'})
            }else{
                console.log("Creating new account")
                console.log("Hello JWT")
                console.log("Hello JWT2")
                const hashedPassword = await argon2.hash(password)
                console.log("Hello JWT")
                console.log(hashedPassword)
                const newUser = new User({username, password: hashedPassword})
                console.log(newUser)
                console.log("Hello JWT")
                await newUser.save()
                console.log("Save new User success")
                console.log("Hello JWT")

                //give back token 
                // console.log("creating token access")
                const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET )
                console.log("Hello JWT")
                console.log("Token is" + accessToken)
                console.log("Hello JWT")
                return res.json({success: true, message: "User created successfully",accessToken})
                // return res.json({success: true, message: "User created successfully"})
            }
            
            //use agon2 to hashPassword
            
        }catch (error){}
    })

module.exports = router
