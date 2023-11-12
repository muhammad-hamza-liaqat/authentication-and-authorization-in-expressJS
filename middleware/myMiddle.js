const jwt = require("jsonwebtoken");

function auth(req,res,next){
let token = req.header("x-auth-token");
if (!token){
    return res.status(400).send("token not provided")
}
let user =jwt.verify(token, "someprivatekey")
req.user = user;


next();
}

module.exports= auth;