//import bcrypt library
const bcrypt=require("bcrypt");

//function to check the passwords
const checkUser= async (password,hashedPassword) =>{
  return await bcrypt.compare(password,hashedPassword)
}

module.exports=checkUser;