const mysql = require('mysql')
const { promisify } = require('util');
// const config = require('config');
//const dbprams = config.get('db');



const myconfig = {
    "db":{
      "host": "localhost",
      "user": "root",
      "port": 3306,
      "password": "",
      "database": "student_info"
    }
    
  }
  const dbprams = myconfig['db']

const commonconnection = async(query,type=1)=>{
    try{
      var connection = mysql.createConnection(dbprams);
      const promisequery = await promisify(connection.query).bind(connection)
      const queryresponse = await promisequery(query)
      if(type===2){
        let data = queryresponse
  
        return data
      }
      let data = queryresponse[0]
      return data
    }catch(err){
    console.log(err)
    console.log('connected')
    return false
    }
  }
  
  
  module.exports = commonconnection;