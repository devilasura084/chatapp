const user=require('../models/usermodel');
const bcrypt=require('bcrypt');
module.exports.register=async (req,res,next)=>
{
    try {
        const{username,email,password}=req.body;
    const usernameCheck=await user.findOne({username});
    if(usernameCheck){
        return res.json({msg:"Username already used",status:false});
    }
    const emailcheck=await user.findOne({email});
    if(emailcheck)
    {
        return res.json({msg:"email already used",status:false});
    }
    const hashedpassword= await bcrypt.hash(password,10);
    const User=await user.create({
        username,email,password:hashedpassword,
    });
    delete User.password;
    return res.json({status:true,user});
    } catch (error) {
        next(error);
    }
    
}
module.exports.login=async (req,res,next)=>
{
    try {
        const{username,password}=req.body;
    const usernami=await user.findOne({username});
    if(!usernami){
        return res.json({msg:"Incorrect username or password",status:false});
    }
    const ispasswordvalid=await bcrypt.compare(password,usernami.password)
    if(!ispasswordvalid)
    {
        return res.json({msg:"Incorrect username or password",status:false});
    }
    delete usernami.password
    return res.json({status:true,user});
    } catch (error) {
        next(error);
    }
    
}