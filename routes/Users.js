import express from 'express';
const Router = express.Router();
import { register, login , currentUser, users , getUsers }  from '../controllers/usercontroller.js'
import { auth } from '../middleware/auth.js'

Router.get('/:_id', users)

Router.get('/', getUsers)

// ======================Register=======================

Router.post('/register', register);

// ========================================================================

// ======================Login=======================

Router.post('/login', login);

// ========================================================================

Router.post('/current-user', auth, currentUser)



Router.delete('/auth', async (req, res) => {
    try {
        res.send('List Get User')

    } catch(err){
        console.log(err)
        res.status(500).send('Register Error!')
    }
});

Router.delete('/auth', async (req, res) => {
    try {

        res.send('Delete User')

    } catch(err){
        console.log(err)
        res.status(500).send('Register Error!')
    }
});

export default Router;