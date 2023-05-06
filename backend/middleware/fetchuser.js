const jwt=require('jsonwebtoken');
const JWT_SECRET = "harryis goodBo$y";


const fetchuser=(req,resp,next)=>{
  const token=req.header('auth-token');
  if(!token){
    resp.status(401).send({error:"please try with valid token"})
  }
  try {
      const data=jwt.verify(token,JWT_SECRET);
     req.User=data.User;
     next();
  } catch (error) {
    resp.status(401).send({error:"please try with valid token"})
  }

}


module.exports=fetchuser;