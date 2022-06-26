const {validationResult, body } = require('express-validator');
const commonconnection = require('../model/connection')
const jwt = require('jsonwebtoken')
const {errorRes ,successRes,dataValidation} = require('../utils/index')
const utils = require('../utils/index')
// const config = require('config')
var bcrypt = require('bcryptjs');

const myconfig = {
    "jwt": {
    "SECRET": "my32Bit_LONG@-@SuPeRR_SecRET_KEY",
    "EXPIRES_IN": "30d",
    "TXN_TOKEN_EXPIRY": "900000"
  }
}
 const jwtdata = myconfig['jwt']




const register = async(req,res)=>{
    // const errors = validationResult(req);
    // console.log('====>', req.body, errors.isEmpty())
    // if (!errors.isEmpty()) {
    //       let arr = errors.array()
          
    //       return res.json(errorRes(400, "Enter Valid "+ arr[0].param));
     
    // }
    try{
    const {
        name,
        email,
        password,
        mobile,
        address

    } = req.body
  
        // encrypt the password 
        if(!utils.validateName(name)){
            return res.json('enter valid name')
        }
        if(!utils.validateEmail(email)){
            return res.json('enter valid email')
        }
         if(!password){
             return res.json('password is required')
         }

         //encrypt the password
         let pass = utils.encData(password)
       
       
       if(!utils.validatemobile(mobile)){
           return res.json('enter valid mobile no')
       }
       if(!address){
        return res.json('enter address details')

       }
      
  
        //getting file location on aw3s bucket 
        //  let url = req.file.location
        //  console.log('====>',url)
        
   
        let querystr = `SELECT * FROM users WHERE email = '${email}'`
        let result  = await commonconnection(querystr,2)
        if(result.length>0){
            return res.json(errorRes(400, "User  aleready register,plzz login!"));
        }else{
            let query = `INSERT INTO users (name ,email,password,mobile,address) values ('${name}','${email}','${pass}','${mobile}','${address}')`
            let result1 = await commonconnection(query,2)
        }
        return res.json(successRes(200,"New user is register successfully"))





    }catch(err){
        console.log(err)
        return res.json(errorRes(401,"something went wrong"))

    }




}



const login = async(req,res)=>{
    try{

        const {email} = req.body
        if(!email){
            res.json('email is required')
        }
        let pass = req.body.password
        console.log('l85',pass)
        if(!pass){
            res.json('password is required')
        }
       

        let query = `SELECT * from users WHERE email = '${email}' AND status = 'A'`
        let result = await commonconnection(query,2)
        if(result){
           
            let valid =  utils.decData(result[0].password)
            
            if(valid===pass){
                let token = jwt.sign({result:valid},jwtdata.SECRET,{expiresIn:jwtdata.EXPIRES_IN})
                return res.json(successRes(200,token,'successfull login'))
            }
            return res.json(errorRes(400,'password or mail did not match login!'))

        }
    }catch(err){
        console.log(err)
            return res.json(errorRes(401,"some thing went wrong"))
        
    }

}

module.exports = {register,login};