import jwt from 'jsonwebtoken';

const authMiddleware = {
    authenticateToken: async (req, res, next) => {
        const accessToken = req.header('Authorization').replace('Bearer ', '');
        if (!accessToken) {
            return res.status(401).send('Khong tim thay access token!');
        }
        try {
            const secret = process.env.ACCESS_TOKEN_SECRET_KEY;

            const decodedToken = jwt.verify(accessToken, secret);
            if (!decodedToken.userId || !decodedToken.userRole) {
                return res.status(401).send('Unauthorized!');
            }
            req.userId = decodedToken.userId;
            req.userRole = decodedToken.userRole;
            next();
        }catch(error){
            res.status(500).send(error.message);
        }
    }
};
export default authMiddleware;