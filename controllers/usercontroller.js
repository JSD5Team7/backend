import bcrypt from 'bcrypt'
import userDB from '../models/userModel.js';
import jwt from 'jsonwebtoken'

export async function user (req, res) {
    try {
        const user_id = req.params._id
        const userData = await userDB.findOne({_id: user_id}).select('-password').exec();
        return res.status(200).json(userData);
    } catch(err) {
        console.log(err)
        return res.status(500).send('User not found')
    }
}

export async function getUsers(req, res) {
    try {
        const usersData = await userDB.find({}).select('-password').exec();
        return res.status(200).json(usersData)
    } catch(err) {
        console.log(err)
        return res.status(500).send('User not found')
    }
}

export async function register(req, res) {
    try {
        const { 
            username, 
            password, 
            fname, 
            lname,
            gender,
            birthday,
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
            gender,
            birthday,
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
            const isMatch = await bcrypt.compare(password, user.password)
            console.log(password)
            

            if (!isMatch) {
                return res.status(400).send("Username or Password Invalid")
            }
            const payload = {
                user: {
                    userId: user._id ,
                    username: user.username,
                    password: user.password,
                    role: user.role
                }
            }
    
            //Generate Token//
            jwt.sign(payload, 
                'jwtSecret', 
                {expiresIn: 60*60}, 
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

export async function currentUser(req, res) {
    try {
        const user = await userDB.findOne({username: req.user.username})
        .select('-password').exec()
        res.send(user)
    } catch(err) {
        res.status(500).send('Server Error!')
    }
}

export async function userUpdate(req, res) {
    const user_id = req.params._id
    try {
        const { 
            fname, 
            lname,
            gender,
            birthday,
            age,
            email, 
            phone
        } = req.body;
        const emailValidate = await userDB.findOne({email})
        if (emailValidate) {
            res.status(400).send('Email already exists')
        } else if (user_id){
            const userData = await userDB.findOneAndUpdate(
                {_id: user_id}, 
                {
                    fname: fname, 
                    lname: lname,
                    gender: gender,
                    birthday: birthday,
                    age: age, 
                    email: email, 
                    phone: phone
                })
                res.send(userData)
        }
        
    } catch(err) {
        res.status(500).send('User ID not found!')
    }
}


//ต้องให้ใส่ Email เพื่อส่งลิ้งที่มี URL repassword/ ด้วย User_id 
export async function resetPasswordUser(req, res) {
    const user_id = req.params._id
    try {
        const { 
            password
        } = req.body;

        const salt = await bcrypt.genSalt(12)
        const enPassword = await bcrypt.hash(password,salt);

        const userPassword = await userDB.findOneAndUpdate(
            {_id: user_id}, 
                {
                    password: enPassword, 
                })
                res.send(userPassword)
        
    } catch(err) {
        res.status(500).send('User ID not found!')
    }
}