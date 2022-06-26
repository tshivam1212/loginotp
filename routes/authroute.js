const express = require('express')
const router = express.Router()
// const multer = require('multer');
// const  multerS3 = require('multer-s3-transform');
// const  aws = require('aws-sdk');
// const mime = require('mime-types');
const  bodyParser = require('body-parser')

const { body } = require('express-validator');



const {register,login} = require('../Controllers/authcon');
const { route } = require('../app');


 

// Upload file on aws3 bucket
// var s3 = new aws.S3({
//     accessKeyId: 'AKIA2MQA6I5YUD6UYVXQ',
//     secretAccessKey: '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',
//     Bucket: "assets.gyftr.com"
//     })
//     const fileFilter = (req, file, cb) => {
//       cb(null, true);
//       if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
//       cb(null, true);
//       } else {
//       cb(new Error('Invalid file type, only JPG, JPEG and PNG is allowed!'), false);
//       }
//     }
  
//     var upload = multer({
//     fileFilter,
//     storage: multerS3({
//      s3: s3,
//      acl:'public-read',
//      bucket:"assets.gyftr.com/test",
//      metadata:function (req, file, cb){
//              cb(null,{fieldname:file.fieldname})
//      },
//     key: function (req, file, cb) {
//       cb(null, new Date().toISOString() + '-' + file.originalname)
//     }
   
//    })
//  })



router.post("/Registration",
register)


router.post("/Login",login)



module.exports = router;