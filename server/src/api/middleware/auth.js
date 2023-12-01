import jwt from 'jsonwebtoken';

const authMiddleware = {
    authenticateToken: async (req,res,next)=>{
        const accessToken  = req.header("x-access-token");
        if(!accessToken){
            return res.status(401).send('Khong tim thay access token!');
        }
        const secret = process.env.SECRET_KEY;
        const decodedToken = jwt.verify(accessToken, secret);
        req.userId = decodedToken.userId;
        req.userRole = decodedToken.userRole;
        next();
    }
  };
  export default authMiddleware;