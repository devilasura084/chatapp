const {register,login}=require('../controllers/userController');
const router=require('express').Router();
router.post('/register',register);
router.post('/login',login);
module.exports=router;


