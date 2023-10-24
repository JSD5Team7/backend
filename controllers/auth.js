import bcrypt from 'bcrypt'
import userDB from '../models/userModel.js';
import jwt from 'jsonwebtoken'

export async function register(req, res) {
    try {
        const { 
            username, 
            password, 
            fname, 
            lname, 
            age, 
            email, 
            phone
        } = req.body;

        var user = await userDB.findOne({username})
        var emailValidate = await userDB.findOne({email})
        if(user) {
            return res.status(400).send('User already exists')
        } else if (emailValidate) {
            return res.status(400).send('Email already exists')
        }
        
        const salt = await bcrypt.genSalt(12)

        user = new userDB({ 
            username, 
            password, 
            fname, 
            lname, 
            age, 
            email, 
            phone
        });

        user.password = await bcrypt.hash(password,salt);
        await user.save();
        res.send('Register Success');
        
        
    } catch(err){
        console.log(err)
        res.status(500).send('Register Error!')
    }
}

export async function login(req, res) {
    try {
        const { username , password } = req.body;
        if (!username || !password)
        res.status(400).send('Username or Password requie')
        //Check Username//
        var user = await userDB.findOneAndUpdate({ username }, {new: true });
        //Check User Active//
        if (user && user.isActive){
            //Check Password//
            const isMatch = bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send("Username or Password Invalid")
            }
            const payload = {
                user: {
                    userId: user._id ,
                    username: user.username,
                    role: user.role
                }
            }
    
            //Generate Token//
            jwt.sign(payload, 
                'jwtSecret', 
                {expiresIn: 3600}, 
                (err, token) => {
                    if(err) throw err;
                    res.json({token, payload})
                    
                })

        } else {
            return res.status(400).send("Username or Password Invalid");
        }

    } catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

