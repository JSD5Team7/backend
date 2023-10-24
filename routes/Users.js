import express from 'express';
const Router = express.Router();
import { register, login , currentUser, user , getUsers , userUpdate, resetPasswordUser}  from '../controllers/usercontroller.js'
import { auth } from '../middleware/auth.js'

Router.get('/:_id', auth, user)

Router.get('/', getUsers)

// ======================Register=======================

Router.post('/register', register);

// ========================================================================

// ======================Login=======================

Router.post('/login', login);

// ========================================================================

Router.post('/current-user', auth, currentUser)

Router.put('/updateuser/:_id', auth, userUpdate );

Router.put('/resetpassword/:_id', resetPasswordUser );

Router.delete('/auth', async (req, res) => {
    try {

        res.send('Delete User')

    } catch(err){
        console.log(err)
        res.status(500).send('Register Error!')
    }
});

export default Router;