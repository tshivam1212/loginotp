// const config = require('config');
const CryptoJS = require('crypto-js');
//const Encdata = config.get('ENCRYPTION');


const myconfig = {
    "ENCRYPTION": {
        "ENC_KEY": "8975dtgy07987e96VOUCHAGRAM@18736GYFTR$%#ENCfdc7725c198bf4a0",
        "ENC_ALGO": "aes-256-cbc",
        "ENC_IV": "9291665578434980"
      }
}

const Encdata = myconfig['ENCRYPTION']

 const validateEmail=(email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validateName= (name)=>{
    if(!name){
        return false
    }
    var regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(name);
}

const validatemobile = (inputtxt) =>{
    var mobile = /^\d{10}$/;
    //var mobile = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputtxt.match(mobile)) {
    console.log("valid no")
      return true;
    }
    else {
    console.log("invalid no");
      return false;
    }
  }
const errorRes=(code=400,msg="Something went wrong!!")=>{
    let res = { 
        "code": code,
        "message":msg,
        "data": null,
        "status": "Error"
      }
      return res;
}
const successRes= (code=200,data=null, msg="Successfull!!")=>{
    let res = { 
        "code": code,
        "message":msg,
        "data": data,
        "status": "Success"
      }
      return res;
}
 const  encData=(ciphertext)=> {
    return CryptoJS.AES.encrypt(ciphertext, Encdata.ENC_KEY).toString();
  }
  const decData=(ciphertext) => {
      const bytes = CryptoJS.AES.decrypt(ciphertext, Encdata.ENC_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    const dataValidation=(data)=>{
        switch(data){
          case null : return true;
          case undefined : return true;
          case "'null'" : return true;
          case "'undefined'" : return true;
          case true : return true;
          case "'true'" : return true;
          case false : return true;
          case "'false'" : return true;
          case 0 : return true;
          case "'0'" : return true;
          case "":return true;
          default : return false;
        }
    } 

module.exports = {successRes,errorRes,validateEmail,validateName,encData,decData,validatemobile,dataValidation }