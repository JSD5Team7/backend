import express from 'express';
const Router = express.Router();
import { register, login , currentUser, user , getUsers , userUpdate, resetPasswordUser}  from '../controllers/usercontroller.js'
import { authMiddleware } from '../middleware/auth.js'

Router.get('/:_id', authMiddleware, user)

Router.get('/', getUsers)

Router.post('/register', register);

Router.post('/login', login);

Router.post('/current-user', authMiddleware, currentUser)

Router.put('/updateuser/:_id', authMiddleware, userUpdate );

Router.put('/resetpassword/:_id', resetPasswordUser );

export default Router;